/*
 * @Author: your name
 * @Date: 2020-01-06 14:08:58
 * @LastEditTime : 2020-02-12 18:55:26
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \one-react\src\redux\reducers\counter.js
 */
import {
    UPDATEFIELDVAL,
    REPLACEFIELDVAL,
    REPLACEALLFIELDVAL,
    ADDCPTOPTIONSLIST,
    DELCPTOPTIONSLIST,
    EDITCPTOPTIONSLIST
} from '../actions/showLayerDatas';

/*
 * 初始化state
 */
const optionValues  = [
    {"cname":'无',"value":'none'},
    {"cname":'背景一',"value":'http://localhost/kshCharsTempJs/ksh/bg1.png'},
    {"cname":'背景二',"value":'http://localhost/kshCharsTempJs/ksh/bg2.png'},
    {"cname":'背景三',"value":'http://localhost/kshCharsTempJs/ksh/bg3.png'},
    {"cname":'背景四',"value":'http://localhost/kshCharsTempJs/ksh/bg4.png'},
    {"cname":'背景五',"value":'http://localhost/kshCharsTempJs/ksh/bg5.png'},
    {"cname":'背景六',"value":'http://localhost/kshCharsTempJs/ksh/bg6.png'},
]
 
const cptPropertyObj = {
    showDatas: { //当前组件属性及内容属性
        cptBorderObj: { //边框属性
            width: 280,
            height: 260,
            left: 450,
            top: 160,
            opacity: 1,
        },
        type: 'chart',//具体的类型：    text chart border
        cptType: 'jbzt'//当前对应的图层的id名
    },
    cptOptionsList: [], //保存每个图层对应的数据 数据类型 {layerOption:{},layerIndex:1}
    cptIndex: 0,
    specialField: {},
    bgFieldObj: {
        bgColor: 'rgba(0,0,0,1)',
        bjWidth: 1470,
        bjHeight: 937,
        bjImage:'none',
        bgImageName:"无",
        bgImageIntegerUrl:"",
        uploadImage:"",
    },
};
/*
 * reducer
 */
export default function reducer(state = cptPropertyObj, action) {
    switch (action.type) {
        //对图表的基本属性进行修改的时候处理
        case UPDATEFIELDVAL:
            let updateObj = action.updateObj;
            let updateLayer = updateObj.layerType;
            let fieldEname = updateObj.fieldEname;
            let fieldValue = updateObj.fieldValue;
            if (updateLayer == "bg") {
                if(fieldEname=="bgImageName"){
                    state.bgFieldObj.bgImageName = fieldValue;
                    if(fieldValue!="无"){
                        state.bgFieldObj.bgImageIntegerUrl = "";
                    }
                    optionValues.map((item,index) =>{
                        if(item.cname==fieldValue){
                            state.bgFieldObj.bjImage = item.value;
                            state.bgFieldObj.uploadImage = item.value;
                            state.bgFieldObj.ImageUploading = item.value;
                            state.bgFieldObj.bgImageIntegerUrl = item.value;
                        }
                    })
                }else if(fieldEname=="bgImageIntegerUrl"){
                    state.bgFieldObj.bgImageName = "无";
                    state.bgFieldObj.bjImage = fieldValue;
                    state.bgFieldObj.uploadImage = fieldValue;
                    state.bgFieldObj[fieldEname] = fieldValue;
                }else if(fieldEname=="uploadImage"){
                    state.bgFieldObj.uploadImage = fieldValue;
                }else{
                    state.bgFieldObj[fieldEname] = fieldValue     
                }
            } else if (updateLayer == "chart"||updateLayer == "text"||updateLayer == "border") {
                state.showDatas.cptBorderObj[fieldEname] = fieldValue
            }else{
                //state.showDatas.cptBorderObj[updateObj.fieldEname] = updateObj.fieldValue
            }
            return state;
            //将当前属性的值进行替换
        case REPLACEFIELDVAL:
            state.showDatas.cptBorderObj = action.showLayerObj
            return state;
            //全部的基本值进行替换
        case REPLACEALLFIELDVAL:
            state.showDatas = action.showAllLayerObj
            return state;
            //对保存所有的图表的option的数组进行添加
        case ADDCPTOPTIONSLIST:
            state.cptOptionsList = [...state.cptOptionsList,{layerOption:action.layerOption,queryId:action.queryId}];
            return state;
            //对保存所有的图表的option的数组进行删除
        case DELCPTOPTIONSLIST:
            let layerIndex = action.layerIndex;
            if (layerIndex >= 0) {
                state.cptOptionsList.splice(action.layerIndex, 1);
            }
            return state;
        case EDITCPTOPTIONSLIST:
            if (action.cptIndex >= 0) {
                state.cptOptionsList[action.cptIndex] = action.layerOptions;
            }
            return state;
        default:
            return state
    }
}