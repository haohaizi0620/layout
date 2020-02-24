import React, { Component } from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckSquare,
    faFont,
    faBars,
    faChartBar,
    faChartLine,
    faChartPie,
    faChartArea,
    faEllipsisH,
    faMapPin,
    faTextWidth,
    faTextHeight,
    faBus,
} from '@fortawesome/fontawesome-free-solid';
import { Button } from 'antd';
import 'antd/dist/antd.css';
fontawesome.library.add(faCheckSquare, faFont, faBars, faChartBar, faChartLine, faChartPie, faChartArea, faEllipsisH, faMapPin, faTextWidth, faTextHeight, faBus)

class Header extends Component {

    constructor(props) {
        super(props);
        const tempCharsStr = 'chart';
        const tempTextStr = 'text';
        const tempBorderStr = 'border';
        const tempIframeStr = 'iframe';
        this.state = {
            otype: 'chart',
            ttype: 'all',
            chart: {
                all: [
                    { id: 'jbzt', text: '基本柱图', layerType: 'chart' },
                    { id: 'ddzzt', text: '堆叠柱状图', layerType: 'chart' },
                    { id: 'ddtxt', text: '堆叠条形图', layerType: 'chart' },
                    { id: 'zxzt', text: '折线柱图', layerType: 'chart' },
                    { id: 'zftxt', text: '正负条形图', layerType: 'chart' },
                    { id: 'jtpbt', text: '阶梯瀑布图', layerType: 'chart' },
                    { id: 'jbzxt', text: '基本折线图', layerType: 'chart' },
                    { id: 'ddzxt', text: '基本折线图', layerType: 'chart' },
                    { id: 'pbt', text: '瀑布图', layerType: 'chart' },
                    { id: 'ysfdzxt', text: '颜色分段折线图', layerType: 'chart' },
                    { id: 'jbmjt', text: '基本面积图', layerType: 'chart' },
                    { id: 'ddmjt', text: '堆叠面积图', layerType: 'chart' },
                    { id: 'jbbt', text: '基本饼图', layerType: 'chart' },
                    { id: 'yhbt', text: '圆环饼图', layerType: 'chart' },
                    { id: 'zbzbbt', text: '指标占比饼图', layerType: 'chart' },
                    { id: 'mgt', text: '玫瑰图', layerType: 'chart' },
                    { id: 'qpt', text: '气泡图', layerType: 'chart' },
                    { id: 'sdt', text: '散点图', layerType: 'chart' },
                    { id: 'ldt', text: '雷达图', layerType: 'chart' },
                    { id: 'ldot', text: '漏斗图', layerType: 'chart' },
                    { id: 'ybp', text: '仪表盘', layerType: 'chart' },
                    { id: 'xxzt', text: '象形柱图', layerType: 'chart'  }
                ],
                bar: [
                    { id: 'jbzt', text: '基本柱图', layerType: 'chart' },
                    { id: 'ddzzt', text: '堆叠柱状图', layerType: 'chart' },
                    { id: 'ddtxt', text: '堆叠条形图', layerType: 'chart' },
                    { id: 'zxzt', text: '折线柱图', layerType: 'chart' },
                    { id: 'zftxt', text: '正负条形图', layerType: 'chart' },
                    { id: 'jtpbt', text: '阶梯瀑布图' }
                ], line: [
                    { id: 'jbzxt', text: '基本折线图', layerType: 'chart' },
                    { id: 'ddzxt', text: '基本折线图', layerType: 'chart' },
                    { id: 'pbt', text: '瀑布图', layerType: 'chart' },
                    { id: 'ysfdzxt', text: '颜色分段折线图' }
                ], area: [
                    { id: 'jbmjt', text: '基本面积图', layerType: 'chart' },
                    { id: 'ddmjt', text: '堆叠面积图' }
                ], pie: [
                    { id: 'jbbt', text: '基本饼图', layerType: 'chart' },
                    { id: 'yhbt', text: '圆环饼图', layerType: 'chart' },
                    { id: 'zbzbbt', text: '指标占比饼图', layerType: 'chart' },
                    { id: 'mgt', text: '玫瑰图' }
                ], other: [
                    { id: 'qpt', text: '气泡图', layerType: 'chart' },
                    { id: 'sdt', text: '散点图', layerType: 'chart' },
                    { id: 'ldt', text: '雷达图', layerType: 'chart' },
                    { id: 'ldot', text: '漏斗图', layerType: 'chart' },
                    { id: 'ybp', text: '仪表盘', layerType: 'chart' },
                    { id: 'xxzt', text: '象形柱图' }
                ], map: [
                    { id: 'generalPointStyle', text: '点样式', layerType: 'map' },
                    { id: 'generalLineStyle', text: '线样式', layerType: 'map' },
                    { id: 'generalSurfaceStyle', text: '面样式', layerType: 'map' },
                ], countMap: [
                    { id: 'mapPie', text: '地图饼状图', layerType: 'chartMap' },
                    { id: 'mapFan', text: '地图扇形图', layerType: 'chartMap' },
                    { id: 'mapBar', text: '地图柱状图', layerType: 'chartMap' },
                ],
            },
            text: {
                textWidth: [
                    { id: 'singleRowText', text: '单行文本', layerType: 'text' },
                ],
                textHeight: [
                    { id: 'moreRowText', text: '多行文本', layerType: 'text' },
                ]
            },
            border: {
                borderWidth: [
                    { id: 'singleBorder', text: '直线边框', layerType: 'border' },
                ],
                borderHeight: [
                    { id: 'breakLine', text: '波浪线', layerType: 'border' },
                ]
            },
            iframe:{
                iframeCenter:[
                    { id: 'iframeCenter', text: '嵌入页面', layerType: 'iframe' },
                ]
            },
            //生成对应的UIstate
            layerDatas: [
                {
                    typeName: 'chart',
                    refName: 'basicChart',
                    titleName: '基础图表',
                    IconObj: faChartBar,
                    leftIconLists: [
                        {
                            prevName: 'all',
                            thisType: tempCharsStr,
                            titleName: '所有',
                            IconObj: faBars
                        },
                        {
                            prevName: 'bar',
                            thisType: tempCharsStr,
                            titleName: '柱状图',
                            IconObj: faChartBar
                        },
                        {
                            prevName: 'line',
                            thisType: tempCharsStr,
                            titleName: '折线图',
                            IconObj: faChartLine
                        },
                        {
                            prevName: 'area',
                            thisType: tempCharsStr,
                            titleName: '面积图',
                            IconObj: faChartArea
                        },
                        {
                            prevName: 'pie',
                            thisType: tempCharsStr,
                            titleName: '饼状图',
                            IconObj: faChartPie
                        },
                        {
                            prevName: 'other',
                            thisType: tempCharsStr,
                            titleName: '其他',
                            IconObj: faEllipsisH
                        },
                        {
                            prevName: 'map',
                            thisType: tempCharsStr,
                            titleName: '地图',
                            IconObj: faMapPin
                        },
                        {
                            prevName: 'countMap',
                            thisType: tempCharsStr,
                            titleName: '统计地图',
                            IconObj: faMapPin
                        }
                    ],
                },
                {
                    typeName: 'text',
                    refName: 'text',
                    titleName: '文本',
                    IconObj: faFont,
                    leftIconLists: [
                        {
                            prevName: 'textWidth',
                            thisType: tempTextStr,
                            titleName: '文本宽度',
                            IconObj: faTextWidth
                        },
                        {
                            prevName: 'textHeight',
                            thisType: tempTextStr,
                            titleName: '文本高度',
                            IconObj: faTextHeight
                        }
                    ]
                },
                {
                    typeName: 'border',
                    refName: 'border',
                    titleName: '边框',
                    IconObj: faBus,
                    leftIconLists: [
                        {
                            prevName: 'borderWidth',
                            thisType: tempBorderStr,
                            titleName: '文本宽度',
                            IconObj: faBus
                        },
                        {
                            prevName: 'borderHeight',
                            thisType: tempBorderStr,
                            titleName: '文本高度',
                            IconObj: faBus
                        }
                    ]
                },
                {
                    typeName: 'iframe',
                    refName: 'iframe',
                    titleName: '嵌套页面',
                    IconObj: faBus,
                    leftIconLists: [
                        {
                            prevName: 'iframeCenter',
                            thisType: tempIframeStr,
                            titleName: '嵌套页面',
                            IconObj: faBus
                        }
                    ]
                }
            ]
        }
    }

    /**
     * @description: 添加一个图层到对应的生成content组件的数据里
     * @param {type} 
     * @return: 
     */
    onClickAdd(layerObj) {
        this.props.onClickAdd(layerObj, {
            data:{},
            State:"headerAdd"
          });
    }

    handleChartMouseOver(obj) {
        const t = obj.currentTarget.getAttribute('t');
        const thisType = obj.currentTarget.getAttribute('thisType');
        this.setState({
            otype: thisType,
            ttype: t
        });
    }

    /**
     * @description: 用来保存当前编辑页面的所有图表的数据
     * @param {type} 
     * @return: 
     */
    saveLayoutData(){
        this.props.saveLayoutData();
    }

    saveShowPageData(){
        this.props.saveShowPageData();
    }

    render() {
        const ttype = this.state.ttype;
        return (
            <div className="custom-header">
                <ul className="custom-header-ul">
                    {
                        this.state.layerDatas.map((item, index) => {
                            return (
                                <li className="custom-header-li" ref={item.refName} title={item.titleName} >
                                    <FontAwesomeIcon icon={item.IconObj} />
                                    <div className="custom-header-li-c">
                                        <table className="custom-header-table">
                                            <tbody className="custom-header-tbody">
                                                <tr>
                                                    <td className="custom-header-sub-list left">
                                                        <ul className="custom-header-sub-ul">
                                                            {
                                                                item.leftIconLists.map((iconItem, i) => {
                                                                    return (
                                                                        <li className="custom-header-sub-li" t={iconItem.prevName} thisType={iconItem.thisType} title={iconItem.titleName} onMouseOver={this.handleChartMouseOver.bind(this)}  >
                                                                            <div><FontAwesomeIcon icon={iconItem.IconObj} /></div>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </td>
                                                    <td className="custom-header-sub-list">
                                                        <div className="custom-header-menu-c">
                                                            <ul className="custom-header-menu-ul">
                                                                {   
                                                                        // this.state["otype"]==item.typeName?
                                                                        this.state[this.state["otype"]][ttype].map((item, i) => {
                                                                            const c = `custom-header-menu-li-bg ${item.id}bg`;
                                                                            item['simpleType'] = ttype;
                                                                            return (
                                                                                <li onClick={this.onClickAdd.bind(this, item)} className="custom-header-menu-li" type={item.layerType} id={item.id} title={item.text} key={item.id}>
                                                                                    <div className={c}></div>
                                                                                    <p className="custom-header-menu-li-txt">{item.text}</p>
                                                                                </li>
                                                                            )
                                                                        })
                                                                        // :true
                                                                }
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div   style={{
                    position: 'relative',
                    left: '67%',
                    width:'18%'
                }} >
                    <div
                        style={{
                           height:'80%',
                           top:'10%',
                           position: 'relative'
                        }}
                    >
                        <Button  type="primary" onClick={this.saveLayoutData.bind(this)}>保存</Button>
                        <Button  type="primary" onClick={this.saveShowPageData.bind(this)}>预览</Button>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Header;