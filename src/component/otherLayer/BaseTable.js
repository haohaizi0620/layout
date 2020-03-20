/*
 * @Author: your name
 * @Date: 2020-03-20 10:53:15
 * @LastEditTime: 2020-03-20 11:06:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\BaseTable.js
 */
import React, { Component } from 'react';
import {
    Table
  } from 'antd';

class BaseTable extends Component {
    static defaultProps = {
        data : [
            {
              key: '1',
              name: 'John Brown',
              age: 32,
            },
            {
              key: '2',
              name: 'Jim Green',
              age: 42,
            },
            {
              key: '3',
              name: 'Joe Black',
              age: 32,
            },
          ],
        columns :[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
         ]  
    }
    constructor(props) {
        super(props);
        this.state = { 
        }
    }

    render() { 
        return ( 
            <Table columns={this.props.columns} dataSource={this.props.data} />
         );
    }
}
 
export default BaseTable;