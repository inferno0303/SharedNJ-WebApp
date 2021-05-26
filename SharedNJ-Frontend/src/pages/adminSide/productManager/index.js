import React from 'react';
import { connect } from 'umi';
import { Alert, Button, Form, Input, Radio, Divider, Avatar, PageHeader, Statistic, Card, Tag, Modal } from 'antd';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.less';
import moment from 'moment';
import { API } from '../../../config/requestConfig';
import ProductTable from './productTable';
import ReactEcharts from 'echarts-for-react';
import UserTable from '../adminHome/userTable';


class ProductManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  // handler

  // calc
  echarts_option_1 = () => {
    let data = [];
    this.props.productTypeNumber?.forEach((item, index) => {
      data.push({name: item.machine_name, value: item.product_number})
    });
    return {
      title: {
        text: '商品在售数量'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}个'
      },
      series: [
        {
          name: '数量',
          type: 'pie',
          radius: [0, '50%'],
          label: {
            position: 'outside',
            fontSize: 10
          },
          labelLine: {
            length: 10,
            length2: 15,
            smooth: true
          },
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  };

  echarts_option_2 = () => {
    let xAxisData = [];
    let seriesData = [];
    this.props.machineAvgPrice?.forEach((item, index) => {
      xAxisData.push({value: item.machine_name, textStyle: {fontSize: 8}});
      seriesData.push(item.avg_price)
    });
    return {
      title: {
        text: '商品平均价格'
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value',
        name: '单位：元/台/月'
      },
      tooltip: {
        trigger: 'axis'
      },
      series: [{
        data: seriesData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)'
        }
      }]
    }
  };

  // life cycle
  initData = async () => {
    await this.setState({loading: true});
    await this.props.dispatch({type: 'loginModel/getLoginStatus'});
    await this.props.dispatch({type: 'adminModel/getProductTypeNumber'});
    await this.props.dispatch({type: 'adminModel/getMachineAvgPrice'});
    // await this.props.dispatch({type: 'adminModel/getTransactionPriceSum'});
    // await this.props.dispatch({type: 'adminModel/getUserCount'});
    // await this.props.dispatch({type: 'adminModel/getOfferCount'});
    // await this.props.dispatch({type: 'adminModel/getDeliverCount'});
    await this.setState({loading: false});
    console.log(this.props.productTypeNumber);
  };

  componentWillMount() {
    this.initData().then(()=>null)
  }

  render() {

    return (
      <div>
        <PageHeader title="商品管理中心"
                    subTitle="管理员可管理平台下所有商品"
        />
        <Divider orientation='left' style={{fontWeight: 'bold'}}>可视化报表</Divider>
        <div className={style.row_flex}>
          <div style={{width: '600px', height: '300px'}}>
            <ReactEcharts option={this.echarts_option_1()} />
          </div>
          <div style={{width: '600px', height: '300px'}}>
            <ReactEcharts option={this.echarts_option_2()} />
          </div>
        </div>
        <Divider orientation='left' style={{fontWeight: 'bold'}}>平台全部商品：{this.props.productTable?.length}个</Divider>
        <ProductTable dataSource={this.props.productTable}
                      dispatch={this.props.dispatch}
        />
      </div>
    )
  }


}

function mapStateToProps({ loginModel, adminModel  }) {
  const { isLogin, username, user_role, last_login } = loginModel;
  const { productTypeNumber, machineAvgPrice, productTable } = adminModel;
  return { isLogin, username, user_role, last_login, productTypeNumber, machineAvgPrice, productTable };
}

export default connect(mapStateToProps)(ProductManager);
