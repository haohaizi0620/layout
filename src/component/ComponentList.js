/*
 * @Author: your name
 * @Date: 2020-01-06 12:08:04
 * @LastEditTime : 2020-02-14 15:53:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\ComponentList.js
 */
/**
 * Created by LEAFER on 2019/7/3.
 */
import React, { Component } from 'react';
import './ComponentList.css';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckSquare,
    faFont,
    faBars,
    faChartBar,
    faChartLine,
    faChartPie,
    faChartArea,
    faEllipsisH,
    faMapPin,
    faTextWidth,
    faTextHeight,
    faBus,
} from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faCheckSquare, faFont, faBars, faChartBar, faChartLine, faChartPie, faChartArea, faEllipsisH, faMapPin, faTextWidth, faTextHeight, faBus)
/* 
 * 样式面板组件
 */
class ComponentList extends Component {
    constructor(props) {
        super(props);
        const tempCharsStr = 'chart';
        const tempTextStr = 'text';
        const tempBorderStr = 'border';
        const tempIframeStr = 'iframe';
        this.state = {
            showState:'image',//或者icon
            leftIconLists: [
                        {
                            prevName: 'all',
                            thisType: tempCharsStr,
                            titleName: '所有',
                            IconObj: faBars
                        },
                        {
                            prevName: 'bar',
                            thisType: tempCharsStr,
                            titleName: '柱状图',
                            IconObj: faChartBar
                        },
                        {
                            prevName: 'line',
                            thisType: tempCharsStr,
                            titleName: '折线图',
                            IconObj: faChartLine
                        },
                        {
                            prevName: 'area',
                            thisType: tempCharsStr,
                            titleName: '面积图',
                            IconObj: faChartArea
                        },
                        {
                            prevName: 'pie',
                            thisType: tempCharsStr,
                            titleName: '饼状图',
                            IconObj: faChartPie
                        },
                        {
                            prevName: 'other',
                            thisType: tempCharsStr,
                            titleName: '其他',
                            IconObj: faEllipsisH
                        },
                        {
                            prevName: 'map',
                            thisType: tempCharsStr,
                            titleName: '地图',
                            IconObj: faMapPin
                        },
                        {
                            prevName: 'countMap',
                            thisType: tempCharsStr,
                            titleName: '统计地图',
                            IconObj: faMapPin
                        },
                        {
                            prevName: 'textWidth',
                            thisType: tempTextStr,
                            titleName: '文本宽度',
                            IconObj: faTextWidth
                        },
                        {
                            prevName: 'textHeight',
                            thisType: tempTextStr,
                            titleName: '文本高度',
                            IconObj: faTextHeight
                        },
                        {
                            prevName: 'borderWidth',
                            thisType: tempBorderStr,
                            titleName: '文本宽度',
                            IconObj: faBus
                        },
                        {
                            prevName: 'borderHeight',
                            thisType: tempBorderStr,
                            titleName: '文本高度',
                            IconObj: faBus
                        },
                        {
                            prevName: 'iframeCenter',
                            thisType: tempIframeStr,
                            titleName: '嵌套页面',
                            IconObj: faBus
                        }
            ]
        }
    }

    selectCliclSingleLayer(event, layerObj, layerIndex) {
        this.props.selectCliclSingleLayer(layerObj, layerIndex);
    }

    switchIconView(event,iconIndex){
       let ComListIcons = document.getElementsByClassName("ComListIcon");  
       for(let i=0;i<ComListIcons.length;i++){
        let tempColorVal = "";
        if(i==iconIndex){
             tempColorVal = "#2483ff"; 
        }
        ComListIcons[i].style.color = tempColorVal;
       }
       if(iconIndex==0){
            this.setState({
                showState:'image'
            })
       }else if(iconIndex==1){
            
            this.setState({
                showState:'icon'
            })
       }
    }

    render() {
        const ComponentListData = this.props.ComponentList;
        const cptIndex = this.props.cptIndex;
        const tempLayerDatas = this.state.leftIconLists;//.Header.state.layerDatas;
        const showState = this.state.showState;
        return (
            <div className="custom-left-list">
                <div className="custom-left-list-title"><span>图层（{ComponentListData.length}）个</span> 
                    <div className="custom-left-list-title-icons"  > 
                        <FontAwesomeIcon icon={faBus}  className="ComListIcon" style={{fontSize: '16px',color:'#2483ff'}}      onClick={event => { this.switchIconView(event,0) }}   /> 
                        <FontAwesomeIcon icon={faBus}   className="ComListIcon" style={{margin: '0px 8px',fontSize: '16px'}} onClick={event => { this.switchIconView(event,1) }}     />
                    </div>
                 </div>
                <div className="custom-left-list-tools"></div>
                <div className="custom-left-list-p">
                    {
                        ComponentListData.map((item, layerIndex) => {
                            const c = `custom-header-menu-li-bg ${item.id}bg`;
                            return (
                                <div key={item.key} className="custom-left-list-toolbar"    style={{backgroundColor:(layerIndex==cptIndex)?'#2483ff':''}}  onClick={event => { this.selectCliclSingleLayer(event, item, layerIndex) }}      >
                                    {
                                        showState=='image'?<div className={c} ></div>:true
                                    }
                                    {
                                        showState=='icon'?
                                        tempLayerDatas.map((iconItem,iconIndex) => {
                                            if(iconItem.prevName == item.simpleType){
                                                return (<FontAwesomeIcon   style={{color:'#bcc9d4'}} icon={iconItem.IconObj} />)
                                            }
                                        }):true
                                    }
                                    <div className="custom-left-list-toolbar-item"   style={{top:(showState=='icon')?'0%':'-37%'}}   name={item.key}>{item.title}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default ComponentList;