import React, { Component } from "react";
import { Collapse, Button } from "antd";
import { getAllZTT, getShareById, addOneLayer } from "../../api/api";
import * as html2canvas from "html2canvas";
import "./LeftComponentList.css";
const { Panel } = Collapse;

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
      top: 0
    };
  }

  componentWillReceiveProps(newProps){
    let nameData = newProps.nameData;
    if(nameData){
      this.setState(nameData);
    }
  }


  componentDidMount() {
    this.initLeftDatas();
  }

  initLeftDatas() {
 /*    let tempArr = [
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

  onClickAdd(layerObj) {
    let _this = this;
    let pageLayerObj = this.state.nameData;
    let thType = layerObj.thType;
    let addLayerObj = {
      type: thType,
      pid: window.parent.document.getElementById("kshID").value,
      kshname: pageLayerObj.KSHDETAIL,
      kshid: pageLayerObj.ID,
      v: layerObj.id
    };
    addOneLayer(addLayerObj)
      .then(res => {
        _this.props.onClickAdd(
          {
            id: layerObj.THEMERING_CHART,
            layerType: "chart",
            text: layerObj.name,
            simpleType: "all"
          },
          {
            data: layerObj,
            state: "leftAdd",
            mainKey:res.mainKey,
          }
        );
        console.info(res);
      })
      .catch(error => {
        console.info(error);
      });
  }

  render() {
    return (
      <div className="custom-left-list">
        <div className="custom-left-list-tools">
          <span>图层数据</span>
        </div>
        <div className="custom-left-list-p">
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
        </div>
      </div>
    );
  }
}
export default LeftComponentList;
