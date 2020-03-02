import React, { Component } from 'react';
import { Row, Col, InputNumber } from 'antd';
import SketchColor from '../../component/globalCom/SketchColor';
// import './PageSetting.css';
import '../styleConfig.css';

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
      <Col className='style-setting'>
        <Row className='style-setting-head'>
          <span>页面设置</span>
        </Row>
        <Row className='style-setting-content'>
          <Col span={4} offset={1}>
            <span>屏幕大小</span>
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
