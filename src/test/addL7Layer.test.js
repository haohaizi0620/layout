const L7 = window.L7;

/* 初始化 L7.Scene 添加 layer */
function initL7Scene(containor, map, layerSource) {
  const scene = new L7.Scene({
    id: containor,
    map: new L7.Mapbox({
      mapInstance: map
    })
  });

  scene.on("loaded", () => {
    const layer = addL7Layer(layerSource);
    scene.addLayer(layer);
  });
}

/* 初始化 layer */
function addL7Layer({ layerFlag, dataSource, size, shape, style, color }) {
  switch (layerFlag) {
    /* 网格热力 */
    case "HeatMapLayer-grid":
      const layer = new L7.HeatmapLayer({})
        .source(dataSource)
        .size(size.field, size.bounds)
        .shape(shape)
        .style(style)
        .color(color.field, color.bounds);
      return layer;
    /* 蜂窝热力 */
    case "HeatMapLayer-hexagon":
      const layer = new L7.HeatmapLayer({})
        .source(dataSource)
        .size(size.field, size.bounds)
        .shape(shape)
        .style(style)
        .color(color.field, color.bounds);
      return layer;
    /* 经典热力 */
    case "HeatMapLayer-classic":
      const layer = new L7.HeatmapLayer({})
        .source(dataSource)
        .size(size.field, size.bounds)
        .shape(shape)
        .style(style);
      return layer;
    default:
      return "暂不支持图层类型";
  }
}
