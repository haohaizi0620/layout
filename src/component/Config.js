/*
 * @Author: your name
 * @Date: 2019-12-31 16:33:25
 * @LastEditTime : 2020-02-14 17:21:09
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout-master\src\component\Config.js
 */
import './Config.css';
import React, { Component, Fragment } from 'react';
import Properties from './Properties';
import { Tabs, Icon } from 'antd';
import { Item } from 'rc-menu';
const { TabPane } = Tabs;
class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsKey: 1,
      tabKeys: [
        {
          serialNumber: '1',
          tabCname: '配置',
          IconEname: 'apple',
          defaultSelect: true
        },
        {
          serialNumber: '2',
          tabCname: '数据',
          IconEname: 'android',
          defaultSelect: false
        }
      ],
      cptChartData:{}
    };
  }

  changeProperties(updateFieldObj) {
    this.props.changeProperties(updateFieldObj);
  }
  
  componentWillReceiveProps(newProp){
    let cptChartData = newProp.cptChartData;
    if(cptChartData){
        this.setState({
          cptChartData:cptChartData,
        })
    }
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
        {
          this.refs.editMainCenter.updateStateVal();
        }
      }
    );
  }

  render() {
    if (this.props.cptIndex == -1) {
      this.state.tabsKey = 1;
      return (
        <div className='control-panel'>
          <div className='control-panel-header control-panel-header-bg'>
            <span className='control-panel-header-bg-title'>页面设置</span>
          </div>
          <div className='control-panel-container'>
            <Properties
              ref='editMainCenter'
              tabsKey={0}
              cptChartData={this.state.cptChartData}
              param={this.changeProperties.bind(this)}
              cptPropertyObj={this.props.cptPropertyObj}
              cptIndex={this.props.cptIndex}></Properties>
          </div>
        </div>
      );
    } else {
      return (
        <div className='control-panel'>
          <div className='control-panel-header'>
            控制面板，当前操作组件下标：{this.props.cptIndex}
            <br />
            名称：{this.props.cptLayerAttr.title}
          </div>
          <div className='control-panel-container'>
            <Tabs defaultActiveKey='1' size='large' onChange={this.switchTabs.bind(this)}>
              {this.state.tabKeys.map(item => {
                if (item.serialNumber == this.state.tabsKey) {
                  return (
                    <TabPane
                      tab={
                        <span>
                          <Icon type={item.IconEname} />
                          {item.tabCname}
                        </span>
                      }
                      key={item.serialNumber}>
                      <Properties
                        ref='editMainCenter'
                        cptChartData={this.props.cptChartData}
                        param={this.changeProperties.bind(this)}
                        tabsKey={this.state.tabsKey}
                        cptPropertyObj={this.props.cptPropertyObj}
                        cptIndex={this.props.cptIndex}></Properties>
                    </TabPane>
                  );
                } else {
                  return (
                    <TabPane
                      tab={
                        <span>
                          <Icon type={item.IconEname} />
                          {item.tabCname}
                        </span>
                      }
                      key={item.serialNumber}></TabPane>
                  );
                }
              })}
            </Tabs>
          </div>
        </div>
      );
    }
  }
}
export default Config;
