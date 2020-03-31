import React from "react";
import ReactDOM from "react-dom";
import "./css/EditItemModal.scss";
import EditSingleItem from './EditSingleItem'
class EditItemModal extends React.Component {
  constructor(props) {
    super(props);
    let option = this.props.editItemOption;
    this.state = {
      editData: option,
      defaultChart: [
        {
          ename: "chartNamme",
          name: "图层名称",
          type: "Input",
          placeholder: "图层名称",
          level: 1,
          value:''
        }
      ]
    };
    this.initData(option);
  }
  
  initData(option){
    if(option&&option.length>0){
        let tempObj = this.state.defaultChart;
        tempObj[0].value = option[0].mapInfor.result[0].NAME;
        this.setState({
          editData:option,
          defaultChart:tempObj
        })
    }
  }



  componentWillReceiveProps(newProp){
      let option = newProp.editItemOption;
      this.initData(option)
  }


  updateThisCharsField(fieldValue, fieldEname) {
    let defaultChart = this.state.defaultChart;
    defaultChart.map((item, index) => {
      if (item.ename == fieldEname) {
        item.value = fieldValue;
      }
    });
    this.setState(defaultChart);
  }

  getEditJson(chartObj) {
    let layerObj = chartObj.layerObj;
    let dataSource = this.state.editData[0];
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
      } else {
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
        iscbtf: false,
        isfacebox: "",
        issizebox: "",
        minVal: 0,
        maxVal: 0,
        fieldname: fieldName,
        color: colorVal,
        unit: unitVal
      };
      tempLegendData.push(addTempObj);
    }); */
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
/*     let tempLegendStr = JSON.stringify(tempLegendData);
    var tempJsonData = `{"maxSize":${0},"minSize":${0},"reference":${unitVal},"name":${layerName},"tablename":${tablenameVal},"type":${chartType},"pid":${pid},"id":${
      layerObj.id
    },"desp":${desp},"baseMap":${baseMap},"legend":${tempLegendStr}],"type2":"null"}`; 
    return tempJsonData;*/
  }





  render() {
    let defaultChart = this.state.defaultChart;
    return (
      <div>
        {defaultChart.map((layerItem, layerIndex) => {
          return (
              <EditSingleItem
                layerItem={layerItem}
                updateThisCharsField={this.updateThisCharsField.bind(this)} />
           )
        })}
      </div>
    );
  }
}

export default EditItemModal;
