import './Layout.css';
import React, {Component, Fragment} from 'react';
import Header from './Header';
import Content from './Content';
import ComponentList from './ComponentList';
import Config from './Config';
import LoadChart from "./LoadChart";
import store from '../redux/store';
import {chartOption} from "../utils/chart";
import { notification } from 'antd';
import {updateShowLayerFieldVal,replaceShowLayerFieldVal,replaceAllShowLayerFieldVal,delCptOptionsList,editCptOptionsList} from '../redux/actions/showLayerDatas';
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cptIndex: -1,
            cptType: '',
            cptKey: '',
            cptKeyList: [], //组件集合
            cptPropertyList: [],//所有组件属性集合
            cptPropertyObj: store.getState().showLayerDatas.showDatas,
            globalBg: store.getState().showLayerDatas.bgFieldObj,
        }
    }

    handleScriptCreate(obj) {
        this.setState({scriptLoaded: false})
    }

    handleScriptError() {
        this.setState({scriptError: true})
    }

    handleScriptLoad(obj) {
        this.setState({scriptLoaded: true, scriptStatus: 'yes'})
    }

    /**
     * @description: 添加指定的图层
     * @param {type} 
     * @return: 
     */
    onClickAdd(layerType,obj) {
        let thisTarget = obj.target;
        const id = thisTarget.id;
        const type = thisTarget.type;
        const text = thisTarget.innerText;
        const showTitle = thisTarget.title;
        //const t = document.getElementById("chart_type").value;//暂时先从下拉列表获取图表类型，后续在更改
        const key = new Date().getTime().toString();
        const cptkObj = {key: key, id: id,title:showTitle};

        const len = this.state.cptKeyList.length;
        const cptpObj = {
            cptBorderObj: {
                width: 350,
                height: 260,
                left: 450,
                top: 160,
                opacity:1,
            },
            type: type,
            cptType: id
        };
        //对当前基本内容的全部替换
        store.dispatch(replaceAllShowLayerFieldVal(cptpObj));
        this.setState({
            cptIndex: len,
            cptType: id,
            cptKey: key,
            cptKeyList: [...this.state.cptKeyList, cptkObj],
            cptPropertyList: [...this.state.cptPropertyList, cptpObj],
            cptPropertyObj: cptpObj 
        }, () => {
            // console.log(`这个组合:${this.state}`);
            {
                    chartOption(this.state.cptType, this.state.cptKey,this,"noUpdate")
            }
        });
    }

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
        const cptpObj = cptpList[0] ? cptpList[0] : {
            cptBorderObj: {           //边框属性
                width: 350,
                height: 260,
                left: 450,
                top: 160,
                opacity:this.state.cptPropertyObj.cptBorderObj.opacity,
            },
            type: 'bg',
            cptType: 'bg'
        };
        let tempIndex = -1;
        if(cptpList.length>0){
            tempIndex = 0;
        }
        //对当前基本内容的全部替换
        store.dispatch(replaceAllShowLayerFieldVal(cptpObj));
        //将option在store的集合里面删掉
        store.dispatch(delCptOptionsList(layerIndex));
        this.refs.rightConfig.switchTabs("1");
        this.setState({
            cptIndex:tempIndex,
            cptKey: '',
            cptType: cptpObj.cptType ? cptpObj.cptType : '',
            cptKeyList: cptkList,
            cptPropertyList: cptpList,
            cptPropertyObj: cptpObj,
        }, () => {
            //{chartOption(this.state.cptType, this.state.cptKey,this,"noUpdate")}
        });
    }

    /**
     * @description: 将存放在集合里面的数据进行更新
     * @param {type} 
     * @return: 
     */
    updateLayerPosition(layerIndex,type,fieldArr){
        let tempCptObj = this.state.cptPropertyList[layerIndex]
        if(type=="multi"){
            fieldArr.forEach(item => {
                tempCptObj.cptBorderObj[item.fieldEname]  = item.fieldValue;
            })
        }
        this.state.cptPropertyList[layerIndex] = tempCptObj;
        this.setState({
            cptPropertyList: this.state.cptPropertyList,//所有组件属性集合
        }); 
    }


    handleResizeMove = (e) => {
        var index = parseInt(e.target.parentNode.parentNode.getAttribute("index"));
        // index = this.state.cptIndex;
        const width = e.rect.width;
        const height = e.rect.height;
        const left = parseInt(e.target.parentNode.style.left);
        const top = parseInt(e.target.parentNode.style.top);
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
                opacity
            },
            type: type,
            cptType: t
        };
        cptpList[index] = cptpObj;
        //对当前基本内容的全部替换
        store.dispatch(replaceAllShowLayerFieldVal(cptpObj));
        this.updateGlobalEditData();
        this.setState({
            cptIndex: index,
            cptPropertyList: cptpList,
            cptPropertyObj: cptpObj
        }, () => {
            {
             chartOption(this.state.cptType, this.state.cptKey,this,"noUpdate")
             }
        });
    }

    handleResizeEnd = (e) => {
        var index = parseInt(e.target.parentNode.parentNode.getAttribute("index"));
        // index = this.state.cptIndex;
        const width = e.rect.width;
        const height = e.rect.height;
        const left = parseInt(e.target.parentNode.style.left);
        const top = parseInt(e.target.parentNode.style.top);
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
                opacity
            },
            type: type,
            cptType: t
        };
        cptpList[index] = cptpObj;
        //更新strore里卖弄的数据
        store.dispatch(replaceAllShowLayerFieldVal(cptpObj));
        this.updateGlobalEditData();
        this.setState({
            cptIndex: index,
            cptPropertyList: cptpList,
            cptPropertyObj: cptpObj
        }, () => {
            {
                chartOption(this.state.cptType, this.state.cptKey,this,"noUpdate")
            }
        });
    }

    /**
     * @description: 点击当前图层的时候将当前图层选中,并将右侧配置项的内容进行同步   -- 暂时不使用
     * @param {type} 
     * @return: 
     */
    handleDown = (e) => {
        var index = parseInt(e.currentTarget.parentNode.parentNode.getAttribute("index"));
        // index = this.state.cptIndex;
        const id = e.currentTarget.firstElementChild.getAttribute("id");
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
            cptPropertyList: cptpList,//所有组件属性集合
            cptPropertyObj: cptpObj
        });
    }

    /**
     * @description:  用面板修改图表的值
     * @param {Object} updateFieldObj 保存要修改的面板的index,属性英文名和值 和对应的类型
     * @return: 
     */
    changeProperties(updateFieldObj){
        const tabsKey = updateFieldObj.tabsKey;
        var cptIndex = updateFieldObj.thisIndex;
        // cptIndex = this.state.cptIndex;
        const fieldValue = updateFieldObj.fieldValue;
        const fieldEname = updateFieldObj.fieldEname
        const layerType = updateFieldObj.layerType;
        let cptpList = this.state.cptPropertyList;
        if(tabsKey==2){
            let cptOptionObj = store.getState().showLayerDatas.cptOptionsList[cptIndex];
            // var queryId = cptOptionObj.queryId;
            if(fieldEname=="optionName"){
                if(cptOptionObj){
                    cptOptionObj.layerOption[0].mapInfor.result[0].NAME = fieldValue;
                    store.dispatch(editCptOptionsList(cptIndex,cptOptionObj));
                    chartOption(this.state.cptType, this.state.cptKey,this,"update");
                }
            }
            if(layerType=="text"||layerType=="border"){
                var mapObjArr = window.mapObjArr ? window.mapObjArr : [];
                let tempLayerId = mapObjArr[cptIndex].layerId;
                let tempObj = document.getElementById(tempLayerId);
                if(layerType=="text"){
                    tempObj =  tempObj.getElementsByClassName('textLayer')[0];
                    if(fieldEname=="textCenter"){
                        tempObj.innerText = fieldValue;  
                    }else if(fieldEname=="textSize"){
                        tempObj.style.fontSize = fieldValue;
                    }else if(fieldEname=="textColor"){
                        tempObj.style.color = fieldValue; 
                    }
                }else if(layerType=="border"){
                    tempObj =  tempObj.parentNode;
                    if(fieldEname=="borderWidth"){
                        tempObj.style.borderWidth = fieldValue+'px';  
                    }else if(fieldEname=="borderStyle"){
                        tempObj.style.borderStyle = fieldValue;
                    }else if(fieldEname=="borderColor"){
                        tempObj.style.borderColor = fieldValue; 
                    }
                }
                cptOptionObj.layerOption[fieldEname] = fieldValue;
                store.dispatch(editCptOptionsList(cptIndex,cptOptionObj));
            }
        }else if(tabsKey==1){
            //更新strore里卖弄的数据
            store.dispatch(updateShowLayerFieldVal(updateFieldObj));
            var cptpObj = this.state.cptPropertyList[cptIndex];
            if(cptIndex!=-1){
                if(layerType=="chart"){
                    cptpObj.cptBorderObj[fieldEname] = fieldValue;
                }
                cptpList[cptIndex] = cptpObj;
            }else{
                cptpObj = store.getState().showLayerDatas.showDatas;
            }
            this.setState({
                cptIndex: cptIndex,
                cptPropertyList: cptpList,
                cptPropertyObj: cptpObj,
            }, () => {
                // console.log(`这个组合:${this.state}`);
                {
                    chartOption(this.state.cptType, this.state.cptKey,this,"noUpdate")
                }
            });
        }else if(tabsKey==0){//当前为设置背景的属性.
            store.dispatch(updateShowLayerFieldVal(updateFieldObj));
            this.setState({
                globalBg:store.getState().showLayerDatas.bgFieldObj
            })
        }
    }



    /**
     * @description:  用来进行不同的图层之间索引的切换,更新当前点击的索引
     * @param {Integer} layerIndex 当前点击的图层的索引 
     * @param {Strign} timeId 当前点击的图层的div的时间戳的id值
     * @return: 
     */
    singleSwitchLayer(event,layerIndex,timeId){
        event.stopPropagation();
        var index = layerIndex;
        // index = this.state.cptIndex;
        const id = timeId;
        let cptkList = this.state.cptKeyList;
        let cptpList = this.state.cptPropertyList;
        const cptkObj = cptkList[index];
        const cptpObj = cptpList[index];
        var t  = "";
        cptpObj&&cptpObj.cptType? t = cptpObj.cptType : t = 'bg'
        //切换layerIndex位置
        // cptkList.splice(index, 1);
        // cptpList.splice(index, 1);
        // cptkList.push(cptkObj);
        // cptpList.push(cptpObj);
        //更新strore里卖弄的数据
        if(t!="bg"){
            store.dispatch(replaceAllShowLayerFieldVal(cptpObj));
            this.setState({
                cptIndex: index,
                cptKey: id,
                cptType: t,
                cptKeyList: cptkList, //组件集合
                cptPropertyList: cptpList,//所有组件属性集合
                cptPropertyObj: cptpObj
            },() => {
                {
                    this.updateGlobalEditData();
                }
            });
        }else{
            
        }
        
    }

    /**
     * @description: 这个方法用于当编辑面板的数据进行改变的时候,将store的改变通知到其他的调用store的地方
     * @param {type} 
     * @return:  
     */
    updateGlobalEditData(){
        //更新编辑面板里面的数据
        this.refs.rightConfig.refs.editMainCenter.updateStateVal();
    }
    render() {
        return (
            <Fragment>
                <Header onClickAdd={this.onClickAdd.bind(this)}/>
                <div className="custom-content">
                    <ComponentList ComponentList={this.state.cptKeyList}/>
                    <div className="custom-content-p" >
                      <div className="custom-content-canvs" 
                          style={{
                              height:this.state.globalBg.bjHeight,
                              width:this.state.globalBg.bjWidth,
                              backgroundColor:this.state.globalBg.bgColor}}
                              onClick={event => {this.singleSwitchLayer(event,-1)}}>
                            {
                                this.state.cptKeyList.map((item, i) => {
                                    return (
                                        <div index={i} key={item.key}   onClick={event => {this.singleSwitchLayer(event,i,item.key)}}    >
                                            <Content 
                                                    id={item.key} 
                                                    cptIndex={this.state.cptIndex}
                                                    delIndex={i}
                                                    obj={this.state.cptPropertyList[i]}
                                                    
                                                    handleResizeMove={this.handleResizeMove}
                                                    handleResizeEnd={this.handleResizeEnd}
                                                    // handleDowssn={this.handleDown}
                                                    updateGlobalEditData={this.updateGlobalEditData.bind(this)}
                                                    del={this.ondelItem.bind(this)}
                                                    updateLayerPosition={this.updateLayerPosition.bind(this)}>
                                            </Content>
                                        </div>
                                    )
                                })
                            }
                        </div>  
                    </div>
                    <Config 
                            ref="rightConfig"
                            changeProperties={this.changeProperties.bind(this)}
                            cptPropertyObj={this.state.cptPropertyObj}
                            cptIndex={this.state.cptIndex}/>
                </div>
            </Fragment>
        );
    }
}

export default Layout;