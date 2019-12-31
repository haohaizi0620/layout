/**
 * Created by LEAFER on 2019/7/3.
 */
import React, {Component} from 'react';
import './ComponentList.css';
/*
 * 样式面板组件
 */
class ComponentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const len = this.props.ComponentList.length;
        return (
            <div className="custom-left-list">
                <div className="custom-left-list-title">组件列表（{len}）</div>
                <div className="custom-left-list-p">
                {
                    this.props.ComponentList.map((item, i) => {
                        return (
                            <div key={item.key} className="custom-left-list-toolbar">
                                <div className="custom-left-list-toolbar-item" name={item.key}>{item.value}</div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}
export default ComponentList;