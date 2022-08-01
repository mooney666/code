const allPages = [
  "./page1.html",
  "./page2.html",
  "./page3.html",
  "./page4.html",
  "./page5.html",
];
// #region 左侧导航菜单的点击事件
layui.use("element", function () {
  var element = layui.element;
  element.on("nav(nav-menu)", function ([data]) {
    var loadID = layer.load(1);
    iframe.src = "";
    mask.style.display = "block";
    setTimeout(() => {
      mask.style.display = "none";
      const idx = data.dataset.index * 1;
      const pagePath = allPages[idx];
      iframe.src = pagePath;
      layer.close(loadID);
    }, 500);
  });
});
//#endregion
