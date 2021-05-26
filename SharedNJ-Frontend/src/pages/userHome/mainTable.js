import React from 'react';
import { Button, Popconfirm, Table } from 'antd';
import moment from 'moment';
import style from './index.less';

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
        title: '求租数量',
        dataIndex: 'number',
        key: 'number',
        width: 100,
      },
      {
        title: '使用地点',
        dataIndex: 'location',
        key: 'location',
        width: 100,
      },
      {
        title: '预期租金',
        dataIndex: 'offer_price',
        key: 'offer_price',
        width: 120,
        sorter: (a, b) => a.offer_price - b.offer_price,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '开始租用时间',
        dataIndex: 'start_time',
        key: 'start_time',
        width: 180,
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '结束租用时间',
        dataIndex: 'end_time',
        key: 'end_time',
        width: 180,
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '详细说明',
        dataIndex: 'detail_info',
        key: 'detail_info',
        width: 300,
      },
      {
        title: '发布时间',
        dataIndex: 'release_time',
        key: 'release_time',
        width: 180,
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        render: (record) => <div>
          <Popconfirm title={`你确定要删除该记录吗？`}
                      onConfirm={this.handleDeleteBtn.bind(this, record)}
                      okText="确定"
                      okButtonProps={{ danger: true }}
                      cancelText="取消"
                      placement="rightBottom"
          >
            <Button type='link'>删除记录</Button>
          </Popconfirm>
        </div>
      },
    ];
    this.state = {
      dataLoading: false,
      tableWidth: 'max-content',
    };
  }

  // handler
  handleDeleteBtn = async record => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({type: 'commonModel/deleteUserDemandById', payload: {id: record.id}});
    await this.props.dispatch({type: 'commonModel/getUserDemandByUsername'});
    await this.setState({ dataLoading: false });
  };

  renderTable = () => {
    return (
      <div className={style.table_wrapper}>
        <Table columns={this.columns}
               dataSource={this.props.dataSource}
               scroll={{ x: this.state.tableWidth }}
               loading={this.state.dataLoading}
               bordered
        />
      </div>
    );
  };

  initData = async () => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({type: 'commonModel/getUserDemandByUsername'});
    await this.setState({ dataLoading: false });
  };

  componentWillMount() {
    this.initData().then(() => null);
  }

  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    );
  }

}
