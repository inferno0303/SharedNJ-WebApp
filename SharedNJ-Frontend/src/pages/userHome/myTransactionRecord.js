import React from 'react';
import { Button, Divider, Popconfirm, Radio, Table, Tag } from 'antd';
import moment from 'moment';
import styles from './index.less';
import TransactionStatusTag from '../commonComponents/transactionStatusTag';

export default class MyTransactionRecord extends React.Component {
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
        title: '订单号',
        dataIndex: 'transaction_md5',
        key: 'transaction_md5',
        width: 270,
        render: text => <Tag>{text}</Tag>
      },
      {
        title: '农机名称',
        dataIndex: 'machine_name',
        key: 'machine_name',
        width: 300,
      },
      {
        title: '单价',
        dataIndex: 'unit_price',
        key: 'unit_price',
        width: 100,
        sorter: (a, b) => a.total_price - b.total_price,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '数量',
        dataIndex: 'require_number',
        key: 'require_number',
        width: 100,
        sorter: (a, b) => a.require_number - b.require_number,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '发货地',
        dataIndex: 'offer_location',
        key: 'offer_location',
        width: 100,
      },
      {
        title: '收货地',
        dataIndex: 'user_location',
        key: 'user_location',
        width: 100,
      },
      {
        title: '支付金额',
        dataIndex: 'total_price',
        key: 'total_price',
        width: 120,
        sorter: (a, b) => a.total_price - b.total_price,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '订单备注',
        dataIndex: 'msg',
        key: 'msg',
        width: 120,
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: text => <TransactionStatusTag status={text} />
      },
      {
        title: '配送员',
        dataIndex: 'deliver_username',
        key: 'deliver_username',
        width: 120,
      },
      {
        title: '下单时间',
        dataIndex: 'release_time',
        key: 'release_time',
        width: 180,
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      }
    ];
    this.state = {
      dataLoading: false,
      transactionRecordType: '全部订单'
    };
  }

  // handler
  handleSelect = async e => {
    await this.setState({transactionRecordType: e.target.value});
    if (this.state.transactionRecordType === '全部订单') {
      await this.setState({ dataLoading: true });
      await this.props.dispatch({type: 'commonModel/getTransactionRecordByUsername'});
      await this.setState({ dataLoading: false });
    } else if (this.state.transactionRecordType === '待配送订单') {
      await this.setState({ dataLoading: true });
      await this.props.dispatch({type: 'commonModel/getUnHandleTransactionRecordByUsername'});
      await this.setState({ dataLoading: false });
    } else if (this.state.transactionRecordType === '正配送订单') {
      await this.setState({ dataLoading: true });
      await this.props.dispatch({type: 'commonModel/getDispatchingTransactionRecordByUsername'});
      await this.setState({ dataLoading: false });
    } else if (this.state.transactionRecordType === '已完成订单') {
      await this.setState({ dataLoading: true });
      await this.props.dispatch({type: 'commonModel/getFinishedTransactionRecordByUsername'});
      await this.setState({ dataLoading: false });
    } else if (this.state.transactionRecordType === '已取消订单') {
      await this.setState({ dataLoading: true });
      await this.props.dispatch({type: 'commonModel/getCanceledTransactionRecordByUsername'});
      await this.setState({ dataLoading: false });
    }
  };

  renderTable = () => {
    return (
      <div className={styles.table_wrapper}>
        <Divider orientation='left' style={{fontWeight: 'bold'}}>
          <Radio.Group value={this.state.transactionRecordType} onChange={this.handleSelect} buttonStyle="solid">
            <Radio.Button value="全部订单">全部订单：{this.props.myTransactionTypeNumber?.totalCount}</Radio.Button>
            <Radio.Button value="待配送订单">待配送订单：{this.props.myTransactionTypeNumber?.unHandleCount}</Radio.Button>
            <Radio.Button value="正配送订单">正配送订单：{this.props.myTransactionTypeNumber?.dispatchingCount}</Radio.Button>
            <Radio.Button value="已完成订单">已完成订单：{this.props.myTransactionTypeNumber?.finishedCount}</Radio.Button>
            <Radio.Button value="已取消订单">已取消订单：{this.props.myTransactionTypeNumber?.canceledCount}</Radio.Button>
          </Radio.Group>
        </Divider>
        <Table columns={this.columns}
               dataSource={this.props.dataSource}
               scroll={{ x: 'max-content' }}
               loading={this.state.dataLoading}
               bordered
        />
      </div>
    );
  };

  initData = async () => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({type: 'commonModel/getTransactionRecordByUsername'});
    await this.setState({ dataLoading: false });
  };

  componentWillMount() {
    this.initData().then(() => null);
  }

  render() {
    return (
      <div>
        {
          this.renderTable()
        }
      </div>
    );
  }

}
