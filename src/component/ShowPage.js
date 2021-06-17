/*
 * @Author: your name
 * @Date: 2020-02-19 09:46:16
 * @LastEditTime: 2020-02-24 11:21:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\Test.js
 */
import React, { Component } from "react";
import ShowContent from "./ShowContent";
import store from "../redux/store";
import { replaceGlobalBg } from "../redux/actions/showLayerDatas";
import cptIndexarr2 from "./layout.js";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useParams, useLocation } from "react-router-dom";
import {
  getShareById,
  getKSHChart,
  getOtherLayer,
  getShareObj,
  getShareCells
} from "../api/api";
import { showChartsOption } from "../utils/chart";
import axios from "axios";
import Qs from "qs";
var aaaarr=[];
// import  chartOption from "../utils/chart";
class ShowPage extends Component {
  constructor(props) {
    // console.log(props,store.getState())
    super(props);
    this.state = {
      cptIndex: -1, //当前选中的组件
      cptType: "", //当前组件的类型
      cptKey: "", //当前组件对应的时间戳的值
      cptKeyList: [], //保存每个组件的基本信息,用来显示组件的先后顺序
      cptPropertyList: [], //所有组件基本属性的数组
      cptChartIdList: [], //保存所有前图层对应的接口的id值和cttype
      cptPropertyObj: store.getState().showLayerDatas.showDatas, //当前点击的图层的基本属性
      globalBg: store.getState().showLayerDatas.bgFieldObj, //中间dom的属性
      showPageData: "", //预览页面的路径
      isOpenNewWindowFlag: false, //是否打开预览页面
      nameData: {} //保存当前页面的基本信息
    };
    // console.log(this.state)
  }

  componentDidMount() {
    this.initProxyShare();
  }
  GetUrlParam(paraName) {
    var url = document.location.toString();
    var arrObj = url.split("?");

    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;

      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");

        if (arr != null && arr[0] == paraName) {
          return arr[1];
        }
      }
      return "";
    } else {
      return "";
    }
  }
  formatList(list) {
    var oneList = [];
    var twoList = [];
    for (var i = 0; i < list.length; i++) {
      var l = list[i];
      if (l.serialize) {
        //存在
        oneList.push(l);
      } else {
        //不存在
        twoList.push(l);
      }
    }
    return oneList.concat(twoList); //合并两个数组
  }
  initProxyShare() {
    //'ldjsc_54106330f9e64362932829669338a430_160'
    let sidVal = this.GetUrlParam("sid");
    let _this = this;
    if (sidVal) {
      document.cookie = "userName=" + sidVal.split("_")[0];
    }
    console.log(document.cookie);
    getShareObj({ sid: sidVal })
      .then(result => {
        if (result.count == 1) {
          var tempData = JSON.parse(result.data);
          let tempCptKeyList = [];
          let tempCptPropertyList = [];
          let tempCptChartIdList = [];
          let timeKey = new Date().getTime().toString();
          // console.log(result.issingletable)
          if (result.issingletable == 1) {
            if (tempData && tempData.length > 0) {
              // var newList = _this.formatList(list);
              tempData.map((item, index, layerIndex) => {
                timeKey++;
                let tempLayerPosition = item.layerPosition;
                let sortNumChart = item.sortnum;
                var cptIndexs = this.state.cptIndex;
                let tempCptChartObj = {
                  chartId: item.id,
                  thType: item.thType,
                  timeKey: timeKey,
                  mainKey: item.mainKey,
                  addState: "defaultState",
                  layerObj: item,
                  index: index,
                  layerIndex: layerIndex,
                  layerData: {},
                  sortNum: sortNumChart,
                  cptIndex: cptIndexs,
                };
                tempLayerPosition = JSON.parse(
                  '{"cptBorderObj":{"background":"rgb(147, 147, 147)","width":1920,"height":1080,"top":160,"rotate":0,"opacity":1,"layerBorderWidth":0,"layerBorderStyle":"solid","layerBorderColor":"rgb(147, 147, 147)"},"type":"chart","cptType":""}')
                tempLayerPosition.type = "chart";
                tempCptKeyList.push({
                  key: timeKey,
                  id: item.name,
                  title: item.layername,
                  layerType: item.thType,
                });
                tempCptPropertyList.push(tempLayerPosition);
                tempCptChartIdList.push(tempCptChartObj);
              });

              _this.setState(
                {
                  globalBg: 'bgObj',
                  cptIndex: -1,
                  cptType: "",
                  cptKey: "",
                  cptKeyList: tempCptKeyList,
                  cptPropertyList: tempCptPropertyList,
                  cptPropertyObj: {
                    type: "bg", //具体的类型：    text chart border
                    cptType: ""
                  },
                  cptChartIdList: tempCptChartIdList
                },
                () => {
                  showChartsOption(tempCptChartIdList, tempCptKeyList);
                })
            }
          } else {
            if (tempData && tempData.length > 0) {
              // var newList = _this.formatList(list);
              tempData.map((item, index, layerIndex) => {
                timeKey++;
                let tempLayerPosition = item.layerPosition;
                let sortNumChart = item.sortnum;
                var cptIndexs = this.state.cptIndex;
                let tempCptChartObj = {
                  chartId: item.id,
                  thType: item.thType,
                  timeKey: timeKey,
                  mainKey: item.mainKey,
                  addState: "defaultState",
                  index: index,
                  layerIndexs: layerIndex,
                  layerObj: item,
                  layerData: {},
                  sortNum: sortNumChart,
                  cptIndex: cptIndexs,
                };
                if (tempLayerPosition != "") {
                  tempLayerPosition = JSON.parse(tempLayerPosition);
                } else {
                  tempLayerPosition = JSON.parse(
                    '{"cptBorderObj":{"width":280,"height":260,"left":450,"top":160,"rotate":0,"opacity":1,"layerBorderWidth":0,"layerBorderStyle":"solid","layerBorderColor":"rgba(0,0,0,1)"},"type":"chart","cptType":""}'
                  );
                }
                tempLayerPosition.type = "chart";
                tempCptKeyList.push({
                  key: timeKey,
                  id: item.name,
                  title: item.layername,
                  layerType: item.thType,
                });
                tempCptPropertyList.push(tempLayerPosition);
                tempCptChartIdList.push(tempCptChartObj);
              });
            }
            getShareCells({ shareid: result.id })
              .then(result => {
                let resultData = result.list;
                if (resultData && resultData.length > 0) {
                  let bgObj = {};
                  var i=0;
                  resultData.map((layerItem, layerIndex) => {
                    timeKey++;
                    let layerType = layerItem.celltype;
                    let sinSoreNum = layerItem.sortnum;
                    aaaarr[i]=sinSoreNum;i++;
                    let layerId = layerItem.cellTypeId;
                    let layerName = layerItem.cellname;
                    let layerIndexs = layerIndex;
                    let layerJsonObj = JSON.parse(layerItem.celljson);
                    let mainKey = layerItem.ID;
                    if (layerType == "bg") {
                      //layerJsonObj.mainKey = mainKey;
                      //bgObj = layerJsonObj;
                      bgObj = {
                        bgColor: layerJsonObj.bgColor,
                        bjWidth: layerJsonObj.bjWidth,
                        bjHeight: layerJsonObj.bjHeight,
                        bjImage: "",
                        bgImageName: layerJsonObj.bgImageName,
                        bgImageIntegerUrl: "",
                        uploadImage: "",
                        mainKey: mainKey
                      }
                    } else {
                      let positionObj = layerJsonObj.positionObj;
                      let tempCptChartObj = {
                        chartId: -1,
                        thType: layerType,
                        timeKey: timeKey,
                        mainKey: layerItem.id,
                        addState: "defaultState",
                        layerObj: layerItem,
                        layerData: layerJsonObj,
                        sortNum: sinSoreNum,
                        layerIndexs: layerIndexs
                      };
                      if (!positionObj && positionObj == "") {
                        positionObj = JSON.parse(
                          `{"cptBorderObj":{"width":280,"height":260,"left":450,"top":160,"rotate":0,"opacity":1,"layerBorderWidth":0,"layerBorderStyle":"solid","layerBorderColor":"rgba(0,0,0,1)"},"type":"${layerType}","cptType":"${layerItem.CELLNAME}"}`
                        );
                      }
                      tempCptKeyList.push({
                        key: timeKey,
                        id: layerId,
                        title: layerName,
                        layerType: layerType,
                        layerIndexs: layerIndexs
                      });
                      tempCptPropertyList.push(positionObj);
                      tempCptChartIdList.push(tempCptChartObj);
                    }
                  });
                  store.dispatch(replaceGlobalBg(bgObj));
                  _this.setState(
                    {
                      globalBg: bgObj,
                      cptIndex: -1,
                      cptType: "",
                      cptKey: "",
                      cptKeyList: tempCptKeyList,
                      cptPropertyList: tempCptPropertyList,
                      cptPropertyObj: {
                        type: "bg", //具体的类型：    text chart border
                        cptType: ""
                      },
                      cptChartIdList: tempCptChartIdList
                    },
                    () => {
                      showChartsOption(tempCptChartIdList, tempCptKeyList);
                    }
                  );
                }
              })
              .catch(error => console.log(error));
          }
        }
      })
      .catch(error => console.log(error));
  }
  initLeftData() {
    let _this = this;
    var shareid = 1;
    let shareIdVal = this.GetUrlParam("id");
    if (shareIdVal) {
      shareid = shareIdVal;
    }
    getShareById(shareid)
      .then(result => {
        _this.initLayer(result[0], shareid);
      })
      .catch(error => {
        console.info(error);
      });
  }


  initLayer(nameDataObj, shareid) {
    let _this = this;
    let kshId = this.GetUrlParam("kshId");
    let getKshObj = {
      id: kshId,
      tablename: nameDataObj.KSHNAME
    };
    let OtherLayerObj = {
      shareid: shareid
    };
    let kshLayer = getKSHChart(getKshObj);
    let otherLayer = getOtherLayer(OtherLayerObj);
    Promise.all([kshLayer, otherLayer]).then((results) => {
      let kshData = results[0];
      let otherData = results[1];
      let tempData = JSON.parse(kshData.data);
      let tempCptKeyList = [];
      let tempCptPropertyList = [];
      let tempCptChartIdList = [];
      let timeKey = new Date().getTime().toString();
      tempData.map((item, index) => {
        timeKey++;
        let tempLayerPosition = item.layerPosition;
        let sortNumChart = item.sortnum;
        let thType = item.thType;
        let vVal = "";
        if (thType === "0") {
          vVal = item.id;
        } else if (thType === "1") {
          vVal = item.service + "；" + item.layername + "；" + item.name;
        }
        item.vVal = vVal;
        let tempCptChartObj = {
          chartId: item.id,
          thType: item.thType,
          timeKey: timeKey,
          mainKey: item.mainKey,
          addState: 'leftAdd',
          layerObj: item,
          layerData: {},
          sortNum: sortNumChart,
        };
        if (tempLayerPosition !== "") {
          tempLayerPosition = JSON.parse(tempLayerPosition)
        } else {
          tempLayerPosition = JSON.parse('{"cptBorderObj":{"width":280,"height":260,"left":450,"top":160,"rotate":0,"opacity":1,"layerBorderWidth":0,"layerBorderStyle":"solid","layerBorderColor":"rgba(0,0,0,1)"},"type":"chart","cptType":""}')
        }
        tempLayerPosition.type = "chart";
        tempLayerPosition.sortnum = sortNumChart;
        tempCptKeyList.push({ key: timeKey, id: item.layername, title: item.name, layerType: item.thType, sortNum: sortNumChart });
        tempCptPropertyList.push(tempLayerPosition);
        tempCptChartIdList.push(tempCptChartObj);
      })
      let resultData = otherData.list
      if (resultData && resultData.length > 0) {
        let bgObj = {};
        resultData.map((layerItem, layerIndex) => {
          timeKey++;
          console.log(layerItem, layerIndex)
          let sinSoreNum = layerItem.SORTNUM;
          let layerId = layerItem.CELLTYPEID;
          let layerType = layerItem.CELLTYPE;
          let layerName = layerItem.CELLNAME;
          let layerIndexs = layerIndex;
          let layerJsonObj = JSON.parse(layerItem.CELLJSON);
          let mainKey = layerItem.ID;
          if (layerType === "bg") {
            bgObj = {
              bgColor: layerJsonObj.bgColor,
              bjWidth: layerJsonObj.bjWidth,
              bjHeight: layerJsonObj.bjHeight,
              bjImage: "",
              bgImageName: layerJsonObj.bgImageName,
              bgImageIntegerUrl: "",
              uploadImage: "",
              mainKey: mainKey,
              layerIndexs: layerIndexs
            }
            //layerJsonObj.mainKey = mainKey;
            //bgObj.bgColor = layerJsonObj.backgroundcolor;
            //bgObj.bgImage = layerJsonObj.backgroundimage;
            //bgObj = layerJsonObj;
          } else {
            let positionObj = layerJsonObj.positionObj;
            let tempCptChartObj = {
              chartId: -1,
              thType: layerType,
              timeKey: timeKey,
              mainKey: layerItem.ID,
              addState: 'headerAdd',
              layerObj: layerItem,
              layerData: layerJsonObj,
              sortNum: sinSoreNum,
              layerIndexs: layerIndexs
            };
            if (!positionObj && positionObj === "") {
              positionObj = JSON.parse(`{"cptBorderObj":{"width":280,"height":260,"left":450,"top":160,"rotate":0,"opacity":1,"sortNum":0",layerBorderWidth":0,"layerBorderStyle":"solid","layerBorderColor":"rgba(0,0,0,1)"},"type":"${layerType}","cptType":"${layerItem.CELLNAME}"}`)
            }
            positionObj.sortnum = sinSoreNum;
            tempCptKeyList.push({ key: timeKey, id: layerId, title: layerName, layerType: layerType, sortNum: sinSoreNum });
            tempCptPropertyList.push(positionObj);
            tempCptChartIdList.push(tempCptChartObj);
          }
        })
        /*if(!bgObj.hasOwnProperty("bgColor")){
              bgObj = {
                bgColor: 'rgba(15, 42, 67,1)',
                bjWidth: 1920,
                bjHeight: 1080,
                bjImage:'none',
                bgImageName:"无",
                bgImageIntegerUrl:"",
                uploadImage:"",
                mainKey:-1
            }
        }*/
        store.dispatch(replaceGlobalBg(bgObj));
        if (tempCptKeyList.length > 1) {
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
          cptPropertyList: tempCptPropertyList,
          nameData: nameDataObj,
          cptPropertyObj: {
            type: 'bg',//具体的类型：    text chart border
            cptType: ''
          },
          cptChartIdList: tempCptChartIdList
        }, () => {
          showChartsOption(tempCptChartIdList, tempCptKeyList);
        });
      }
    });
  }
  render() {
    let cptChartIdList = this.state.cptChartIdList;
    console.log(cptIndexarr2)
    return (
      <div
        className={"custom-content-canvs " + this.state.globalBg.bgImageName}
        style={{
          height: this.state.globalBg.bjHeight,
          width: this.state.globalBg.bjWidth,
          backgroundColor: this.state.globalBg.bgColor,
          backgroundSize: "100% 100%"
        }}
        ref="showDiv"
      >
        {cptChartIdList
          ? cptChartIdList.map((item, layerIndexs) => {
            // console.log(item,layerIndexs)
            // var layernum=JSON.parse(item.layerObj.layerPosition).sortnum
            return (
              <div index={aaaarr[layerIndexs]} key={item.key}>
                <ShowContent
                  id={item.timeKey}
                  chartData={item}
                  cptObj={this.state.cptPropertyList[layerIndexs]}
                  delIndex={layerIndexs}
                  keyData={this.state.cptKeyList[layerIndexs]}
                ></ShowContent>
              </div>
            );
          })
          : null}
      </div>
    );
  }
}

export default ShowPage;
