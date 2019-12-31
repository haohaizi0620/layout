import React, {Component} from 'react';
import fontawesome from '@fortawesome/fontawesome';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faCheckSquare,
    faFont,
    faBars,
    faChartBar,
    faChartLine,
    faChartPie,
    faChartArea,
    faEllipsisH
} from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faCheckSquare, faFont, faBars, faChartBar, faChartLine, faChartPie,faChartArea,faEllipsisH)

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otype:'chart',
            ttype:'all',
            chart:{
                all:[
                    {id:'jbzt',text:'基本柱图'},
                    {id:'ddzzt',text:'堆叠柱状图'},
                    {id:'ddtxt',text:'堆叠条形图'},
                    {id:'zxzt',text:'折线柱图'},
                    {id:'zftxt',text:'正负条形图'},
                    {id:'jtpbt',text:'阶梯瀑布图'},
                    {id:'jbzxt',text:'基本折线图'},
                    {id:'ddzxt',text:'基本折线图'},
                    {id:'pbt',text:'瀑布图'},
                    {id:'ysfdzxt',text:'颜色分段折线图'},
                    {id:'jbmjt',text:'基本面积图'},
                    {id:'ddmjt',text:'堆叠面积图'},
                    {id:'jbbt',text:'基本饼图'},
                    {id:'yhbt',text:'圆环饼图'},
                    {id:'zbzbbt',text:'指标占比饼图'},
                    {id:'mgt',text:'玫瑰图'},
                    {id:'qpt',text:'气泡图'},
                    {id:'sdt',text:'散点图'},
                    {id:'ldt',text:'雷达图'},
                    {id:'ldot',text:'漏斗图'},
                    {id:'ybp',text:'仪表盘'},
                    {id:'xxzt',text:'象形柱图'}
                ],
                bar:[
                    {id:'jbzt',text:'基本柱图'},
                    {id:'ddzzt',text:'堆叠柱状图'},
                    {id:'ddtxt',text:'堆叠条形图'},
                    {id:'zxzt',text:'折线柱图'},
                    {id:'zftxt',text:'正负条形图'},
                    {id:'jtpbt',text:'阶梯瀑布图'}
                ],line:[
                    {id:'jbzxt',text:'基本折线图'},
                    {id:'ddzxt',text:'基本折线图'},
                    {id:'pbt',text:'瀑布图'},
                    {id:'ysfdzxt',text:'颜色分段折线图'}
                ],area:[
                    {id:'jbmjt',text:'基本面积图'},
                    {id:'ddmjt',text:'堆叠面积图'}
                ],pie:[
                    {id:'jbbt',text:'基本饼图'},
                    {id:'yhbt',text:'圆环饼图'},
                    {id:'zbzbbt',text:'指标占比饼图'},
                    {id:'mgt',text:'玫瑰图'}
                ],other:[
                    {id:'qpt',text:'气泡图'},
                    {id:'sdt',text:'散点图'},
                    {id:'ldt',text:'雷达图'},
                    {id:'ldot',text:'漏斗图'},
                    {id:'ybp',text:'仪表盘'},
                    {id:'xxzt',text:'象形柱图'}
                ]
            }
        }
    }

    onClickAdd(props) {
        this.props.onClickAdd(props);
    }

    handleChartMouseOver(obj){
        const  t = obj.currentTarget.getAttribute('t');
        this.setState({
            otype:'chart',
            ttype:t
        });
    }

    render() {
        const ttype = this.state.ttype;
        return (
            <div className="custom-header">
                <ul className="custom-header-ul">
                    <li className="custom-header-li" title="基础图表">
                        <FontAwesomeIcon icon={faChartBar}/>
                        <div className="custom-header-li-c">
                            <table className="custom-header-table">
                                <tbody className="custom-header-tbody">
                                <tr>
                                    <td className="custom-header-sub-list left">
                                        <ul className="custom-header-sub-ul">
                                            <li className="custom-header-sub-li" t="all" title="所有" onMouseOver={this.handleChartMouseOver.bind(this)}>
                                                <div><FontAwesomeIcon icon={faBars}/></div>
                                            </li>
                                            <li className="custom-header-sub-li" t="bar" title="柱状图" onMouseOver={this.handleChartMouseOver.bind(this)}>
                                                <div><FontAwesomeIcon icon={faChartBar}/></div>
                                            </li>
                                            <li className="custom-header-sub-li" t="line" title="折线图" onMouseOver={this.handleChartMouseOver.bind(this)}>
                                                <div><FontAwesomeIcon icon={faChartLine}/></div>
                                            </li>
                                            <li className="custom-header-sub-li" t="area" title="面积图"  onMouseOver={this.handleChartMouseOver.bind(this)}>
                                                <div><FontAwesomeIcon icon={faChartArea}/></div>
                                            </li>
                                            <li className="custom-header-sub-li" t="pie" title="饼状图" onMouseOver={this.handleChartMouseOver.bind(this)}>
                                                <div><FontAwesomeIcon icon={faChartPie}/></div>
                                            </li>
                                            <li className="custom-header-sub-li" t="other" title="其他" onMouseOver={this.handleChartMouseOver.bind(this)}>
                                                <div><FontAwesomeIcon icon={faEllipsisH}/></div>
                                            </li>
                                        </ul>
                                    </td>
                                    <td className="custom-header-sub-list">
                                        <div className="custom-header-menu-c">
                                            <ul className="custom-header-menu-ul">
                                                {
                                                    this.state[this.state["otype"]][ttype].map((item, i) => {
                                                        const c = `custom-header-menu-li-bg ${item.id}`;
                                                        return (
                                                            <li onClick={this.onClickAdd.bind(this)} className="custom-header-menu-li" type={this.state["otype"]} id={item.id} title={item.text} key={item.id}>
                                                                <div className={c}></div>
                                                                <p className="custom-header-menu-li-txt">{item.text}</p>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>
                    <li className="custom-header-li" title="文本"><FontAwesomeIcon icon={faFont}/></li>
                </ul>
            </div>
        );
    }
}

export default Header;