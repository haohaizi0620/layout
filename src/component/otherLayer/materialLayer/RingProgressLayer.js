import React, {Component} from 'react';
import {RingProgress} from '@ant-design/charts';

class RingProgressLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {positionObj,format, percent, font, ringProgress} = this.props.layerData;
        percent = percent/100.00;
        console.info(this.props);

        var config = {
            width:parseInt(positionObj.cptBorderObj.width),
            height:parseInt(positionObj.cptBorderObj.height),
            autoFit: false,
            percent: percent,
            //color:ringProgress.fill?ringProgress.fill:'rgba(81,126,247,1)',
            innerRadius: ringProgress.innerRadius?ringProgress.innerRadius:0.85,
            radius: ringProgress.radius?ringProgress.radius:0.98,
            progressStyle:{
                fill:ringProgress.fill?ringProgress.fill:'rgba(81,126,247,1)',
                stroke:ringProgress.stroke?ringProgress.stroke:'rgba(81,126,247,1)',
                lineWidth:ringProgress.lineWidth?ringProgress.lineWidth:1,
            },
            statistic: {
                title: {
                    style: {
                        color: font.color ? font.color : 'rgba(255,255,255,1)',
                        fontSize: font.size+'px',
                        lineHeight: (font.size+16)+'px'
                    },
                    formatter: function formatter() {
                        return format;
                    }
                },
                content: {
                    style: {
                        fontSize: font.size,
                        lineHeight: (font.size+16)+'px',
                        color: font.color ? font.color : 'rgba(255,255,255,1)',
                    }
                },
            }
        };
        return (
            <RingProgress {...config}/>
        );
    }
}

export default RingProgressLayer;