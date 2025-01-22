// 存储 URL 到 tab ID 的映射
const urlMap = new Map();

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

  // 如果 URL 已经存在，关闭当前 tab
  if (urlMap.has(url)) {
    const existingTabId = urlMap.get(url);
    if (existingTabId !== tabId) {
      chrome.tabs.remove(tabId);
      return;
    }
  }

  // 更新 URL 映射
  urlMap.set(url, tabId);

  // 监听 tab 关闭事件，清理映射
  chrome.tabs.onRemoved.addListener((closedTabId) => {
    if (closedTabId === tabId) {
      urlMap.delete(url);
    }
  });
}
