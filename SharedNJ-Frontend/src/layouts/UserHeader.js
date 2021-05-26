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

class UserHeader extends React.Component {
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
        <Menu.Item key="/user/userHome">
          <HomeOutlined />
          用户信息
        </Menu.Item>
        <Menu.Item key="/user/productList">
          <OrderedListOutlined />
          农机出租商城
        </Menu.Item>
        <Menu.Item key="/user/userDemand">
          <EditOutlined />
          用户需求发布
        </Menu.Item>
        <Menu.Item key="/user/machineInfo">
          <FileAddOutlined />
          农机信息
        </Menu.Item>
        <Menu.Item key="/login" style={{float: 'right'}}>
          <LoginOutlined />
          {this.props.username}用户
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

export default connect(mapStateToProps)(UserHeader);
