import React, { Component } from 'react';
import { Row, Col, InputNumber } from 'antd';
import SketchColor from '../../component/globalCom/SketchColor';
import './ComponentSetting.css';
/* 组件样式配置 */
export default class ComponentSetting extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    pickColor: 'red',
    sketchPicker: false
  };

  widthChange = value => {
    //console.info(value);
  };

  heightChange = value => {
    //console.info(value);
  };

  render() {
    return (
      <Col className='style-setting'>
        <Row className='style-setting-head'>
          <span>组件设置</span>
        </Row>
        <Row className='style-setting-content'>
          <Col span={4} offset={1}>
            <span>组件大小</span>
          </Col>
          <Col span={5} offset={5}>
            <InputNumber
              min={1}
              max={5000}
              // defaultValue={3}
              onChange={this.widthChange}
              size='small'
            />
            <i>宽度</i>
          </Col>
          <Col span={5} offset={1}>
            <InputNumber
              min={1}
              max={5000}
              // defaultValue={3}
              onChange={this.heightChange}
              size='small'
            />
            <i>高度</i>
          </Col>
        </Row>

        <Row className='style-setting-content'>
          <Col span={4} offset={1}>
            <span>背景颜色</span>
          </Col>
          <Col span={10} offset={4}>
            <SketchColor></SketchColor>
          </Col>
        </Row>
      </Col>
    );
  }
}
