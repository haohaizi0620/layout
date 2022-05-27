import React, {Component} from 'react';
import $ from 'jquery';
import './CarouselListLayer.css';
import typeObj from '../../../router/type';

let baseUrl;
let deployPrev;
let localPrev;
if ("/data/" === typeObj.project) {
    deployPrev = "http://172.26.50.89/data/";
    localPrev = "http://127.0.0.1:8776/data/";
} else {
    deployPrev = "http://172.26.50.89/share/";
    localPrev = "http://127.0.0.1:8777/share/";
}

if (typeObj.issue) {
    baseUrl = deployPrev;
} else {
    baseUrl = localPrev;
}


class CarouselList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                "status": 1,
                "info": "success",
                "count": 0,
                "data": {
                    "type": "FeatureCollection",
                    "features": []
                }
            }
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
            let url1 = url;
            if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
                url1 = url;
            } else {
                url1 = baseUrl + url;
            }
            fetch(url1).then(response => response.blob())
                .then(data => {
                    let reader = new FileReader();
                    reader.onload = () => {
                        let text = reader.result;
                        this.setState({
                            data: JSON.parse(text),
                        })
                    }
                    reader.readAsText(data, 'GBK');
                })
                .catch(e => console.log("error", e));
        } else {
            this.setState({
                data: data,
            })
        }


        _this.timeClose = setInterval(() => {
            let {url} = _this.props.layerData;
            if (url) {
                let url1 = url;
                if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
                    url1 = url;
                } else {
                    url1 = baseUrl + url;
                }
                fetch(url1).then(response => response.blob())
                    .then(data => {
                        let reader = new FileReader();
                        reader.onload = () => {
                            let text = reader.result;
                            this.setState({
                                data: JSON.parse(text),
                            })
                        }
                        reader.readAsText(data, 'GBK');
                    })
                    .catch(e => console.log("error", e));
            }
        }, 1000);
    }


    render() {
        let {playSpeed, tableHeader, tableBody, border, url, data} = this.props.layerData;
        //let data = data;
        if (url) {
            data = this.state.data;
        }
        let uuid = this.uuid();

        var obj = {};
        if (playSpeed === 0) {
            obj = {
                constructor: uuid,
                speed: 0,  //滚动速度,值越大速度越慢
                rowHeight: tableBody.fontSize //每行的高度
            }
        } else {
            obj = {
                constructor: uuid,
                speed: 99 / playSpeed,  //滚动速度,值越大速度越慢
                rowHeight: tableBody.fontSize //每行的高度
            }
        }


        this.update(obj);
        return (
            <div class="myscroll" id={uuid}>
                <table className="gridtable">
                    <thead>
                    {
                        data.data.features.map((item, i) => {
                            let keyArr = Object.getOwnPropertyNames(item.properties);
                            if (i === 0) {
                                return (
                                    <tr>
                                        {
                                            keyArr.map((item1, index) => {
                                                return (
                                                    <th style={{
                                                        textAlign: tableHeader.textAlign,
                                                        fontFamily: tableHeader.fontFamily,
                                                        fontSize: tableHeader.fontSize,
                                                        color: tableHeader.fontColor,
                                                        fontWeight: tableHeader.fontWeight,
                                                        backgroundColor: tableHeader.backgroundColor,
                                                        borderWidth: border.borderWidth,
                                                        borderStyle: border.borderStyle,
                                                        borderColor: border.borderColor,
                                                        //lineHeight: tableHeader.fontSize * 2 + 'px',
                                                        //height: tableHeader.fontSize * 2 + 'px',
                                                    }}>{item1}</th>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            }
                        })
                    }
                    </thead>
                    <tbody>
                    {
                        data.data.features.map((item) => {
                            let keyArr = Object.getOwnPropertyNames(item.properties);
                            return (
                                <tr>
                                    {
                                        keyArr.map((item1) => {
                                            return (
                                                <td style={{
                                                    textAlign: tableBody.textAlign,
                                                    fontFamily: tableBody.fontFamily,
                                                    fontSize: tableBody.fontSize,
                                                    color: tableBody.fontColor,
                                                    fontWeight: tableBody.fontWeight,
                                                    backgroundColor: tableBody.backgroundColor,
                                                    borderWidth: border.borderWidth,
                                                    borderStyle: border.borderStyle,
                                                    borderColor: border.borderColor,
                                                    //lineHeight: tableBody.fontSize * 2 + 'px',
                                                    //height: tableHeader.fontSize * 2 + 'px',
                                                }}>{item.properties[item1]}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }

    uuid() {
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

    update(options) {
        var opts = $.extend({}, options);

        function marquee(id, step) {
            var obj = $('#' + id);
            obj.find("tbody").animate({
                marginTop: '-=1'
            }, 0, function () {
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if (s >= step) {
                    $(this).find("tr").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        var id1 = opts["constructor"], sh = opts["rowHeight"], speed = opts["speed"];
        if (speed > 0) {
            var a = window['' + id1];
            if (a) {
                clearInterval(a);
            }
            var MyMar3 = setInterval(function () {
                marquee(id1, sh);
            }, speed);
            window['' + id1] = MyMar3;
        } else {
            //marquee(id1, sh);
        }

    }

}

export default CarouselList;
