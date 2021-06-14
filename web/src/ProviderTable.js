// Copyright 2021 The casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";
import {DownOutlined, DeleteOutlined, UpOutlined, LinkOutlined} from '@ant-design/icons';
import {Button, Col, Input, Row, Select, Switch, Table, Tooltip} from 'antd';
import * as Setting from "./Setting";
import i18next from "i18next";

const { Option } = Select;

class ProviderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  updateTable(table) {
    this.props.onUpdateTable(table);
  }

  updateField(table, index, key, value) {
    table[index][key] = value;
    this.updateTable(table);
  }

  addRow(table) {
    let row = {name: "", canSignUp: false, canSignIn: true, canUnbind: true};
    if (table === undefined) {
      table = [];
    }
    table = Setting.addRow(table, row);
    this.updateTable(table);
  }

  deleteRow(table, i) {
    table = Setting.deleteRow(table, i);
    this.updateTable(table);
  }

  upRow(table, i) {
    table = Setting.swapRow(table, i - 1, i);
    this.updateTable(table);
  }

  downRow(table, i) {
    table = Setting.swapRow(table, i, i + 1);
    this.updateTable(table);
  }

  renderTable(table) {
    const columns = [
      {
        title: i18next.t("provider:Name"),
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => {
          return (
            <Select virtual={false} style={{width: '100%'}}
                    value={text}
                    onChange={value => {
                      this.updateField(table, index, 'name', value);
                    }} >
              {
                this.props.providers.map((provider, index) => <Option key={index} value={provider.name}>{provider.name}</Option>)
              }
            </Select>
          )
          return (
            <Input prefix={<LinkOutlined/>} value={text} onChange={e => {
              this.updateField(table, index, 'name', e.target.value);
            }} />
          )
        }
      },
      {
        title: i18next.t("provider:canSignUp"),
        dataIndex: 'canSignUp',
        key: 'canSignUp',
        width: '120px',
        render: (text, record, index) => {
          return (
            <Switch checked={text} onChange={checked => {
              this.updateField(table, index, 'canSignUp', checked);
            }} />
          )
        }
      },
      {
        title: i18next.t("provider:canSignIn"),
        dataIndex: 'canSignIn',
        key: 'canSignIn',
        width: '120px',
        render: (text, record, index) => {
          return (
            <Switch checked={text} onChange={checked => {
              this.updateField(table, index, 'canSignIn', checked);
            }} />
          )
        }
      },
      {
        title: i18next.t("provider:canUnbind"),
        dataIndex: 'canUnbind',
        key: 'canUnbind',
        width: '120px',
        render: (text, record, index) => {
          return (
            <Switch checked={text} onChange={checked => {
              this.updateField(table, index, 'canUnbind', checked);
            }} />
          )
        }
      },
      {
        title: i18next.t("general:Action"),
        key: 'action',
        width: '100px',
        render: (text, record, index) => {
          return (
            <div>
              <Tooltip placement="bottomLeft" title={i18next.t("general:Up")}>
                <Button style={{marginRight: "5px"}} disabled={index === 0} icon={<UpOutlined />} size="small" onClick={() => this.upRow(table, index)} />
              </Tooltip>
              <Tooltip placement="topLeft" title={i18next.t("general:Down")}>
                <Button style={{marginRight: "5px"}} disabled={index === table.length - 1} icon={<DownOutlined />} size="small" onClick={() => this.downRow(table, index)} />
              </Tooltip>
              <Tooltip placement="topLeft" title={i18next.t("general:Delete")}>
                <Button icon={<DeleteOutlined />} size="small" onClick={() => this.deleteRow(table, index)} />
              </Tooltip>
            </div>
          );
        }
      },
    ];

    return (
      <Table rowKey="index" columns={columns} dataSource={table} size="middle" bordered pagination={false}
             title={() => (
               <div>
                 {this.props.title}&nbsp;&nbsp;&nbsp;&nbsp;
                 <Button style={{marginRight: "5px"}} type="primary" size="small" onClick={() => this.addRow(table)}>{i18next.t("general:Add")}</Button>
               </div>
             )}
      />
    );
  }

  render() {
    return (
      <div>
        <Row style={{marginTop: '20px'}} >
          <Col span={24}>
            {
              this.renderTable(this.props.table)
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default ProviderTable;