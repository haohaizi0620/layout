import React, {Component} from 'react';
import {Liquid} from '@ant-design/charts';

class LiquidLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {format, percent, font, liquid} = this.props.layerData;
        percent = percent/100.00;
        //percent = percent.toFixed(4);

        var config = {
            percent: percent,
            statistic: {
                title: {
                    formatter: function formatter() {
                        return format;
                    },
                    style: function () {
                        return {fill: font.color ? font.color : 'rgba(0,0,0,1)'}
                    }
                },
                content: {
                    style: {
                        fontSize: font.size,
                        lineWidth: liquid.lineWidth,
                        fill: font.color ? font.color : 'rgba(0,0,0,1)',
                    },
                }
            },
            liquidStyle: {
                fill: liquid.fill ? liquid.fill : 'rgba(111,149,247,1)',
                fillOpacity: 1,
                stroke: liquid.stroke ? liquid.stroke : 'rgba(88,131,247,1)',
                lineWidth: liquid.lineWidth ? liquid.lineWidth : 1
            }

        };
        return (
            <Liquid {...config}/>
        );
    }
}

export default LiquidLayer;