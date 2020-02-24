/*
 * @Author: your name
 * @Date: 2020-01-06 12:08:04
 * @LastEditTime: 2020-02-21 18:54:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\ComponentList.js
 */
/**
 * Created by LEAFER on 2019/7/3.
 */
import React, { Component } from 'react';
import { Collapse,Button } from 'antd';
import reactable from 'reactablejs'
import * as html2canvas from 'html2canvas';
import './LeftComponentList.css';

const { Panel } = Collapse;
class MoveLayerName extends Component {
    constructor(props) {
        super(props);
    }
    addLayerData(){
        this.props.addLayerData();
    }
    render() {
            return (
                <div  onClick={this.addLayerData}  >{this.props.name}</div>
            )
    }
}
const MoveLayerNameReactTable = reactable(MoveLayerName);

/* 
 * 样式面板组件
 */
class LeftComponentList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            componentData:[],
            nameData:[{
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
            }],
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
                data: "[{'id':1,'parentid':1,'name':'京津冀年卡景点20190','type':'THEMERING_CHART','service':null,'layername':null,'renderer':null,'thType':'0','type2':null,'desp':'','isText':null,'showType':null,'realtimeupdate':null,'serialize':null,'show':null},{'id':2,'parentid':1,'name':'京津冀年卡景点20190','type':'THEMEPIE_CHART','service':null,'layername':null,'renderer':null,'thType':'0','type2':null,'desp':'','isText':null,'showType':null,'realtimeupdate':null,'serialize':null,'show':null},{'id':3,'parentid':1,'name':'园地','type':'THEMELINE_CHART','service':null,'layername':null,'renderer':null,'thType':'0','type2':null,'desp':'','isText':null,'showType':null,'realtimeupdate':null,'serialize':null,'show':null},{'id':0,'parentid':1,'name':'泥石流沟','type':null,'service':'CCC','layername':'泥石流沟','renderer':'<GROUPRENDERER><SIMPLERENDERER name=\'一般点样式\' minscale=\'1e-20\' maxscale=\'100000000000000000000\'><GROUPRENDERER  styleName=\'square\' fuhaokuName=\'基础符号库\'><SIMPLEMARKERSYMBOL antialiasing=\'true\' color=\'204,255,43\' overlap=\'true\' shadow=\'0,0,0\' transparency=\'1.0\' type=\'square\' outline=\'204,255,43\' usecentroid=\'true\' width=\'3\'></SIMPLEMARKERSYMBOL></GROUPRENDERER></SIMPLERENDERER></GROUPRENDERER>','thType':'1','type2':null,'desp':'','isText':null,'showType':null,'realtimeupdate':'false','serialize':null,'show':'1'}]",
                arrData:[{
                    "id": 3,
                    "parentid": 1,
                    "name": "京津冀年卡景点20190",
                    "type": "THEMERING_CHART",
                    "service": null,
                    "layername": null,
                    "renderer": null,
                    "thType": "0",
                    "type2": null,
                    "desp": "",
                    "isText": null,
                    "showType": null,
                    "realtimeupdate": null,
                    "serialize": null,
                    "show": null
                }, {
                    "id": 2,
                    "parentid": 1,
                    "name": "京津冀年卡景点20190",
                    "type": "THEMEPIE_CHART",
                    "service": null,
                    "layername": null,
                    "renderer": null,
                    "thType": "0",
                    "type2": null,
                    "desp": "",
                    "isText": null,
                    "showType": null,
                    "realtimeupdate": null,
                    "serialize": null,
                    "show": null
                }],
                service:{
                    id: 1,
                    name: "CCC"
                }
            },
            {
                data: '[{"id":0,"parentid":2,"name":"水污染","type":null,"service":"KSH","layername":"testV4_水污染","renderer":"<GROUPRENDERER><SIMPLERENDERER name=\"一般点样式\" minscale=\"1e-20\" maxscale=\"100000000000000000000\"><GROUPRENDERER  styleName=\"circle\" fuhaokuName=\"基础符号库\"><SIMPLEMARKERSYMBOL antialiasing=\"true\" color=\"102,255,43\" overlap=\"true\" shadow=\"0,0,0\" transparency=\"1.0\" type=\"circle\" outline=\"102,255,43\" usecentroid=\"true\" width=\"3\"></SIMPLEMARKERSYMBOL></GROUPRENDERER></SIMPLERENDERER></GROUPRENDERER>","thType":"1","type2":null,"desp":"","isText":null,"showType":null,"realtimeupdate":"false","serialize":null,"show":"1"},{"id":0,"parentid":2,"name":"村居委会","type":null,"service":"KSH","layername":"村居委会","renderer":"<GROUPRENDERER><SIMPLERENDERER name=\"一般面样式\" minscale=\"1e-20\" maxscale=\"100000000000000000000\"><SIMPLEPOLYGONSYMBOL antialiasing=\"true\" boundarycolor=\"0,255,0\" boundarytype=\"solid\" boundarywidth=\"1\" outline=\"0,255,0\" filltype=\"solid\" icon=\"\" fillcolor=\"255,0,0\" filltransparency=\"1\"/></SIMPLERENDERER></GROUPRENDERER>","thType":"1","type2":null,"desp":"kkk","isText":null,"showType":null,"realtimeupdate":"false","serialize":null,"show":"1"},{"id":0,"parentid":2,"name":"qazwsx2","type":null,"service":"KSH","layername":"qazwsx2","renderer":"<GROUPRENDERER><SIMPLERENDERER name=\"一般点样式\" minscale=\"1e-20\" maxscale=\"100000000000000000000\"><GROUPRENDERER  styleName=\"square\" fuhaokuName=\"基础符号库\"><SIMPLEMARKERSYMBOL antialiasing=\"true\" color=\"0,0,0\" overlap=\"true\" shadow=\"0,0,0\" transparency=\"1.0\" type=\"square\" outline=\"0,0,0\" usecentroid=\"true\" width=\"3\"></SIMPLEMARKERSYMBOL></GROUPRENDERER></SIMPLERENDERER></GROUPRENDERER>","thType":"1","type2":null,"desp":"1","isText":null,"showType":null,"realtimeupdate":"false","serialize":null,"show":"1"},{"id":0,"parentid":2,"name":"养老机构","type":null,"service":"KSH","layername":"养老机构","renderer":"<GROUPRENDERER><SIMPLERENDERER name=\"一般点样式\" minscale=\"1e-20\" maxscale=\"100000000000000000000\"><GROUPRENDERER  styleName=\"square\" fuhaokuName=\"基础符号库\"><SIMPLEMARKERSYMBOL antialiasing=\"true\" color=\"51,255,0\" overlap=\"true\" shadow=\"0,0,0\" transparency=\"1.0\" type=\"square\" outline=\"51,255,0\" usecentroid=\"true\" width=\"14\"></SIMPLEMARKERSYMBOL></GROUPRENDERER></SIMPLERENDERER></GROUPRENDERER>","thType":"1","type2":null,"desp":"fdg","isText":null,"showType":null,"realtimeupdate":"false","serialize":null,"show":"1"}]',
                service:{
                    id: 2,
                    name: "KSH"
                },
                arrData:[{
                    "id": 1,
                    "parentid": 1,
                    "name": "京津冀年卡景点20190",
                    "type": "THEMERING_CHART",
                    "service": null,
                    "layername": null,
                    "renderer": null,
                    "thType": "0",
                    "type2": null,
                    "desp": "",
                    "isText": null,
                    "showType": null,
                    "realtimeupdate": null,
                    "serialize": null,
                    "show": null
                }, {
                    "id": 2,
                    "parentid": 1,
                    "name": "京津冀年卡景点20190",
                    "type": "THEMEPIE_CHART",
                    "service": null,
                    "layername": null,
                    "renderer": null,
                    "thType": "0",
                    "type2": null,
                    "desp": "",
                    "isText": null,
                    "showType": null,
                    "realtimeupdate": null,
                    "serialize": null,
                    "show": null
                }],
            } ]

    // console.log(JSON.parse(tempArr[0].data))         
            this.setState({
                componentData: tempArr
            })
            
         fetch('http://localhost:8080/data/thematic/GetAllZTT.do', {//'http://192.168.3.168:8080/data/thematic/GetAllZTT.do', {
            method: "GET",
            mode: "cors",
            headers:{
                        'Accept':'application/json,text/plain,*'
                    }
    
        })
        .then(response => response.text())
        .then(result => {
            // result[0].data = JSON.parse(result[0].data);
            // result[1].data = JSON.parse(result[1].data);
            //   this.setState({
            //     componentData: result 
            //   })
        }).catch(function (e) {
            console.log("fetch fail");
        });
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
        this.postData('http://192.168.3.168:8080/data/share/saveImage.do', {
            base64: base64,
            name: name,
        })
        .then(data =>{
            window.parent.document.getElementById("dataShow").setAttribute("src",'dataShow/show.html');
        })
        .catch(error => {
            window.parent.document.getElementById("dataShow").setAttribute("src",'dataShow/show.html');
        })
    }


  
     postData(url, data) {
        // Default options are marked with *
        return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
        })
        .then(response => response.json()) // parses response to JSON
    }
    
    addLayerData(layerObj){
        /* let pageLayerObj = this.state.nameData[0];
        let addLayerObj = {
            type: layerObj.thType,
            pid: 2,
            kshname: pageLayerObj.KSHDETAIL,
            kshid: pageLayerObj.ID,
            v: layerObj.id,
        }
        this.postData('http://192.168.3.168:8080/data/thematic/addKSHChart.do', addLayerObj)
        .then(data => console.log(data))
        .catch(error => console.error(error)) */
        this.props.onClickAddSpecialLayer(layerObj)
    }


    handleDown = (e) => {
        let s = e;

    }

    handleDragMove = (e) => {
        let tempStateLeft = this.state.left;
        let tempStateTop = this.state.top;
        const { dx, dy } = e;
        let xl, xt;
        if ((tempStateLeft > 10) || (tempStateLeft == 10 && dx > 0)) {
            xl = tempStateLeft + dx;
        } else if (dx == 0) {
            xl = tempStateLeft;
        } else {
            xl = 10;
        }
        if ((tempStateTop > 10) || (tempStateTop == 10 && dy > 0)) {
            xt = tempStateTop + dy;
        } else if (dy == 0) {
            xt = tempStateTop;
        } else {
            xt = 10;
        }
        this.setState({
            left: xl,
            top: xt
        })
    }

    render() {
        return (
            <div className="custom-left-list">
            <div className="custom-left-list-title">
                <Button  className="outRollback" onClick={this.outRollbackPage.bind(this)}  >《--我的可视化</Button>
                <div className="custom-left-list-title-icons"  > 
                     <span>{this.state.nameData[0].KSHDETAIL}</span>
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
                                                        bigDataItem.arrData.map((item,index) => {
                                                            return (
                                                                <div class="showLayerName"  >
                                                                   {/* <MoveLayerNameReactTable 
                                                                    draggable
                                                                    gesturable
                                                                    name= {item.name}
                                                                    onDown={this.handleDown}
                                                                    onDragMove={this.handleDragMove}  
                                                                    addLayerData={this.addLayerData.bind(this,item)}
                                                                    ></MoveLayerNameReactTable> */}
                                                                    <div onClick={this.addLayerData.bind(this,item)}  >{item.name}</div>
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


