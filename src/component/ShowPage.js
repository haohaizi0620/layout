/*
 * @Author: your name
 * @Date: 2020-02-19 09:46:16
 * @LastEditTime: 2020-02-24 11:21:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\Test.js
 */
import React, { Component } from 'react';
import ShowContent from './ShowContent';
import store from '../redux/store';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import {
    useParams,
    useLocation
  } from "react-router-dom";
import {getShareById,getKSHChart} from '../api/api';
import { showChartsOption} from '../utils/chart';
import axios from 'axios';
import Qs from 'qs';
// import  chartOption from "../utils/chart";
class ShowPage extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            showPageData:[]
        }
        this.initLeftData();
    }
    
    componentDidMount() {
       
    }

     initData(){
        let id = parseInt(window.location.pathname.replace("/test/",""));
        let _this = this;
        fetch('http://127.0.0.1:8888/selectGetOneMainLayer/'+id)
                                    .then(response => response.json())
                                    .then(function (response) {
                                        let {layercname,layerename,layerdatas,layerbasicset} = response.data;

                                        _this.setState({
                                            showPageData:{
                                                bgFieldObj:JSON.parse(layerename),
                                                cptKeyList:JSON.parse(layercname),
                                                cptPropertyList:JSON.parse(layerdatas),
                                                cptOptionsList:JSON.parse(layerbasicset)
                                            }
                                        },() =>{
                                            let showPageData = _this.state.showPageData;
                                            if(showPageData&&showPageData.cptKeyList){
                                                showPageData.cptKeyList.map((item, index) => {
                                                    // chartOption(item.id,item.key,showPageData.cptOptionsList[index])
                                                })
                                            }
                                        })
                                    }).catch(e => console.log("error", e));   
    }
    initLeftData(){
        let _this = this;
        var shareid = 1;
        if(window.parent.document.getElementById('shareID')){
        shareid = window.parent.document.getElementById('shareID').value;
        }
        getShareById(shareid)
        .then(result => {
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
                    addState:'defaultState',
                    layerObj:item,
                };
                if(tempLayerPosition!=""){
                  tempLayerPosition = JSON.parse(tempLayerPosition)
                }else{
                  tempLayerPosition=JSON.parse('{"cptBorderObj":{"width":280,"height":260,"left":450,"top":160,"opacity":1,"layerBorderWidth":0,"layerBorderStyle":"solid","layerBorderColor":"rgba(0,0,0,1)"},"type":"chart","cptType":""}')
                }
                tempLayerPosition.type = "chart";
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
    render() {
        let cptChartIdList = this.state.cptChartIdList;
        return (
            <div   ref="showDiv" style={{width:'100%',height:'100%'}} >
                   {    
                        cptChartIdList?cptChartIdList.map((item, i) => {
                                    return (
                                        <div index={i} key={item.key}     >
                                            <ShowContent
                                                id={item.key}
                                                cptObj={this.state.cptPropertyList[i]}
                                                >
                                            </ShowContent>
                                        </div>
                                    )
                                }):null
                    }
            </div>
        )
    }
}
export default ShowPage;