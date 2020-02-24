/*
 * @Author: your name
 * @Date: 2020-02-19 09:46:16
 * @LastEditTime: 2020-02-21 09:15:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\Test.js
 */
import React, { Component } from 'react';
import ShowContent from './ShowContent';
import store from '../redux/store';
import  {chartOption} from '../utils/showChart'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import {
    useParams,
    useLocation
  } from "react-router-dom";
import {selectMainLayer,selectGetOneMainLayer} from '../api/api';
import axios from 'axios';
import Qs from 'qs';
class ShowPage extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            showPageData:[]
        }
        this.initData();
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
                                                    chartOption(item.id,item.key,showPageData.cptOptionsList[index])
                                                })
                                            }
                                        })
                                    }).catch(e => console.log("error", e));   
    }

    render() {
        // let { showPageData } = useParams();
        let showPageData = this.state.showPageData;
        let bgFieldObj = this.state.showPageData.bgFieldObj;
        
        return (
            <div   ref="showDiv" style={{width:bgFieldObj?bgFieldObj.bjWidth:'100%',height:bgFieldObj?bgFieldObj.bjHeight:'100%',
            backgroundColor:bgFieldObj?bgFieldObj.bgColor:'black',
            backgroundImage:bgFieldObj?'url('+bgFieldObj.bgImageIntegerUrl+')':'none'}} >
                   {    
                        showPageData?showPageData.cptKeyList?showPageData.cptKeyList.map((item, i) => {
                                    return (
                                        <div index={i} key={item.key}     >
                                            <ShowContent
                                                id={item.key}
                                                obj={showPageData.cptPropertyList[i]}
                                                showData={showPageData.cptOptionsList[i]}
                                                >
                                            </ShowContent>
                                        </div>
                                    )
                                }):true:true
                    }
            </div>
        )
    }
}
export default ShowPage;