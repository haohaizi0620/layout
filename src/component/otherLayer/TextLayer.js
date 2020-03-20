/*
 * @Author: your name
 * @Date: 2020-03-20 09:37:00
 * @LastEditTime: 2020-03-20 10:09:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\TextLayer.js
 */
import React, { Component } from 'react';
import CurrentTime from './textLayer/CurrentTime';
import SingleRowText from './textLayer/SingleRowText';
import MultiLineText from './textLayer/MultiLineText';

class TextLayer extends Component {
    static defaultProps = {
        chartData : {},
        layerSinId : "",
        timeKey : ""
    }

    constructor(props) {
        super(props);
        this.state = { 
         }
    }
    render() { 
       let chartData = this.props.chartData;
       let layerSinId = this.props.layerSinId;
       let timeKey = this.props.timeKey
       if(layerSinId=="multiLineText"){
         return (
             <MultiLineText
                chartData={chartData}
                timeKey={timeKey}
             />
         ); 
       }else{
         return (
            <div
                    id={timeKey}
                    style={{
                        width: '100%',
                        height: '100%',
                        textAlign:chartData ? (chartData.textAlign ? chartData.textAlign : '') : ''
                    }}>
                    {
                        layerSinId=="singleRowText"?<SingleRowText  chartData = {chartData} />:null
                    }
                    {
                        layerSinId=="moreRowText"?<CurrentTime  chartData = {chartData} />:null
                    }
            </div>  
         )
       }
    }
   
}
 
export default TextLayer;