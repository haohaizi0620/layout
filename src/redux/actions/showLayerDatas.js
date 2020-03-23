/*
 * @Author: your name
 * @Date: 2020-01-06 14:09:04
 * @LastEditTime: 2020-03-23 15:10:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \one-react\src\redux\actions\showLayerDatas.js
 */

export const UPDATEFIELDVAL = "UPDATEFIELDVAL";//对showDatas里面的bgFieldObj对象和cptBorderOb对象的值进行单独的设置
export const REPLACEFIELDVAL = "REPLACEFIELDVAL";//将showDatas的cptBorderObj对象的数据进行替换
export const REPLACEALLFIELDVAL = "REPLACEALLFIELDVAL";//将showDatas对象进行替换
export const REPLACEOPTIONSLIST = "REPLACEOPTIONSLIST";//将cptOptionsList对象进行替换

export const ADDCPTOPTIONSLIST = "ADDCPTOPTIONSLIST";//对保存所有的图表的option的数组进行添加
export const DELCPTOPTIONSLIST = "DELCPTOPTIONSLIST";//对保存所有的图表的option的数组进行删除
export const EDITCPTOPTIONSLIST = "EDITCPTOPTIONSLIST";//对保存所有的图表的option的数组进行编辑

export const SAVESHOWPAGEDATA = "SAVESHOWPAGEDATA";//将当前页面展示的图表进行保存

export const REPLACEGLOBALBG = "REPLACEGLOBALBG";//将背景信息进行替换




export function updateShowLayerFieldVal(updateFieldObj) {
    return {type: UPDATEFIELDVAL,updateObj:updateFieldObj}
}
export function replaceShowLayerFieldVal(showLayerObj) {
    return {type: REPLACEFIELDVAL,showLayerObj:showLayerObj}
}
export function replaceAllShowLayerFieldVal(showAllLayerObj) {
    return {type: REPLACEALLFIELDVAL,showAllLayerObj:showAllLayerObj}
}
export function replaceGlobalBg(globalBgObj) {
    return {type: REPLACEGLOBALBG,globalBgObj:globalBgObj}
}

export function replaceOptionsList(OptionsList) {
    return {type: REPLACEOPTIONSLIST,OptionsList:OptionsList}
}

export function addCptOptionsList(queryId,layerOption) {
    return {type: ADDCPTOPTIONSLIST,layerOption:layerOption,queryId:queryId}
}

export function delCptOptionsList(layerIndex) {
    return {type: DELCPTOPTIONSLIST,layerIndex:layerIndex}
}

export function editCptOptionsList(layerOptionsObj) {
    return {type: EDITCPTOPTIONSLIST,layerOptionsObj:layerOptionsObj}
}

export function saveShowPageData(pageObj) {
    return {type: SAVESHOWPAGEDATA,pageObj:pageObj}
}

