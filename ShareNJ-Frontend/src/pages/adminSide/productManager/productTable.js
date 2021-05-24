import React from 'react';
import { Button, Input, Popconfirm, Table, Tag } from 'antd';
import moment from 'moment';
import style from './index.less'

export default class ProductTable extends React.Component {
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
        title: '商家名',
        dataIndex: 'username',
        key: 'username',
        width: 120,
      },
      {
        title: '农机名',
        dataIndex: 'machine_name',
        key: 'machine_name',
        width: 300
      },
      {
        title: '出租单价',
        dataIndex: 'unit_price',
        key: 'unit_price',
        width: 300,
        sorter: (a, b) => a.unit_price - b.unit_price,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '剩余库存',
        dataIndex: 'total_count',
        key: 'total_count',
        width: 150,
        sorter: (a, b) => a.total_count - b.total_count,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '发货地',
        dataIndex: 'location',
        key: 'location',
        width: 150
      },
      {
        title: '详细描述',
        dataIndex: 'detail',
        key: 'detail',
        width: 300
      },
      {
        title: '上架商品时间',
        dataIndex: 'release_time',
        key: 'release_time',
        width: 300,
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        sorter: (a, b) => a.release_time - b.release_time,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        render: (record) => <div>
          <Popconfirm title={`你确定要删除这个已上架的商品吗？`}
                      onConfirm={this.onDelete.bind(this, record)}
                      okText="确定"
                      okButtonProps={{ danger: true }}
                      cancelText="取消"
                      placement="rightBottom"
          >
            <Button type='link' style={{color: 'red'}}>删除该商品</Button>
          </Popconfirm>
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
   onDelete = async record => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({type: 'adminModel/deleteProductByIdAndUsername', payload: {id: record.id, username: record.username}});
    await this.setState({ dataLoading: false });
  };

  initData = async () => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({type: 'adminModel/getProductListByAdmin'});
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
