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
const chartData = require('../../datasource/chartDatas.json');
var Container;
class BaseTable extends Component {
  static defaultProps = chartData.table;
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
    let tableConfig = this.props.config.table;
    let centerTextStyle = tableConfig.textStyle;
    let tbodyBaseStyle = tableConfig.ZebraLine;
    let tbodyBorderStyle = tableConfig.borderStyle;
    let headerConfig = tableConfig.header;
    let headerTextStyle = headerConfig.textStyle;
    let headerBorderStyle = headerConfig.borderStyle;
    Container = styled.div`
      .ant-table-thead{
        th {
          background-color: ${headerConfig.backgroundColor};
          height:${headerConfig.lineHeight}px;
          text-align:${headerConfig.textAlign};
          font-family: ${headerTextStyle.fontFamily};
          font-weight:${headerTextStyle.fontWeight};
          font-size: ${headerTextStyle.fontSize}px;
          border: ${headerBorderStyle.width}px solid ${headerBorderStyle.color};
        }
        span {
          color: ${headerTextStyle.color};
        }
      }
      .ant-table-tbody{
        td {
          text-align:${tbodyBaseStyle.textAlign};
          font-family: ${centerTextStyle.fontFamily};
          font-weight:${centerTextStyle.fontWeight};
          font-size: ${centerTextStyle.fontSize}px;
          color: ${centerTextStyle.color};
          height:${tbodyBaseStyle.lineHeight}px;
          background-color: ${tbodyBaseStyle.backgroundColor};
          border: ${tbodyBorderStyle.width}px solid ${tbodyBorderStyle.color};
        }
      }
    `;
  }


  render() {
    let tableConfig = this.props.config.table;
    return (
      <Container>
        <Table
            columns={this.props.columns}
            dataSource={this.props.data}
            pagination={{pageSize:tableConfig.pageSize}}
        />
      </Container>
    );
  }
}

export default BaseTable;
