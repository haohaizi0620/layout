/*
 * @Author: your name
 * @Date: 2019-12-31 16:33:25
 * @LastEditTime: 2020-03-25 16:59:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout-master\src\component\Config.js
 */
import "./Config.scss";
import React, { Component, Fragment } from "react";
import Properties from "./Properties";
import { Tabs, Icon } from "antd";
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

  changeProperties(updateFieldObj) {
    this.props.changeProperties(updateFieldObj);
  }

  /**
   * @description: 基本设置和数据设置之间的切换
   * @param {Integer} key 表示当前是那个设置
   * @return:
   */
  switchTabs(key) {
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
    if (this.props.cptIndex === -1) {
      return (
        <div className="control-panel">
          <div className="control-panel-header control-panel-header-bg">
            <span className="control-panel-header-bg-title">页面设置</span>
          </div>
          <div className="control-panel-container">
            <Properties
              ref="editMainCenter"
              tabsKey={0}
              cptChartData={this.props.cptChartData}
              param={this.changeProperties.bind(this)}
              cptPropertyObj={this.props.cptPropertyObj}
              cptIndex={this.props.cptIndex}
            ></Properties>
          </div>
        </div>
      );
    } else {
      return (
        <div className="control-panel">
          <div className="control-panel-header control-panel-header-bg">
            <span className="control-panel-header-bg-title">组件设置</span>
          </div>
          <div className="control-panel-header" style={{ height: "30px" }}>
            {/* 控制面板，当前操作组件下标：{this.props.cptIndex} <br />*/}
            <div class="control-panel-header-title">
              <div class="title-name">
                <span class="ellipsis" title={this.props.cptLayerAttr.title}>
                    {this.props.cptLayerAttr.title}
                </span>
              </div>
              <div class="version-tag">
                <span>
                  索引:{this.props.cptIndex} | {this.props.cptLayerAttr.title}
                </span>
              </div>
            </div>
          </div>
          <div className="control-panel-container">
            <Tabs
              defaultActiveKey="1"
              size="large"
              onChange={this.switchTabs.bind(this)}
            >
              {this.state.tabKeys.map(item => {
                if (item.serialNumber === this.state.tabsKey) {
                  return (
                    <TabPane
                      tab={
                        <span>
                          {/*  <Icon type={item.IconEname} /> */}
                          {item.tabCname}
                        </span>
                      }
                      key={item.serialNumber}
                    >
                      <Properties
                        ref="editMainCenter"
                        cptChartData={this.props.cptChartData}
                        param={this.changeProperties.bind(this)}
                        tabsKey={this.state.tabsKey}
                        cptPropertyObj={this.props.cptPropertyObj}
                        cptLayerAttr={this.props.cptLayerAttr}
                        cptIndex={this.props.cptIndex}
                      ></Properties>
                    </TabPane>
                  );
                } else {
                  return (
                    <TabPane
                      tab={
                        <span>
                          {/*  <Icon type={item.IconEname} /> */}
                          {item.tabCname}
                        </span>
                      }
                      key={item.serialNumber}
                    ></TabPane>
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
