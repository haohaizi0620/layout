/*
 * @Author: your name
 * @Date: 2019-12-31 16:33:25
 * @LastEditTime: 2020-03-26 15:37:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout-master\src\component\Config.js
 */
import "./Config.scss";
import React, { Component } from "react";
import Properties from "./Properties";
import { Tabs } from "antd";
const { TabPane } = Tabs;
class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsKey: 1,
      tabKeys: [
        {
          serialNumber: 1,
          tabCname: "配置",
          IconEname: "apple",
          defaultSelect: true
        },
        {
          serialNumber: 2,
          tabCname: "数据",
          IconEname: "android",
          defaultSelect: false
        }
      ]
    };
  }
  
  changeProperties = updateFieldObj => {
    this.props.changeProperties(updateFieldObj);
  }

  /**
   * @description: 基本设置和数据设置之间的切换
   * @param {Integer} key 表示当前是那个设置
   * @return:
   */
  switchTabs = key => {
    this.setState(
      {
        tabsKey: parseInt(key)
      },
      () => {
        this.refs.editMainCenter.updateStateVal();
      }
    );
  }

  render() {
    let {cptIndex,cptLayerAttr} = this.props;
    let {tabsKey,tabKeys} = this.state;
    if (cptIndex === -1) {
      return (
        <div className="control-panel">
          <div className="control-panel-header control-panel-header-bg">
            <span className="control-panel-header-bg-title">页面设置</span>
          </div>
          <div className="control-panel-container">
            <Properties
              ref="editMainCenter"
              tabsKey={0}
              param={this.changeProperties}
              {...this.props}
            ></Properties>
          </div>
        </div>
      );
    } else {
      let {title:layerTitle} = cptLayerAttr;
      return (
        <div className="control-panel">
          <div className="control-panel-header control-panel-header-bg">
            <span className="control-panel-header-bg-title">组件设置</span>
          </div>
          <div className="control-panel-header" style={{ height: "30px" }}>
            <div className="control-panel-header-title">
              <div className="title-name">
                <span className="ellipsis title-name-text" title={layerTitle}>
                    {layerTitle}    
                </span>
              </div>
              <div className="version-tag">
                <span>
                  索引:{cptIndex} | {layerTitle}
                </span>
              </div>
            </div>
          </div>
          <div className="control-panel-container">
            <Tabs
              defaultActiveKey="1"
              size="large"
              onChange={this.switchTabs}
            >
              {tabKeys.map(item => {
                if (item.serialNumber === tabsKey) {
                  return (
                    <TabPane
                      tab={
                        <span>
                          {item.tabCname}
                        </span>
                      }
                      key={item.serialNumber}
                    >
                      <Properties
                        ref="editMainCenter"
                        param={this.changeProperties}
                        tabsKey={tabsKey}
                        {...this.props}
                       />
                    </TabPane>
                  );
                } else {
                  return (
                    <TabPane
                      tab={
                        <span>
                          {item.tabCname}
                        </span>
                      }
                      key={item.serialNumber}
                    />
                  );
                }
              })}
            </Tabs>
          </div>
        </div>
      );
    }
  }

  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }
}
export default Config;
