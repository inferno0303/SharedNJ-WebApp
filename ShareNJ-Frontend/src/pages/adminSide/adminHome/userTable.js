import React from 'react';
import { Button, Input, Popconfirm, Table, Tag } from 'antd';
import moment from 'moment';
import style from './index.less'

export default class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '#',
        dataIndex: 'key',
        key: 'key',
        width: 55,
        render: text => <span>{text + 1}</span>,
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        width: 200,
      },
      {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
        width: 200,
        render: (text, record) => this.isEdit(record) ?
          <Input value={this.state.newRecord.password} onChange={this.onInput.bind(this, 'password')} /> :
          text
      },
      {
        title: '用户角色',
        dataIndex: 'user_role',
        key: 'user_role',
        width: 200,
      },
      {
        title: '最近登陆',
        dataIndex: 'last_login',
        key: 'last_login',
        width: 300,
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '用户余额',
        dataIndex: 'balance',
        key: 'balance',
        width: 120,
        render: (text, record) => this.isEdit(record) ?
          <Input value={this.state.newRecord.balance} onChange={this.onInput.bind(this, 'balance')} type='number' /> :
          text
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        render: (record) => <div>
          <Popconfirm title={`你确定要删除该用户吗？`}
                      onConfirm={this.onDelete.bind(this, record)}
                      okText="确定"
                      okButtonProps={{ danger: true }}
                      cancelText="取消"
                      placement="rightBottom"
          >
            <Button type='link' style={{color: 'red'}}>删除记录</Button>
          </Popconfirm>
          <Button type='link' onClick={this.onActionBtn.bind(this, record)}>{this.isEdit(record) ? '保存更改' : '编辑信息'}</Button>
        </div>
      },
    ];
    this.state = {
      dataLoading: false,
      // 是否进入编辑模式
      editMode: false,
      // 编辑中的记录
      editRecord: null,
      // 新记录
      newRecord: null,
    };
  }

  // handler
  // 编辑和保存按钮
  onActionBtn = async record => {
    // 保存按钮，update，发起post请求
    if (this.state.editMode) {
      await this.setState({dataLoading: true});
      console.log(record.password !== this.state.newRecord.password || record.balance !== this.state.newRecord.balance);
      console.log(record, this.state.newRecord);
      if (record.password !== this.state.newRecord.password || record.balance !== this.state.newRecord.balance) {
        await this.props.dispatch({
          type: 'adminModel/updateUserTable',
          payload: {username: record.username, password: this.state.newRecord.password, balance: this.state.newRecord.balance}
        });
      }
      await this.setState({
        editMode: false,
        editRecord: null,
        newRecord: null
      });
      await this.setState({dataLoading: false});
    } else {
      // 编辑按钮，进入编辑模式
      await this.setState({
        editMode: true,
        editRecord: record,
        newRecord: {password: record.password, balance: record.balance}
      })
    }
  };

  // 输入组件 受控组件
  onInput = (type, e) => {
    if (type === 'password') this.setState({newRecord: {...this.state.newRecord, password: e.target.value}});
    else if (type === 'balance') this.setState({newRecord: {...this.state.newRecord, balance: e.target.value}});
  };

  onDelete = async record => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({type: 'adminModel/deleteUserByUsername', payload: {username: record.username}});
    await this.setState({ dataLoading: false });
  };


  // calc
  isEdit = record => {
    return this.state.editMode && this.state.editRecord.key === record.key;
  };

  initData = async () => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({type: 'adminModel/getUserTable'});
    await this.setState({ dataLoading: false });
  };

  componentWillMount() {
    this.initData().then(() => null);
  }

  // render
  renderTable = () => {
    return (
      <div className={style.table_wrapper}>
        <Table columns={this.columns}
               dataSource={this.props.dataSource}
               scroll={{ x: 'max-content' }}
               loading={this.state.dataLoading}
               bordered
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    );
  }

}
