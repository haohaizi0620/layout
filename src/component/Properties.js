import React, {Component} from 'react';
import PropertieData from '../datasource/properties.json'

import '../css/Spinner.css'
import '../css/Properties.css'
import '../css/base.css'


class Box extends React.Component{
    constructor(){
        super();
        this.state = {
            num : 10
        }
    }
    increase(){
        this.setState({
            num:(this.state.num == this.props.max)?this.props.max:(this.state.num+1)
        });
    }
    decrease(){
        this.setState({
            num:(this.state.num == this.props.min)?this.props.min:(this.state.num-1)
        });
    }
    /*渲染组件*/
    render(){
        return (
            <div className="spinner">
                <div className="spinner-p">
                    <div className="spinner-p-item">
                        <div className="spinner-p-item-l">
                            <input className="spinner-p-item-l-inp"/>
                        </div>
                        <div className="spinner-p-item-r">
                            <span className="add">+</span>
                            <span className="minus">-</span>
                        </div>
                    </div>
                </div>
                {/*<input type="button" value={this.state.num}/>
                <input type="button" value='-' onClick={this.decrease.bind(this)}/>
                <input type="button" value='+' onClick={this.increase.bind(this)}/>*/}
            </div>
        )
    }
}


/*
 * 样式面板组件
 */
class Properties extends Component {
    constructor(props) {
        super(props);

        this.state = {
            all: PropertieData,
            bg:{
                bg:[0,1]
            },
            chart: {
                jbzt: [0,1,2],
                line: [],
                bar: []
            },
            text: {
                title: [],
                text: []
            }
        }
    }

    inputChangeVulWidth(e) {
        const w = e.target.value;
        const h = this.props.controlPropertyObj.cptBorderObj.height;
        const i = this.props.cptIndex;
        this.props.param({width: w, height: h, index: i});
    }

    inputChangeVulHeight(e) {
        const w = this.props.controlPropertyObj.cptBorderObj.width;
        const h = e.target.value;
        const i = this.props.cptIndex;
        this.props.param({width: w, height: h, index: i});
    }

    render() {
        const type = this.props.controlPropertyObj.type;
        const cptType = this.props.controlPropertyObj.cptType;
        if (type == 'bg'){
            return (
                <div>
                    {
                        this.state[type][cptType].map((item, i) => {
                            if (item == 0){
                                return (
                                    <div key={item} className="pro-item">
                                        <i className="pro-item-i"></i>
                                        <div htmlFor={this.state.all[this.state.bg.bg[item]]} className="pro-item-text ellipsis">屏幕大小</div>
                                        <Box min='1000' max='1920'/>
                                    </div>
                                )
                            }else{
                                return (
                                    <div key={item}>
                                        <label htmlFor={this.state.all[this.state.bg.bg[item]]}> 高度: </label>
                                        <input id={this.state.all[this.state.bg.bg[item]]} value="1080"
                                               onChange={this.inputChangeVulWidth.bind(this)} ref={(input) => { this.input = input }}/>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            );
        }else {
            return (
                <div>
                    {/*{
                        this.state[type][cptType].map((item, i) => {
                            return (
                                <div key={item}>
                                    <label htmlFor="Mywidth"> 宽度: </label>
                                    <input id="Mywidth" value={parseInt(this.props.controlPropertyObj.cptBorderObj.width)}
                                           onChange={this.inputChangeVulWidth.bind(this)} ref={(input) => { this.input = input }}/>
                                </div>
                            )
                        })
                    }*/}
                </div>
            );
        }
    }
}
export default Properties;