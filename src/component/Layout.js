import './Layout.css';
import React, { Component, Fragment } from 'react';
import Header from './Header';
import Content from './Content';
import ComponentList from './ComponentList';
import { test, getKSHChart, delOneLayer,editOneLayer,getShareById,editKSHChartPosition} from '../api/api';
import LeftComponentList from './leftComponents/LeftComponentList';
import Config from './Config';
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
  saveShowPageData
} from '../redux/actions/showLayerDatas';
import { Redirect } from 'react-router-dom';

import PageSetting from '../page/PageSetting';

const chartData = require('../datasource/chartDatas.json');

class Layout extends Component {
  constructor(props) {
    super(props);
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
      deleteAffirmFlag: false, //控制是否显示删除提示框
      delIndex: -1, //用来表示当前删除的是哪个id,方便提示框之后处理.
      showPageData: '', //预览页面的路径
      isOpenNewWindowFlag: false,//是否打开预览页面
      nameData:{},//保存当前页面的基本信息
    };
  }
  componentDidMount() {
    this.initLeftDatas2();
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
        var shareid = 1;
        if(window.parent.document.getElementById('shareID')){
        shareid = window.parent.document.getElementById('shareID').value;
        }
        getShareById(shareid).then(result => {
        _this.initLayer(result[0])
        }).catch(error => {
        console.info(error);      
        });
    }
    initLayer(nameDataObj){
        let _this = this;
        let kshId = 1;
        let kshIdObj = window.parent.document.getElementById('kshID');
        kshIdObj?kshId=kshIdObj.value:kshIdObj=1;
        let getKshObj = {
          id: kshId,
          tablename: nameDataObj.KSHNAME
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
                let tempCptChartObj = {
                    chartId:item.id,
                    thType:item.thType,
                    timeKey:timeKey,
                    mainKey:item.mainKey,
                };
                if(tempLayerPosition!=""){
                  tempLayerPosition = JSON.parse(tempLayerPosition)
                }else{
                  tempLayerPosition=JSON.parse('{"cptBorderObj":{"width":280,"height":260,"left":450,"top":160,"opacity":1,"layerBorderWidth":0,"layerBorderStyle":"solid","layerBorderColor":"rgba(0,0,0,1)"},"type":"bg","cptType":""}')
                }
                tempCptKeyList.push({ key: timeKey, id: item.name, title: item.layername,layerType:item.thType,simpleType:''});
                tempCptPropertyList.push(tempLayerPosition);
                tempCptChartIdList.push(tempCptChartObj);   
              })
              _this.setState({
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
          }).catch(error => {
            console.info(error);
          })
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
    let mainKey = -1;
    let addState = "headerAdd";
    if(otherObj&&otherObj.state=="leftAdd"){
        thType = otherObj.thType;
        layerTempObj = otherObj.data;
        mainKey = otherObj.mainKey;
        addState = otherObj.state;
        chartId = otherObj.data.id;
    }
    let addChartObj = {
        chartId:chartId,
        thType:thType,
        layerObj:layerTempObj,
        mainKey:mainKey,
        addState:addState
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
          this.updateGlobalEditData();
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
    this.setState({
      deleteAffirmFlag: true,
      delIndex: layerIndex
    });
  }

  deleteAffirmCancel = e => {
    this.setState({
      deleteAffirmFlag: false
    });
  };

  deleteAffirmOk = e => {
    this.setState(
      {
        deleteAffirmFlag: false
      },
      () => {
        this.deleteDataBaseOneLayer();
      }
    );
  };

  deleteDataBaseOneLayer() {
    let _this = this;
    let cptIndex = this.state.delIndex;
    let chartObj = this.state.cptChartIdList[cptIndex];
    let queryId = chartObj.chartId;
    // let queryId = store.getState().showLayerDatas.cptOptionsList[cptIndex].queryId;
    let kshPageName = '';
    let nameData = this.state.nameData;
    if(nameData){
          kshPageName = nameData.KSHDETAIL;
      }else{
          console.info("获取全局的页面名称失败")
      }
      let delObj = {
          str: JSON.stringify({"delete":[{"id":queryId}]}),
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
    var prevObjStyle = e.target.parentNode.style;
    const left = parseInt(prevObjStyle.left);
    const top = parseInt(prevObjStyle.top);
    const layerBorderWidth = parseInt(prevObjStyle.borderWidth);
    const layerBorderStyle = prevObjStyle.borderStyle;
    const layerBorderColor = prevObjStyle.borderColor;
    // const left = parseInt(e.rect.left);
    // const top = parseInt(e.rect.top);
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
    this.updateGlobalEditData();
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
    const tabsKey = updateFieldObj.tabsKey;
    var cptIndex = updateFieldObj.thisIndex;
    // cptIndex = this.state.cptIndex;
    const fieldValue = updateFieldObj.fieldValue;
    const fieldEname = updateFieldObj.fieldEname;
    const layerType = updateFieldObj.layerType;
    let cptpList = this.state.cptPropertyList;
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
      // var queryId = cptOptionObj.queryId;
      if (
        fieldEname == 'width' ||
        fieldEname == 'height' ||
        fieldEname == 'left' ||
        fieldEname == 'top' ||
        fieldEname == 'opacity' ||
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
              this.editDataBaseLayerPosition(cptIndex);
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
            } else if (fieldEname == 'borderStyle') {
              tempObj.style.borderStyle = fieldValue;
            } else if (fieldEname == 'borderColor') {
              tempObj.style.borderColor = fieldValue;
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

            /* fetch("../../thematic/Edit.do", {
                    method: "POST",
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body:  Qs.stringify({
                        "thType" : cptIds.thType,
                        "data" : json
                    })
                }).then(function(response) {
                    if (data == "编辑成功!") {
                        alert("编辑图表成功");
                    }
                }).catch(error => {
                    console.info(error);
                }); */
          }
          if (layerType == 'chart') {
            this.updateChartsStyle("update");
          } else {
            cptOptionObj.layerOption[fieldEname] = fieldValue;
          }
          store.dispatch(editCptOptionsList(cptIndex, cptOptionObj));
        }
      }
    } else if (tabsKey == 0) {
      //当前为设置背景的属性.
      store.dispatch(updateShowLayerFieldVal(updateFieldObj));
      this.setState(
        {
          globalBg: store.getState().showLayerDatas.bgFieldObj
        },
        () => {
          // console.log(`这个组合:${this.state}`);
          {
            this.updateGlobalEditData();
          }
        }
      );
    }
  }

      editDataBaseLayerPosition(){
        let thType = "0";
        let mainKey = -1;
        let leftChartObj = this.state.cptChartIdList[this.state.cptIndex];
        if(leftChartObj){
          thType = leftChartObj.thType;
          mainKey = leftChartObj.mainKey;
          
        }
        let editObj = {
          "id" : mainKey,
          "positionData" : JSON.stringify(store.getState().showLayerDatas.showDatas)
        }
        editKSHChartPosition(editObj)
        .then(result => {
          if (result.flag == "1") {
          /*  Modal.success({
                title: '',
                content: '编辑图层成功',
            }); */
          }else{
          /*  Modal.error({
              title: '',
              content: '编辑图层失败',
          }); */
          }
        }).catch(error => {
          /* Modal.error({
              title: '',
              content: '编辑图层失败'+error,
          }); */
        })
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
        //切换layerIndex位置
        // cptkList.splice(index, 1);
        // cptpList.splice(index, 1);
        // cptkList.push(cptkObj);
        // cptpList.push(cptpObj);
        //更新strore里卖弄的数据
        store.dispatch(replaceAllShowLayerFieldVal(cptpObj));
        this.updateGlobalEditData();
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
  singleSwitchLayer(event, layerIndex, timeId) {
    event.stopPropagation();
    // store.dispatch(replaceAllShowLayerFieldVal(this.state.cptPropertyList[layerIndex]));
    this.setState({ cptIndex: layerIndex }, () => {
      {
        this.updateGlobalEditData();
      }
    });
  }

  /**
   * @description: 这个方法用于当编辑面板的数据进行改变的时候,将store的改变通知到其他的调用store的地方
   * @param {type}
   * @return:
   */
  updateGlobalEditData() {
    //更新编辑面板里面的数据
    this.refs.rightConfig.refs.editMainCenter.updateStateVal();
  }

  /**
   * @description: 用来保存当前编辑页面的所有图表的数据
   * @param {type}
   * @return:
   */
  async saveLayoutData() {
    let s = 'a';
    /*  fetch('http://127.0.0.1:8888/selectGetOneMainLayer/1', {
            method: "GET",
            mode: "cors",
            headers:{
                        'Accept':'application/json,text/plain,*'
                    }
    
        })
        .then(response => response.text())
        .then(result => {

        }).catch(function (e) {
            console.log("fetch fail");
        }); */
    /* selectPostOneMainLayer({ layerId: 1 })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      }); */
    // const islogin =  selectPostOneMainLayer({layerId:1});
    // let {cptKeyList,cptPropertyList} = this.state;
    // store.dispatch(saveShowPageData({
    //     cptKeyList:cptKeyList,
    //     cptPropertyList:cptPropertyList
    // }));
    // console.log(store.getState().showLayerDatas.bgFieldObj)
    // const islogin = await addMainLayer({
    //     layerid:14,
    //     visualid:1,
    //     layercname:JSON.stringify(this.state.cptKeyList),
    //     layerename:JSON.stringify(store.getState().showLayerDatas.bgFieldObj),//JSON.stringify(this.state.cptChartIdList),
    //     layerdatas:JSON.stringify(this.state.cptPropertyList),//所有组件定位集合
    //     layerbasicset:JSON.stringify(store.getState().showLayerDatas.showPageData.cptOptionsList)
    // })
    // console.log(islogin)
  }

  saveShowPageData() {
    var data = '/test/15';
    this.setState(
      {
        showPageData: data,
        isOpenNewWindowFlag: true
      },
      () => {
        var win = window.open('http://localhost:3000' + data, '_blank');
        win.focus();
        // document.getElementById("shouPageTo").setAttribute("target","_blank");
        // document.getElementById("shouPageTo").click();
      }
    );
  }

  render() {
    return (
      <Fragment>
        <Header
          ref='Header'
          saveLayoutData={this.saveLayoutData.bind(this)}
          onClickAdd={this.onClickAdd.bind(this)}
          saveShowPageData={this.saveShowPageData.bind(this)}
        />
        <div className='custom-content'>
          {/* <ComponentList
                        ComponentList={this.state.cptKeyList}
                        cptIndex={this.state.cptIndex}
                        selectCliclSingleLayer={this.selectCliclSingleLayer.bind(this)}
                    /> */}
           <LeftComponentList 
          ref="leftComponentList"
          onClickAdd={this.onClickAdd.bind(this)}
          nameData={this.state.nameData}/>
          <div className='custom-content-p'>
            <div>
              
            </div>
            <div
              className='custom-content-canvs'
              style={{
                height: this.state.globalBg.bjHeight,
                width: this.state.globalBg.bjWidth,
                backgroundColor: this.state.globalBg.bgColor,
                backgroundImage: `url(${this.state.globalBg.bjImage})`,
                backgroundSize: '100% 100%'
              }}
              onClick={event => {
                this.singleSwitchLayer(event, -1);
              }}>
              <Modal
                title='确认删除组件'
                visible={this.state.deleteAffirmFlag}
                onOk={this.deleteAffirmOk}
                onCancel={this.deleteAffirmCancel}
                footer={[
                  <Button key='back' onClick={this.deleteAffirmCancel}>
                    取消
                  </Button>,
                  <Button key='submit' type='primary' onClick={this.deleteAffirmOk}>
                    确认
                  </Button>
                ]}>
                <div>是否删除选中的一个组件</div>
              </Modal>
              {this.state.cptKeyList.map((item, i) => {
                return (
                  <div
                    index={i}
                    key={item.key}
                    onClick={event => {
                      this.singleSwitchLayer(event, i, item.key);
                    }}>
                    <Content
                      id={item.key}
                      cptIndex={this.state.cptIndex}
                      delIndex={i}
                      obj={this.state.cptPropertyList[i]}
                      handleResizeMove={this.handleResizeMove}
                      handleDown={this.handleDown}
                      updateGlobalEditData={this.updateGlobalEditData.bind(this)}
                      del={this.ondelItemPrev.bind(this, i)}
                      updateLayerPosition={this.updateLayerPosition.bind(this)}
                      editDataSource={this.editDataBaseLayerPosition.bind(this)}></Content>
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
              cptLayerAttr={this.state.cptKeyList[this.state.cptIndex]}
            />
         

         
            {/* <PageSetting
              ref='rightConfig'
              changeProperties={this.changeProperties.bind(this)}
              cptPropertyObj={this.state.cptPropertyObj}
              cptIndex={this.state.cptIndex}
              cptLayerAttr={this.state.cptKeyList[this.state.cptIndex]}></PageSetting> */}
         
        </div>
        {this.state.isOpenNewWindowFlag ? (
          <Link to={this.state.showPageData} id='shouPageTo' />
        ) : (
          true
        )}
      </Fragment>
    );
  }
}

export default Layout;
