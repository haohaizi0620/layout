/*
 * @Author: your name
 * @Date: 2020-03-20 09:37:00
 * @LastEditTime: 2020-03-26 16:30:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\TextLayer.js
 */
import React, {Component} from 'react';
import BaseTable from './tableLayer/BaseTable.jsx';
import CarouselList from './tableLayer/CarouselListLayer.js';
import ScrollRanking from './tableLayer/ScrollRankingLayer.js';

class TableLayer extends Component {
    static defaultProps = {
        layerData: {},
        layerSinId: "",
        timeKey: ""
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {layerData, layerSinId} = this.props;
        if (layerSinId === "baseTable") {
            return (
                <BaseTable data={layerData.data} config={layerData.config} columns={layerData.columns}/>
            )
        } else if(layerSinId === "carouselList"){
            return (
                <CarouselList  layerData={layerData} />
            )
        } else if(layerSinId === "scrollRanking"){
            return (
                <ScrollRanking layerData={layerData}/>
            )
        }else {
            return null
        }
    }

}

export default TableLayer;