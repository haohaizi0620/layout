import React from 'react'
import ReactDOM from 'react-dom';
import './css/EditItemModal.css';
import { Modal, Button } from 'antd';
import EditItemConfig from './EditItemConfig';
class EditItemModal extends React.Component {
    constructor() {
        super();
        this.state = {
            editAffirmFlag: false, //控制是否显示删除提示框
            editIndex: -1, //用来表示当前删除的是哪个id,方便提示框之后处理.
            editItemOption:[],//当前展示的图层的数据
            chartsObj:[],//当前组件基本信息
        } 
    }

   /**
   * @description: 一般图表的时候返回的json数据
   * @param {Object} chartObj 从layout里面获取到的当前节点的基本请求信息
   * @param {Object} tempOptionObj 用来编辑成功进行更新的optionos和queryId对象
   * @return:
   */
    getEditJson(chartObj,tempOptionObj) {
      let layerObj = chartObj.layerObj;
      let dataSource = tempOptionObj.layerOption[0];
      let resultLegend = dataSource.myLegend.result;
      let tablenameVal = dataSource.myDataSource.result[0].DS_INFO;
      let layerName = dataSource.mapInfor.result[0].NAME;
      let pid = "1"//window.parent.document.getElementById("kshID").value;
      let chartType = layerObj.type//"圆环统计图";
      let unitVal = "test";
      var baseMap = "RESULTLAYER";
      var desp = "";//描述
      let typeField = "OBJECTID";
      let chartPosition = "left";//图表位置
      let tongjituyszd ="运营商";
      let tempLegendData = [];//保存legend对象的数组
      let iscbtfVal = "";
     /*  resultLegend.forEach((legendItem,legendIndex) => {
        var colorVal = legendItem.color;
        var fieldName = legendItem.value;
        let istitlebox = "";
        let addTempObj = {};
        if (
          chartType == "THEMERING_CHART" ||
          chartType == "THEMEPIE_CHART" ||
          chartType == "THEMEFUNNEL_CHART" ||
          chartType == "THEMEPYRAMID_CHART"
        ) {
          istitlebox = typeField;
          iscbtfVal= tongjituyszd;
        } else {
          iscbtfVal= typeField;
          if (chartType == "THEMEHISTOGRAM" || chartType == "THEMEVERTBAR_SORT") {
            istitlebox = chartPosition;
          } else {
            istitlebox = "";
          }
        }
        addTempObj = {
          name: fieldName,
          isText: false,
          istitlebox: istitlebox,
          iscbtf: iscbtfVal,
          isfacebox: "",
          issizebox: "",
          minVal: 0,
          maxVal: 0,
          fieldname: fieldName,
          color: colorVal,
          unit: unitVal
        };
        tempLegendData.push(addTempObj);
      });
     let tempLegendStr = JSON.stringify(tempLegendData);
     var tempJsonDataObj = {
        maxSize:0,
        minSize:0,
        reference:unitVal,
        name:layerName,
        tablename:tablenameVal,
        type:chartType,
        pid:pid,
        id:layerObj.id,
        desp:desp,
        baseMap:baseMap,
        legend:tempLegendStr,
        type2:"null",
      }
      var tempJsonData = JSON.stringify(tempJsonDataObj);
      return tempJsonData; */
      var json = "{\"maxSize\":\"" + 0 + "\",\"minSize\":\"" + 0 + "\",\"reference\":\"" + unitVal + "\",\"name\":\"" + layerName + "\",\"tablename\":\"" + tablenameVal + "\",\"type\":\"" + chartType + "\",\"pid\":\"" + pid + "\",\"id\":\"" + layerObj.id + "\",\"desp\":\"" + desp + "\",\"baseMap\":\"" + baseMap + "\",\"legend\":[";
  
      for (var i = 0; i < resultLegend.length; i++) {
        json += "{";
        var color = resultLegend[i].color;
        var fieldname = resultLegend[i].value;
        var istitlebox = "";
        if (chartType == "THEMERING_CHART" || chartType == "THEMEPIE_CHART" || chartType=="THEMEFUNNEL_CHART"||chartType=="THEMEPYRAMID_CHART") {
          istitlebox = typeField;
          json += "\"name\":\"" + fieldname + "\",\"isText\":\"" + false + "\",\"istitlebox\":\"" + istitlebox + "\",\"iscbtf\":\"" + tongjituyszd + "\",\"isfacebox\":\"" + "" + "\",\"issizebox\":\"" + "" + "\",\"minVal\":0,\"maxVal\":0,\"fieldname\":\"" + fieldname + "\",\"color\":\"" + color + "\",\"unit\":\"" + unitVal + "\"},";
        } else {
          if(chartType=="THEMEHISTOGRAM"||chartType=="THEMEVERTBAR_SORT"){
            istitlebox = chartPosition;
            json+="\"name\":\""+fieldname+"\",\"isText\":\""+false+"\",\"istitlebox\":\""+istitlebox+"\",\"iscbtf\":\""+typeField+"\",\"isfacebox\":\""+""+"\",\"issizebox\":\""+""+"\",\"minVal\":0,\"maxVal\":0,\"fieldname\":\""+fieldname+"\",\"color\":\""+color+"\",\"unit\":\""+unitVal+"\"},";
          }else{
            json+="\"name\":\""+fieldname+"\",\"isText\":\""+false+"\",\"istitlebox\":\""+""+"\",\"iscbtf\":\""+typeField+"\",\"isfacebox\":\""+""+"\",\"issizebox\":\""+""+"\",\"minVal\":0,\"maxVal\":0,\"fieldname\":\""+fieldname+"\",\"color\":\""+color+"\",\"unit\":\""+unitVal+"\"},";
            
          }		}
      }
    
      json = json.substring(0, json.length - 1) + "],\"type2\":\"null\"}";
      return json;
    }





   
    setDefaultValue(layerIndex,editItemOption,tempChart){
        this.setState({
            editAffirmFlag: true,
            editIndex: layerIndex,
            editItemOption:editItemOption,
            chartsObj:tempChart,
        },() => {
         
        })
    }


    deleteAffirmCancel = e => {
        this.setState({
          editAffirmFlag: false
        });
      };
    
    deleteAffirmOk = e => {   
        let chartObj = this.props.ChartDatas[this.state.editIndex];   
         let editJson = this.refs.editItemmConfig.getEditJson(chartObj);
        this.setState(
          {
            editAffirmFlag: false
          },
          () => {
          }
        ); 
      };


    render() {
        return (
            <Modal
            title='编辑当前组件'
            visible={this.state.editAffirmFlag}
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
            <div>
              <EditItemConfig
                  ref="editItemmConfig"
                  editItemOption={this.state.editItemOption}
                />
            </div>
          </Modal>
        )
    }
}


export default EditItemModal
