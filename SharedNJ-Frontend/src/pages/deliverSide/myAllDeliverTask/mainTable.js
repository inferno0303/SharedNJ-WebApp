import React from 'react';
import { Button, Divider, Popconfirm, Radio, Table, Tag } from 'antd';
import moment from 'moment';
import styles from './index.less';
import TransactionStatusTag from '../../commonComponents/transactionStatusTag';

export default class MainTable extends React.Component {
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
        title: '农机名称',
        dataIndex: 'machine_name',
        key: 'machine_name',
        width: 300,
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
        title: '发货人',
        dataIndex: 'offer_username',
        key: 'offer_username',
        width: 100,
      },
      {
        title: '收货地',
        dataIndex: 'user_location',
        key: 'user_location',
        width: 100,
      },
      {
        title: '收货人',
        dataIndex: 'user_username',
        key: 'user_username',
        width: 100,
      },
      {
        title: '运费',
        dataIndex: 'dispatch_fee',
        key: 'dispatch_fee',
        width: 100,
        render: text => <span>￥{Number(text).toFixed(2)}</span>
      },
      {
        title: '运单号',
        dataIndex: 'transaction_md5',
        key: 'transaction_md5',
        width: 270,
        render: text => <Tag>{text}</Tag>
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
      }
    ];
    this.state = {
      dataLoading: false,
      transactionRecordType: '全部配送任务'
    };
  }

  // handler
  handleSelect = async e => {
    await this.setState({transactionRecordType: e.target.value});
    if (this.state.transactionRecordType === '全部配送任务') {
      await this.setState({ dataLoading: true });
      await this.props.dispatch({type: 'deliverSideModel/getMyAllDeliverTask'});
      await this.setState({ dataLoading: false });
    } else if (this.state.transactionRecordType === '正配送任务') {
      await this.setState({ dataLoading: true });
      await this.props.dispatch({type: 'deliverSideModel/getMyDispatchingDeliverTask'});
      await this.setState({ dataLoading: false });
    } else if (this.state.transactionRecordType === '已完成任务') {
      await this.setState({ dataLoading: true });
      await this.props.dispatch({type: 'deliverSideModel/getFinishedDeliverTask'});
      await this.setState({ dataLoading: false });
    }
  };

  renderTable = () => {
    return (
      <div className={styles.table_wrapper}>
        <Divider orientation='left' style={{fontWeight: 'bold'}}>
          <Radio.Group value={this.state.transactionRecordType} onChange={this.handleSelect} buttonStyle="solid">
            <Radio.Button value="全部配送任务">全部配送任务：{this.props.myDeliverTaskNumber?.totalCount}</Radio.Button>
            <Radio.Button value="正配送任务">正配送任务：{this.props.myDeliverTaskNumber?.dispatchingCount}</Radio.Button>
            <Radio.Button value="已完成任务">已完成任务：{this.props.myDeliverTaskNumber?.finishedCount}</Radio.Button>
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
    await this.props.dispatch({type: 'deliverSideModel/getMyDeliverTaskNumber'});
    await this.props.dispatch({type: 'deliverSideModel/getOfferAllTransaction'});
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
