// 监听 tab 的创建和更新
browser.tabs.onCreated.addListener(handleTab);
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    handleTab(tab);
  }
});

function handleTab(tab) {
  const url = tab.url;
  const tabId = tab.id;

  if (!url || url === 'about:newtab') return;

  // 实时查询所有tab
  browser.tabs.query({}).then((allTabs) => {
    // 过滤出相同URL的tab
    const duplicateTabs = allTabs.filter(t => t.url === url && t.id !== tabId);

    // 如果存在重复tab
    if (duplicateTabs.length > 0) {
      // 按最后访问时间排序，保留最新打开的tab
      const sortedTabs = duplicateTabs.sort((a, b) => b.lastAccessed - a.lastAccessed);
      if (duplicateTabs.length > 1) {
        // 关闭除最新tab外的其他tab
        sortedTabs.slice(1).forEach(t => browser.tabs.remove(t.id));
      }
      // 将保留的最新tab移动到新tab的位置并激活
      const existingTab = sortedTabs[0];
      browser.tabs.move(existingTab.id, {index: tab.index}).then(() => {
        browser.tabs.update(existingTab.id, {active: true});
      });
      // 关闭新tab
      browser.tabs.remove(tabId);
    }
  });
}
