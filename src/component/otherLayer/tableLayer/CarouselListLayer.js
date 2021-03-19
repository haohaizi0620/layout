import React, {Component} from 'react';
import $ from 'jquery';
import './CarouselListLayer.css';

class CarouselList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
    }

    componentDidMount() {
        console.info(1);
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
        }, 1000);
    }


    render() {
        let {playSpeed, tableHeader, tableBody, border} = this.props.layerData;
        let data = this.state.data;
        let uuid = this.uuid();

        var obj = {
            constructor: uuid,
            speed: 99 / playSpeed,  //滚动速度,值越大速度越慢
            rowHeight: tableBody.fontSize //每行的高度
        };

        this.update(obj);
        return (
            <div class="myscroll" id={uuid}>
                <table className="gridtable">
                    <thead>
                    {
                        data.map((item, i) => {
                            let keyArr = Object.getOwnPropertyNames(item);
                            if (i === 0) {
                                return (
                                    <tr>
                                        {
                                            keyArr.map((item1) => {
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
                                                        lineHeight: tableHeader.fontSize * 2 + 'px',
                                                        height:tableHeader.fontSize * 2 + 'px',
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
                        data.map((item) => {
                            let keyArr = Object.getOwnPropertyNames(item);
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
                                                    lineHeight: tableBody.fontSize * 2 + 'px',
                                                    height:tableHeader.fontSize * 2 + 'px',
                                                }}>{item[item1]}</td>
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
        var opts = $.extend({}, options), intId = [];

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
        var a = window['' + id1];
        if (a) {
            clearInterval(a);
        }
        var MyMar3 = setInterval(function () {
            marquee(id1, sh);
        }, speed);
        window['' + id1] = MyMar3;
    }

}

export default CarouselList;