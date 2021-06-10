/*
 * @Author: your name
 * @Date: 2020-01-06 14:08:58
 * @LastEditTime: 2020-03-23 15:11:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \one-react\src\redux\reducers\counter.js
 */
import {
    UPDATEFIELDVAL,
    REPLACEFIELDVAL,
    REPLACEALLFIELDVAL,
    ADDCPTOPTIONSLIST,
    DELCPTOPTIONSLIST,
    EDITCPTOPTIONSLIST,
    SAVESHOWPAGEDATA,
    REPLACEGLOBALBG,
    REPLACEOPTIONSLIST,
} from '../actions/showLayerDatas';

 
const cptPropertyObj = {
    showDatas: { //当前组件属性及内容属性
        cptBorderObj: { //边框属性    transform: rotate(181deg);
            width: 280,
            height: 260,
            left: 450,
            top: 160,
            opacity: 1,
            rotate:0,
            layerBorderWidth:0,
            layerBorderStyle:'solid',
            layerBorderColor:'rgba(0,0,0,1)'
        },
        type: 'bg',//具体的类型：    text chart border
        cptType: ''//当前对应的图层的id名
    },
    cptOptionsList: [], //保存每个图层对应的数据 数据类型 {layerOption:{},queryId:1}
    cptIndex: 0,
    specialField: {},
    bgFieldObj: {
        bgColor: 'rgba(15, 42, 67,1)',
        bjWidth: 1470,
        bjHeight: 937,
        bjImage:'none',
        bgImageName:"无",
        bgImageIntegerUrl:"",
        uploadImage:"",
        mainKey:-1
    },
    showPageData:{
    
    }
};
/*
 * reducer
 */
export default function reducer(state = cptPropertyObj, action) {
    var newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        //对图表的基本属性进行修改的时候处理
        case UPDATEFIELDVAL:
            let updateObj = action.updateObj;
            let updateLayer = updateObj.layerType;
            let fieldEname = updateObj.fieldEname;
            let fieldValue = updateObj.fieldValue;
            console.log(updateLayer,fieldEname,fieldValue)
            if (updateLayer == "bg") {
                if(fieldEname=="bgImageName"){
                    newState.bgFieldObj.bgImageName = fieldValue;
                    if(fieldValue!="无"){
                        newState.bgFieldObj.bgImageIntegerUrl = "";
                    }
                }else if(fieldEname=="bgImageIntegerUrl"){
                    newState.bgFieldObj.bgImageName = "无";
                    newState.bgFieldObj.uploadImage = fieldValue;
                    newState.bgFieldObj[fieldEname] = fieldValue;
                }else if(fieldEname=="uploadImage"){
                    newState.bgFieldObj.uploadImage = fieldValue;
                }else{
                    newState.bgFieldObj[fieldEname] = fieldValue     
                }
            }else{
                state.showDatas.cptBorderObj[fieldEname] = fieldValue;
            }
            return { ...state, ...newState };
            //将当前属性的值进行替换
        case REPLACEFIELDVAL:
             newState.showDatas.cptBorderObj = action.showLayerObj
            return { ...state, ...newState };
        case REPLACEOPTIONSLIST: 
            return Object.assign({}, state, {
                cptOptionsList: action.OptionsList
            });
            //全部的基本值进行替换
        case REPLACEALLFIELDVAL:
            return Object.assign({}, state, {
                showDatas: action.showAllLayerObj
              });
            //对保存所有的图表的option的数组进行添加
        case ADDCPTOPTIONSLIST:
            return Object.assign({}, state, {
                cptOptionsList: [...state.cptOptionsList,{layerOption:action.layerOption,queryId:action.queryId}]
              });
            //对保存所有的图表的option的数组进行删除
        case DELCPTOPTIONSLIST:
            let layerIndex = action.layerIndex;
            if (layerIndex >= 0) {
                newState.cptOptionsList.splice(action.layerIndex, 1);
            }
            return { ...state, ...newState };
        case EDITCPTOPTIONSLIST:
             let layerOptionsObj = action.layerOptionsObj;
             let cptIndex = layerOptionsObj.cptIndex;
            if (cptIndex >= 0) {
                newState.cptOptionsList[cptIndex].layerOption = layerOptionsObj.layerOption;
            }
            return { ...state, ...newState };
        case SAVESHOWPAGEDATA:{
            let {cptKeyList,cptPropertyList} =  action.pageObj;
            let cptOptionsList = newState.cptOptionsList;
            let showPageData = newState.showPageData;
            showPageData.cptKeyList = cptKeyList;
            showPageData.cptPropertyList = cptPropertyList;
            showPageData.cptOptionsList = cptOptionsList;
            newState.showPageData= showPageData;
            return  { ...state, ...newState };
        }
        case REPLACEGLOBALBG:{
            return  Object.assign({}, state, {
                bgFieldObj: action.globalBgObj
             });
        }
        default:
            return state
    }
}