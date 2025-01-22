// 获取当前窗口的所有 tab
function updateTabCount() {
  browser.tabs.query({currentWindow: true}).then((tabs) => {
    const count = tabs.length;
    document.getElementById('status').textContent =
      `${count} tabs open`;
  });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  updateTabCount();

  // 每5秒更新一次 tab 数量
  setInterval(updateTabCount, 5000);
});
