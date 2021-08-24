import React, {Component} from 'react';
import WaterLevelPond from '@jiaminghi/data-view-react/es/waterLevelPond';

class WaterLevelPondLayer extends Component {
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
            let {url} = _this.props.layerData;
            if (url) {
                fetch(url + "?time=" + new Date().getTime()).then(response => response.json())
                    .then(data => this.setState({
                        percent: data.value,
                    }))
                    .catch(e => console.log("error", e));
            }
        }, 3000);
    }

    render() {
        let {positionObj, waterLevel} = this.props.layerData;
        let config = {
            data: [this.state.percent],
            shape: waterLevel.shape ? waterLevel.shape : 'rect',
            colors: [waterLevel.beginColor ? waterLevel.beginColor : '#00BAFF', waterLevel.endColor ? waterLevel.endColor : '#3DE7C9'],
            waveNum: waterLevel.waveNum,
            waveHeight: waterLevel.waveHeight,
            waveOpacity: waterLevel.waveOpacity
        };
        let uuid = this.uuid();
        return (
            <WaterLevelPond config={config} style={{
                width: positionObj.cptBorderObj.width?positionObj.cptBorderObj.width:300,
                height: positionObj.cptBorderObj.height?positionObj.cptBorderObj.height:300
            }} key={uuid}/>
        );
    }

    uuid(){
        var s = [];
        var hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        //s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }

}


export default WaterLevelPondLayer;
