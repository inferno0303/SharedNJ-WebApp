import React from 'react';
import { Button, Input, Popconfirm, Table, Tag } from 'antd';
import moment from 'moment';
import style from './index.less'
import TransactionStatusTag from '../../commonComponents/transactionStatusTag';
import Highlighter from 'react-highlight-words';
import { FileAddOutlined, SearchOutlined } from '@ant-design/icons';

export default class TransactionTable extends React.Component {
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
        sorter: (a, b) => a.release_time - b.release_time,
        sortDirections: ['descend', 'ascend'],
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
        ...this.getColumnSearchProps('transaction_md5')
      },
      {
        title: '配送员',
        dataIndex: 'deliver_username',
        key: 'deliver_username',
        width: 120,
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        render: (record) => <div>
          <Popconfirm title={`你确定要删除这个订单记录吗？`}
                      onConfirm={this.onDelete.bind(this, record)}
                      okText="确定"
                      okButtonProps={{ danger: true }}
                      cancelText="取消"
                      placement="rightBottom"
          >
            <Button type='link' style={{color: 'red'}}>删除该订单</Button>
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

  // jsx
  // table 的 search filter功能
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`搜索 ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined/>}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          确定
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          清空键入
        </Button>
      </div>
    ),
    // 配置表格上filter按钮的样式
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }}/>,
    // 配置搜索规则，value传入
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),

    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },

    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  // handler
   onDelete = async record => {
    await this.setState({ dataLoading: true });
    await this.props.dispatch({type: 'adminModel/deleteTransactionByTransactionMD5', payload: {transaction_md5: record.transaction_md5}});
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
