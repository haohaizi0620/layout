import React, { Component } from 'react';
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
    Collapse,
    Switch,
} from 'antd';
import 'antd/dist/antd.css';
import '../../css/Properties.css'
import ImageUploading from '../globalCom/ImageUploading';
import ReactColor from '../globalCom/ReactColor.js'
const { Option } = Select;
const { TextArea } = Input;
class PropertiesSelectCenter extends Component {
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
                       {[this.props.childer].map((item, i) => {
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
                            } else if (itemType == "Switch ") {
                                return (
                                    <div className="pro-item-simple">
                                        <Switch   onChange={event => {
                                                        this.updateChartField(event, item.ename)
                                                    }}  />
                                    </div>
                                )
                            } else if(itemType == "TextArea"){
                                return (
                                    <div className="pro-item-simple">
                                        <TextArea 
                                            value = {item.value}
                                            placeholder = {item.placeholder}
                                        />
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
      * @description:  超链接点击是否打开新的窗口
      * @param {type} 
      * @return: 
      */
     updateHrefState(checked) {
        console.log(`switch to ${checked}`);
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

export default PropertiesSelectCenter;