import React, { Component } from 'react';
import './Rouler.scss';

const pixel = window.devicePixelRatio; // 屏幕宽度与物理像素比, 绘制 canvas 的时候避免图像模糊

export default class Rouler extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    /* rouler-canvas style */
    roulerStyle: {
      height: '20px'
    },

    /* canvas dom 的样式 */
    canvasStyle: [
      {
        transform: `translateX(0px)`,
        background: '#232529',

        position: 'relative',
        height: '20px'
      },
      {
        transform: `rotate(90deg) translateX(0px)`,
        transformOrigin: `0 0`,
        background: '#232529',

        position: 'relative',
        height: '20px'
      }
    ],

    calibration: {
      start: 3,
      unit: pixel,
      roulerLength: 1080 + 500,
      unitWidth: 1,
      unitHeight: 40
    }
  };

  /* Dom 渲染完毕开始绘制canvas */
  componentDidMount() {
    this.draw();
  }

  /* rouler 样式 */
  draw = () => {
    let canvas = document.getElementsByClassName('canvas-rouler');
    for (let index = 0; index < canvas.length; index++) {
      const element = canvas[index];
      if (element.getContext) {
        let ctx = element.getContext('2d');
        this.createRoulerUnit(ctx);
      }
    }
  };

  /* rouler 刻度绘制规则 */
  createRoulerUnit = ctx => {
    let unitNum = 0;
    let start = 3;
    let unitLong = 1;

    /* 刻度字体样式 */
    ctx.font = '24px serif';
    ctx.fillStyle = 'white';

    for (let i = 0; i < this.state.calibration.roulerLength; i++) {
      if (unitNum == 0) {
        ctx.fillRect(start, 0, this.state.calibration.unitWidth, this.state.calibration.unitHeight);
        ctx.fillText(0, start + 6, 25);
      } else if (Number.isInteger(unitNum / 10 / 8)) {
        /* 长刻度线 */
        ctx.fillRect(start, 0, this.state.calibration.unitWidth, this.state.calibration.unitHeight);
        unitLong++;
        /* 刻度 */
        ctx.fillText(unitNum, start + 6, 22);
      } else if (Number.isInteger(i / 10)) {
        /* 短刻度线 */
        ctx.fillRect(start, 30, 1, 10);
      }
      start += this.state.calibration.unit;
      unitNum++;
    }
  };

  /* 绘制 canvas-rouler Dom */
  roulerDraw = (style, index) => {
    let canvasWidth = parseInt(this.state.calibration.roulerLength) * this.state.calibration.unit;
    let canvasHeight =
      parseInt(this.state.roulerStyle.height.split('px')[0]) * this.state.calibration.unit;

    return (
      <div style={style} key={index}>
        <canvas
          className='canvas-rouler'
          width={canvasWidth}
          height={canvasHeight}
          style={this.state.roulerStyle}></canvas>
      </div>
    );
  };

  render() {
    return (
      <div id='edit-rouler'>
        <div id='edit'>{this.state.canvasStyle.map((item, i) => this.roulerDraw(item, i))}</div>
      </div>
    );
  }
}
