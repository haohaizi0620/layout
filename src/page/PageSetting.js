import React, { Component } from 'react';
import { Row, Col, InputNumber } from 'antd';
import SketchColor from '../component/globalCom/SketchColor';
import './PageSetting.css';

/* 页面样式设置 */
export default class PageSetting extends Component {
  constructor(props) {
    console.info(props);
    super(props);
  }

  state = {
    pickColor: 'red',
    sketchPicker: false
  };

  widthChange = value => {
    console.info(value);
  };

  heightChange = value => {
    console.info(value);
  };

  render() {
    return (
      <Col className='page-setting'>
        <Row className='config-manager-head'>
          <span>页面设置</span>
        </Row>
        <Row className='page-setting-content'>
          <Col span={10} offset={1}>
            <span>页面宽度</span>
          </Col>
          <Col span={10} offset={1}>
            <InputNumber
              min={1}
              max={5000}
              defaultValue={3}
              onChange={this.widthChange}
              size='small'
            />
          </Col>
        </Row>
        <Row className='page-setting-content'>
          <Col span={10} offset={1}>
            <span>页面高度</span>
          </Col>
          <Col span={10} offset={1}>
            <InputNumber
              min={1}
              max={5000}
              defaultValue={3}
              onChange={this.heightChange}
              size='small'
            />
          </Col>
        </Row>
        <Row className='page-setting-content'>
          <Col span={10} offset={1}>
            <span>背景颜色</span>
          </Col>
          <Col span={10} offset={1}>
            <SketchColor></SketchColor>
          </Col>
        </Row>
        <Row></Row>
      </Col>
    );
  }
}
