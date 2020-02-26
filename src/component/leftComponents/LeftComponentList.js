/*
 * @Author: your name
 * @Date: 2020-01-06 12:08:04
 * @LastEditTime: 2020-02-26 16:28:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\ComponentList.js
 */
/**
 * Created by LEAFER on 2019/7/3.
 */
import React, { Component } from 'react';
import { Collapse,Button } from 'antd';
import * as html2canvas from 'html2canvas';
import './LeftComponentList.css';
import  { addOneLayer,addPageImage }from '../../api/api';
import Qs from 'qs';
const { Panel } = Collapse;

/* 
 * 样式面板组件
 */
class LeftComponentList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            componentData:[],
            nameData:[],
            left: 0,
            top: 0
        }
      
    }

    componentDidMount(){
        this.initLeftDatas();
    }

    initLeftDatas(){

      


         let tempArr = [
                {
                    data: '[{"id":3,"parentid":1,"name":"京津冀年卡景点20190","type":"THEMERING_CHART","service":null,"layername":null,"renderer":null,"thType":"0","type2":null,"desp":"","isText":null,"showType":null,"realtimeupdate":null,"serialize":null,"show":null},{"id":2,"parentid":1,"name":"京津冀年卡景点20190","type":"THEMEPIE_CHART","service":null,"layername":null,"renderer":null,"thType":"0","type2":null,"desp":"","isText":null,"showType":null,"realtimeupdate":null,"serialize":null,"show":null}]',
                    
                    service:{
                        id: 1,
                        name: "CCC"
                    }
                },
                {
                    data: '[{"id":4,"parentid":1,"name":"京津冀年卡景点20190","type":"THEMERING_CHART","service":null,"layername":null,"renderer":null,"thType":"0","type2":null,"desp":"","isText":null,"showType":null,"realtimeupdate":null,"serialize":null,"show":null},{"id":2,"parentid":1,"name":"京津冀年卡景点20190","type":"THEMEPIE_CHART","service":null,"layername":null,"renderer":null,"thType":"0","type2":null,"desp":"","isText":null,"showType":null,"realtimeupdate":null,"serialize":null,"show":null}]',
                    service:{
                        id: 2,
                        name: "KSH"
                    },
                } ];
            let nameData = [{
                "SHAREDATE": "",
                "KSHTYPE": "",
                "UPDATEDATE": "2020-02-20 11:41:02",
                "KSHDETAIL": "test",
                "ID": "bce15ee5747342c398db153c248c08b6",
                "USERNAME": "public",
                "PASSWORD": "public123",
                "KSHNAME": "test",
                "THEME": "dark",
                "CANCEL": 0
            }]
                tempArr[0].data = JSON.parse(tempArr[0].data);
                tempArr[1].data = JSON.parse(tempArr[1].data);
                this.setState({
                    componentData: tempArr,
                    nameData:nameData
                })
       /*  fetch('http://localhost:8080/data/thematic/GetAllZTT.do', {
            method: "GET",    
        })
        .then(response => response.text())
        .then(result => {
            result = JSON.parse(result);
			if(result&&result.length>0){
				for ( var i = 0; i < result.length; i++) {
                    let tempData = result[i].data;
                    result[i].data = JSON.parse(tempData);    
                }
            }
              this.setState({
                componentData: result 
              })  
        }).catch(function (e) {
            console.log("fetch fail");
        });
    var shareid = 1;
    if(window.parent&&window.parent.document.getElementById('shareID')){
        shareid = window.parent.document.getElementById('shareID').value
    }
    fetch('http://localhost:8080/data/share/getShareById.do?id='+shareid, {
                method: "GET",
            })
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                 this.setState({
                    nameData:result
                })
            }).catch(function (e) {
                console.log("fetch fail");
            }); */
    }



    outRollbackPage(){
        let _this = this;
        html2canvas(document.querySelector(".custom-content-p")).then(canvas => {
			_this.canvasToImage(canvas);
		});
    }
    canvasToImage(canvas) {
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        // var kshid = $('.title2-t').attr('id');
        var kshid = this.state.nameData[0].ID;
        var name = "img"+kshid;
        this.addImg(image.src,name);
    }
    
    addImg(base64,name){
        let PageImageObj = {
            base64: base64,
            name: name,
        }
       /*  addPageImage(PageImageObj).then(res => {
            alert("图片保存成功,回到主页面");
            window.parent.document.getElementById("dataShow").setAttribute("src",'dataShow/show.html');
        }).catch(error => {
            console.info(error);
            window.parent.document.getElementById("dataShow").setAttribute("src",'dataShow/show.html');
        }) */
        // fetch("http://192.168.3.168:8080/data/share/saveImage.do", {
        fetch("../../share/saveImage.do", {
            method: "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:  Qs.stringify(PageImageObj)
          }).then(function(response) {
            alert("图片保存成功,回到主页面");
            window.parent.document.getElementById("dataShow").setAttribute("src",'dataShow/show.html');
          }).catch(error => {
            console.info(error);
            window.parent.document.getElementById("dataShow").setAttribute("src",'dataShow/show.html');
        });

    }
    onClickAdd(layerObj){
        let _this = this;
        let pageLayerObj = this.state.nameData[0];
        let thType = layerObj.thType;
       /*   let addLayerObj = {
            type: thType,
            pid: window.parent.document.getElementById('kshID').value,
            kshname: pageLayerObj.KSHDETAIL,
            kshid: pageLayerObj.ID,
            v: layerObj.id,
        }
       addOneLayer(addLayerObj).then(res => {
            alert("添加图标成功")
            _this.props.onClickAdd({
                id:layerObj.THEMERING_CHART,
                layerType:'chart',
                text:layerObj.name,
                simpleType:'all'
            },{
                data:layerObj,
                state:"leftAdd"
              })
            console.info(res)
        }).catch(error => {
            console.info(error);
        }) */
        _this.props.onClickAdd({
            id:layerObj.THEMERING_CHART,
            layerType:'chart',
            text:layerObj.name,
            simpleType:'all'
        },{
            data:layerObj,
            state:"leftAdd"
          })
    }

    render() {
        return (
            <div className="custom-left-list">
            <div className="custom-left-list-title">
                <Button  className="outRollback" onClick={this.outRollbackPage.bind(this)}  >《--我的可视化</Button>
                <div className="custom-left-list-title-icons"  > 
                     <span>{this.state.nameData.length>0?this.state.nameData[0].KSHDETAIL:''}</span>
                </div>
             </div>
            <div className="custom-left-list-tools">
                <span>图层数据</span> 
            </div>
            <div className="custom-left-list-p">
             <Collapse  expandIconPosition="right"  bordered={false} >
                                    {
                                        this.state.componentData.map((bigDataItem,bigIndex) => {
                                            return (
                                                <Panel header={bigDataItem.service.name} key={bigIndex}    >
                                                    {
                                                        bigDataItem.data.map((item,index) => {
                                                            return (
                                                                <div class="showLayerName"  >
                                                                    <div onClick={this.onClickAdd.bind(this,item)}  >{item.name}</div>
                                                                    <div className="moveLayerName moveLayerNameHide"   style={{left:this.state.left,top:this.state.top}} >{item.name}</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </Panel>
                                            )
                                        }) 
                                    }
                            </Collapse>
            </div>
        </div>
        )
    }
}
export default LeftComponentList;


