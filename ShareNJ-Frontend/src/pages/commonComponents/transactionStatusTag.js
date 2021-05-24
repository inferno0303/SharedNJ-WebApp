import React from 'react';
import { Tag } from 'antd';

class TransactionStatusTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    const renderTag = () => {
      switch (this.props.status) {
        case 1: return <Tag color={'volcano'}>商家未处理</Tag>;
        case 2: return <Tag color={'cyan'}>商家已调配</Tag>;
        case 3: return <Tag color={'green'}>订单已完成</Tag>;
        case 4: return <Tag color={'gray'}>订单已取消</Tag>;
        default: return <Tag>未知状态</Tag>
      }
    };

    return <span>
      {
        renderTag()
      }
    </span>
  }
}

export default TransactionStatusTag;
