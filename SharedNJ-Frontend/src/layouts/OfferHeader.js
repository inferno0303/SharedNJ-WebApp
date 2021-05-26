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

class OfferHeader extends React.Component {
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
        <Menu.Item key="/offer/offerHome">
          <HomeOutlined />
          商家信息
        </Menu.Item>
        <Menu.Item key="/offer/productList">
          <OrderedListOutlined />
          商家出租农机
        </Menu.Item>
        <Menu.Item key="/offer/userDemand">
          <EditOutlined />
          用户需求概览
        </Menu.Item>
        <Menu.Item key="/offer/machineInfo">
          <FileAddOutlined />
          农机信息
        </Menu.Item>
        <Menu.Item key="/login" style={{float: 'right'}}>
          <LoginOutlined />
          {this.props.username}商家用户
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

export default connect(mapStateToProps)(OfferHeader);
