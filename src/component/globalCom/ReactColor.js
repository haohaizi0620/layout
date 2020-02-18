/*
 * @Author: your name
 * @Date: 2020-01-08 11:28:07
 * @LastEditTime : 2020-02-12 19:25:09
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\reactColor.js
 */

import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class SketchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: this.getColorVal(),
    };
  }

  getColorVal() {
    var resultColorVal = {
      r: '255',
      g: '255',
      b: '255',
      a: '1',
    }
    let tempColorVal = this.props.colorVal;
    if (tempColorVal && tempColorVal.indexOf("(") != -1) {
      var colorArrs = tempColorVal.substring(tempColorVal.indexOf("(") + 1, tempColorVal.indexOf(")")).split(",");
      resultColorVal = {
        r: colorArrs[0],
        g: colorArrs[1],
        b: colorArrs[2],
        a: colorArrs[3],
      }
    }
    return resultColorVal;
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      color: this.getColorVal(),
    });
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
    let tempRgbObj = color.rgb;
    this.props.setBgColor(`rgba(${tempRgbObj.r}, ${tempRgbObj.g}, ${tempRgbObj.b},${tempRgbObj.a})`);
  };

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          // position: 'absolute',
          // zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? <div style={styles.popover}>
          <div style={styles.cover} onClick={this.handleClose} />
          <SketchPicker color={this.state.color} onChange={this.handleChange} />
        </div> : null}

      </div>
    )
  }
}

export default SketchExample