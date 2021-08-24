/*
 * @Author: your name
 * @Date: 2020-03-10 19:45:00
 * @LastEditTime: 2020-03-26 14:08:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\globalCom\SketchColor.js
 */
import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import { Input } from 'antd';
/* 取色板组件 */
class SketchColor extends React.Component {

  static defaultProps = {
    colorVal:'rgba(255,255,255,0)'
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  state = {
    displayColorPicker: false,
    color: this.props.colorVal
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    let colorRgb = color.rgb;
    let colorPick = `rgba(${colorRgb.r},${colorRgb.g},${colorRgb.b},${colorRgb.a})`;
    this.updateColor(colorPick);
  };

  updateColor = color => {
    this.setState({ color: color });
    this.props.setBgColor(color,this.props.ename);
  }


  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: '20px',
          height: '14px',
          borderRadius: '2px',
          background: this.state.color
        },
        swatch: {
          left:'70px',
          position: 'relative',
          top: '-26px',
          padding: '3px',
          background: '#fff',
          borderRadius: '0px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer'
        },
        popover: {
          position: 'relative',
          zIndex: '2',
          right: '30px',
          color: 'black'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      }
    });

    return (
      <div>
        <Input
          onChange={event => {
            this.inputChange(event.target.value);
          }}
           value={this.state.color}
           />
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker color={this.state.color} onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default SketchColor;
