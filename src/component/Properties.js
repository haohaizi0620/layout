import React, { Component, Fragment } from 'react';
import EditSimpleMainInfo from './proerttiesFile/EditSimpleMainInfo';
import {
  Collapse,
} from 'antd';
import 'antd/dist/antd.css';
import '../css/Spinner.css';
import '../css/Properties.css';
import '../css/base.css';
import store from '../redux/store';
const { Panel } = Collapse;
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
      cptChartData:{},
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
                  placeholder: '图例名称',
                  disabled:true,
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

  componentWillReceiveProps(newProp){
      let cptChartData = newProp.cptChartData;
      if(cptChartData){
          this.setState({
            cptChartData:cptChartData,
          })
      }
  }

  propsParam(paramObj){
    this.props.param({
      fieldValue: paramObj.fieldValue,
      fieldEname: paramObj.fieldEname,
      thisIndex: paramObj.thisIndex,
      layerType: paramObj.layerType,
      tabsKey: paramObj.tabsKey
    });
  }
  
  updateStateVal() {
    var tempKeyVal = this.props.tabsKey;
    let cptChartData = this.props.cptChartData;
    let chartId = cptChartData.chartId;
    let dataObj = store.getState().showLayerDatas.cptOptionsList[this.props.cptIndex];
   /*  let dataObj = {};
    tempLists.map(item => {
      if(item.queryId == chartId){
        dataObj = item;
      }
    }) */
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
          let layerOption = dataObj.layerOption[0];
          if(layerOption){
            tempLayer[0].childer[0].value = layerOption.mapInfor.result[0].NAME;
            let legendResult = layerOption.myLegend.result;
            let tempLegendArr = [];
            legendResult.map((legendItem, itemIndex) => {
              tempLegendArr.push({
                ename: 'oneLegend',
                name: legendItem.fieldName,//'图例' + (itemIndex + 1),
                includeSelect: false,
                type: 'Collapse',
                childer: [
                  {
                    ename: 'legendName',
                    cname: '图例名称',
                    type: 'Input',
                    value: legendItem.fieldName,
                    placeholder: '图例名称',
                    disabled:true,
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
            tempLayer[1].childer = tempLegendArr;
          }
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
    this.propsParam(
      {
        fieldValue: fieldValue,
        fieldEname: fieldEname,
        thisIndex: this.props.cptIndex,
        layerType: layerType,
        tabsKey: this.props.tabsKey
      }
    )
  }

  setBgColor(layerType, eName, rgbObj) {
    this.propsParam({
      fieldValue: rgbObj,
      fieldEname: eName,
      thisIndex: this.props.cptIndex,
      layerType: layerType,
      tabsKey: this.props.tabsKey
    });
  }

  setShowPreview(imageUrl) {
    let bgImage = [
      {
        fieldValue: imageUrl,
        fieldEname: 'bgImageIntegerUrl',
        thisIndex: this.props.cptIndex,
        layerType: 'bg',
        tabsKey: this.props.tabsKey
      },
      {
        fieldValue: imageUrl,
        fieldEname: 'bjImage',
        thisIndex: this.props.cptIndex,
        layerType: 'bg',
        tabsKey: this.props.tabsKey
      },
      {
        fieldValue: imageUrl,
        fieldEname: 'uploadImage',
        thisIndex: this.props.cptIndex,
        layerType: 'bg',
        tabsKey: this.props.tabsKey
      }
    ]
    bgImage.map((item,index) => {
      this.propsParam(item);
    })
  }

  /**
   * @description: 将背景设置还原
   * @param {type}
   * @return:
   */
  deletePageBg() {
    let deletePageBgs = [
      {
        fieldValue: '无',
        fieldEname: 'bgImageName',
        thisIndex: this.props.cptIndex,
        layerType: 'bg',
        tabsKey: this.props.tabsKey
      },
      {
        fieldValue: '',
        fieldEname: 'bgImageIntegerUrl',
        thisIndex: this.props.cptIndex,
        layerType: 'bg',
        tabsKey: this.props.tabsKey
      },
      {
        fieldValue: '',
        fieldEname: 'bjImage',
        thisIndex: this.props.cptIndex,
        layerType: 'bg',
        tabsKey: this.props.tabsKey
      },
      {
        fieldValue: '',
        fieldEname: 'uploadImage',
        thisIndex: this.props.cptIndex,
        layerType: 'bg',
        tabsKey: this.props.tabsKey
      }
    ];  
    deletePageBgs.map((item,index) => {
      this.props.param(item);
    })
  }


  callback(key) {
    // console.log(key);
  }

  render() {
    var fieldDatas = [];
    var tempTabsKey = this.props.tabsKey;
    if (tempTabsKey == 0) {
      fieldDatas = this.state['bg'];
    } else {
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
                                    <EditSimpleMainInfo
                                      updateArrFlag={true}
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
                                      )}/>
                                  );
                                })}
                              </Panel>
                            </Collapse>
                          );
                        } else {
                          return (
                            <EditSimpleMainInfo
                              updateArrFlag={true}
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
                              deletePageBg={this.deletePageBg.bind(this)}/>
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
                  updateArrFlag={false}
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

export default Properties;
