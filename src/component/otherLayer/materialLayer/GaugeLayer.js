import React, {Component} from 'react';
import {Gauge} from '@ant-design/charts';

class GaugeLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {format, percent, font, gauge} = this.props.layerData;
        percent = percent/100.00;
        //percent = percent.toFixed(4);
        let begin = gauge.beginColor ? gauge.beginColor : 'rgba(180,226,255,1)';
        let end = gauge.endColor ? gauge.endColor : 'rgba(149,152,255,1)';

        var config = {
            percent: percent,
            range: {color: 'l(0) 0:' + begin + ' 1:' + end},
            startAngle: Math.PI,
            endAngle: 2 * Math.PI,
            indicator: null,
            statistic: {
                title: {
                    offsetY: -(font.size+16),
                    style: {
                        fontSize: font.size,
                        color: font.color ? font.color : 'rgba(255,255,255,1)',
                    },
                    formatter: function formatter(_ref) {
                        let percent = _ref.percent*100;
                        let per = parseFloat(percent);
                        per = per.toFixed(2);
                        return per + '%';
                    },
                },
                content: {
                    style: {
                        fontSize: font.size,
                        lineHeight: (font.size+16)+'px',
                        color: font.color ? font.color : 'rgba(255,255,255,1)',
                    },
                    formatter: function formatter() {
                        return format;
                    },
                },
            },
        };
        return (
            <Gauge {...config}/>
        );
    }
}

export default GaugeLayer;