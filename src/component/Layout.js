import './Layout.css';
import React, {Component, Fragment} from 'react';
import Header from './Header';
import Content from './Content';
import ComponentList from './ComponentList';
import Config from './Config';
import LoadChart from "./LoadChart";
import {chartOption} from "../utils/chart";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cptIndex: 0,
            cptType: '',
            cptKey: '',
            cptKeyList: [], //组件集合
            cptPropertyList: [],//所有组件属性集合
            cptPropertyObj: {   //当前组件属性及内容属性
                cptBorderObj: {           //边框属性
                    width: this.props.width || 350,
                    height: this.props.height || 260,
                    xWidth: this.props.xWidth || 330,
                    xHeight: this.props.xHeight || 240,
                    x: 450,
                    y: 160,
                    xLeft: 450,
                    xTop: 160
                },
                type: 'bg',
                cptType: 'bg'
            }
        }
    }

    handleScriptCreate(obj) {
        this.setState({scriptLoaded: false})
    }

    handleScriptError() {
        this.setState({scriptError: true})
    }

    handleScriptLoad(obj) {
        this.setState({scriptLoaded: true, scriptStatus: 'yes'})
    }

    onClickAdd(obj) {
        const id = obj.target.id;
        const type = obj.target.type;
        const text = obj.target.innerText;
        //const t = document.getElementById("chart_type").value;//暂时先从下拉列表获取图表类型，后续在更改
        const key = new Date().getTime().toString();
        const cptkObj = {key: key, value: id};

        const len = this.state.cptKeyList.length;
        const cptpObj = {
            cptBorderObj: {
                width: 350,
                height: 260,
                xWidth: 330,
                xHeight: 240,
                x: 450,
                y: 160,
                xLeft: 450,
                xTop: 160
            },
            type: type,
            cptType: id
        };
        this.setState({
            cptIndex: len,
            cptType: id,
            cptKey: key,
            cptKeyList: [...this.state.cptKeyList, cptkObj],
            cptPropertyList: [...this.state.cptPropertyList, cptpObj],
            cptPropertyObj: cptpObj
        }, () => {
            console.log(`这个组合:${this.state}`);
            {
                chartOption(this.state.cptType, this.state.cptKey)
            }
        });
    }

    ondelItem(i) {
        let cptkList = this.state.cptKeyList;
        let cptpList = this.state.cptPropertyList;
        let arr = window.arr ? window.arr : [];
        cptkList.splice(i, 1);
        cptpList.splice(i, 1);
        if (arr.length > 0) {
            arr.splice(i, 1);
            window.arr = arr;
        }
        const cptpObj = cptpList[0] ? cptpList[0] : {
            cptBorderObj: {           //边框属性
                width: 350,
                height: 260,
                xWidth: 330,
                xHeight: 240,
                x: 0,
                y: 0,
                xLeft: 0,
                xTop: 0
            },
            type: 'bg',
            cptType: 'bg'
        };

        this.setState({
            cptIndex: 0,
            cptKey: '',
            cptType: cptpObj.cptType ? cptpObj.cptType : '',
            cptKeyList: cptkList,
            cptPropertyList: cptpList,
            cptPropertyObj: cptpObj
        }, () => {
            //{chartOption(this.state.cptType, this.state.cptKey)}
        });
    }

    handleResizeMove = (e) => {
        const index = parseInt(e.target.parentNode.parentNode.getAttribute("index"));

        const width = e.rect.width;
        const height = e.rect.height;
        const left = e.rect.left;
        const top = e.rect.top;
        const xWidth = e.rect.width - 20;
        const xHeight = e.rect.height - 20;
        const x = e.delta.x;
        const y = e.delta.y;

        let cptpList = this.state.cptPropertyList;
        const t = cptpList[index].cptType ? cptpList[index].cptType : 'bg';
        const type = cptpList[index].type ? cptpList[index].type : 'bg';
        let cptpObj = {
            cptBorderObj: {
                width,
                height,
                left,
                top,
                xWidth,
                xHeight,
                x,
                y
            },
            type: type,
            cptType: t
        };
        cptpList[index] = cptpObj;

        this.setState({
            cptIndex: index,
            cptPropertyList: cptpList,
            cptPropertyObj: cptpObj
        }, () => {
            {
             chartOption(this.state.cptType, this.state.cptKey)
             }
        });

    }

    handleResizeEnd = (e) => {
        const index = parseInt(e.target.parentNode.parentNode.getAttribute("index"));

        const width = e.rect.width;
        const height = e.rect.height;
        const left = e.rect.left;
        const top = e.rect.top;
        const xWidth = e.rect.width - 20;
        const xHeight = e.rect.height - 20;
        const x = e.delta.x;
        const y = e.delta.y;

        let cptpList = this.state.cptPropertyList;
        const t = cptpList[index].cptType ? cptpList[index].cptType : 'bg';
        const type = cptpList[index].type ? cptpList[index].type : 'bg';
        let cptpObj = {
            cptBorderObj: {
                width,
                height,
                left,
                top,
                xWidth,
                xHeight,
                x,
                y
            },
            type: type,
            cptType: t
        };
        cptpList[index] = cptpObj;

        this.setState({
            cptIndex: index,
            cptPropertyList: cptpList,
            cptPropertyObj: cptpObj
        }, () => {
            {
                chartOption(this.state.cptType, this.state.cptKey)
            }
        });
    }

    handleDown = (e) => {
        const index = parseInt(e.target.parentNode.parentNode.getAttribute("index"));

        const id = e.target.nextSibling.getAttribute("id");
        let cptkList = this.state.cptKeyList;
        let cptpList = this.state.cptPropertyList;

        const cptkObj = cptkList[index];
        const cptpObj = cptpList[index];
        const t = cptpObj.cptType ? cptpObj.cptType : 'bg';

        cptkList.splice(index, 1);
        cptpList.splice(index, 1);

        cptkList.push(cptkObj);
        cptpList.push(cptpObj);

        this.setState({
            cptIndex: index,
            cptKey: id,
            cptType: t,
            cptKeyList: cptkList, //组件集合
            cptPropertyList: cptpList,//所有组件属性集合
            cptPropertyObj: cptpObj
        });
    }

    changeProperties(obj) {
        const index = obj.index;
        let cptpList = this.state.cptPropertyList;
        let cptpObj = this.state.cptPropertyList[index];
        cptpObj.cptBorderObj.width = obj.width;
        cptpObj.cptBorderObj.height = obj.height;
        cptpObj.cptBorderObj.xWidth = obj.width - 20;
        cptpObj.cptBorderObj.xHeight = obj.height - 20;

        cptpList[index] = cptpObj;

        this.setState({
            cptIndex: index,
            cptPropertyList: cptpList,
            cptPropertyObj: cptpObj
        }, () => {
            console.log(`这个组合:${this.state}`);
            {
                chartOption(this.state.cptType, this.state.cptKey)
            }
        });
    }

    render() {
        return (
            <Fragment>
                <Header onClickAdd={this.onClickAdd.bind(this)}/>
                <div className="custom-content">
                    <ComponentList ComponentList={this.state.cptKeyList}/>
                    <div className="custom-content-p">
                        {
                            this.state.cptKeyList.map((item, i) => {
                                return (
                                    <div index={i} key={item.key}>
                                        <Content id={item.key} del={this.ondelItem.bind(this)}
                                                 delIndex={i}
                                                 handleResizeMove={this.handleResizeMove}
                                                 handleResizeEnd={this.handleResizeEnd}
                                                 handleDown={this.handleDown}
                                                 obj={this.state.cptPropertyList[i]}>
                                        </Content>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <Config changeProperties={this.changeProperties.bind(this)}
                            controlPropertyObj={this.state.cptPropertyObj}
                            cptIndex={this.state.cptIndex}/>
                </div>
            </Fragment>
        );
    }
}

export default Layout;