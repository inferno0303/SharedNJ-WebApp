import React from 'react';
import { Button, Divider, Popconfirm, Radio, Table, Tag } from 'antd';
import moment from 'moment';
import styles from './index.less';
import TransactionActionModal from './transactionActionModal';
import TransactionStatusTag from '../../commonComponents/transactionStatusTag';

export default class OfferTransactionRecord extends React.Component {
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
        title: '操作',
        key: 'action',
        width: 100,
        render: (record) => <div>
          <Button type='link' onClick={this.onActionBtnClick.bind(this, record)}>订单详情</Button>
        </div>
      },
      {
        title: '用户名',
        dataIndex: 'user_username',
        key: 'user_username',
        width: 130,
      },
      {
        title: '下单时间',
        dataIndex: 'release_time',
        key: 'release_time',
        width: 180,
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
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
        title: '订单号',
        dataIndex: 'transaction_md5',
        key: 'transaction_md5',
        width: 270,
        render: text => <Tag>{text}</Tag>
      },
      {
        title: '配送员',
        dataIndex: 'deliver_username',
        key: 'deliver_username',
        width: 120,
      }
    ];
    this.state = {
      dataLoading: false,
      transactionRecordType: '全部订单',
      modalVisible: false,
      modalDetail: null
    };
  }

  // handler
  handleSelect = async e => {
    await this.setState({transactionRecordType: e.target.value});
    await this.getData()
  };

  getData = async () => {
    if (this.state.transactionRecordType === '全部订单') {
      await this.setState({ dataLoading: true });
      await this.props.dispatch({type: 'offerSideModel/getOfferAllTransaction'});
      await this.setState({ dataLoading: false });
    } else if (this.state.transactionRecordType === '未处理订单') {
      await this.setState({ dataLoading: true });
      await this.props.dispatch({type: 'offerSideModel/getOfferUnHandleTransaction'});
      await this.setState({ dataLoading: false });
    } else if (this.state.transactionRecordType === '正配送订单') {
      await this.setState({ dataLoading: true });
      await this.props.dispatch({type: 'offerSideModel/getOfferDispatchingTransaction'});
      await this.setState({ dataLoading: false });
    } else if (this.state.transactionRecordType === '已完成订单') {
      await this.setState({ dataLoading: true });
      await this.props.dispatch({type: 'offerSideModel/getOfferFinishedTransaction'});
      await this.setState({ dataLoading: false });
    } else if (this.state.transactionRecordType === '已取消订单') {
      await this.setState({ dataLoading: true });
      await this.props.dispatch({type: 'offerSideModel/getOfferCanceledTransaction'});
      await this.setState({ dataLoading: false });
    }
  };

  showModal = () => {
    this.setState({
      modalVisible: true
    })
  };

  hideModal = async () => {
    await this.setState({
      modalVisible: false
    })
  };

  afterClose = async () => {
    await this.setState({
      modalDetail: null
    })
  };

  onActionBtnClick = async record => {
    await this.setState({
      modalDetail: record
    });
    await this.showModal();
    console.log(record)
  };

  initData = async () => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({type: 'offerSideModel/getOfferAllTransaction'});
    await this.setState({ dataLoading: false });
  };

  componentWillMount() {
    this.initData().then(() => null);
  }

  renderTable = () => {
    return (
      <div className={styles.table_wrapper}>
        <Divider orientation='left' style={{fontWeight: 'bold'}}>
          <Radio.Group value={this.state.transactionRecordType} onChange={this.handleSelect} buttonStyle="solid">
            <Radio.Button value="全部订单">全部订单：{this.props.offerTransactionTypeNumber?.totalCount}</Radio.Button>
            <Radio.Button value="未处理订单">未处理订单：{this.props.offerTransactionTypeNumber?.unHandleCount}</Radio.Button>
            <Radio.Button value="正配送订单">正配送订单：{this.props.offerTransactionTypeNumber?.dispatchingCount}</Radio.Button>
            <Radio.Button value="已完成订单">已完成订单：{this.props.offerTransactionTypeNumber?.finishedCount}</Radio.Button>
            <Radio.Button value="已取消订单">已取消订单：{this.props.offerTransactionTypeNumber?.canceledCount}</Radio.Button>
          </Radio.Group>
        </Divider>
        <Table columns={this.columns}
               dataSource={this.props.dataSource}
               scroll={{ x: 'max-content' }}
               loading={this.state.dataLoading}
               bordered
        />
        <TransactionActionModal visible={this.state.modalVisible}
                                hide={this.hideModal}
                                afterClose={this.afterClose}
                                record={this.state.modalDetail}
                                getData={this.getData}
        />
      </div>
    );
  };

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
