let otherDefaultData = require('../datasource/otherDefaultData.json');
export function getDefaultLayerData(layerType,layerId) {
    let returnObj = {};
    let isDefault = false;
    let defaulaData = otherDefaultData[layerType];
    if (layerType === "text") {
      let textCenterVal = "标题";
      if (layerId === "multiLineText") {
        textCenterVal = "这是一个可以换行的文本.......";
      } else if (layerId === "moreRowText") {
        textCenterVal = "";
      }
      let tempTextObj = defaulaData.default;
      tempTextObj.textCenter.value = textCenterVal;
      returnObj = tempTextObj;
    } else if (layerType === "media") {
      if(layerId === "iframeCenter"){
        returnObj = defaulaData.iframeCenter;
      }else if (layerId === "singleImage") {
        returnObj = defaulaData.singleImage;
      }else{
          isDefault = true;
      }
    } else if (layerType === "table"){
      if (layerId === "baseTable") {
        returnObj = defaulaData.baseTable;
      }else{
          isDefault = true;
      }
    } else if (layerType === "interaction") {
      if (layerId === "fullScreen") {
          isDefault = true;
      }else{
          isDefault = true;
      }
    } else if (layerType === "material"){
      if(layerId === "singleBorder"){
        returnObj = defaulaData.singleBorder;
      }else if (layerId === "singleDecorate") {
        returnObj = defaulaData.singleDecorate;
      }else{
          isDefault = true;
      }
    }
    if(isDefault){
      returnObj = defaulaData.default;
    }
    return returnObj;
}