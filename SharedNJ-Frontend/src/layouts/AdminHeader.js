import React from 'react';
import { connect, history } from 'umi';
import { Menu } from 'antd';
import {
  HomeOutlined,
  OrderedListOutlined,
  EditOutlined,
  FileAddOutlined,
  LoginOutlined
} from '@ant-design/icons';

class AdminHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // handler
  handleClick = e => {
    if (history.location.pathname !== e.key) history.push(e.key);
  };


  render() {
    return <div>
      <Menu mode="horizontal" theme='light' onClick={this.handleClick} selectedKeys={history.location.pathname}>
        <Menu.Item key="/admin/adminHome">
          <HomeOutlined />
          管理员首页
        </Menu.Item>
        <Menu.Item key="/admin/product">
          <OrderedListOutlined />
          商品管理统计
        </Menu.Item>
        <Menu.Item key="/admin/transaction">
          <EditOutlined />
          订单管理统计
        </Menu.Item>
        <Menu.Item key="/login" style={{float: 'right'}}>
          <LoginOutlined />
          {this.props.username}管理员模式
        </Menu.Item>
      </Menu>
      <div>
        {this.props.children}
      </div>
    </div>;
  }
}


function mapStateToProps({ loginModel }) {
  const { username } = loginModel;
  return { username };
}

export default connect(mapStateToProps)(AdminHeader);
