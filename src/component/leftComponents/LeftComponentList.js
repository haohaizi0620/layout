import React, { Component } from "react";
import { Collapse, Button, message,Tabs, Icon} from "antd";
import ComponentList from "./ComponentList";
import { getAllZTT, getShareById, addOneLayer } from "../../api/api";
import * as html2canvas from "html2canvas";
import "./LeftComponentList.css";
const { Panel } = Collapse;
const { TabPane } = Tabs;
/*
 * 样式面板组件
 */
class LeftComponentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentData: [],
      nameData: [],
      left: 0,
      top: 0,
      ComponentList: [],
      cptIndex: [],
      tabsKey:1,
      tabKeys: [
        {
          serialNumber: '1',
          tabCname: '图表',
          IconEname: 'apple',
          defaultSelect: true
        },
        {
          serialNumber: '2',
          tabCname: '位置',
          IconEname: 'android',
          defaultSelect: false
        }
      ],
    };
  }

  componentWillReceiveProps(newProps) {
    let nameData = newProps.nameData;
    if (nameData) {
      this.setState({
        nameData: nameData,
        ComponentList: newProps.ComponentList,
        cptIndex: newProps.cptIndex
      });
    }
  }

  componentDidMount() {
    this.initLeftDatas();
  }

  moveShowLayer(event, updateState) {
    let ComponentList = this.state.ComponentList;
    let cptIndex = this.state.cptIndex;
    let updateIndex = -1;
    if (ComponentList.length > 0 && cptIndex != -1) {
      if (updateState == 1) {
        if (cptIndex < this.state.ComponentList.length - 1) {
          updateIndex = cptIndex + 1;
        } else {
          console.log("已经到底了");
          return;
        }
      } else if (updateState == -1) {
        if (cptIndex > 0) {
          updateIndex = cptIndex - 1;
        } else {
          console.log("已经到顶了");
          return;
        }
      }
      this.props.selectSingleLayer(event, cptIndex, updateIndex);
    }
  }

  initLeftDatas() {
    /* let tempArr = [
      {
        data:
          '[{"id":3,"parentid":1,"name":"京津冀年卡景点20190","type":"THEMERING_CHART","service":null,"layername":null,"renderer":null,"thType":"0","type2":null,"desp":"","isText":null,"showType":null,"realtimeupdate":null,"serialize":null,"show":null},{"id":2,"parentid":1,"name":"京津冀年卡景点20190","type":"THEMEPIE_CHART","service":null,"layername":null,"renderer":null,"thType":"0","type2":null,"desp":"","isText":null,"showType":null,"realtimeupdate":null,"serialize":null,"show":null}]',
        service: {
          id: 1,
          name: "CCC"
        }
      },
      {
        data:
          '[{"id":4,"parentid":1,"name":"京津冀年卡景点20190","type":"THEMERING_CHART","service":null,"layername":null,"renderer":null,"thType":"0","type2":null,"desp":"","isText":null,"showType":null,"realtimeupdate":null,"serialize":null,"show":null},{"id":2,"parentid":1,"name":"京津冀年卡景点20190","type":"THEMEPIE_CHART","service":null,"layername":null,"renderer":null,"thType":"0","type2":null,"desp":"","isText":null,"showType":null,"realtimeupdate":null,"serialize":null,"show":null}]',
        service: {
          id: 2,
          name: "KSH"
        }
      }
    ];
    let nameData = [
      {
        SHAREDATE: "",
        KSHTYPE: "",
        UPDATEDATE: "2020-02-20 11:41:02",
        KSHDETAIL: "test",
        ID: "bce15ee5747342c398db153c248c08b6",
        USERNAME: "public",
        PASSWORD: "public123",
        KSHNAME: "test",
        THEME: "dark",
        CANCEL: 0
      }
    ];
    tempArr[0].data = JSON.parse(tempArr[0].data);
    tempArr[1].data = JSON.parse(tempArr[1].data);
    this.setState({
      componentData: tempArr,
    }); */
    getAllZTT()
      .then(result => {
        if (result && result.length > 0) {
          for (var i = 0; i < result.length; i++) {
            let tempData = result[i].data;
            result[i].data = JSON.parse(tempData);
          }
        }
        this.setState({
          componentData: result
        });
      })
      .catch(function(e) {
        console.log("fetch fail");
      });
  }

  isAddLayer(thisThType, vVal) {
    let cptChartIdList = this.props.cptChartIdList;
    let isExist = false; //图层是否已存在，默认不存在
    cptChartIdList.map(item => {
      let layerObj = item.layerObj;
      let thType = layerObj.thType;
      if (
        (thisThType == thType && thType == "0" && vVal == layerObj.id) ||
        (thisThType == thType &&
          thType == "1" &&
          vVal ==
            layerObj.service + "；" + layerObj.layername + "；" + layerObj.name)
      ) {
        //图表
        isExist = true;
      }
    });
    return isExist;
  }

  onClickAdd(layerObj) {
    let _this = this;
    let pageLayerObj = this.state.nameData;
    let thType = layerObj.thType;
    let vVal = "-1";
    if (thType == "0") {
      vVal = layerObj.id;
    } else if (thType == "1") {
      vVal =
        layerObj.service + "；" + layerObj.layername + "；" + layerObj.name;
    }
    let isExist = this.isAddLayer(thType, vVal);
    if (isExist) {
      message.info("当前图表已存在");
      return;
    }
    layerObj.vVal = vVal;
    let sortNum = this.props.comLength + 1;
    let addLayerObj = {
      type: thType,
      pid: window.parent.document.getElementById("kshID").value,
      kshname: pageLayerObj.KSHNAME,
      kshid: pageLayerObj.ID,
      v: vVal,
      layerPosition:
        '{"cptBorderObj":{"width":280,"height":260,"left":450,"top":160,"opacity":1,"rotate":0,"layerBorderWidth":0,"layerBorderStyle":"solid","layerBorderColor":"rgba(0,0,0,1)"},"type":"chart","cptType":""}',
      sortNum: sortNum
    };
    addOneLayer(addLayerObj)
      .then(res => {
        _this.props.onClickAdd(
          {
            id: layerObj.type,
            layerType: "chart",
            text: layerObj.name,
            simpleType: ""
          },
          {
            data: layerObj,
            state: "leftAdd",
            mainKey: res.mainKey,
            sortNum: sortNum
          }
        );
      })
      .catch(error => {
        console.info(error);
      });
  }
 /**
   * @description: 基本设置和数据设置之间的切换
   * @param {Integer} key 表示当前是那个设置
   * @return:
   */
  switchTabs(key) {
    this.setState(
      {
        tabsKey: parseInt(key)
      });
  }
  render() {
    let listData = this.state.ComponentList;
    let cptIndex = this.state.cptIndex;
    return (
      <div className="custom-left-list">
        <div className="custom-left-list-tools">
          <span>图层数据</span>
        </div>
        <div className="custom-left-list-p">
            <Tabs defaultActiveKey='1' size='large' onChange={this.switchTabs.bind(this)}>
                  {this.state.tabKeys.map(item => {
                    if (item.serialNumber == 1) {
                      return (
                        <TabPane
                      tab={
                        <span>
                          <Icon type={item.IconEname} />
                          {item.tabCname}
                        </span>
                      }
                      key={item.serialNumber}>
                        <Collapse expandIconPosition="right" bordered={false}>
                              {this.state.componentData.map((bigDataItem, bigIndex) => {
                                return (
                                  <Panel header={bigDataItem.service.name} key={bigIndex}>
                                    {bigDataItem.data.map((item, index) => {
                                      return (
                                        <div class="showLayerName">
                                          <div onClick={this.onClickAdd.bind(this, item)}>
                                            {item.name}
                                          </div>
                                          <div
                                            className="moveLayerName moveLayerNameHide"
                                            style={{ left: this.state.left, top: this.state.top }}
                                          >
                                            {item.name}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </Panel>
                                );
                              })}
                            </Collapse>
                    </TabPane>
                        
                      );
                    } else {
                      return (
                        <TabPane
                          tab={
                            <span>
                              <Icon type={item.IconEname} />
                              {item.tabCname}
                            </span>
                          }
                          key={item.serialNumber}>
                             <div className="">
                              <span>图层（{listData ? listData.length : 0}）个</span>{" "}
                            </div>
                            <div className="move-button">
                              <Button
                                size="small"
                                onClick={event => {
                                  this.moveShowLayer(event, -1);
                                }}
                              >
                                上移
                              </Button>
                              <Button
                                size="small"
                                onClick={event => {
                                  this.moveShowLayer(event, 1);
                                }}
                              >
                                下移
                              </Button>
                            </div>
                            <div className="">
                              {listData
                                ? listData.map((item, layerIndex) => {
                                    return (
                                      <div
                                        key={layerIndex}
                                        style={{
                                          backgroundColor: layerIndex == cptIndex ? "#2483ff" : ""
                                        }}
                                        onClick={event => {
                                          this.props.singleSwitchLayer(event, layerIndex);
                                        }}
                                      >
                                        <div style={{ color: "#bcc9d4" }} name={item.key}>
                                          {item.title}
                                        </div>
                                      </div>
                                    );
                                  })
                                : null}
                            </div>
                          </TabPane>
                      );
                    }
                  })}
                </Tabs>
          
        </div>
        <div className="custom-left-list-p">
         
        </div>
      </div>
    );
  }
}
export default LeftComponentList;
