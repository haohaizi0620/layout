import React, { Component, Fragment } from 'react';
import PropertieData from '../datasource/properties.json'
import ReactColor from './globalCom/ReactColor.js'
import {
    Form,
    Input,
    InputNumber,
    Slider,
    Col,
    Row,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';
import '../css/Spinner.css'
import '../css/Properties.css'
import '../css/base.css'
import 'antd/dist/antd.css';
import store from '../redux/store';
import ImageUploading from './globalCom/ImageUploading';
const { Option } = Select;
/*
 * 样式面板组件
 */
class Properties extends Component {
    constructor(props) {
        super(props);
        let cptBorderObj = store.getState().showLayerDatas.showDatas.cptBorderObj;
        let bgFieldObj = store.getState().showLayerDatas.bgFieldObj;
        let textFieldObj = {
            textSize: '30px',
            textColor: 'rgba(255,255,255,1)',
            textCenter: '标题',
            width: 280,
            height: 260,
            left: 450,
            top: 160,
            opacity: 1,
            borderWidth: '1',
            borderStyle: 'solid',
            borderColor: 'rgba(255, 47, 3 ,1)'
        };
        this.state = {
            bg: [
                {
                    "ename": 'screenSize',
                    "name": "画布大小",
                    "childer": [
                        {
                            "ename": "bjWidth",
                            "cname": "宽度",
                            "type": "InputNumber",
                            "value": bgFieldObj.bjWidth
                        },
                        {
                            "ename": "bjHeight",
                            "cname": "高度",
                            "type": "InputNumber",
                            "value": bgFieldObj.bjHeight
                        }
                    ]
                },
                {
                    "ename": 'backgroundColor',
                    "name": "背景颜色",
                    "childer": [{
                        "ename": "bgColor",
                        "cname": "背景颜色",
                        "type": "Color",
                        "value": bgFieldObj.bgColor
                    }]
                },
                {
                    "ename": 'bgImageName',
                    "name": "背景颜色",
                    "childer": [{
                        "ename": "bgImageName",
                        "cname": "",
                        "type": "Select",
                        "value": bgFieldObj.bgImageName,
                        "defaultOption": "无",
                        "optionValues": [
                            { "cname": '无', "value": '无' },
                            { "cname": '背景一', "value": '背景一' },
                            { "cname": '背景二', "value": '背景二' },
                            { "cname": '背景三', "value": '背景三' },
                            { "cname": '背景四', "value": '背景四' },
                            { "cname": '背景五', "value": '背景五' },
                            { "cname": '背景六', "value": '背景六' },
                            /* {"cname":'无',"value":'none'},
                            {"cname":'背景一',"value":'http://localhost/kshCharsTempJs/ksh/bg1.png'},
                            {"cname":'背景二',"value":'http://localhost/kshCharsTempJs/ksh/bg2.png'},
                            {"cname":'背景三',"value":'http://localhost/kshCharsTempJs/ksh/bg3.png'},
                            {"cname":'背景四',"value":'http://localhost/kshCharsTempJs/ksh/bg4.png'},
                            {"cname":'背景五',"value":'http://localhost/kshCharsTempJs/ksh/bg5.png'},
                            {"cname":'背景六',"value":'http://localhost/kshCharsTempJs/ksh/bg6.png'}, */
                        ]
                    }, {
                        "ename": "bgImageIntegerUrl",
                        "cname": "在线图片",
                        "type": "Input",
                        "value": bgFieldObj.bgImageIntegerUrl,
                        "placeholder": "图片路径"
                    }, {
                        "ename": "uploadImage",
                        "cname": "预览图片",
                        "type": "ImageUploading",
                        "value": bgFieldObj.uploadImage,
                        "optionFlag": false
                    }]
                }
            ],
            chart: [
                {
                    "ename": "chartSize",
                    "name": "图表大小",
                    "childer": [
                        {
                            "ename": "width",
                            "cname": "宽度",
                            "type": "InputNumber",
                            "value": cptBorderObj.width,
                            "maxNumber": 2000,
                            "minNumber": 80,
                        },
                        {
                            "ename": "height",
                            "cname": "高度",
                            "type": "InputNumber",
                            "value": cptBorderObj.height,
                            "maxNumber": 2000,
                            "minNumber": 80,
                        }
                    ]
                },
                {
                    "ename": "chartPosition",
                    "name": "图表位置",
                    "childer": [
                        {
                            "ename": "left",
                            "cname": "距左",
                            "type": "InputNumber",
                            "value": cptBorderObj.left,
                            "maxNumber": 2000,
                            "minNumber": 80,
                        },
                        {
                            "ename": "top",
                            "cname": "距上",
                            "type": "InputNumber",
                            "value": cptBorderObj.top,
                            "maxNumber": 2000,
                            "minNumber": 80,
                        }
                    ]
                },
                // {
                //     "ename": "rotationAngle",
                //     "name": "旋转角度",
                //     "childer": [
                //         {
                //             "ename": "left",
                //             "cname": "角度",
                //             "type": "InputNumber",
                //             "value": "0"
                //         }
                //     ]
                // },
                {
                    "ename": "opacity",
                    "name": "透明度",
                    "childer": [
                        {
                            "ename": "opacity",
                            "cname": "透明度",
                            "type": "Slider",
                            "value": cptBorderObj.opacity
                        }
                    ]
                },
            ],
            text: [
                {
                    "ename": 'textCenter',
                    "name": "标题内容",
                    "childer": [{
                        "ename": "textCenter",
                        "cname": "标题内容",
                        "type": "Input",
                        "value": textFieldObj.textCenter,
                        "placeholder": "标题内容"
                    }]
                },
                {
                    "ename": "textSize",
                    "name": "字体大小",
                    "childer": [
                        {
                            "ename": "textSize",
                            "cname": "",
                            "type": "Select",
                            "value": textFieldObj.textSize,
                            "defaultOption": "30px",
                            "optionValues": [
                                { "cname": '20px', "value": '20px' },
                                { "cname": '24px', "value": '24px' },
                                { "cname": '26px', "value": '26px' },
                                { "cname": '28px', "value": '28px' },
                                { "cname": '30px', "value": '30px' },
                                { "cname": '32px', "value": '32px' },
                            ]
                        }
                    ]
                },
                {
                    "ename": 'textColor',
                    "name": "字体颜色",
                    "childer": [{
                        "ename": "bgColor",
                        "cname": "字体颜色",
                        "type": "Color",
                        "value": textFieldObj.textColor
                    }]
                },
            ],
            border: [
                {
                    "ename": 'borderWidth',
                    "name": "边框宽度",
                    "childer": [{
                        "ename": "borderWidth",
                        "cname": "边框宽度",
                        "type": "InputNumber",
                        "value": textFieldObj.borderWidth,
                        "maxNumber": 30,
                        "minNumber": 0,
                    }]
                },
                {
                    "ename": "borderStyle",
                    "name": "边框样式",
                    "childer": [
                        {
                            "ename": "borderStyle",
                            "cname": "边框样式",
                            "type": "Select",
                            "value": textFieldObj.borderStyle,
                            "defaultOption": "solid",
                            "optionValues": [
                                { "cname": '无样式', "value": 'none' },
                                { "cname": '隐藏', "value": 'hidden' },
                                { "cname": '点线', "value": 'dooted' },
                                { "cname": '虚线', "value": 'dashed' },
                                { "cname": '实线', "value": 'solid' },
                                { "cname": '双线', "value": 'double' },
                                { "cname": '凹槽', "value": 'groove' },
                                { "cname": '突脊', "value": 'ridge' },
                                { "cname": '内陷', "value": 'inset' },
                                { "cname": '外凸', "value": 'outset' },
                            ]
                        }
                    ]
                },
                {
                    "ename": 'borderColor',
                    "name": "边框颜色",
                    "childer": [{
                        "ename": "borderColor",
                        "cname": "边框颜色",
                        "type": "Color",
                        "value": textFieldObj.borderColor
                    }]
                },
            ],
            layerOneselfInfo: [
                {
                    "ename": "layerName",
                    "name": "专题图图层",
                    "childer": [
                        {
                            "ename": "layerName",
                            "cname": "",
                            "type": "Input",
                            "value": '专题图图层',
                            "placeholder": "专题图图层"
                        }
                    ]
                },
                {
                    "ename": "optionName",
                    "name": "专题图名称",
                    "childer": [
                        {
                            "ename": "optionName",
                            "cname": "",
                            "type": "Input",
                            "value": "专题图名称",
                            "placeholder": "专题图名称"
                        }
                    ]
                },
                {
                    "ename": "layerPosition",
                    "name": "图表位置",
                    "childer": [
                        {
                            "ename": "layerPosition",
                            "cname": "",
                            "type": "Select",
                            "value": '图表位置',
                            "defaultOption": "left",
                            "optionValues": [
                                { "cname": '居左', "value": 'left' },
                                { "cname": '居上', "value": 'top' }
                            ]
                        }
                    ]
                },
            ]
        }
    }
    updateStateVal() {
        var tempKeyVal = this.props.tabsKey;
        if (tempKeyVal == 2) {
            let templayer = this.state.layerOneselfInfo;
            let dataObj = store.getState().showLayerDatas.cptOptionsList[this.props.cptIndex];
            var tempLayerType = this.props.cptPropertyObj.type;
            if (tempLayerType == "chart") {
                if (dataObj) {
                    let cname = dataObj.layerOption[0].mapInfor.result[0].NAME;
                    templayer[0].childer[0].value = cname;
                    templayer[1].childer[0].value = cname;
                    templayer[2].childer[0].value = cname;
                }
            } else if (tempLayerType == "text") {
                let defaultTextLayerObj = this.state.text;
                if (dataObj) {
                    let tempTextLayerObj = dataObj.layerOption;
                    defaultTextLayerObj[0].childer[0].value = tempTextLayerObj['textCenter'];
                    defaultTextLayerObj[1].childer[0].value = tempTextLayerObj['textSize'];
                    defaultTextLayerObj[2].childer[0].value = tempTextLayerObj['textColor'];
                }
                templayer = defaultTextLayerObj;
            } else if (tempLayerType == "border") {
                let defaultTextLayerObj = this.state.border;
                if (dataObj) {
                    let tempTextLayerObj = dataObj.layerOption;
                    defaultTextLayerObj[0].childer[0].value = tempTextLayerObj['borderWidth'];
                    defaultTextLayerObj[1].childer[0].value = tempTextLayerObj['borderStyle'];
                    defaultTextLayerObj[2].childer[0].value = tempTextLayerObj['borderColor'];
                }
                templayer = defaultTextLayerObj;
            }
            this.setState({
                layerOneselfInfo: templayer
            });
        } else if (tempKeyVal == 1) {
            let cptBorderObj = store.getState().showLayerDatas.showDatas.cptBorderObj;
            let tempChart = this.state.chart;
            tempChart[0].childer[0].value = cptBorderObj.width;
            tempChart[0].childer[1].value = cptBorderObj.height;
            tempChart[1].childer[0].value = cptBorderObj.left;
            tempChart[1].childer[1].value = cptBorderObj.top;
            tempChart[2].childer[0].value = cptBorderObj.opacity;
            this.setState({
                chart: tempChart
            });
        } else if (tempKeyVal == 0) {
            let bgFieldObj = store.getState().showLayerDatas.bgFieldObj;
            let tempBg = this.state.bg;
            tempBg[0].childer[0].value = bgFieldObj.bjWidth;
            tempBg[0].childer[1].value = bgFieldObj.bjHeight;
            tempBg[1].childer[0].value = bgFieldObj.bgColor;
            tempBg[2].childer[0].value = bgFieldObj.bgImageName;
            tempBg[2].childer[1].value = bgFieldObj.bgImageIntegerUrl;
            tempBg[2].childer[2].value = bgFieldObj.bgImageIntegerUrl;
            this.setState({
                bg: tempBg,
            });
        }
    }

    /**
        * @description:  改变编辑面板里面的值,并修改中间图表的数据
        * @param {number} fieldValue 当前的属性的value值
        * @param {String} fieldEname 当前属性值  
        * @param {String} layerType 当前图层的类型是背景还是图层     bg  代表背景     chart  代表其他图层   text 代表文字
        * @return:  调用layout里面的编辑当前图表的方法
        */
    updateThisCharsField(layerType, fieldValue, fieldEname) {
        this.updateStateVal();
        if (layerType == "text") {
            let templayer = this.state.text;
            if (fieldEname == "textCenter") {
                templayer[0].childer[0].value = fieldValue;
            } else if (fieldEname == "textSize") {
                templayer[1].childer[0].value = fieldValue;
            } else if (fieldEname == "textColor") {
                templayer[2].childer[0].value = fieldValue;
            }
            this.setState({
                text: templayer
            });
        }
        let tempKeyVal = this.props.tabsKey;
        if (tempKeyVal == 0) {
            layerType = "bg";
        }
        this.props.param({ fieldValue: fieldValue, fieldEname: fieldEname, thisIndex: this.props.cptIndex, layerType: layerType, tabsKey: this.props.tabsKey })
    }


    setBgColor(rgbObj) {
        let tempType = this.props.cptPropertyObj.type;
        if (tempType == "text") {
            this.props.param({ fieldValue: rgbObj, fieldEname: 'textColor', thisIndex: this.props.cptIndex, layerType: "text", tabsKey: this.props.tabsKey })
        } else if (tempType == "chart") {

        } else if (tempType == "border") {
            this.props.param({ fieldValue: rgbObj, fieldEname: 'borderColor', thisIndex: this.props.cptIndex, layerType: "border", tabsKey: this.props.tabsKey })
        }
        let tempKeyVal = this.props.tabsKey;
        if (tempKeyVal == 0) {
            this.props.param({ fieldValue: rgbObj, fieldEname: 'bgColor', thisIndex: this.props.cptIndex, layerType: "bg", tabsKey: this.props.tabsKey })
        }
    }

    setShowPreview(imageUrl) {
        this.props.param({ fieldValue: imageUrl, fieldEname: 'bgImageIntegerUrl', thisIndex: this.props.cptIndex, layerType: "bg", tabsKey: this.props.tabsKey })
        this.props.param({ fieldValue: imageUrl, fieldEname: 'bjImage', thisIndex: this.props.cptIndex, layerType: "bg", tabsKey: this.props.tabsKey })
        this.props.param({ fieldValue: imageUrl, fieldEname: 'uploadImage', thisIndex: this.props.cptIndex, layerType: "bg", tabsKey: this.props.tabsKey })
    }

    /**
     * @description: 将背景设置还原
     * @param {type} 
     * @return: 
     */
    deletePageBg() {
        this.props.param({ fieldValue: '无', fieldEname: 'bgImageName', thisIndex: this.props.cptIndex, layerType: "bg", tabsKey: this.props.tabsKey })
        this.props.param({ fieldValue: '', fieldEname: 'bgImageIntegerUrl', thisIndex: this.props.cptIndex, layerType: "bg", tabsKey: this.props.tabsKey })
        this.props.param({ fieldValue: '', fieldEname: 'bjImage', thisIndex: this.props.cptIndex, layerType: "bg", tabsKey: this.props.tabsKey })
        this.props.param({ fieldValue: '', fieldEname: 'uploadImage', thisIndex: this.props.cptIndex, layerType: "bg", tabsKey: this.props.tabsKey })
    }

    /**
     * @description: 父组件进行更新传进来的props的值的时候会进行调用的行为
     * @param {Object} nextProps  新的props的值
     * @return: 
     */
    componentWillReceiveProps(nextProps) {
        // this.updateStateValNewProps(nextProps.tabsKey);
    }
    shouldComponentUpdate() {
        return true;
    }
    render() {
        var fieldDatas = [];
        let showDatas = this.props.cptPropertyObj;
        var type = showDatas.type;
        var tempTabsKey = this.props.tabsKey;
        if (tempTabsKey == 0) {
            fieldDatas = this.state['bg']
        } else {
            if (type == 'text') {
                type = 'chart';
            }
            const cptType = showDatas.cptType;
            if (tempTabsKey == 2) {
                var tempLayerTyype = this.props.cptPropertyObj.type;
                let templayer = this.state.layerOneselfInfo;
                var allListData = store.getState().showLayerDatas.cptOptionsList;
                var dataObj = store.getState().showLayerDatas.cptOptionsList[this.props.cptIndex]
                if (tempLayerTyype == "chart") {
                    if (dataObj) {
                        let cname = dataObj.layerOption[0].mapInfor.result[0].NAME;
                        templayer[0].childer[0].value = cname;
                        templayer[1].childer[0].value = cname;
                        templayer[2].childer[0].value = cname;
                    }
                    fieldDatas = templayer;
                } else if (tempLayerTyype == "text") {
                    let defaultTextLayerObj = this.state.text;
                    if (dataObj) {
                        let tempTextLayerObj = dataObj.layerOption;
                        defaultTextLayerObj[0].childer[0].value = tempTextLayerObj['textCenter'];
                        defaultTextLayerObj[1].childer[0].value = tempTextLayerObj['textSize'];
                        defaultTextLayerObj[2].childer[0].value = tempTextLayerObj['textColor'];
                    }
                    fieldDatas = defaultTextLayerObj;
                    // fieldDatas = this.state.layerOneselfInfo;
                } else if (tempLayerTyype == "border") {
                    let defaultTextLayerObj = this.state.border;
                    if (dataObj) {
                        let tempTextLayerObj = dataObj.layerOption;
                        defaultTextLayerObj[0].childer[0].value = tempTextLayerObj['borderWidth'];
                        defaultTextLayerObj[1].childer[0].value = tempTextLayerObj['borderStyle'];
                        defaultTextLayerObj[2].childer[0].value = tempTextLayerObj['borderColor'];
                    }
                    fieldDatas = defaultTextLayerObj;
                    // fieldDatas = this.state.layerOneselfInfo;
                }
            } else if (tempTabsKey == 1) {
                fieldDatas = this.state['chart'];
            }
        }
        if (fieldDatas) {
            return (
                <div className="pro-items" >
                    {
                        fieldDatas.map((item, i) => {
                            return (
                                <EditSimpleMainInfo
                                    key={item.name}
                                    childer={item.childer}
                                    name={item.name}
                                    updateThisCharsField={this.updateThisCharsField.bind(this, this.props.cptPropertyObj.type)}//type == 'bg'?"bgLayer":"outerLayer")}
                                    setBgColor={this.setBgColor.bind(this)}
                                    setShowPreview={this.setShowPreview.bind(this)}
                                    deletePageBg={this.deletePageBg.bind(this)}
                                ></EditSimpleMainInfo>
                            );
                        })
                    }
                </div>
            );
        } else {
            return (
                <div className="pro-items">
                    <span>暂无对应图层处理</span>
                </div>
            );
        }

    }
}
class EditSimpleMainInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showImageOptionFlag: false,
        }
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <span>{this.props.name}</span>
                    </Col>
                    <Col span={18}>
                        {this.props.childer.map((item, i) => {
                            let itemType = item.type;
                            if (itemType == "InputNumber") {
                                let tempVal = parseInt(item.value);
                                // if(item.ename=="left"){
                                //     console.log("left:"+tempVal)
                                // }
                                return (
                                    <div
                                        key={item.ename}
                                        className="pro-item-simple">
                                        <InputNumber min={item.minNumber} max={item.maxNumber} onChange={event => {
                                            this.updateChartField(event, item.ename)
                                        }} value={tempVal} /><br />
                                        {
                                            // console.log(item.ename+tempVal)
                                            // item.ename=="left"?console.log("left-last:"+tempVal):true
                                        }
                                        <span>{item.cname}</span>
                                    </div>
                                );

                            } else if (itemType == "Slider") {
                                return (
                                    <div
                                        key={item.ename}
                                        className="pro-item-simple">
                                        <Row>
                                            <Col span={12}>
                                                <Slider min={0} max={1}
                                                    step={0.01}
                                                    onChange={event => {
                                                        this.updateChartField(event, item.ename)
                                                    }}
                                                    value={typeof item.value === 'number' ? item.value : 0} />
                                            </Col>
                                            <Col span={12}>
                                                <InputNumber
                                                    step={0.01}
                                                    min={0} max={1}
                                                    value={item.value}
                                                    onChange={event => {
                                                        this.updateChartField(event, item.ename)
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            } else if (itemType == "Color") {
                                return (
                                    <div className="pro-item-simple">
                                        <ReactColor key={item.ename} colorVal={item.value} setBgColor={this.setBgColor.bind(this)} />
                                    </div>
                                )
                            } else if (itemType == "ImageUploading") {
                                return (
                                    <div className="pro-item-simple">
                                        <div className="previewImage"
                                            onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}
                                            style={{
                                                backgroundImage: `url(${item.value})`,
                                                backgroundSize: '100% 100%'
                                            }}>
                                            {
                                                // item.value?<img src={item.value}  id="previewImageObj"  style={{ width: '100%',height:'auto',padding: '20px 20px'}} />:true
                                            }
                                            {
                                                this.state.showImageOptionFlag ?
                                                    <div className="previewOption">
                                                        <span className="previewOptionText"  ><span onClick={this.setUploadPageBg.bind(this)}   >更改</span>|<span onClick={this.deletePageBg.bind(this)}>删除</span></span>
                                                    </div> : true
                                            }
                                        </div>
                                        <div style={{ display: 'none' }} >
                                            <ImageUploading ref="ImageUploading" key={item.ename} colorVal={item.value} setShowPreview={this.setShowPreview.bind(this)} />
                                        </div>
                                    </div>
                                )
                            } else if (itemType == "Input") {
                                return (
                                    <div className="pro-item-simple">
                                        <Input placeholder={item.placeholder} key={item.ename} onChange={event => {
                                            this.updateChartField(event.target.value, item.ename)
                                        }}
                                            value={item.value}
                                        />
                                    </div>
                                )
                            } else if (itemType == "Select") {
                                return (
                                    <div className="pro-item-simple">
                                        <Select
                                            key={item.ename}
                                            value={item.value}
                                            showSearch
                                            placeholder="Select a person"
                                            optionFilterProp="children"
                                            onChange={event => {
                                                this.updateChartField(event, item.ename)
                                            }}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }>
                                            {
                                                item.optionValues.map((optionItem) => {
                                                    return <Option value={optionItem.value}>{optionItem.cname}</Option>
                                                })
                                            }
                                        </Select>
                                    </div>
                                )
                            }
                        })}
                    </Col>
                </Row>
            </div>
        )
    }

    /**
     * @description: 鼠标进入图片预览的里面显示选项文本
     * @param {type} 
     * @return: 
     */
    handleMouseEnter = (e) => {
        this.updateImagePreView(true);
    }
    /**
     * @description:  鼠标推出图片预览的里面显示选项文本
     * @param {type} 
     * @return: 
     */
    handleMouseLeave = (e) => {
        this.updateImagePreView(false);
    }

    updateImagePreView(Imageflag) {
        this.setState({
            showImageOptionFlag: Imageflag
        })
    }

    deletePageBg() {
        this.props.deletePageBg();
        this.refs.ImageUploading.deleteImageUrl();
    }

    setUploadPageBg() {
        this.refs.ImageUploading.imitationClick();
    }

    setShowPreview(imageUrl) {
        this.props.setShowPreview(imageUrl);
    }

    /**
     * @description:  给画布设置背景颜色
     * @param {string}  colorObj  是一个rgba值
     * @return: 
     */
    setBgColor(colorObj) {
        this.props.setBgColor(colorObj);
    }
    /**
     * @description: 在编辑面板上面修改一个单独的值,进行调用
     * @param {type} 
     * @return: 
     */
    updateChartField(fieldValue, fieldEname) {
        this.props.updateThisCharsField(fieldValue, fieldEname);
    }
    text(f, a) {
        let s = f;
    }
}


export default Properties;