import React, { Component, Fragment } from 'react';
import PropertieData from '../datasource/properties.json';
import ReactColor from './globalCom/SketchColor.js';
import PropertiesSelectCenter from './proerttiesFile/PropertiesSelectCenter';
import ReactJson from 'react-json-view';
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
  Switch
} from 'antd';
import '../css/Spinner.css';
import '../css/Properties.css';
import '../css/base.css';
import 'antd/dist/antd.css';
import store from '../redux/store';
import ImageUploading from './globalCom/ImageUploading';
const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;
/*
 * 样式面板组件
 */
class Properties extends Component {
  constructor(props) {
    super(props);
    let cptBorderObj = store.getState().showLayerDatas.showDatas.cptBorderObj;
    let bgFieldObj = store.getState().showLayerDatas.bgFieldObj;
    let textFieldObj = {
      fontSize: 30,
      fontColor: 'rgba(255,255,255,1)',
      textCenter: '标题',
      fontFamily: 'auto',
      fontWeight: 'normal',
      width: 280,
      height: 260,
      left: 450,
      top: 160,
      opacity: 1,
      layerBorderWidth: 0,
      layerBorderStyle: 'solid',
      layerBorderColor: 'rgb(0,0,0,1)',
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: 'rgba(255, 47, 3 ,1)',
      iframeUrl: ''
    };
    this.state = {
      bg: [
        {
          ename: 'screenSize',
          name: '画布大小',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'bjWidth',
              cname: '宽度',
              type: 'InputNumber',
              value: bgFieldObj.bjWidth
            },
            {
              ename: 'bjHeight',
              cname: '高度',
              type: 'InputNumber',
              value: bgFieldObj.bjHeight
            }
          ],
          layerType: 'bg'
        },
        {
          ename: 'backgroundColor',
          name: '背景颜色',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'bgColor',
              cname: '背景颜色',
              type: 'Color',
              value: bgFieldObj.bgColor
            }
          ],
          layerType: 'bg'
        },
        {
          ename: 'bgImageName',
          name: '背景图片',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'bgImageName',
              cname: '',
              type: 'Select',
              value: bgFieldObj.bgImageName,
              defaultOption: '无',
              optionValues: [
                { cname: '无', value: '无' },
                { cname: '背景一', value: '背景一' },
                { cname: '背景二', value: '背景二' },
                { cname: '背景三', value: '背景三' },
                { cname: '背景四', value: '背景四' },
                { cname: '背景五', value: '背景五' },
                { cname: '背景六', value: '背景六' }
                /* {"cname":'无',"value":'none'},
                            {"cname":'背景一',"value":'http://localhost/kshCharsTempJs/ksh/bg1.png'},
                            {"cname":'背景二',"value":'http://localhost/kshCharsTempJs/ksh/bg2.png'},
                            {"cname":'背景三',"value":'http://localhost/kshCharsTempJs/ksh/bg3.png'},
                            {"cname":'背景四',"value":'http://localhost/kshCharsTempJs/ksh/bg4.png'},
                            {"cname":'背景五',"value":'http://localhost/kshCharsTempJs/ksh/bg5.png'},
                            {"cname":'背景六',"value":'http://localhost/kshCharsTempJs/ksh/bg6.png'}, */
              ]
            },
            {
              ename: 'bgImageIntegerUrl',
              cname: '在线图片',
              type: 'Input',
              value: bgFieldObj.bgImageIntegerUrl,
              placeholder: '图片路径'
            },
            {
              ename: 'uploadImage',
              cname: '预览图片',
              type: 'ImageUploading',
              value: bgFieldObj.uploadImage,
              optionFlag: false
            }
          ],
          layerType: 'bg'
        }
      ],
      chart: [
        {
          ename: 'chartSize',
          name: '图表大小',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'width',
              cname: '宽度',
              type: 'InputNumber',
              value: cptBorderObj.width,
              maxNumber: 2000,
              minNumber: 80
            },
            {
              ename: 'height',
              cname: '高度',
              type: 'InputNumber',
              value: cptBorderObj.height,
              maxNumber: 2000,
              minNumber: 80
            }
          ],
          layerType: 'default'
        },
        {
          ename: 'chartPosition',
          name: '图表位置',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'left',
              cname: '距左',
              type: 'InputNumber',
              value: cptBorderObj.left,
              maxNumber: 2000,
              minNumber: 80
            },
            {
              ename: 'top',
              cname: '距上',
              type: 'InputNumber',
              value: cptBorderObj.top,
              maxNumber: 2000,
              minNumber: 80
            }
          ],
          layerType: 'default'
        },
        // {
        //     "ename": "rotationAngle",
        //     "name": "旋转角度",
        //     "includeSelect":false,
        // "type":"",
        // "childer": [
        //         {
        //             "ename": "left",
        //             "cname": "角度",
        //             "type": "InputNumber",
        //             "value": "0"
        //         }
        //     ]
        // },
        {
          ename: 'opacity',
          name: '透明度',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'opacity',
              cname: '透明度',
              type: 'Slider',
              value: cptBorderObj.opacity
            }
          ],
          layerType: 'default'
        },
        {
          ename: 'LayerBorder',
          name: '边框',
          includeSelect: false,
          type: 'Collapse',
          childer: [
            {
              ename: 'layerBorderWidth',
              cname: '边框宽度',
              type: 'InputNumber',
              value: cptBorderObj.layerBorderWidth,
              maxNumber: 30,
              minNumber: 0
            },
            {
              ename: 'layerBorderStyle',
              cname: '边框样式',
              type: 'Select',
              value: cptBorderObj.layerBorderStyle,
              defaultOption: 'solid',
              optionValues: [
                { cname: '无样式', value: 'none' },
                { cname: '隐藏', value: 'hidden' },
                { cname: '点线', value: 'dooted' },
                { cname: '虚线', value: 'dashed' },
                { cname: '实线', value: 'solid' },
                { cname: '双线', value: 'double' },
                { cname: '凹槽', value: 'groove' },
                { cname: '突脊', value: 'ridge' },
                { cname: '内陷', value: 'inset' },
                { cname: '外凸', value: 'outset' }
              ]
            },
            {
              ename: 'layerBorderColor',
              cname: '边框颜色',
              type: 'Color',
              value: cptBorderObj.layerBorderColor
            }
          ],
          layerType: 'default'
        }
      ],
      text: [
        {
          ename: 'textCenter',
          name: '标题内容',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'textCenter',
              cname: '标题内容',
              type: 'Input',
              value: textFieldObj.textCenter,
              placeholder: '标题内容'
            }
          ],
          layerType: 'text'
        },
        {
          ename: 'fontStyle',
          name: '字体样式',
          includeSelect: true,
          type: 'Collapse',
          childer: [
            {
              ename: 'fontFamily',
              cname: '字体',
              type: 'Select',
              value: textFieldObj.fontFamily,
              defaultOption: 'auto',
              optionValues: [
                { cname: 'auto', value: 'auto' },
                { cname: 'cursive', value: 'cursive' },
                { cname: 'monospace', value: 'monospace' },
                { cname: 'serif', value: 'serif' }
              ]
            },
            {
              ename: 'fontSize',
              cname: '字号大小',
              type: 'InputNumber',
              value: textFieldObj.fontSize,
              maxNumber: 200,
              minNumber: 12
            },
            {
              ename: 'fontColor',
              cname: '字体颜色',
              type: 'Color',
              value: textFieldObj.fontColor
            },
            {
              ename: 'fontWeight',
              cname: '字体粗细',
              type: 'Select',
              value: textFieldObj.fontWeight,
              defaultOption: 'normal',
              optionValues: [
                { cname: 'normal', value: 'normal' },
                { cname: 'bold', value: 'bold' },
                { cname: 'bolder', value: 'bolder' },
                { cname: 'lighter', value: 'lighter' },
                { cname: '100', value: '100' },
                { cname: '200', value: '200' },
                { cname: '300', value: '300' },
                { cname: '400', value: '400' },
                { cname: '500', value: '500' },
                { cname: '600', value: '600' },
                { cname: '700', value: '700' },
                { cname: '800', value: '800' },
                { cname: '900', value: '900' },
                { cname: 'inherit', value: 'inherit' }
              ]
            }
          ],
          layerType: 'text'
        },
        {
          ename: 'textAlign',
          name: '对齐方式',
          includeSelect: false,
          childer: [
            {
              ename: 'textAlign',
              cname: '对齐方式',
              type: 'Select',
              value: textFieldObj.fontFamily,
              defaultOption: 'center',
              optionValues: [
                { cname: '左对齐', value: 'left' },
                { cname: '右对齐', value: 'right' },
                { cname: '居中对齐', value: 'center' }
              ]
            }
          ],
          layerType: 'text'
        },
        {
          ename: 'writingMode',
          name: '文字排列方式',
          includeSelect: false,
          childer: [
            {
              ename: 'writingMode',
              cname: '文字排列方式',
              type: 'Select',
              value: textFieldObj.fontFamily,
              defaultOption: 'horizontal-tb',
              optionValues: [
                { cname: '水平', value: 'horizontal-tb' },
                { cname: '垂直', value: 'vertical-rl' }
              ]
            }
          ],
          layerType: 'text'
        },
        {
          ename: 'hyperlink',
          name: '超链接配置',
          includeSelect: true,
          type: 'Collapse',
          childer: [
            {
              ename: 'hyperlinkCenter',
              cname: '超链接',
              type: 'Input',
              value: textFieldObj.textCenter
            },
            {
              ename: 'isNewWindow',
              cname: '是否打开新窗口',
              type: 'Switch ',
              value: textFieldObj.textCenter
            }
          ],
          layerType: 'text'
        }
      ],
      border: [
        {
          ename: 'borderWidth',
          name: '边框宽度',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'borderWidth',
              cname: '边框宽度',
              type: 'InputNumber',
              value: textFieldObj.borderWidth,
              maxNumber: 30,
              minNumber: 0
            }
          ],
          layerType: 'border'
        },
        {
          ename: 'borderStyle',
          name: '边框样式',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'borderStyle',
              cname: '边框样式',
              type: 'Select',
              value: textFieldObj.borderStyle,
              defaultOption: 'solid',
              optionValues: [
                { cname: '无样式', value: 'none' },
                { cname: '隐藏', value: 'hidden' },
                { cname: '点线', value: 'dooted' },
                { cname: '虚线', value: 'dashed' },
                { cname: '实线', value: 'solid' },
                { cname: '双线', value: 'double' },
                { cname: '凹槽', value: 'groove' },
                { cname: '突脊', value: 'ridge' },
                { cname: '内陷', value: 'inset' },
                { cname: '外凸', value: 'outset' }
              ]
            }
          ],
          layerType: 'border'
        },
        {
          ename: 'borderColor',
          name: '边框颜色',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'borderColor',
              cname: '边框颜色',
              type: 'Color',
              value: textFieldObj.borderColor
            }
          ],
          layerType: 'border'
        }
      ],
      iframe: [
        {
          ename: 'iframeUrl',
          name: '页面地址',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'iframeUrl',
              cname: '页面地址',
              type: 'Input',
              value: textFieldObj.iframeUrl,
              placeholder: '页面地址'
            }
          ],
          layerType: 'iframe'
        }
      ],
      layerOneselfInfo: [
        {
          ename: 'optionName',
          name: '图层名称',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'optionName',
              cname: '图层名称',
              type: 'Input',
              value: '',
              placeholder: '图层名称'
            }
          ],
          layerType: 'chart'
        },
        {
          ename: 'optionLegend',
          name: '图例',
          includeSelect: false,
          type: 'Collapse',
          childer: [
            {
              ename: 'oneLegend',
              name: '图例一',
              includeSelect: false,
              type: 'Collapse',
              childer: [
                {
                  ename: 'legendName',
                  cname: '图例名称',
                  type: 'Input',
                  value: '',
                  placeholder: '图例名称'
                },
                {
                  ename: 'legendColor',
                  cname: '图例颜色',
                  type: 'Color',
                  value: textFieldObj.fontColor
                }
              ]
            }
          ],
          layerType: 'chart'
        }
      ],
      chartData: [
        {
          ename: 'chartDataSource',
          name: '数据源',
          includeSelect: true,
          type: '',
          childer: [
            /* {
                            "ename": "dataSourceType",
                            "cname": "数据源类型",
                            "type": "Select",
                            "value": "static",
                            "defaultOption": "static",
                            "optionValues": [
                                { "cname": '静态资源', "value": 'static' },
                            ]
                        }, */
            {
              ename: 'chartDataFile',
              cname: '数据展示',
              type: 'ReactJson',
              value: {},
              placeholder: '请输入图层数据'
            },
            {
              ename: 'chartDataFileShow',
              cname: '数据展示',
              type: 'JsonShow',
              value: {},
              placeholder: '请输入图层数据'
            }
          ],
          layerType: 'chart'
        }
      ],
      layerDataSource: []
    };
  }
  updateStateVal() {
    var tempKeyVal = this.props.tabsKey;
    let dataObj = store.getState().showLayerDatas.cptOptionsList[this.props.cptIndex];
    var tempLayerType = this.props.cptPropertyObj.type;
    var tempLayer = [];
    if (tempKeyVal == 2) {
      if (tempLayerType == 'chart') {
        tempLayer = this.state.chartData;
        if (dataObj) {
           /* let layerOption = dataObj.layerOption[0];
                    let resultTable = layerOption.myMapTable.result;
                    let resultVal = "";
                    
                     if(typeof resultTable != 'string' ){
                        tempLayer[0].childer[1].value = resultTable;
                        resultTable.map((tableItem,tableIndex) => {
                            resultTable[tableIndex] =  JSON.stringify(tableItem);
                        })
                        layerOption.myMapTable.result = resultTable.join('\n');
                        resultVal = layerOption.myMapTable.result;
                    }else{
                        resultVal = resultTable;
                    }
                    resultVal = resultTable;
                    tempLayer[0].childer[1].value = resultVal;
                    tempLayer[0].childer[0].value = resultVal; */
        }
      }
      this.setState(
        {
          layerDataSource: tempLayer,
          tempLayerType: tempLayer
        },
        () => {}
      );
    } else if (tempKeyVal == 1) {
      let cptBorderObj = store.getState().showLayerDatas.showDatas.cptBorderObj;
      let tempChartArr = this.state.chart;
      let tempChart = [];
      for (let i = 0; i < 4; i++) {
        tempChart.push(tempChartArr[i]);
      }
      tempChart[0].childer[0].value = cptBorderObj.width;
      tempChart[0].childer[1].value = cptBorderObj.height;
      tempChart[1].childer[0].value = cptBorderObj.left;
      tempChart[1].childer[1].value = cptBorderObj.top;
      tempChart[2].childer[0].value = cptBorderObj.opacity;
      tempChart[3].childer[0].value = cptBorderObj.layerBorderWidth;
      tempChart[3].childer[1].value = cptBorderObj.layerBorderStyle;
      tempChart[3].childer[2].value = cptBorderObj.layerBorderColor;
      if (tempLayerType == 'chart') {
        tempLayer = this.state.layerOneselfInfo;
        if (dataObj) {
         /*  let layerOption = dataObj.layerOption[0];
          tempLayer[0].childer[0].value = layerOption.mapInfor.result[0].NAME;
          let legendResult = layerOption.myLegend.result;
          let tempLegendArr = [];
          legendResult.map((legendItem, itemIndex) => {
            tempLegendArr.push({
              ename: 'oneLegend',
              name: '图例' + (itemIndex + 1),
              includeSelect: false,
              type: 'Collapse',
              childer: [
                {
                  ename: 'legendName',
                  cname: '图例名称',
                  type: 'Input',
                  value: legendItem.fieldName,
                  placeholder: '图例名称'
                },
                {
                  ename: 'legendColor',
                  cname: '图例颜色',
                  type: 'Color',
                  value: legendItem.color
                }
              ]
            });
          });
          tempLayer[1].childer = tempLegendArr; */
        }
      } else if (tempLayerType == 'text') {
        tempLayer = this.state.text;
        if (dataObj) {
          let tempTextLayerObj = dataObj.layerOption;
          tempLayer[0].childer[0].value = tempTextLayerObj['textCenter'];
          tempLayer[1].childer[0].value = tempTextLayerObj['fontFamily'];
          tempLayer[1].childer[1].value = tempTextLayerObj['fontSize'];
          tempLayer[1].childer[2].value = tempTextLayerObj['fontColor'];
          tempLayer[1].childer[3].value = tempTextLayerObj['fontWeight'];
          tempLayer[2].childer[0].value = tempTextLayerObj['textAlign'];
          tempLayer[3].childer[0].value = tempTextLayerObj['writingMode'];
          tempLayer[4].childer[0].value = tempTextLayerObj['hyperlinkCenter'];
          tempLayer[4].childer[1].value = tempTextLayerObj['isNewWindow'];
        }
      } else if (tempLayerType == 'border') {
        tempLayer = this.state.border;
        if (dataObj) {
          let tempTextLayerObj = dataObj.layerOption;
          tempLayer[0].childer[0].value = tempTextLayerObj['borderWidth'];
          tempLayer[1].childer[0].value = tempTextLayerObj['borderStyle'];
          tempLayer[2].childer[0].value = tempTextLayerObj['borderColor'];
        }
      } else if (tempLayerType == 'iframe') {
        tempLayer = this.state.iframe;
        if (dataObj) {
          let tempTextLayerObj = dataObj.layerOption;
          tempLayer[0].childer[0].value = tempTextLayerObj['iframeUrl'];
        }
      }
      this.setState(
        {
          chart: tempChart.concat(JSON.parse(JSON.stringify(tempLayer))),
          tempLayerType: tempLayer
        },
        () => {
          // console.log(this.state.text[0].childer[0].value );
        }
      );
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
        bg: tempBg
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
    if (layerType == 'text') {
      let templayer = this.state.text;
      if (fieldEname == 'textCenter') {
        templayer[0].childer[0].value = fieldValue;
      } else if (fieldEname == 'textSize') {
        templayer[1].childer[0].value = fieldValue;
      } else if (fieldEname == 'textColor') {
        templayer[2].childer[0].value = fieldValue;
      }
      this.setState({
        text: templayer
      });
    }
    let tempKeyVal = this.props.tabsKey;
    if (tempKeyVal == 0) {
      layerType = 'bg';
    }
    this.props.param({
      fieldValue: fieldValue,
      fieldEname: fieldEname,
      thisIndex: this.props.cptIndex,
      layerType: layerType,
      tabsKey: this.props.tabsKey
    });
    this.updateStateVal();
  }

  setBgColor(layerType, eName, rgbObj) {
    this.props.param({
      fieldValue: rgbObj,
      fieldEname: eName,
      thisIndex: this.props.cptIndex,
      layerType: layerType,
      tabsKey: this.props.tabsKey
    });
  }

  setShowPreview(imageUrl) {
    this.props.param({
      fieldValue: imageUrl,
      fieldEname: 'bgImageIntegerUrl',
      thisIndex: this.props.cptIndex,
      layerType: 'bg',
      tabsKey: this.props.tabsKey
    });
    this.props.param({
      fieldValue: imageUrl,
      fieldEname: 'bjImage',
      thisIndex: this.props.cptIndex,
      layerType: 'bg',
      tabsKey: this.props.tabsKey
    });
    this.props.param({
      fieldValue: imageUrl,
      fieldEname: 'uploadImage',
      thisIndex: this.props.cptIndex,
      layerType: 'bg',
      tabsKey: this.props.tabsKey
    });
  }

  /**
   * @description: 将背景设置还原
   * @param {type}
   * @return:
   */
  deletePageBg() {
    this.props.param({
      fieldValue: '无',
      fieldEname: 'bgImageName',
      thisIndex: this.props.cptIndex,
      layerType: 'bg',
      tabsKey: this.props.tabsKey
    });
    this.props.param({
      fieldValue: '',
      fieldEname: 'bgImageIntegerUrl',
      thisIndex: this.props.cptIndex,
      layerType: 'bg',
      tabsKey: this.props.tabsKey
    });
    this.props.param({
      fieldValue: '',
      fieldEname: 'bjImage',
      thisIndex: this.props.cptIndex,
      layerType: 'bg',
      tabsKey: this.props.tabsKey
    });
    this.props.param({
      fieldValue: '',
      fieldEname: 'uploadImage',
      thisIndex: this.props.cptIndex,
      layerType: 'bg',
      tabsKey: this.props.tabsKey
    });
  }

  /**
   * @description: 父组件进行更新传进来的props的值的时候会进行调用的行为
   * @param {Object} nextProps  新的props的值
   * @return:
   */
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate() {
    return true;
  }

  callback(key) {
    // console.log(key);
  }

  render() {
    var fieldDatas = [];
    let showDatas = this.props.cptPropertyObj;
    var type = showDatas.type;
    var tempTabsKey = this.props.tabsKey;
    if (tempTabsKey == 0) {
      fieldDatas = this.state['bg'];
    } else {
      const cptType = showDatas.cptType;
      if (tempTabsKey == 2) {
        fieldDatas = this.state['layerDataSource'];
      } else if (tempTabsKey == 1) {
        fieldDatas = this.state['chart'];
      }
    }
    if (fieldDatas) {
      return (
        <div className='pro-items'>
          {fieldDatas.map((item, i) => {
            if (item.type == 'Collapse') {
              return (
                <Collapse expandIconPosition='right' bordered={false} onChange={this.callback}>
                  <Panel header={item.name} key='1'>
                    {item.childer.map((itemLayer, itemIndex) => {
                      {
                        if (itemLayer.type == 'Collapse') {
                          return (
                            <Collapse expandIconPosition='right' bordered={false}>
                              <Panel header={itemLayer.name} key='1'>
                                {itemLayer.childer.map((itemTwo, layerIndex) => {
                                  return (
                                    <PropertiesSelectCenter
                                      key={layerIndex}
                                      childer={itemTwo}
                                      name={itemTwo.cname}
                                      includeSelectFlag={itemTwo.includeSelect}
                                      updateThisCharsField={this.updateThisCharsField.bind(
                                        this,
                                        this.props.cptPropertyObj.type
                                      )}
                                      setBgColor={this.setBgColor.bind(this, item.layerType)}
                                      setShowPreview={this.setShowPreview.bind(this)}
                                      deletePageBg={this.deletePageBg.bind(
                                        this
                                      )}></PropertiesSelectCenter>
                                  );
                                })}
                              </Panel>
                            </Collapse>
                          );
                        } else {
                          return (
                            <PropertiesSelectCenter
                              key={itemIndex}
                              childer={itemLayer}
                              name={itemLayer.cname}
                              includeSelectFlag={itemLayer.includeSelect}
                              updateThisCharsField={this.updateThisCharsField.bind(
                                this,
                                this.props.cptPropertyObj.type
                              )}
                              setBgColor={this.setBgColor.bind(this, item.layerType)}
                              setShowPreview={this.setShowPreview.bind(this)}
                              deletePageBg={this.deletePageBg.bind(this)}></PropertiesSelectCenter>
                          );
                        }
                      }
                    })}
                  </Panel>
                </Collapse>
              );
            } else {
              return (
                <EditSimpleMainInfo
                  key={i}
                  childer={item.childer}
                  name={item.name}
                  includeSelectFlag={item.includeSelect}
                  updateThisCharsField={this.updateThisCharsField.bind(
                    this,
                    this.props.cptPropertyObj.type
                  )}
                  setBgColor={this.setBgColor.bind(this, item.layerType)}
                  setShowPreview={this.setShowPreview.bind(this)}
                  deletePageBg={this.deletePageBg.bind(this)}></EditSimpleMainInfo>
              );
            }
          })}
        </div>
      );
    } else {
      return (
        <div className='pro-items'>
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
      showImageOptionFlag: false
    };
  }
  render() {
    var defaultOneColVal = 6;
    var defaultTwoColVal = 18;
    if (this.props.includeSelectFlag) {
      //当前的childer的
      defaultOneColVal = 0;
      defaultTwoColVal = 24;
    }
    return (
      <div>
        <Row>
          <Col span={defaultOneColVal}>
            <span>{this.props.name}</span>
          </Col>
          <Col span={defaultTwoColVal}>
            {this.props.childer.map((item, i) => {
              let itemType = item.type;
              if (itemType == 'InputNumber') {
                let tempVal = parseInt(item.value);
                // if(item.ename=="left"){
                //     console.log("left:"+tempVal)
                // }
                return (
                  <div key={item.ename} className='pro-item-simple'>
                    <InputNumber
                      min={item.minNumber}
                      max={item.maxNumber}
                      onChange={event => {
                        this.updateChartField(event, item.ename);
                      }}
                      value={tempVal}
                    />
                    <br />
                    {
                      // console.log(item.ename+tempVal)
                      // item.ename=="left"?console.log("left-last:"+tempVal):true
                    }
                    <span>{item.cname}</span>
                  </div>
                );
              } else if (itemType == 'Slider') {
                return (
                  <div key={item.ename} className='pro-item-simple'>
                    <Row>
                      <Col span={12}>
                        <Slider
                          min={0}
                          max={1}
                          step={0.01}
                          onChange={event => {
                            this.updateChartField(event, item.ename);
                          }}
                          value={typeof item.value === 'number' ? item.value : 0}
                        />
                      </Col>
                      <Col span={12}>
                        <InputNumber
                          step={0.01}
                          min={0}
                          max={1}
                          value={item.value}
                          onChange={event => {
                            this.updateChartField(event, item.ename);
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                );
              } else if (itemType == 'Color') {
                return (
                  <div className='pro-item-simple'>
                    <ReactColor
                      key={item.ename}
                      colorVal={item.value}
                      setBgColor={this.setBgColor.bind(this, item.ename)}
                    />
                  </div>
                );
              } else if (itemType == 'ImageUploading') {
                return (
                  <div className='pro-item-simple'>
                    <div
                      className='previewImage'
                      onMouseEnter={this.handleMouseEnter.bind(this)}
                      onMouseLeave={this.handleMouseLeave.bind(this)}
                      style={{
                        backgroundImage: `url(${item.value})`,
                        backgroundSize: '100% 100%'
                      }}>
                      {
                        // item.value?<img src={item.value}  id="previewImageObj"  style={{ width: '100%',height:'auto',padding: '20px 20px'}} />:true
                      }
                      {this.state.showImageOptionFlag ? (
                        <div className='previewOption'>
                          <span className='previewOptionText'>
                            <span onClick={this.setUploadPageBg.bind(this)}>更改</span>|
                            <span onClick={this.deletePageBg.bind(this)}>删除</span>
                          </span>
                        </div>
                      ) : (
                        true
                      )}
                    </div>
                    <div style={{ display: 'none' }}>
                      <ImageUploading
                        ref='ImageUploading'
                        key={item.ename}
                        colorVal={item.value}
                        setShowPreview={this.setShowPreview.bind(this)}
                      />
                    </div>
                  </div>
                );
              } else if (itemType == 'Input') {
                return (
                  <div className='pro-item-simple'>
                    <Input
                      placeholder={item.placeholder}
                      key={item.ename}
                      onChange={event => {
                        this.updateChartField(event.target.value, item.ename);
                      }}
                      value={item.value}
                    />
                  </div>
                );
              } else if (itemType == 'Select') {
                return (
                  <div className='pro-item-simple'>
                    <Select
                      key={item.ename}
                      value={item.value}
                      showSearch
                      placeholder='Select a person'
                      optionFilterProp='children'
                      onChange={event => {
                        this.updateChartField(event, item.ename);
                      }}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }>
                      {item.optionValues.map(optionItem => {
                        return <Option value={optionItem.value}>{optionItem.cname}</Option>;
                      })}
                    </Select>
                  </div>
                );
              } else if (itemType == 'Switch ') {
                return (
                  <div className='pro-item-simple'>
                    <Switch
                      onChange={event => {
                        this.updateChartField(event, item.ename);
                      }}
                    />
                  </div>
                );
              } else if (itemType == 'TextArea') {
                return (
                  <div className='pro-item-simple'>
                    <TextArea
                      value={item.value}
                      placeholder={item.placeholder}
                      onChange={event => {
                        this.updateChartFieldPrev(event, item.ename);
                      }}
                    />
                  </div>
                );
              } else if (itemType == 'JsonShow') {
                return (
                  <div className='pro-item-simple'>
                    <pre style={{ maxHeight: '200px', outline: '1px solid white' }}>
                      <code id='json'>{JSON.stringify(item.value, null, '  ')}</code>
                    </pre>
                  </div>
                );
              } else if (itemType == 'ReactJson') {
                return (
                  <div className='pro-item-simple'>
                    <ReactJson
                      src={item.value}
                      onEdit={event => {
                        this.updateChartFieldPrevEditJson(event, item.ename);
                      }}
                    />
                  </div>
                );
              }
            })}
          </Col>
        </Row>
      </div>
    );
  }

  /**
   * @description: 鼠标进入图片预览的里面显示选项文本
   * @param {type}
   * @return:
   */
  handleMouseEnter = e => {
    this.updateImagePreView(true);
  };
  /**
   * @description:  鼠标推出图片预览的里面显示选项文本
   * @param {type}
   * @return:
   */
  handleMouseLeave = e => {
    this.updateImagePreView(false);
  };

  updateImagePreView(Imageflag) {
    this.setState({
      showImageOptionFlag: Imageflag
    });
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
  setBgColor(eName, colorObj) {
    this.props.setBgColor(eName, colorObj);
  }
  /**
   * @description: 在编辑面板上面修改一个单独的值,进行调用
   * @param {type}
   * @return:
   */
  updateChartField(fieldValue, fieldEname) {
    this.props.updateThisCharsField(fieldValue, fieldEname);
  }

  updateChartFieldPrev(event, fieldEname) {
    this.updateChartField(event.target.value, fieldEname);
  }

  updateChartFieldPrevEditJson(event, fieldEname) {
    this.updateChartField(event.updated_src, fieldEname);
  }

  text(f, a) {
    let s = f;
  }
}

export default Properties;
