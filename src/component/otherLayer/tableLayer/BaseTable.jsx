/*
 * @Author: your name
 * @Date: 2020-03-20 10:53:15
 * @LastEditTime: 2020-03-24 19:27:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\BaseTable.js
 */
import React, { Component } from "react";
import { Table } from "antd";
import styled from "styled-components";
const chartData = require('../../../datasource/otherDefaultData.json');
var Container;
class BaseTable extends Component {
  static defaultProps = chartData.table.BaseTable;
  constructor(props) {
    super(props);
    this.state = {

    };
    this.updateStyle();
  }

  componentWillReceiveProps(){
    this.updateStyle();
  }

  updateStyle(){
    let {config} = this.props;
    let {textStyle,ZebraLine,borderStyle,header} = config.table;
    let {textStyle:headTextStyle,borderStyle:headBorderStyle,backgroundColor:headBackgroundColor,lineHeight:headLineHeight,textAlign:headTextAlign} = header;
    let {width: headBorderWidth,color:headBorderColor} = headBorderStyle;
    let {fontFamily:headFontFamily,fontWeight:headFontWeight,fontSize:headFontSize,color:headFontColor} = headTextStyle;
    let {fontFamily:tbodyTextStyleFontFamily,fontWeight:tbodyTextStyleFontWeight,fontSize:tbodyTextStyleFontSize,color:tbodyTextStyleColor} = textStyle;
    let {textAlign:tbodyBaseTextAlign,lineHeight:tbodyBaseLineHeight,backgroundColor:tbodyBaseBackgroundColor} = ZebraLine;
    let {width:bodyBorderStyleWidth,color:bodyBorderStyleColor} = borderStyle;
    Container = styled.div`
      .ant-table-thead{
        th {
          background-color: ${headBackgroundColor};
          height:${headLineHeight}px;
          text-align:${headTextAlign};
          font-family: ${headFontFamily};
          font-weight:${headFontWeight};
          font-size: ${headFontSize}px;
          border: ${headBorderWidth}px solid ${headBorderColor};
        }
        span {
          color: ${headFontColor};
        }
      }
      .ant-table-tbody{
        td {
          text-align:${tbodyBaseTextAlign};
          font-family: ${tbodyTextStyleFontFamily};
          font-weight:${tbodyTextStyleFontWeight};
          font-size: ${tbodyTextStyleFontSize}px;
          color: ${tbodyTextStyleColor};
          height:${tbodyBaseLineHeight}px;
          background-color: ${tbodyBaseBackgroundColor};
          border: ${bodyBorderStyleWidth}px solid ${bodyBorderStyleColor};
        }
      }
    `;
  }
  render() {
    let {config,columns,data} = this.props;
    let {pageSize} = config.table;
    return (
      <Container>
        <Table
            columns={columns}
            dataSource={data}
            pagination={{pageSize:pageSize}}
        />
      </Container>
    );
  }
}

export default BaseTable;
