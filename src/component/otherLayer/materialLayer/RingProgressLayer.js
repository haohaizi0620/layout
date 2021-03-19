import React, {Component} from 'react';
import {RingProgress} from '@ant-design/charts';

class RingProgressLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0
        }
    }

    componentDidMount() {
        this.regular();
    }

    componentWillUnmount() {
        clearInterval(this.timeClose);
    }

    regular() {
        let _this = this;

        let {url, textCenter} = _this.props.layerData;
        if (url) {
            fetch(url + "?time=" + new Date().getTime()).then(response => response.json())
                .then(data => this.setState({
                    percent: data.value,
                }))
                .catch(e => console.log("error", e));
        } else {
            this.setState({
                percent: textCenter.value,
            })
        }


        _this.timeClose = setInterval(() => {
            let {url, textCenter} = _this.props.layerData;
            if (url) {
                fetch(url + "?time=" + new Date().getTime()).then(response => response.json())
                    .then(data => this.setState({
                        percent: data.value,
                    }))
                    .catch(e => console.log("error", e));
            }
        }, 1000);
    }

    render() {
        let {positionObj, format, font, ringProgress} = this.props.layerData;
        let percent = this.state.percent / 100.00;

        var config = {
            width: parseInt(positionObj.cptBorderObj.width),
            height: parseInt(positionObj.cptBorderObj.height),
            autoFit: true,
            percent: percent,
            color: [ringProgress.fill?ringProgress.fill:'rgba(81,126,247,1)','rgba(232,237,243,1)'],
            innerRadius: ringProgress.innerRadius ? ringProgress.innerRadius : 0.85,
            radius: ringProgress.radius ? ringProgress.radius : 0.98,
            progressStyle: {
                //fill: ringProgress.fill ? ringProgress.fill : 'rgba(81,126,247,1)',
                stroke: ringProgress.stroke ? ringProgress.stroke : 'rgba(81,126,247,1)',
                lineWidth: ringProgress.lineWidth ? ringProgress.lineWidth : 1,
            },
            statistic: {
                title: {
                    style: {
                        color: font.color ? font.color : 'rgba(255,255,255,1)',
                        fontSize: font.size + 'px',
                        lineHeight: (font.size + 16) + 'px'
                    },
                    formatter: function formatter() {
                        return format;
                    }
                },
                content: {
                    style: {
                        fontSize: font.size,
                        lineHeight: (font.size + 16) + 'px',
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