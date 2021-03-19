import React, {Component} from 'react';
import ScrollRankingBoard from '@jiaminghi/data-view-react/es/ScrollRankingBoard';

class ScrollRanking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
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

        let {url, data} = _this.props.layerData;
        if (url) {
            fetch(url + "?time=" + new Date().getTime()).then(response => response.json())
                .then(data => this.setState({
                    data: data,
                }))
                .catch(e => console.log("error", e));
        } else {
            this.setState({
                data: data,
            })
        }


        _this.timeClose = setInterval(() => {
            let {url, data} = _this.props.layerData;
            if (url) {
                fetch(url + "?time=" + new Date().getTime()).then(response => response.json())
                    .then(data => this.setState({
                        data: data,
                    }))
                    .catch(e => console.log("error", e));
            }
        }, 10000);
    }


    render() {
        let {positionObj, rowNum, waitTime, carousel, unit} = this.props.layerData;
        let time = parseInt(waitTime) * 1000;
        let data = this.state.data;
        let config = {
            data: data === ''?[{"name":"重庆市","value":3101.79},{"name":"上海市","value":2423.78},{"name":"北京市","value":2154.2},{"name":"成都市","value":1633},{"name":"天津市","value":166.6},{"name":"广州市","value":1490.44},{"name":"深圳市","value":1302.66},{"name":"武汉市","value":1418.65},{"name":"南阳市","value":1198.07},{"name":"临沂市","value":1124}]:data,
            rowNum: rowNum ? rowNum : 5,
            waitTime: time ? time : 1000,
            carousel: carousel ? carousel : 'single',
            unit: unit ? unit : ''

        }
        console.info(positionObj.cptBorderObj);
        return (
            <ScrollRankingBoard config={config} style={{
                width: positionObj.cptBorderObj.width ? positionObj.cptBorderObj.width : 280,
                height: positionObj.cptBorderObj.height ? positionObj.cptBorderObj.height : 260
            }}/>
        )
    }

}

export default ScrollRanking;