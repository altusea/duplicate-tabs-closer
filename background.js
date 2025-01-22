// 监听 tab 的创建和更新
chrome.tabs.onCreated.addListener(handleTab);
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    handleTab(tab);
  }
});

function handleTab(tab) {
  const url = tab.url;
  const tabId = tab.id;

  if (!url || url === 'chrome://newtab/') return;

  // 实时查询所有tab
  chrome.tabs.query({}, (allTabs) => {
    // 过滤出相同URL的tab
    const duplicateTabs = allTabs.filter(t => t.url === url && t.id !== tabId);

    // 如果存在重复tab
    if (duplicateTabs.length > 0) {
      // 按最后访问时间排序，保留最新打开的tab
      const sortedTabs = duplicateTabs.sort((a, b) => b.lastAccessed - a.lastAccessed);
      if (duplicateTabs.length > 1) {
        // 关闭除最新tab外的其他tab
        sortedTabs.slice(1).forEach(t => chrome.tabs.remove(t.id));
      }
      // 将保留的最新tab移动到新tab的位置并激活
      const existingTab = sortedTabs[0];
      chrome.tabs.move(existingTab.id, {index: tab.index}, () => {
        chrome.tabs.update(existingTab.id, {active: true});
      });
      // 关闭新tab
      chrome.tabs.remove(tabId);
    }
  });
}
