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
let otherDefaultData = require('../datasource/otherDefaultData.json');
const { Panel } = Collapse;
/*
 * 样式面板组件
 */
class Properties extends Component {
  constructor(props) {
    super(props);
    let {cptPropertyObj:cptBorderObj,globalBg:bgFieldObj} = this.props;
    cptBorderObj = cptBorderObj.cptBorderObj;
    let {text:textFieldObj,border:borderFieldObj,iframe:iframeFieldObj,singleImage:singleImageFieldObj,decorate} = otherDefaultData;
    let {urlConfig:singleImageUrlConfig} = singleImageFieldObj;
    let tableFieldObj = otherDefaultData.table.tableConfig.table;
    let {header:tableFieldHeaderObj,textStyle:tableBodyTextObj,ZebraLine:tableBodyBaseObj,borderStyle:tableBodyBorderObj} = tableFieldObj;
    let {textStyle:tableHeaderTextObj} = tableFieldHeaderObj;
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
                { cname: '无', value: 'none'},
                { cname: '背景一', value: 'bg1',src :'bg/bg1.png' },
                { cname: '背景二', value: 'bg2',src :'bg/bg2.png' },
                { cname: '背景三', value: 'bg3',src :'bg/bg3.png' },
                { cname: '背景四', value: 'bg4',src :'bg/bg4.png' },
                { cname: '背景五', value: 'bg5',src :'bg/bg5.png' },
                { cname: '背景六', value: 'bg6',src :'bg/bg6.png'}
              ]
            },
            
          ],
        },
        {
          ename: 'bgImageIntegerUrl',
          name: '图片路径',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'bgImageIntegerUrl',
              cname: '在线图片',
              type: 'Input',
              value: bgFieldObj.bgImageIntegerUrl,
              placeholder: '图片路径'
            },
          ],
        },
        {
          ename: 'bgImageIntegerUrl',
          name: '背景图片',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'bgImageIntegerUrl',
              cname: '预览图片',
              type: 'ImageUploading',
              value: bgFieldObj.bgImageIntegerUrl,
              optionFlag: false
            }
          ],
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
              minNumber: 0
            },
            {
              ename: 'top',
              cname: '距上',
              type: 'InputNumber',
              value: cptBorderObj.top,
              maxNumber: 2000,
              minNumber: 0
            }
          ],
        },
        {
              ename: 'rotationAngle',
              name: '旋转角度',
              includeSelect: false,
              type: '',
              childer: [
                    {
                      ename: 'rotate',
                      cname: '角度',
                      type: 'Slider',
                      value: cptBorderObj.rotate,
                      maxNumber: 360,
                      minNumber: 0,
                      step:1,
                    }]
        },
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
              maxNumber: 1,
              minNumber: 0,
              step:0.01,
              value: cptBorderObj.opacity
            }
          ],
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
        }
      ],
      dataSource:[],
      layerDataSource: [
        {
          ename: 'staticData',
          name: '数据源',
          includeSelect: true,
          type: '',
          childer: [
            {
              ename: 'staticDataEdit',
              cname: '数据编辑',
              type: 'EditJsonReactAjrm',
              value: {},
              isEdit:true,
            }
          ],
        }
      ],
      noContent: [
        {
          ename: 'noContent',
          name: '暂无数据',
          includeSelect: true,
          type: '',
          childer: [
            {
              ename: 'noContent',
              type: 'noContent',
            }
          ],
        }
      ],
      text: [
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
        },
        {
          ename: 'writingMode',
          name: '排列方式',
          includeSelect: false,
          childer: [
            {
              ename: 'writingMode',
              cname: '排列方式',
              type: 'Select',
              value: textFieldObj.writingMode,
              defaultOption: 'horizontal-tb',
              optionValues: [
                { cname: '水平', value: 'horizontal-tb' },
                { cname: '垂直', value: 'vertical-rl' }
              ],
            }
          ],
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
              value: textFieldObj.hyperlinkCenter
            },
            {
              ename: 'isNewWindow',
              cname: '是否打开新窗口',
              type: 'Switch',
              value: textFieldObj.isNewWindow
            }
          ],
        }
      ],
      table: [
        {
          ename: 'tableHeader',
          name: '行头',
          includeSelect: true,
          type: 'Collapse',
          childer: [
             {
                  ename: 'tableHeaderTextAlign',
                  cname: '对齐方式',
                  type: 'Select',
                  value: tableFieldHeaderObj.textAlign,
                  defaultOption: 'center',
                  optionValues: [
                    { cname: '左对齐', value: 'left' },
                    { cname: '右对齐', value: 'right' },
                    { cname: '居中对齐', value: 'center' }
                  ]
            },
            {
              ename: 'tableHeaderFontFamily',
              cname: '字体',
              type: 'Select',
              value: tableHeaderTextObj.fontFamily,
              defaultOption: 'auto',
              optionValues: [
                { cname: 'auto', value: 'auto' },
                { cname: 'cursive', value: 'cursive' },
                { cname: 'monospace', value: 'monospace' },
                { cname: 'serif', value: 'serif' }
              ]
            },
            {
              ename: 'tableHeaderfontSize',
              cname: '字号大小',
              type: 'InputNumber',
              value: tableHeaderTextObj.fontSize,
              maxNumber: 200,
              minNumber: 12
            },
            {
              ename: 'tableHeaderfontColor',
              cname: '字体颜色',
              type: 'Color',
              value: tableHeaderTextObj.fontColor
            },
            {
              ename: 'tableHeaderfontWeight',
              cname: '字体粗细',
              type: 'Select',
              value: tableHeaderTextObj.fontWeight,
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
            },
            {
              ename: 'tableHeaderBorderWidth',
              cname: '边框宽度',
              type: 'InputNumber',
              value: tableFieldHeaderObj.borderStyle.width,
              maxNumber: 30,
              minNumber: 0
            },
            {
              ename: 'tableHeaderBorderColor',
              cname: '边框颜色',
              type: 'Color',
              value: tableFieldHeaderObj.borderStyle.color
            },
            {
                  ename: 'tableHeaderbgColor',
                  cname: '背景颜色',
                  type: 'Color',
                  value: tableFieldHeaderObj.backgroundColor
            }
          ],
        },
        {
          ename: 'tablePageSize',
          name: '数据行数',
          includeSelect: false,
          childer: [
            {
              ename: 'tablePageSize',
              cname: '数据行数',
              type: 'InputNumber',
              value: tableFieldObj.pageSize,
              maxNumber: 40,
              minNumber: 1
            }
          ],
        },
        {
          ename: 'tableBody',
          name: '内容',
          includeSelect: true,
          type: 'Collapse',
          childer: [
             {
                  ename: 'tableBodyTextAlign',
                  cname: '对齐方式',
                  type: 'Select',
                  value: tableBodyBaseObj.textAlign,
                  defaultOption: 'center',
                  optionValues: [
                    { cname: '左对齐', value: 'left' },
                    { cname: '右对齐', value: 'right' },
                    { cname: '居中对齐', value: 'center' }
                  ]
            },
            {
              ename: 'tableBodyfontFamily',
              cname: '字体',
              type: 'Select',
              value: tableBodyTextObj.fontFamily,
              defaultOption: 'auto',
              optionValues: [
                { cname: 'auto', value: 'auto' },
                { cname: 'cursive', value: 'cursive' },
                { cname: 'monospace', value: 'monospace' },
                { cname: 'serif', value: 'serif' }
              ]
            },
            {
              ename: 'tableBodyfontSize',
              cname: '字号大小',
              type: 'InputNumber',
              value: tableBodyTextObj.fontSize,
              maxNumber: 200,
              minNumber: 12
            },
            {
              ename: 'tableBodyfontColor',
              cname: '字体颜色',
              type: 'Color',
              value: tableBodyTextObj.fontColor
            },
            {
              ename: 'tableBodyfontWeight',
              cname: '字体粗细',
              type: 'Select',
              value: tableBodyTextObj.fontWeight,
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
            },
            {
              ename: 'tableBodyBorderWidth',
              cname: '边框宽度',
              type: 'InputNumber',
              value: tableBodyBorderObj.width,
              maxNumber: 30,
              minNumber: 0
            },
            {
              ename: 'tableBodyBorderColor',
              cname: '边框颜色',
              type: 'Color',
              value: tableBodyBorderObj.color
            },
            {
                  ename: 'tableBodybgColor',
                  cname: '背景颜色',
                  type: 'Color',
                  value: tableBodyBaseObj.backgroundColor
            }
          ],
        },
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
              cname: '',
              type: 'InputNumber',
              value: borderFieldObj.borderWidth,
              maxNumber: 30,
              minNumber: 0
            }
          ],
        },
        {
            ename: 'borderImage',
            name: '边框背景',
            includeSelect: false,
            type: '',
            childer: [
              {
                ename: 'borderImage',
                cname: '',
                type: 'Select',
                value:  borderFieldObj.borderImage,
                defaultOption: '边框一',
                optionValues: [
                  { cname: '边框一', value: 'border/border1.png',src :'border/border1.png' },
                  { cname: '边框二', value: 'border/border2.png',src :'border/border2.png' },
                  { cname: '边框三', value: 'border/border3.png',src :'border/border3.png' },
                  { cname: '边框四', value: 'border/border4.gif',src :'border/border4.gif' },
                  { cname: '边框五', value: 'border/border5.png',src :'border/border5.png' },
                  { cname: '边框六', value: 'border/border6.png',src :'border/border6.png' },
                  { cname: '边框七', value: 'border/border7.png',src :'border/border7.png' },
                  { cname: '边框八', value: 'border/border8.png',src :'border/border8.png' },
                  { cname: '边框九', value: 'border/border9.gif',src :'border/border9.gif' },
                  { cname: '边框十', value: 'border/border10.gif',src :'border/border10.gif' },
                  { cname: '边框十一', value: 'border/border11.gif',src :'border/border11.gif' },
                  { cname: '边框十二', value: 'border/border12.png',src :'border/border12.png' },
                ]
              }],
         },
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
              value: iframeFieldObj.iframeUrl,
              placeholder: '页面地址'
            }
          ],
        }
      ],
      singleImage:[
        {
          ename: 'backgroundImage',
          name: '图片路径',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'backgroundImage',
              cname: '在线图片',
              type: 'Input',
              value: singleImageFieldObj.backgroundImage,
              placeholder: '图片路径'
            },
          ],
        },
        {
          ename: 'backgroundImage',
          name: '背景图片',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'backgroundImage',
              cname: '预览图片',
              type: 'ImageUploading',
              value: singleImageFieldObj.backgroundImage,
              optionFlag: false
            }
          ],
        },
        {
          ename: 'singleImageRepeat',
          name: '图片重复',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'repeat',
              cname: '',
              type: 'Select',
              value: singleImageFieldObj.repeat,
              defaultOption: '无',
              optionValues: [
                { cname: '不重复,拉伸满', value: 'no-repeat'},
                { cname: '水平和垂直重复', value: 'repeat'},
                { cname: '水平重复', value: 'repeat-x'},
                { cname: '垂直重复', value: 'repeat-y'}
              ]
            }
          ]
        },
        {
          ename: 'singleImageRadius',
          name: '图片圆角',
          includeSelect: false,
          type: '',
          childer: [
            {
              ename: 'radius',
              cname: '距左',
              type: 'InputNumber',
              value: singleImageFieldObj.radius,
              maxNumber: 100,
              minNumber: 0
            }
          ]
        },
        {
          ename: 'singleImageHyperlink',
          name: '超链接配置',
          includeSelect: true,
          type: 'Collapse',
          childer: [
            {
              ename: 'url',
              cname: '超链接',
              type: 'Input',
              value: singleImageUrlConfig.url
            },
            {
              ename: 'ifBlank',
              cname: '是否打开新窗口',
              type: 'Switch',
              value: singleImageUrlConfig.ifBlank
            }
          ],
        }
      ],
      decorate: [
        {
            ename: 'decorateImage',
            name: '边框背景',
            includeSelect: false,
            type: '',
            childer: [
              {
                ename: 'decorateImage',
                cname: '',
                type: 'Select',
                value:  decorate.decorateImage,
                defaultOption: '装饰一',
                optionValues: [
                  { cname: '装饰一', value: 'decorate/zs1.gif',src :'decorate/zs1.gif' },
                  { cname: '装饰二', value: 'decorate/zs2.gif',src :'decorate/zs2.gif' },
                  { cname: '装饰三', value: 'decorate/zs3.gif',src :'decorate/zs3.gif' },
                  { cname: '装饰四', value: 'decorate/zs4.gif',src :'decorate/zs4.gif' },
                  { cname: '装饰五', value: 'decorate/zs5.gif',src :'decorate/zs5.gif' },
                  { cname: '装饰六', value: 'decorate/zs6.gif',src :'decorate/zs6.gif' },
                  { cname: '装饰七', value: 'decorate/zs7.gif',src :'decorate/zs7.gif' },
                  { cname: '装饰八', value: 'decorate/zs8.gif',src :'decorate/zs8.gif' },
                  { cname: '装饰九', value: 'decorate/zs9.gif',src :'decorate/zs9.gif' },
                  { cname: '装饰十', value: 'decorate/zs10.gif',src :'decorate/zs10.gif' },
                  { cname: '装饰十一', value: 'decorate/zs11.png',src :'decorate/zs11.png' },
                  { cname: '装饰十二', value: 'decorate/zs12.png',src :'decorate/zs12.png' },
                  { cname: '装饰十三', value: 'decorate/zs13.png',src :'decorate/zs13.png' },
                  { cname: '装饰十四', value: 'decorate/zs14.png',src :'decorate/zs14.png' },
                  { cname: '装饰十五', value: 'decorate/zs15.png',src :'decorate/zs15.png' },
                  { cname: '装饰十六', value: 'decorate/zs16.png',src :'decorate/zs16.png' },
                  { cname: '装饰十七', value: 'decorate/zs17.png',src :'decorate/zs17.png' },
                  { cname: '装饰十八', value: 'decorate/zs18.png',src :'decorate/zs18.png' },
                  { cname: '装饰十九', value: 'decorate/zs19.png',src :'decorate/zs19.png' },
                  { cname: '装饰二十', value: 'decorate/zs20.png',src :'decorate/zs20.png' },
                ]
              }],
         },
      ],
    };
   
  }

  componentDidMount(){
    store.subscribe(() => {
      this.updateStateVal()
   });
  }

  componentWillReceiveProps(){
    this.updateStateVal();
  }
  
  updateStateVal() {
    var tempKeyVal = this.props.tabsKey;
    let cptPropertyObj = this.props.cptPropertyObj;
    var LayerType = cptPropertyObj.type;
    let otherLayerId = "";
    if(tempKeyVal===1||tempKeyVal===2){
      let cptLayerAttr = this.props.cptLayerAttr;
      otherLayerId = cptLayerAttr.id;
    }
    let dataObj = {};
    let cptChartData = this.props.cptChartData;
    if(cptChartData){
      dataObj = cptChartData.layerData;
    }
    // let dataObj = store.getState().showLayerDatas.cptOptionsList[this.props.cptIndex];
    if (tempKeyVal === 2) {
      let dataSource = JSON.parse(JSON.stringify(this.state.layerDataSource));
      if(LayerType=="chart"||LayerType == 'border'||LayerType == 'iframe'||otherLayerId=="moreRowText"){
          dataSource = JSON.parse(JSON.stringify(this.state.noContent));
      }else if(LayerType=="text"&&otherLayerId!="moreRowText"){
        if (dataObj) {
          let tempTextLayerObj = dataObj;
          let showData = tempTextLayerObj.textCenter;
          dataSource[0].childer[0].value = showData;
          dataSource[0].childer[0].ename = "textCenter";
        }
      }else if(LayerType==="table"){
        if (dataObj) {
          let tempTextLayerObj = dataObj;
          let showData = tempTextLayerObj.tableData;
          dataSource[0].childer[0].value = showData;
          dataSource[0].childer[0].ename = "tableData";
        }
      }
      this.setState({
          dataSource: dataSource,
      });
    } else if (tempKeyVal === 1) {
      let tempLayer = [];
      // let cptBorderObj = store.getState().showLayerDatas.showDatas.cptBorderObj;
      let cptBorderObj = cptPropertyObj.cptBorderObj;
      let tempChartArr = this.state.chart;
      let tempChart = [];
      for (let i = 0; i < 5; i++) {
        tempChart.push(tempChartArr[i]);
      }
      tempChart[0].childer[0].value = cptBorderObj.width;
      tempChart[0].childer[1].value = cptBorderObj.height;
      tempChart[1].childer[0].value = cptBorderObj.left;
      tempChart[1].childer[1].value = cptBorderObj.top;
      tempChart[2].childer[0].value = cptBorderObj.rotate;
      tempChart[3].childer[0].value = cptBorderObj.opacity;
      tempChart[4].childer[0].value = cptBorderObj.layerBorderWidth;
      tempChart[4].childer[1].value = cptBorderObj.layerBorderStyle;
      tempChart[4].childer[2].value = cptBorderObj.layerBorderColor;
      if (LayerType === 'chart') {
        
      } else if (LayerType === 'text') {
        tempLayer = this.state.text;
        if (dataObj) {
          let {fontFamily,fontSize,fontColor,fontWeight,textAlign,writingMode,hyperlinkCenter,isNewWindow} = dataObj;
          tempLayer[0].childer[0].value = fontFamily;
          tempLayer[0].childer[1].value = fontSize;
          tempLayer[0].childer[2].value = fontColor;
          tempLayer[0].childer[3].value = fontWeight;
          tempLayer[1].childer[0].value = textAlign;
          tempLayer[2].childer[0].value = writingMode;
          tempLayer[3].childer[0].value = hyperlinkCenter;
          tempLayer[3].childer[1].value = isNewWindow;
        }
      } else if (LayerType === 'border') {
        tempLayer = this.state.border;
        if (dataObj) {
          let {borderWidth,borderImage} = dataObj;
          tempLayer[0].childer[0].value = borderWidth;
          tempLayer[1].childer[0].value = borderImage;
        }
      } else if (LayerType === 'iframe') {
        tempLayer = this.state.iframe;
        if (dataObj) {
          let {iframeUrl} = dataObj;
          tempLayer[0].childer[0].value = iframeUrl;
        }
      } else if (LayerType === 'table') {
        tempLayer = this.state.table;
        if (dataObj) {
          let tempTextLayerObj = dataObj.tableConfig;
          let tableFieldObj = tempTextLayerObj.table;
          let tableFieldHeaderObj = tableFieldObj.header;
          let tableHeaderTextObj = tableFieldHeaderObj.textStyle;
          let tableBodyTextObj = tableFieldObj.textStyle;
          let tableBodyBaseObj = tableFieldObj.ZebraLine;
          let tableBodyBorderObj = tableFieldObj.borderStyle;
          tempLayer[0].childer[0].value = tableFieldHeaderObj.textAlign;
          tempLayer[0].childer[1].value = tableHeaderTextObj.fontFamily;
          tempLayer[0].childer[2].value = tableHeaderTextObj.fontSize;
          tempLayer[0].childer[3].value = tableHeaderTextObj.fontColor;
          tempLayer[0].childer[4].value = tableHeaderTextObj.fontWeight;
          tempLayer[0].childer[5].value = tableFieldObj.borderStyle.width;
          tempLayer[0].childer[6].value = tableFieldObj.borderStyle.color;
          tempLayer[0].childer[7].value = tableFieldObj.backgroundColor;
          tempLayer[1].childer[0].value = tableFieldHeaderObj.pageSize;
          tempLayer[2].childer[0].value = tableBodyBaseObj.textAlign;
          tempLayer[2].childer[1].value = tableBodyTextObj.fontFamily;
          tempLayer[2].childer[2].value = tableBodyTextObj.fontSize;
          tempLayer[2].childer[3].value = tableBodyTextObj.fontColor;
          tempLayer[2].childer[4].value = tableBodyTextObj.fontWeight;
          tempLayer[2].childer[5].value = tableBodyBorderObj.width;
          tempLayer[2].childer[6].value = tableBodyBorderObj.color;
          tempLayer[2].childer[7].value = tableBodyBaseObj.backgroundColor;
        }
      }else if(LayerType === 'image'){
        if(otherLayerId==="singleImage"){
          tempLayer = this.state.singleImage;
          if (dataObj) {
            let tempImageLayerObj = dataObj;
            tempLayer[0].childer[0].value = tempImageLayerObj['backgroundImage'];
            tempLayer[1].childer[0].value = tempImageLayerObj['backgroundImage'];
            tempLayer[2].childer[0].value = tempImageLayerObj['repeat'];
            tempLayer[3].childer[0].value = tempImageLayerObj['radius'];
            tempLayer[4].childer[0].value = tempImageLayerObj.urlConfig['url'];
            tempLayer[4].childer[1].value = tempImageLayerObj.urlConfig['ifBlank'];
          }
        }
      }else if (LayerType === 'decorate') {
        tempLayer = this.state.decorate;
        if (dataObj) {
          let {decorateImage} = dataObj;
          tempLayer[0].childer[0].value = decorateImage;
        }
      }
      this.setState(
        {
          chart: tempChart.concat(JSON.parse(JSON.stringify(tempLayer))),
        });
    } else if (tempKeyVal === 0) {
      let tempBg = this.state.bg;
      let {bjWidth,bjHeight,bgColor,bgImageName,bgImageIntegerUrl} = this.props.globalBg;
      tempBg[0].childer[0].value = bjWidth;
      tempBg[0].childer[1].value = bjHeight;
      tempBg[1].childer[0].value = bgColor;
      tempBg[2].childer[0].value = bgImageName;
      tempBg[3].childer[0].value = bgImageIntegerUrl;
      tempBg[4].childer[0].value = bgImageIntegerUrl;
      this.setState({
        bg: tempBg
      });
    }
  }

  
  propsParam(paramObj){
    let {fieldValue,fieldEname} = paramObj;
    this.props.param({
      fieldValue,
      fieldEname
    });
  }
 


  /**
   * @description:  改变编辑面板里面的值,并修改中间图表的数据
   * @param {number} fieldValue 当前的属性的value值
   * @param {String} fieldEname 当前属性值
   * @return:  调用layout里面的编辑当前图表的方法
   */
  updateThisCharsField = (fieldValue, fieldEname) => {
    this.propsParam(
      {
        fieldValue: fieldValue,
        fieldEname: fieldEname,
      }
    )
  }

 

  /**
   * @description: 将背景设置还原
   * @param {type}
   * @return:
   */
  deletePageBg = () => {
    let deletePageBgs = [
      {
        fieldValue: 'none',
        fieldEname: 'bgImageName'
      },
      {
        fieldValue: '',
        fieldEname: 'bgImageIntegerUrl'
      },
    ];  
    deletePageBgs.map(item => {
      this.propsParam(item);
    })
  }



  render() {
    var fieldDatas = [];
    let {bg,dataSource,chart} = this.state;
    let {tabsKey} = this.props;
    if (tabsKey === 0) {
      fieldDatas = bg;
    } else {
      if (tabsKey === 2) {
        fieldDatas = dataSource;
      } else if (tabsKey === 1) {
        fieldDatas = chart;
      }
    }
    if (fieldDatas) {
      return (
        <div className='pro-items'>
          {fieldDatas.map((item, i) => {
            if (item.type === 'Collapse') {
              return (
                <Collapse expandIconPosition='right'  key={i} bordered={false} >
                  <Panel header={item.name} key='1'>
                    {item.childer.map((itemLayer, itemIndex) => {
                        if (itemLayer.type === 'Collapse') {
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
                                      updateThisCharsField={this.updateThisCharsField}
                                      />
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
                              updateThisCharsField={this.updateThisCharsField}
                              />
                          );
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
                  updateThisCharsField={this.updateThisCharsField}
                  />
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
