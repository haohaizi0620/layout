import './Layout.css';
import React, { Component, Fragment } from 'react';
import Header from './Header';
import Content from './Content';
import ComponentList from './ComponentList';
import { test } from '../api/api';
import LeftComponentList from './leftComponents/LeftComponentList';
import Config from './Config';
// import LoadChart from "./LoadChart";
import store from '../redux/store';
import { chartOption } from '../utils/chart';

import { Link } from 'react-router-dom';
import { notification, Modal, Button } from 'antd';
import { selectGetOneMainLayer, addMainLayer, selectPostOneMainLayer } from '../api/apiAxios';
// import {selectGetOneMainLayer,addMainLayer,selectPostOneMainLayer} from '../api/api';
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
const chartData = require('../datasource/chartDatas.json');

class Layout extends Component {
  constructor(props) {
    super(props);
    console.log(window);
    this.state = {
      cptIndex: -1,
      cptType: '',
      cptKey: '',
      cptKeyList: [], //组件集合
      cptPropertyList: [], //所有组件定位集合
      cptChartIdList: [],
      cptPropertyObj: store.getState().showLayerDatas.showDatas,
      globalBg: store.getState().showLayerDatas.bgFieldObj,
      deleteAffirmFlag: false,
      delIndex: -1,
      showPageData: {},
      isOpenNewWindowFlag: false,
      leftComponents: []
    };
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
    test().then(res => {
      console.info(res);
    });
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
    this.setState(
      {
        cptIndex: len,
        cptType: id,
        cptKey: key,
        cptKeyList: [...this.state.cptKeyList, cptkObj],
        cptPropertyList: [...this.state.cptPropertyList, cptpObj],
        cptPropertyObj: cptpObj,
        cptChartIdList: [...this.state.cptChartIdList, chartId]
      },
      () => {
        {
          chartOption(this.state.cptType, this.state.cptKey, this, 'noUpdate', otherObj);
          this.updateGlobalEditData();
        }
      }
    );
  }

  ondelItemPrev(layerIndex) {
    this.setState({
      deleteAffirmFlag: true,
      delIndex: layerIndex
    });
  }

  deleteAffirmOk = e => {
    this.setState(
      {
        deleteAffirmFlag: false
      },
      () => {
        this.ondelItem(this.state.delIndex);
      }
    );
  };

  deleteAffirmCancel = e => {
    this.setState({
      deleteAffirmFlag: false
    });
  };

  /**
   * @description: 删除指定的图层
   * @param {number} layerIndex 当前图层对应的index值
   * @return:
   */
  ondelItem(layerIndex) {
    let cptkList = this.state.cptKeyList;
    let cptpList = this.state.cptPropertyList;
    let arr = window.arr ? window.arr : [];
    let mapObjArr = window.mapObjArr ? window.mapObjArr : [];
    cptkList.splice(layerIndex, 1);
    cptpList.splice(layerIndex, 1);
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
        cptPropertyObj: cptpObj
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
          chartOption(this.state.cptType, this.state.cptKey, this, 'noUpdate');
        }
      }
    );
  };

  handleResizeEnd = e => {
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
    //更新strore里卖弄的数据
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
          chartOption(this.state.cptType, this.state.cptKey, this, 'noUpdate');
        }
      }
    );
  };
  /**
   * @description: 点击右侧的组件列表当前页面选择当前点击的图层
   * @param {type}
   * @return:
   */
  selectCliclSingleLayer(layerData, layerIndex) {
    var id = layerData.key;
    var index = layerIndex;
    var prevObjStyle = document.getElementById(id).parentNode.parentNode.style;
    const width = parseInt(prevObjStyle.width);
    const height = parseInt(prevObjStyle.height);
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
        layerBorderWidth,
        layerBorderStyle,
        layerBorderColor
      },
      type: type,
      cptType: t
    };
    cptpList[index] = cptpObj;
    //更新strore里卖弄的数据
    store.dispatch(replaceAllShowLayerFieldVal(cptpObj));
    this.updateGlobalEditData();
    this.setState(
      {
        cptIndex: layerIndex,
        cptPropertyList: cptpList,
        cptPropertyObj: cptpObj
      },
      () => {
        {
          chartOption(this.state.cptType, this.state.cptKey, this, 'noUpdate');
        }
      }
    );
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
        chartOption(this.state.cptType, this.state.cptKey, this, 'update');
      }
    } else if (tabsKey == 1) {
      // var queryId = cptOptionObj.queryId;
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
        }
        if (layerType == 'chart') {
          chartOption(this.state.cptType, this.state.cptKey, this, 'update');
        } else {
          cptOptionObj.layerOption[fieldEname] = fieldValue;
        }
        store.dispatch(editCptOptionsList(cptIndex, cptOptionObj));
      }
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
              chartOption(this.state.cptType, this.state.cptKey, this, 'noUpdate');
            }
          }
        );
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
    selectPostOneMainLayer({ layerId: 1 })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
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
          <LeftComponentList onClickAdd={this.onClickAdd.bind(this)} />
          <div className='custom-content-p'>
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
                      handleResizeEnd={this.handleResizeEnd}
                      handleDown={this.handleDown}
                      updateGlobalEditData={this.updateGlobalEditData.bind(this)}
                      del={this.ondelItemPrev.bind(this, i)}
                      updateLayerPosition={this.updateLayerPosition.bind(this)}></Content>
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
