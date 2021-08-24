import React, {Component} from 'react';
import {RadialBar} from '@ant-design/charts';

class RadialBarLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [{"name":"分类一","value":297},{"name":"分类二","value":604},{"name":"分类三","value":933}]
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
                    value: data.value,
                }))
                .catch(e => console.log("error", e));
        } else {
            this.setState({
                value: textCenter.value,
            })
        }


        _this.timeClose = setInterval(() => {
            let {url} = _this.props.layerData;
            if (url) {
                fetch(url + "?time=" + new Date().getTime()).then(response => response.json())
                    .then(data => this.setState({
                        value: data.value,
                    }))
                    .catch(e => console.log("error", e));
            }
        }, 1000);
    }

    render() {
        let {positionObj, radialBar} = this.props.layerData;

        var config = {
            width: parseInt(positionObj.cptBorderObj.width),
            height: parseInt(positionObj.cptBorderObj.height),
            autoFit: true,
            xField: 'name',
            yField: 'value',
            data: this.state.value === ''?[{"name":"分类一","value":297},{"name":"分类二","value":604},{"name":"分类三","value":933}]:this.state.value,
            type: radialBar.type === 'normal' ? '' : radialBar.type,
            maxAngle: radialBar.maxAngle,
            innerRadius: radialBar.innerRadius ? radialBar.innerRadius : 0.2,
            radius: radialBar.radius ? radialBar.radius : 0.8,
            barStyle: {
                fill: radialBar.fill ? radialBar.fill : 'rgba(81,126,247,1)',
                stroke: radialBar.stroke ? radialBar.stroke : 'rgba(81,126,247,1)',
                lineWidth: radialBar.lineWidth ? radialBar.lineWidth : 1,
            },
            /*label: {
                style: {
                    fill: 'red',
                    opacity: 1,
                    fontSize: 24
                },
                rotate: true
            },
            axis: {
                label: {
                    style: {
                        fill: 'red',
                        opacity: 1,
                        fontSize: 24,
                    }
                }
            }*/
        };
        return (
            <RadialBar {...config}/>
        );
    }
}

export default RadialBarLayer;
