import React from 'react';
import { Button, Input, Popconfirm, Table, Tag } from 'antd';
import moment from 'moment';
import style from './index.less'

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
        title: '库存数量',
        dataIndex: 'total_count',
        key: 'total_count',
        width: 100,
        render: (text, record) => this.isEdit(record) ?
          <Input value={this.state.newRecord.total_count} onChange={this.editInputOnChange.bind(this, 'total_count')} type='number'/> :
          text,
        sorter: (a, b) => a.total_count - b.total_count,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '发货地点',
        dataIndex: 'location',
        key: 'location',
        width: 100,
      },
      {
        title: '出租单价',
        dataIndex: 'unit_price',
        key: 'unit_price',
        width: 120,
        render: (text, record) => this.isEdit(record) ?
          <Input value={this.state.newRecord.unit_price} onChange={this.editInputOnChange.bind(this, 'unit_price')} type='number' /> :
          text,
        sorter: (a, b) => a.unit_price - b.unit_price,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '详细说明',
        dataIndex: 'detail',
        key: 'detail',
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
          <Button type='link' onClick={this.handleClickEditMode.bind(this, record)}>{this.isEdit(record) ? '保存' : '编辑'}</Button>
        </div>
      },
    ];
    this.state = {
      dataLoading: false,
      editMode: false,
      editRecord: null,
      newRecord: null,
    };
  }

  // handler
  // 编辑和保存按钮
  handleClickEditMode = async record => {
    if (this.state.editMode) {
      await this.setState({dataLoading: true});
      if (record.total_count !== this.state.newRecord.total_count || record.unit_price !== this.state.newRecord.unit_price) {
        await this.props.dispatch({
          type: 'offerSideModel/updateMyProduct',
          payload: {productListId: record.id, total_count: this.state.newRecord.total_count, unit_price: this.state.newRecord.unit_price}
        });
      }
      await this.setState({
        editMode: false,
        editRecord: null,
        newRecord: null
      });
      await this.setState({dataLoading: false});
    } else {
      await this.setState({
        editMode: true,
        editRecord: record,
        newRecord: {total_count: record.total_count, unit_price: record.unit_price}
      })
    }
  };

  // 输入组件 受控组件
  editInputOnChange = (type, e) => {
    console.log(type, e.target.value);
    if (type === 'total_count') this.setState({newRecord: {...this.state.newRecord, total_count: e.target.value}});
    else if (type === 'unit_price') this.setState({newRecord: {...this.state.newRecord, unit_price: e.target.value}});
  };

  handleDeleteBtn = async record => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({type: 'offerSideModel/deleteMyProduct', payload: {productListId: record.id}});
    await this.setState({ dataLoading: false });
  };



  // calc
  isEdit = record => {
    return this.state.editMode && this.state.editRecord.key === record.key;
  };


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

  initData = async () => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({type: 'offerSideModel/getMyProductList'});
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
