/*
 * @Author: your name
 * @Date: 2020-03-20 09:37:00
 * @LastEditTime: 2020-03-26 16:30:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\TextLayer.js
 */
import React, { Component } from 'react';
import CurrentTime from './textLayer/CurrentTime';
import SingleRowText from './textLayer/SingleRowText';
import MultiLineText from './textLayer/MultiLineText';
import RollText from './textLayer/RollText';
import Statistic1 from './textLayer/Statistic1';

class TextLayer extends Component {
    static defaultProps = {
        layerData : {},
        layerSinId : "",
        timeKey : ""
    }

    constructor(props) {
        super(props);
        this.state = {
         }
    }
    render() {
        let {layerData,layerSinId,timeKey} = this.props;
       if(layerSinId==="multiLineText"){
         return (
             <MultiLineText
                layerData={layerData}
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
                        textAlign:layerData ? (layerData.textAlign ? layerData.textAlign : '') : ''
                    }}>
                    {
                        layerSinId==="singleRowText"?<SingleRowText  layerData = {layerData} />:null
                    }
                    {
                        layerSinId==="moreRowText"?<CurrentTime  layerData = {layerData} />:null
                    }
                    {
                        layerSinId==="rollText"?<RollText  layerData = {layerData} />:null

                    }
                    {
                        layerSinId==="Statistic"?<Statistic1  layerData = {layerData} />:null

                    }
            </div>
         )
       }
    }

}

export default TextLayer;