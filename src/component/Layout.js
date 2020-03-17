import './Layout.css';
import React, { Component, Fragment } from 'react';
import Header from './Header';
import Content from './Content';
import { test, getKSHChart, delOneLayer,editOneLayer,getShareById,editKSHChartPosition,editKSHChartData,editLayerSortNum,delOneOtherLayer,getSpecify,editOneOtherLayer,getBgIndex,getOtherLayer,addOneOtherLayer} from '../api/api';
import LeftComponentList from './leftComponents/LeftComponentList';
import Config from './Config';
import DeleteItemModal from './ModelCom/DeleteItemModal';
import EditItemModal from './ModelCom/EditItemModal';
import ShareItemModal from './ModelCom/ShareItemModal';
import $ from 'jquery';

// import LoadChart from "./LoadChart";
import store from '../redux/store';
import { chartOption,showChartsOption} from '../utils/chart';

import { Link } from 'react-router-dom';
import { notification, Modal, Button } from 'antd';
import { selectGetOneMainLayer, addMainLayer, selectPostOneMainLayer } from '../api/apiAxios';
// import Mock from 'mockjs'
import {
  updateShowLayerFieldVal,
  replaceShowLayerFieldVal,
  replaceAllShowLayerFieldVal,
  delCptOptionsList,
  editCptOptionsList,
  saveShowPageData,
  replaceGlobalBg,
} from '../redux/actions/showLayerDatas';
import { Redirect } from 'react-router-dom';

import PageSetting from '../style-config/page-setting/PageSetting';

const chartData = require('../datasource/chartDatas.json');

class Layout extends Component {
  constructor(props) {
    super(props);
    // window.parent.document.getElementById("dataShow").topicEditor("",0);
    console.log(window);
    this.state = {
      cptIndex: -1, //当前选中的组件
      cptType: '', //当前组件的类型
      cptKey: '', //当前组件对应的时间戳的值
      cptKeyList: [], //保存每个组件的基本信息,用来显示组件的先后顺序
      cptPropertyList: [], //所有组件基本属性的数组
      cptChartIdList: [], //保存所有前图层对应的接口的id值和cttype
      cptPropertyObj: store.getState().showLayerDatas.showDatas, //当前点击的图层的基本属性
      globalBg: store.getState().showLayerDatas.bgFieldObj, //中间dom的属性
      nameData:{},//保存当前页面的基本信息
      shareId:1,//当前页面需要的shareid
      kshId:1,//当前的kshId
    };
  }
  componentDidMount() {
    this.initLeftDatas2();
    window['initEditPage'] = () => {
      this.initLeftDatas2();
    }
  }

    initLeftDatas(){
      let tempTestData = {
        "username":"public",
        "data":[{
          "id": 4,
          "parentid": 2,
          "name": "断裂分布图",
          "type": "THEMEVERTBAR_SORT",
          "service": "KSH",
          "layername": "test",
          "renderer": null,
          "thType": "0",
          "type2": null,
          "desp": "",
          "isText": null,
          "showType": null,
          "realtimeupdate": null,
          "serialize": "{\"col\":1,\"row\":5,\"size_x\":2,\"size_y\":2}",
          "show": null,
          "layerPosition":'{"cptBorderObj":{"width":280,"height":260,"left":450,"top":160,"opacity":1,"layerBorderWidth":0,"layerBorderStyle":"solid","layerBorderColor":"rgba(0,0,0,1)"},"type":"bg","cptType":""}'
      }, {
          "id": 0,
          "parentid": 2,
          "name": "水污染",
          "type": null,
          "service": "KSH",
          "layername": "testV4_水污染",
          "renderer": "<GROUPRENDERER><SIMPLERENDERER name=\"一般点样式\" minscale=\"1e-20\" maxscale=\"100000000000000000000\"><GROUPRENDERER  styleName=\"circle\" fuhaokuName=\"基础符号库\"><SIMPLEMARKERSYMBOL antialiasing=\"true\" color=\"102,255,43\" overlap=\"true\" shadow=\"0,0,0\" transparency=\"1.0\" type=\"circle\" outline=\"102,255,43\" usecentroid=\"true\" width=\"3\"></SIMPLEMARKERSYMBOL></GROUPRENDERER></SIMPLERENDERER></GROUPRENDERER>",
          "thType": "1",
          "type2": null,
          "desp": "",
          "isText": null,
          "showType": null,
          "realtimeupdate": "false",
          "serialize": "{\"col\":1,\"row\":1,\"size_x\":3,\"size_y\":2}",
          "show": "1",
          "layerPosition":'{"cptBorderObj":{"width":280,"height":260,"left":450,"top":160,"opacity":1,"layerBorderWidth":0,"layerBorderStyle":"solid","layerBorderColor":"rgba(0,0,0,1)"},"type":"bg","cptType":""}'
      }, {
          "id": 0,
          "parentid": 2,
          "name": "泥石流沟",
          "type": null,
          "service": "CCC",
          "layername": "泥石流沟",
          "renderer": "<GROUPRENDERER><SIMPLERENDERER name=\"一般点样式\" minscale=\"1e-20\" maxscale=\"100000000000000000000\"><GROUPRENDERER  styleName=\"square\" fuhaokuName=\"基础符号库\"><SIMPLEMARKERSYMBOL antialiasing=\"true\" color=\"204,255,43\" overlap=\"true\" shadow=\"0,0,0\" transparency=\"1.0\" type=\"square\" outline=\"204,255,43\" usecentroid=\"true\" width=\"3\"></SIMPLEMARKERSYMBOL></GROUPRENDERER></SIMPLERENDERER></GROUPRENDERER>",
          "thType": "1",
          "type2": null,
          "desp": "",
          "isText": null,
          "showType": null,
          "realtimeupdate": "false",
          "serialize": "{\"col\":4,\"row\":1,\"size_x\":2,\"size_y\":2}",
          "show": "1",
          "layerPosition":'{"cptBorderObj":{"width":280,"height":260,"left":450,"top":160,"opacity":1,"layerBorderWidth":0,"layerBorderStyle":"solid","layerBorderColor":"rgba(0,0,0,1)"},"type":"bg","cptType":""}'
      }]
      }
      let resultObj = {
          "username": "public",
          "data": '[{"id":4,"parentid":2,"name":"断裂分布图","type":"THEMEVERTBAR_SORT","service":"KSH","layername":"test","renderer":null,"thType":"0","type2":null,"desp":"","isText":null,"showType":null,"realtimeupdate":null,"serialize":"{\"col\":1,\"row\":5,\"size_x\":2,\"size_y\":2}","show":null},{"id":0,"parentid":2,"name":"水污染","type":null,"service":"KSH","layername":"testV4_水污染","renderer":"<GROUPRENDERER><SIMPLERENDERER name=\"一般点样式\" minscale=\"1e-20\" maxscale=\"100000000000000000000\"><GROUPRENDERER  styleName=\"circle\" fuhaokuName=\"基础符号库\"><SIMPLEMARKERSYMBOL antialiasing=\"true\" color=\"102,255,43\" overlap=\"true\" shadow=\"0,0,0\" transparency=\"1.0\" type=\"circle\" outline=\"102,255,43\" usecentroid=\"true\" width=\"3\"></SIMPLEMARKERSYMBOL></GROUPRENDERER></SIMPLERENDERER></GROUPRENDERER>","thType":"1","type2":null,"desp":"","isText":null,"showType":null,"realtimeupdate":"false","serialize":"{\"col\":1,\"row\":1,\"size_x\":3,\"size_y\":2}","show":"1"},{"id":0,"parentid":2,"name":"泥石流沟","type":null,"service":"CCC","layername":"泥石流沟","renderer":"<GROUPRENDERER><SIMPLERENDERER name=\"一般点样式\" minscale=\"1e-20\" maxscale=\"100000000000000000000\"><GROUPRENDERER  styleName=\"square\" fuhaokuName=\"基础符号库\"><SIMPLEMARKERSYMBOL antialiasing=\"true\" color=\"204,255,43\" overlap=\"true\" shadow=\"0,0,0\" transparency=\"1.0\" type=\"square\" outline=\"204,255,43\" usecentroid=\"true\" width=\"3\"></SIMPLEMARKERSYMBOL></GROUPRENDERER></SIMPLERENDERER></GROUPRENDERER>","thType":"1","type2":null,"desp":"","isText":null,"showType":null,"realtimeupdate":"false","serialize":"{\"col\":4,\"row\":1,\"size_x\":2,\"size_y\":2}","show":"1"}]'
      }
      // let showObjArr = JSON.parse(resultObj.data);
      let tempCptKeyList = [];
      let tempCptPropertyList = [];
      let tempCptChartIdList = [];
      let timeKey = new Date().getTime().toString();  
      tempTestData.data.map((item,index) => {
        timeKey++;
        tempCptKeyList.push({ key: timeKey, id: item.name, title: item.layername,layerType:item.thType,simpleType:''});
        tempCptPropertyList.push(JSON.parse(item.layerPosition));
        tempCptChartIdList.push({
            chartId:item.id,
            thType:item.thType,
            timeKey:timeKey
        });   
      })
      this.setState({
          cptIndex: -1,
          cptType: '',
          cptKey: '',
          cptKeyList: tempCptKeyList,
          cptPropertyList:tempCptPropertyList,
          userName:tempTestData.username,
          cptPropertyObj: { 
              type: 'bg',//具体的类型：    text chart border
              cptType: ''
          },
          cptChartIdList:tempCptChartIdList
      }, () => {
          {   
            showChartsOption(tempCptChartIdList);
          }
      });

    }

    initLeftDatas2(){
        let _this = this;
        var shareId = 1;
        let shareIdVal = window.parent.document.getElementById('shareID');
        if(shareIdVal){
          shareId = shareIdVal.value;
        }
        let kshId = 1;
        let kshIdObj = window.parent.document.getElementById('kshID');
        kshIdObj?kshId=kshIdObj.value:kshId=1;
        this.setState({
          shareId:shareId,
          kshId:kshId
        },() => {
          getBgIndex({
            "shareid" : shareId
          })
          .then(result => {
              if(result.n <= 0){
                  let bgObj = {
                    name: 'bg',
                    type: 'bg',
                    tabid: 0,
                    shareid: shareId,
                    json:  JSON.stringify({
                        bgColor: 'rgba(15, 42, 67,1)',
                        bjWidth: 1470,
                        bjHeight: 937,
                        bjImage:'none',
                        bgImageName:"无",
                        bgImageIntegerUrl:"",
                        uploadImage:"",
                    }),
                    sortNum:0
                  }
                  addOneOtherLayer(bgObj)
                  .then(res => {
                    if(result.n==1){
                        console.log("背景添加成功")
                    }
                  }).catch(error => console.log(error));
              }
                getShareById(shareId)
                .then(result => {
                    _this.initLayer(result[0],shareId,kshId)
                }).catch(error => {
                    console.info(error);      
                });
          }).catch(error => console.log(error));
        })
    }
    initLayer(nameDataObj,shareId,kshId){
        let _this = this;
        let getKshObj = {
          id: kshId,
          tablename: nameDataObj.KSHNAME
        }
        let OtherLayerObj = {
          "shareid" :shareId
        }
        getKSHChart(getKshObj).then(res => {
          let tempData = JSON.parse(res.data);
          let tempCptKeyList = [];
          let tempCptPropertyList = [];
          let tempCptChartIdList = [];
          let timeKey = new Date().getTime().toString();  
              tempData.map((item,index) => {
                timeKey++;
                let tempLayerPosition = item.layerPosition;
                let sortNumChart = item.sortNum;
                let thType = item.thType;
                let vVal = "";
                if(thType=="0"){
                  vVal = item.id;
                }else if(thType=="1"){
                  vVal = item.service+"；"+item.layername+"；"+item.name;
                }
                item.vVal = vVal;
                let tempCptChartObj = {
                    chartId:item.id,
                    thType:item.thType,
                    timeKey:timeKey,
                    mainKey:item.mainKey,
                    addState:'leftAdd',
                    layerObj:item,
                    layerData:{},
                    sortNum:sortNumChart,
                };
                if(tempLayerPosition!=""){
                  tempLayerPosition = JSON.parse(tempLayerPosition)
                }else{
                  tempLayerPosition=JSON.parse('{"cptBorderObj":{"width":280,"height":260,"left":450,"top":160,"rotate":0,"opacity":1,"layerBorderWidth":0,"layerBorderStyle":"solid","layerBorderColor":"rgba(0,0,0,1)"},"type":"chart","cptType":""}')
                }
                tempLayerPosition.type = "chart";
                tempLayerPosition.sortNum = sortNumChart;
                tempCptKeyList.push({ key: timeKey, id: item.name, title: item.layername,layerType:item.thType,simpleType:'', sortNum:sortNumChart});
                tempCptPropertyList.push(tempLayerPosition);
                tempCptChartIdList.push(tempCptChartObj);   
              })
              getOtherLayer(OtherLayerObj)
                    .then(result => {
                      let resultData = result.list
                      if(resultData&&resultData.length>0){
                        let bgObj = {};
                        resultData.map((layerItem,layerIndex) => {
                          timeKey++;
                          let sinSoreNum = layerItem.SORTNUM;
                          let layerId = layerItem.CELLTYPEID;
                          let layerType = layerItem.CELLTYPE;
                          let layerName = layerItem.CELLNAME;
                          let layerJsonObj = JSON.parse(layerItem.CELLJSON);
                          let mainKey = layerItem.ID;
                          if(layerType=="bg"){
                            layerJsonObj.mainKey = mainKey;
                            bgObj = layerJsonObj;
                          }else{
                              let positionObj = layerJsonObj.positionObj;
                              let tempCptChartObj = {
                                    chartId:-1,
                                    thType:layerType,
                                    timeKey:timeKey,
                                    mainKey:layerItem.ID,
                                    addState:'headerAdd',
                                    layerObj:layerItem,
                                    layerData:layerJsonObj,
                                    sortNum:sinSoreNum,
                                };
                                if(!positionObj&&positionObj==""){
                                  positionObj=JSON.parse(`{"cptBorderObj":{"width":280,"height":260,"left":450,"top":160,"rotate":0,"opacity":1,"layerBorderWidth":0,"layerBorderStyle":"solid","layerBorderColor":"rgba(0,0,0,1)"},"type":"${layerType}","cptType":"${layerItem.CELLNAME}"}`)
                                }
                                positionObj.sortNum = sinSoreNum;
                                tempCptKeyList.push({ key: timeKey, id: layerId, title: layerName,layerType:layerType,simpleType:'',sortNum:sinSoreNum});
                                tempCptPropertyList.push(positionObj);
                                tempCptChartIdList.push(tempCptChartObj); 
                          }
                        })
                        if(!bgObj.hasOwnProperty("bgColor")){
                              bgObj = {
                                bgColor: 'rgba(15, 42, 67,1)',
                                bjWidth: 1470,
                                bjHeight: 937,
                                bjImage:'none',
                                bgImageName:"无",
                                bgImageIntegerUrl:"",
                                uploadImage:"",
                                mainKey:-1
                            }
                        }
                        store.dispatch(replaceGlobalBg(bgObj));
                        // let resultObj = _this.sortDefaultData(tempCptKeyList,tempCptPropertyList,tempCptChartIdList);
                        if(tempCptKeyList.length>1){
                          tempCptKeyList = tempCptKeyList.sort(this.compare("sortNum"));
                          tempCptPropertyList = tempCptPropertyList.sort(this.compare("sortNum"));
                          tempCptChartIdList = tempCptChartIdList.sort(this.compare("sortNum"));
                        }
                        _this.setState({
                          globalBg: bgObj,
                          cptIndex: -1,
                          cptType: '',
                          cptKey: '',
                          cptKeyList: tempCptKeyList,
                          cptPropertyList:tempCptPropertyList,
                          nameData:nameDataObj,
                          cptPropertyObj: { 
                              type: 'bg',//具体的类型：    text chart border
                              cptType: ''
                          },
                          cptChartIdList:tempCptChartIdList
                        }, () => {
                          {   
                            showChartsOption(tempCptChartIdList);
                          }
                        });

                      }
                    })
                    .catch(error => console.info(error));
        }).catch(error => console.info(error));
    }

   /**
   * @description: 用来将所有的默认的图层都按照sortNum进行排序
   * @param {type}
   * @return:
   */
    sortDefaultData(cptKeyList,cptPropertyList,cptChartIdList){
      
      if(cptChartIdList&&cptChartIdList.length>0){
       
      }
      var sortObj = cptChartIdList.sort(this.compare("sortNum"));
      return {
        cptKeyList:cptKeyList,
        cptPropertyList:cptPropertyList,
        cptChartIdList:cptChartIdList
      }
    }

    compare(property){
         return function(obj1,obj2){
             var value1 = obj1[property];
             var value2 = obj2[property];
             return value1 - value2;     // 升序
         }
    }



  handleScriptCreate(obj) {
    this.setState({ scriptLoaded: false });
  }

  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad(obj) {
    this.setState({ scriptLoaded: true, scriptStatus: 'yes' });
  }

  /**
   * @description: 添加指定的图层
   * @param {type}
   * @return:
   */
  onClickAdd(layerObj, otherObj) {
    /* test().then(res => {
      console.info(res);
    }).catch(error => {

    }); */
    const id = layerObj.id;
    const type = layerObj.layerType;
    const showTitle = layerObj.text;
    //const t = document.getElementById("chart_type").value;//暂时先从下拉列表获取图表类型，后续在更改
    const key = new Date().getTime().toString();
    const cptkObj = {
      key: key,
      id: id,
      title: showTitle,
      layerType: type,
      simpleType: layerObj.simpleType
    };

    const len = this.state.cptKeyList.length;
    let tempHeightValue = 350;
    if (type == 'text') {
      tempHeightValue = 80;
    }
    const cptpObj = {
      cptBorderObj: {
        width: 350,
        height: tempHeightValue,
        left: 450,
        top: 160,
        opacity: 1,
        rotate:0,
        layerBorderWidth: 0,
        layerBorderStyle: 'solid',
        layerBorderColor: 'rgb(0,0,0,1)'
      },
      type: type,
      cptType: id
    };
    //对当前基本内容的全部替换
    store.dispatch(replaceAllShowLayerFieldVal(cptpObj));
    let chartId = -1;
    chartData.map(item => {
      if (item.id == id) {
        chartId = item.chartId;
      }
    });
    let thType = "0";
    let layerTempObj = {};
    let layerData = {};
    let mainKey = -1;
    let addState = "leftAdd";
    let sortNum = otherObj.sortNum;
    addState = otherObj.state;
    if(otherObj&&otherObj.mainKey){
      mainKey = otherObj.mainKey;
    }
    if(otherObj&&otherObj.state=="leftAdd"){
        thType = otherObj.data.thType;
        layerTempObj = otherObj.data;
        chartId = otherObj.data.id;
    }else if(otherObj&&otherObj.state=="headerAdd"){
        otherObj.showVal = layerTempObj;
        layerData = otherObj.otherJson;
        thType = type;
    }
    let addChartObj = {
        chartId:chartId,
        thType:thType,
        layerObj:layerTempObj,
        mainKey:mainKey,
        addState:addState,
        timeKey:key,
        sortNum:sortNum,
        layerData:layerData,
    };
    this.setState(
      {
        cptIndex: len,
        cptType: id,
        cptKey: key,
        cptKeyList: [...this.state.cptKeyList, cptkObj],
        cptPropertyList: [...this.state.cptPropertyList, cptpObj],
        cptPropertyObj: cptpObj,
        cptChartIdList: [...this.state.cptChartIdList,addChartObj ]
      },
      () => {
        {
          chartOption(this.state.cptType, this.state.cptKey, this, 'noUpdate', otherObj);
        }
      }
    );
  }

  updateChartsStyle(updateState){
    let cptIndex = this.state.cptIndex;
    let chartObj = this.state.cptChartIdList[cptIndex];
    let {addState,thType,layerObj,mainKey} = chartObj;
    let otherObj = {
      state:addState,
      data:layerObj,
      thType:thType,
      mainKey:mainKey   
    }
    chartOption(this.state.cptType, this.state.cptKey, this, updateState, otherObj);
  }


  ondelItemPrev(layerIndex) {
    this.refs.delModal.setDefaultValue(layerIndex);
  }
  editItemPrev(layerIndex){
    let layerObj = this.state.cptChartIdList[layerIndex].layerObj
    let parentDom = window.parent.document;
    let prevDataShow = parentDom.getElementById("dataShow");
    var dataShow = prevDataShow.contentWindow.document;
    // var hiddenDiv = dataShow.getElementsByTagName("div");
    let hiddenDiv = dataShow.getElementsByClassName("oneDiv");
    var tpEditorObj = dataShow.getElementById("tpEditor");
    if(hiddenDiv&&hiddenDiv.length>0){
      for(let i=0;i<hiddenDiv.length;i++){
        hiddenDiv[i].style.opacity = "0";
      }
    }
    layerObj.editState = "editPage";
    // tpEditorObj.style.opacity = "1";
    // tpEditorObj.parentNode.style.opacity = "1";
    // tpEditorObj.previousElementSibling.style.opacity = "1";
    prevDataShow.style.zIndex = 11;
    prevDataShow.contentWindow.topicEditor(layerObj,1)
   /*  let tempChart = this.state.cptChartIdList[layerIndex];
    let tempQueryId = tempChart.chartId;
    let showOption = store.getState().showLayerDatas.cptOptionsList[layerIndex].layerOption;
    this.refs.editModal.setDefaultValue(layerIndex,showOption,tempChart); */
  }

  deleteDataBaseOneLayer(delIndex) {
    let _this = this;
    let cptIndex = delIndex;
    let chartObj = this.state.cptChartIdList[cptIndex];
    let queryId = chartObj.chartId;
    let layerObj = chartObj.layerObj;
    let thType = chartObj.thType;
    let kshPageName = '';
    let nameData = this.state.nameData;
    if(nameData){
          kshPageName = nameData.KSHNAME;
    }else{
          console.info("获取全局的页面名称失败")
    }
    if(thType=="0"||thType=="1"){
        /*let sendStrVal = "";
          if (thType == "0") {//图表
            sendStrVal = JSON.stringify({"delete":[{"id":queryId}]});
          } else if (thType == "1") {
            sendStrVal = JSON.stringify({
              service:mapNames[0],
              name:mapNames[2],
              layername:mapNames[1],
            });
          } */
            let sendStrVal = "{\"delete\":[";
            if (thType == "0") {//图表
              sendStrVal += "{\"id\":" + queryId + "},"
            } else if (thType == "1") {
              let mapNames = layerObj.vVal.split("；");
              sendStrVal += "{\"service\":\"" + mapNames[0] + "\",\"name\":\"" + mapNames[2] + "\",\"layername\":\"" + mapNames[1] + "\"},"
            }
            sendStrVal = sendStrVal.substring(0, sendStrVal.length - 1) + "]}";
          let delObj = {
              str: sendStrVal,
              name: kshPageName
          }
          delOneLayer(delObj).then(result => {
            if(result.flag>0){
              _this.ondelItem(cptIndex);
              Modal.success({
                title: '',
                content: '删除图层成功',
            });
            }else{
              Modal.error({
                title: '',
                content: '删除图层失败',
              });
            }
        }).catch(error => {
          Modal.error({
                title: '',
                content: '删除图层失败,请求接口出错',
            });
            console.info(error);
        })
    }else if(thType=="text"||thType=="border"||thType=="iframe"){
      let mainKey = chartObj.mainKey;
      let delObj = {
        id:mainKey
      }
      delOneOtherLayer(delObj)
      .then(result => {
        if(result.flag==1){
            _this.ondelItem(cptIndex);
            Modal.success({
              title: '',
              content: '删除图层成功',
          });
        }else{
          Modal.error({
            title: '',
            content: '删除图层失败',
          });
        }
      })
      .catch(error => console.log(error))
    }
  }
  /**
   * @description: 删除指定的图层
   * @param {number} layerIndex 当前图层对应的index值
   * @return:
   */
  ondelItem(layerIndex) {
    let cptkList = this.state.cptKeyList;
    let cptChartIdList = this.state.cptChartIdList;
    let cptpList = this.state.cptPropertyList;
    let arr = window.arr ? window.arr : [];
    let mapObjArr = window.mapObjArr ? window.mapObjArr : [];
    cptkList.splice(layerIndex, 1);
    cptpList.splice(layerIndex, 1);
    cptChartIdList.splice(layerIndex, 1);
    if (arr.length > 0) {
      arr.splice(layerIndex, 1);
      mapObjArr.splice(layerIndex, 1);
      window.arr = arr;
      window.mapObjArr = mapObjArr;
    }
    const cptpObj = cptpList[0]
      ? cptpList[0]
      : {
          cptBorderObj: {
            //边框属性
            width: 350,
            height: 260,
            left: 450,
            top: 160,
            rotate:0,
            opacity: this.state.cptPropertyObj.cptBorderObj.opacity,
            layerBorderWidth: 0,
            layerBorderStyle: 'solid',
            layerBorderColor: 'rgb(0,0,0,1)'
          },
          type: 'bg',
          cptType: 'bg'
        };
    let tempIndex = -1;
    if (cptpList.length > 0) {
      tempIndex = 0;
    }
    //对当前基本内容的全部替换
    store.dispatch(replaceAllShowLayerFieldVal(cptpObj));
    //将option在store的集合里面删掉
    store.dispatch(delCptOptionsList(layerIndex));
    this.refs.rightConfig.switchTabs('1');
    this.setState(
      {
        cptIndex: tempIndex,
        cptKey: '',
        cptType: cptpObj.cptType ? cptpObj.cptType : '',
        cptKeyList: cptkList,
        cptPropertyList: cptpList,
        cptPropertyObj: cptpObj,
        cptChartIdList: cptChartIdList
      },
      () => {
        //{chartOption(this.state.cptType, this.state.cptKey,this,"noUpdate")}
      }
    );
  }

 
    /**
   * @description: 在编辑数据之前获取编辑所需的对象,然后进行执行调用编辑接口的方法
   * @param {number} layerIndex 当前图层对应的index值
   * @param {Object} tempOptionObj 用来编辑成功进行更新的optionos和queryId对象
   * @return:
   */
  editItemDataBaseOneLayerPrev(layerIndex,tempOptionObj){
    let chartObj = this.state.cptChartIdList[layerIndex];   
    let editJson = this.refs.editModal.getEditJson(chartObj,tempOptionObj);
    this.editItemDataBaseOneLayer(layerIndex,editJson,tempOptionObj);
  }
  /**
   * @description: 编辑指定的图层
   * @param {number} layerIndex 当前图层对应的index值
   * @param {Object} editData 用来进行编辑的json字符串
   * @param {Object} tempOptionObj 用来编辑成功进行更新的optionos和queryId对象
   * @return:
   */
  editItemDataBaseOneLayer(layerIndex,editData,tempOptionObj){
    let _this = this;
    let thType = "0";
    let leftChartObj = this.state.cptChartIdList[layerIndex];
    let timeKey = leftChartObj.timeKey;
    let chartId = leftChartObj.chartId;
    if(leftChartObj){
      thType = leftChartObj.thType;
    }
    let editObj = {
      thType : thType,
      data : editData
    }
    editKSHChartData(editObj)
    .then(result => {
      if (result== "编辑成功!") {
       console.info("编辑图层成功");
       
      }else{
        console.info("编辑图层失败");
      }
      }).catch(error => {
        console.info("编辑图层失败");
    })
  }

  /**
   * @description: 将存放在集合里面的数据进行更新
   * @param {type}
   * @return:
   */
  updateLayerPosition(layerIndex, type, fieldArr) {
    let tempCptObj = this.state.cptPropertyList[layerIndex];
    if (type == 'multi') {
      fieldArr.forEach(item => {
        tempCptObj.cptBorderObj[item.fieldEname] = item.fieldValue;
      });
    }
    this.state.cptPropertyList[layerIndex] = tempCptObj;
    this.setState({
      cptPropertyList: this.state.cptPropertyList //所有组件属性集合
    });
  }

  handleResizeMove = e => {
    var index = parseInt(e.target.parentNode.parentNode.getAttribute('index'));
    // index = this.state.cptIndex;
    const width = e.rect.width;
    const height = e.rect.height;
    // const left = e.x0;
    // const top = e.y0;
    // console.log(e);
    var prevObjStyle = e.target.parentNode.style;
    const left = parseInt(prevObjStyle.left);
    const top = parseInt(prevObjStyle.top);
    const layerBorderWidth = parseInt(prevObjStyle.borderWidth);
    const layerBorderStyle = prevObjStyle.borderStyle;
    const layerBorderColor = prevObjStyle.borderColor;
    const opacity = this.state.cptPropertyObj.cptBorderObj.opacity;
    let cptpList = this.state.cptPropertyList;
    const t = cptpList[index].cptType ? cptpList[index].cptType : 'bg';
    const type = cptpList[index].type ? cptpList[index].type : 'bg';
    let cptpObj = {
      cptBorderObj: {
        width,
        height,
        left,
        top,
        opacity,
        rotate:0,
        layerBorderWidth,
        layerBorderStyle,
        layerBorderColor
      },
      type: type,
      cptType: t
    };
    cptpList[index] = cptpObj;
    //对当前基本内容的全部替换
    store.dispatch(replaceAllShowLayerFieldVal(cptpObj));
    this.setState(
      {
        cptIndex: index,
        cptPropertyList: cptpList,
        cptPropertyObj: cptpObj
      },
      () => {
        {
          this.updateChartsStyle("noUpdate")
        }
      }
    );
  };

  /**
   * @description:  用面板修改图表的值
   * @param {Object} updateFieldObj 保存要修改的面板的index,属性英文名和值 和对应的类型
   * @return:
   */
  changeProperties(updateFieldObj) {
    let _this = this;
    const tabsKey = updateFieldObj.tabsKey;
    var cptIndex = updateFieldObj.thisIndex;
    const fieldValue = updateFieldObj.fieldValue;
    const fieldEname = updateFieldObj.fieldEname;
    const layerType = updateFieldObj.layerType;
    let cptpList = this.state.cptPropertyList;
    let cptChartIdList = this.state.cptChartIdList;
    let cptOptionObj = store.getState().showLayerDatas.cptOptionsList[cptIndex];
    if (tabsKey == 2) {
      if (layerType == 'chart') {
        if (fieldEname == 'chartDataFile') {
          /*  let tempFieldArray = fieldValue.split("\n");
                        tempFieldArray.map((tempItem,tempIndex) => {
                            tempFieldArray[tempIndex] = JSON.parse(tempItem);
                        }) */
          cptOptionObj.layerOption[0].myMapTable.result = fieldValue;
        }
        this.updateChartsStyle("update")
      }
    } else if (tabsKey == 1) {
      if (
        fieldEname == 'width' ||
        fieldEname == 'height' ||
        fieldEname == 'left' ||
        fieldEname == 'top' ||
        fieldEname == 'opacity' ||
        fieldEname == 'rotate' ||
        fieldEname == 'layerBorderWidth' ||
        fieldEname == 'layerBorderStyle' ||
        fieldEname == 'layerBorderColor'
      ) {
        //更新strore里卖弄的数据
        store.dispatch(updateShowLayerFieldVal(updateFieldObj));
        var cptpObj = this.state.cptPropertyList[cptIndex];
        if (cptIndex != -1) {
          // if(layerType=="chart"){
          cptpObj.cptBorderObj[fieldEname] = fieldValue;
          // }
          cptpList[cptIndex] = cptpObj;
        } else {
          cptpObj = store.getState().showLayerDatas.showDatas;
        }
        this.setState(
          {
            cptIndex: cptIndex,
            cptPropertyList: cptpList,
            cptPropertyObj: cptpObj
          },
          () => {
            // console.log(`这个组合:${this.state}`);
            {
              this.updateChartsStyle("noUpdate")
              this.editDataBaseLayerPositionPrevs();
            }
          }
        );
      } else {
        if (
          layerType == 'text' ||
          layerType == 'border' ||
          layerType == 'iframe' ||
          layerType == 'chart'
        ) {
          var mapObjArr = window.mapObjArr ? window.mapObjArr : [];
          let tempLayerId = mapObjArr[cptIndex].layerId;
          let tempObj = document.getElementById(tempLayerId);
          if (layerType == 'text') {
            tempObj = tempObj.getElementsByClassName('textLayer')[0];
            if (fieldEname == 'textCenter') {
              tempObj.innerText = fieldValue;
            } else if (fieldEname == 'fontSize') {
              tempObj.style.fontSize = fieldValue + 'px';
            } else if (fieldEname == 'fontColor') {
              tempObj.style.color = fieldValue;
            } else if (fieldEname == 'fontFamily') {
              tempObj.style.fontFamily = fieldValue;
            } else if (fieldEname == 'fontWeight') {
              tempObj.style.fontWeight = fieldValue;
            } else if (fieldEname == 'writingMode') {
              tempObj.style.writingMode = fieldValue;
            } else if (fieldEname == 'textAlign') {
              tempObj.parentNode.style.textAlign = fieldValue;
            } else if (fieldEname == 'hyperlinkCenter') {
              tempObj.href = fieldValue;
            } else if (fieldEname == 'isNewWindow') {
              let tempTargetVal = '_self';
              if (fieldValue) {
                tempTargetVal = '_blank';
              }
              tempObj.target = tempTargetVal;
            }
          } else if (layerType == 'border') {
            tempObj = tempObj.parentNode;
            if (fieldEname == 'borderWidth') {
              tempObj.style.borderWidth = fieldValue + 'px';
            }else  if (fieldEname == 'borderBg') {
              tempObj.style.borderImage =`url(${require(`../img/${fieldValue}`)}) 30`;
            }
          } else if (layerType == 'iframe') {
            if (fieldEname == 'iframeUrl') {
              tempObj.getElementsByClassName('iframeObj')[0].src = fieldValue;
            }
          } else if (layerType == 'chart') {
            tempObj = tempObj.parentNode;
            if (fieldEname == 'optionName') {
              cptOptionObj.layerOption[0].mapInfor.result[0].NAME = fieldValue;
            } else if (fieldEname == 'legendName') {
              let tempLegendName = cptOptionObj.layerOption[0].myLegend.result[0].fieldName;
              cptOptionObj.layerOption[0].myLegend.result[0].fieldName = fieldValue;
              cptOptionObj.layerOption[0].myLegend.result[0].name = fieldValue;
              let resultTable = cptOptionObj.layerOption[0].myMapTable.result;
              let keyMap = {
                [tempLegendName]: fieldValue
              };
              for (var i = 0; i < resultTable.length; i++) {
                var obj = resultTable[i];
                for (var key in obj) {
                  var newKey = keyMap[key];
                  if (newKey) {
                    obj[newKey] = obj[key];
                    delete obj[key];
                  }
                }
              }
              cptOptionObj.layerOption[0].myMapTable.result = resultTable;
            } else if (fieldEname == 'legendColor') {
              cptOptionObj.layerOption[0].myLegend.result[0].color = fieldValue;
            }
          }
          let tempOptionObj = {
            cptIndex:cptIndex,
            layerOption:cptOptionObj.layerOption
          }
          store.dispatch(editCptOptionsList(tempOptionObj));
          if (layerType == 'chart') {            
            _this.updateChartsStyle("update");
            _this.debounce(this.editChartPrev,2000,cptIndex,tempOptionObj)
          } else {
            cptOptionObj.layerOption[fieldEname] = fieldValue;
            _this.debounce(_this.editOtherLayerPrev,2000,cptOptionObj,cptChartIdList)
          }
        }
      }
    } else if (tabsKey == 0) {
        store.dispatch(updateShowLayerFieldVal(updateFieldObj));
        let bgObj = store.getState().showLayerDatas.bgFieldObj;
        _this.setState(
          {
            globalBg: bgObj
          },
          () => {
            this.debouncePrevNotArgs(this.editBgConfig);
          }
        );
    }
  }
   

  debounce(fn, delay) {
    // 维护一个 timer
    let timer = null;
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  }
  debouncePrevNotArgs(fn){
    this.debounce(fn, 2000);
  }


  /**
   * @description:  用来进行多次快速进行移动的时候请求频繁调用设置的防抖机制
   * @param {type} 
   * @return: 
   */
  editDataBaseLayerPositionPrevs(){
    this.debouncePrevNotArgs(this.editDataBaseLayerPosition, 2000);
  }
  editDataBaseLayerPosition(){
        let thType = "0";
        let mainKey = -1;
        let state = this.state;
        let leftChartObj = state.cptChartIdList[state.cptIndex];
        if(leftChartObj){
          thType = leftChartObj.thType;
          mainKey = leftChartObj.mainKey;
        }
        let showDatas = store.getState().showLayerDatas.showDatas;
        if(thType=="0"||thType=="1"){
          let editObj = {
            "id" : mainKey,
            "positionData" : JSON.stringify(showDatas)
          }
          editKSHChartPosition(editObj)
          .then(result => {
            if (result.flag == "1") {
              console.info("编辑定位succeed");
            }else{
              console.info("编辑定位error");
            }
          }).catch(error =>  console.info("编辑定位error"));
        }else{
          if(thType=="text"||thType=="border"||thType=="iframe"){
            let layerData = leftChartObj.layerData;
            layerData.positionObj = showDatas;
            let editObj = {
              id: mainKey,
              tabid: 0,
              json: JSON.stringify(layerData)
            }
            editOneOtherLayer(editObj)
            .then(result => {
              if (result.n == 1) {
                console.info("编辑定位succeed");
              }else{
                console.info("编辑定位error");
              }
            }).catch(error =>  console.info("编辑定位error"));
          }
        }
  }
    /**
   * @description:  修改背景颜色的配置
   * @param {type} 
   * @return: 
   */
  editBgConfig(){
    let bgObj = store.getState().showLayerDatas.bgFieldObj;
    let editObj = {
      id: bgObj.mainKey,
      tabid: 0,
      json: JSON.stringify(bgObj)
    }
    editOneOtherLayer(editObj)
    .then(result => {
      if (result.n == "1") {
        console.info("编辑背景succeed");
      }else{
        console.info("编辑背景error");
      }
    }).catch(error =>  console.info("编辑背景error"));
  }
  editOtherLayerPrev(fn,args,cptOptionObj,cptChartIdList){
    this.editOtherLayer(cptOptionObj,cptChartIdList);
  }
   /**
   * @description:  修改其他图层的基本配置
   * @param {type} 
   * @return: 
   */
  editOtherLayer(cptOptionObj,cptChartIdList){
    let layerOption = cptOptionObj.layerOption;
    layerOption.positionObj = store.getState().showLayerDatas.showDatas;
    let chartObj = cptChartIdList[this.state.cptIndex];
    let mainKey = chartObj.mainKey;
    let editObj = {
      id: mainKey,
      tabid: 0,
      json: JSON.stringify(layerOption)
    }
    editOneOtherLayer(editObj)
    .then(result => {
      if(result.n==1)
         console.info("编辑其他图层success")
    }).catch(error =>  console.info("编辑其他图层error"));
  }
  editChartPrev(fn,args,layerIndex,tempOptionObj){
      this.editItemDataBaseOneLayerPrev(layerIndex,tempOptionObj);
  }
    /**
    * @description: 点击当前图层的时候将当前图层选中,并将右侧配置项的内容进行同步   -- 暂时不使用
    * @param {type}
    * @return:
    */
    handleDown = e => {
        var index = parseInt(e.currentTarget.parentNode.parentNode.getAttribute('index'));
        // index = this.state.cptIndex;
        const id = e.currentTarget.firstElementChild.getAttribute('id');
        let cptkList = this.state.cptKeyList;
        let cptpList = this.state.cptPropertyList;
        const cptkObj = cptkList[index];
        const cptpObj = cptpList[index];
        const t = cptpObj.cptType ? cptpObj.cptType : 'bg';
        //更新strore里卖弄的数据
        store.dispatch(replaceAllShowLayerFieldVal(cptpObj));
        this.setState({
          cptIndex: index,
          cptKey: id,
          cptType: t,
          cptKeyList: cptkList, //组件集合
          cptPropertyList: cptpList, //所有组件属性集合
          cptPropertyObj: cptpObj
        });
    };
    /**
     * @description:  用来进行不同的图层之间索引的切换,更新当前点击的索引
     * @param {Integer} layerIndex 当前点击的图层的索引
     * @param {Strign} timeId 当前点击的图层的d
     * @return:
     */
    singleSwitchLayer(event, layerIndex) {
      if(layerIndex==-1){
        this.setState({ 
          cptIndex: layerIndex,
        }, () => {
          {
          }
        });
      }else{
        let cptPropertyObj = this.state.cptPropertyList[layerIndex];
        event.stopPropagation();
        store.dispatch(replaceAllShowLayerFieldVal(this.state.cptPropertyList[layerIndex]));
        this.setState({ 
            cptIndex: layerIndex,
            cptPropertyObj:cptPropertyObj
        }, () => {
          {
          }
        });
      }
      
    }

   /**
    * @description: 用来切换两个图层之间的先后顺序
    * @param {type}
    * @return:
    */
    selectSingleLayer(event,layerIndex,updateIndex){
      event.stopPropagation();
      let updateState = -1;
      let chartLists = this.state.cptChartIdList;
      let thisLayer = chartLists[layerIndex];
      let updateLayer = chartLists[updateIndex];
      let thisAddState = thisLayer.addState;
      let updateAddState = updateLayer.addState;
      if(thisAddState=="leftAdd"&&updateAddState=="leftAdd"){
        updateState = 1;
      }else if(thisAddState=="headerAdd"&&updateAddState=="headerAdd"){
        updateState = 2;
      }else if(thisAddState=="leftAdd"&&updateAddState=="headerAdd"){
        updateState = 3;
      }else if(thisAddState=="headerAdd"&&updateAddState=="leftAdd"){
        updateState = 4;
      }
      let updateSortNumObj = {
        thisMainKey : thisLayer.mainKey,
        thisSortNum : thisLayer.sortNum,
        updateMainKey : updateLayer.mainKey,
        updateSortNum : updateLayer.sortNum,
        updateState:updateState,
      }
      editLayerSortNum(updateSortNumObj)
      .then( result => {
        this.mainSwitchLayer(layerIndex,updateIndex);
      })
      .catch(error => console.log(error));
    }

    mainSwitchLayer(layerIndex,updateIndex){
      let arr = window.arr ? window.arr : [];
      let mapObjArr = window.mapObjArr ? window.mapObjArr : [];
      if (arr.length > 0) {
        window.arr =  this.replaceData(arr,layerIndex,updateIndex);
        window.mapObjArr =  this.replaceData(mapObjArr,layerIndex,updateIndex);
      }

      let cptOptionsList = store.getState().showLayerDatas.cptOptionsList;
      let tempOptionLists = [].concat(
        JSON.parse(JSON.stringify(cptOptionsList))
      );
      let layOption = tempOptionLists[layerIndex];
      let updOption = tempOptionLists[updateIndex];
      
      store.dispatch(editCptOptionsList({
        cptIndex:layerIndex,
        layerOption:updOption.layerOption
      }));
      store.dispatch(editCptOptionsList({
        cptIndex:updateIndex,
        layerOption:layOption.layerOption
      }))
      let state = this.state;
      let cptPropertyList = state.cptPropertyList;
      let cptIndex = state.cptIndex;
      let cptType = state.cptType;
      let cptKey = state.cptKey;
      let cptKeyList = state.cptKeyList;
      let cptChartIdList = state.cptChartIdList;
      let cptPropertyObj = state.cptPropertyObj;
      let thisChartObj = cptChartIdList[layerIndex];
      cptIndex = updateIndex;
      cptType = thisChartObj.chartId;
      cptKey = thisChartObj.timeKey;
      cptPropertyObj = cptPropertyList[layerIndex];
      cptKeyList = this.replaceData(cptKeyList,layerIndex,updateIndex);
      cptPropertyList = this.replaceData(cptPropertyList,layerIndex,updateIndex);
      cptChartIdList = this.replaceData(cptChartIdList,layerIndex,updateIndex);
      this.setState({
        cptIndex: updateIndex,
        cptKey: cptKey,
        cptType:cptType,
        cptKeyList: cptKeyList,
        cptPropertyList: cptPropertyList,
        cptChartIdList: cptChartIdList,
        cptPropertyObj: cptPropertyObj,
      },() => {
      })
    }

    replaceData(dataArrays,layerIndex,updateIndex){
      let layCptData = dataArrays[layerIndex];
      let updCptData = dataArrays[updateIndex];
      dataArrays[updateIndex] = layCptData;
      dataArrays[layerIndex] = updCptData;
      return dataArrays;
    }


 
  /**
   * @description: 用来保存当前编辑页面的所有图表的数据
   * @param {type}
   * @return:
   */
  async saveLayoutData() {
 
  }

  savePagePrev(){
    let preState = this.state;
    let nameData = preState.nameData;
    let sidVal = `${nameData.USERNAME}_${nameData.ID}_${preState.kshId}`;
    this.refs.shareModel.setDefaultValue(`http://localhost:8080/share/build/index.html?sid=${sidVal}`);
  }

  saveShowPageData() {
    let preState = this.state;
    let nameData = preState.nameData;
    let sidVal = `${nameData.USERNAME}_${nameData.ID}_${preState.kshId}`;
    window.open(`http://localhost:8080/share/build/index.html?sid=${sidVal}`, '_blank');
  }

  render() {

    return (
      <Fragment>
        <Header
          ref='Header'
          saveLayoutData={this.saveLayoutData.bind(this)}
          onClickAdd={this.onClickAdd.bind(this)}
          savePagePrev={this.savePagePrev.bind(this)}
          nameData={this.state.nameData}
          comLength={this.state.cptKeyList.length}
          cptChartIdList={this.state.cptChartIdList}
        />
        <div className='custom-content'>
           <LeftComponentList 
          ref="leftComponentList"
          nameData={this.state.nameData}
          ComponentList={this.state.cptKeyList}
          cptChartIdList={this.state.cptChartIdList}
          comLength={this.state.cptKeyList.length}
          cptIndex={this.state.cptIndex}
          onClickAdd={this.onClickAdd.bind(this)}
          singleSwitchLayer={this.singleSwitchLayer.bind(this)}
          selectSingleLayer={this.selectSingleLayer.bind(this)}/>
          <div className='custom-content-p'>
            <div
              className={'custom-content-canvs '+this.state.globalBg.bgImageName}
              style={{
                height: this.state.globalBg.bjHeight,
                width: this.state.globalBg.bjWidth,
                backgroundColor: this.state.globalBg.bgColor,
                backgroundSize: '100% 100%'
              }}
              onClick={event => {
                this.singleSwitchLayer(event, -1);
              }}>
              <DeleteItemModal
                ref="delModal"
                delItem={this.deleteDataBaseOneLayer.bind(this)}
              />
              <EditItemModal
                ref="editModal"
                ChartDatas={this.state.cptChartIdList}
                editItem={this.editItemDataBaseOneLayer.bind(this)}
              />
              <ShareItemModal
              ref="shareModel"
              saveShowPageData={this.saveShowPageData.bind(this)}
              />
              {this.state.cptKeyList.map((item, i) => {
                return (
                  <div
                    index={i}
                    key={item.key}
                    onClick={event => {
                      this.singleSwitchLayer(event, i);
                    }}>
                    <Content
                      id={item.key}
                      cptIndex={this.state.cptIndex}
                      delIndex={i}
                      obj={this.state.cptPropertyList[i]}
                      keyData={item}
                      chartData={this.state.cptChartIdList[i]}
                      handleResizeMove={this.handleResizeMove}
                      handleDown={this.handleDown.bind(this)}
                      del={this.ondelItemPrev.bind(this, i)}
                      editItem={this.editItemPrev.bind(this,i)}
                      updateLayerPosition={this.updateLayerPosition.bind(this)}
                      editDataSource={this.editDataBaseLayerPositionPrevs.bind(this)}></Content>
                  </div>
                );
              })}
            </div>
          </div>
            <Config
              ref='rightConfig'
              changeProperties={this.changeProperties.bind(this)}
              cptPropertyObj={this.state.cptPropertyObj}
              cptIndex={this.state.cptIndex}
              cptChartData={this.state.cptChartIdList[this.state.cptIndex]}
              cptLayerAttr={this.state.cptKeyList[this.state.cptIndex]}
            />
            {/* <PageSetting
              ref='rightConfig'
              changeProperties={this.changeProperties.bind(this)}
              cptPropertyObj={this.state.cptPropertyObj}
              cptIndex={this.state.cptIndex}
              cptLayerAttr={this.state.cptKeyList[this.state.cptIndex]}></PageSetting> */}
        </div>
      </Fragment>
    );
  }
}

export default Layout;
