import React from 'react';
import { connect } from 'umi';
import { Alert, Button, Form, Input, Radio, Divider, Avatar, PageHeader, Statistic, Card, Tag, Modal } from 'antd';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.less';
import moment from 'moment';
import { API } from '../../../config/requestConfig';
import TransactionTable from './TransactionTable';
import ReactEcharts from 'echarts-for-react';
import UserTable from '../adminHome/userTable';


class TransactionManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  // handler

  // calc
  echarts_option_1_pie_chart = () => {
    let data = [];
    this.props.machineTransactionNumber?.forEach((item, index) => {
      data.push({name: item.machine_name, value: item.number})
    });
    return {
      title: {
        text: '各型号农机销量（饼图）'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}笔订单'
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

  echarts_option_1_bar_chart = () => {
    let xAxisData = [];
    let seriesData = [];
    this.props.machineTransactionNumber?.forEach((item, index) => {
      xAxisData.push(item.machine_name);
      seriesData.push(item.number)
    });
    return {
      title: {
        text: '各型号农机销量（柱状图）'
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value',
        name: '单位：订单数量（笔）'
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

  echarts_option_2_pie_chart = () => {
    let data = [];
    this.props.transactionCountWithOfferLocation?.forEach((item, index) => {
      data.push({name: item.offer_location, value: item.number})
    });
    return {
      title: {
        text: '发货城市统计（饼图）'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}笔订单'
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

  echarts_option_2_bar_chart = () => {
    let xAxisData = [];
    let seriesData = [];
    this.props.transactionCountWithOfferLocation?.forEach((item, index) => {
      xAxisData.push(item.offer_location);
      seriesData.push(item.number)
    });
    return {
      title: {
        text: '发货城市统计（柱状图）'
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value',
        name: '单位：订单数量（笔）'
      },
      tooltip: {
        trigger: 'item'
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

  echarts_option_3_pie_chart = () => {
    let data = [];
    this.props.transactionCountWithUserLocation?.forEach((item, index) => {
      data.push({name: item.user_location, value: item.number})
    });
    return {
      title: {
        text: '收货城市统计（饼图）'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}笔订单'
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

  echarts_option_3_bar_chart = () => {
    let xAxisData = [];
    let seriesData = [];
    this.props.transactionCountWithUserLocation?.forEach((item, index) => {
      xAxisData.push(item.user_location);
      seriesData.push(item.number)
    });
    return {
      title: {
        text: '收货城市统计（柱状图）'
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value',
        name: '单位：订单数量（笔）'
      },
      tooltip: {
        trigger: 'item'
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
    await this.props.dispatch({type: 'adminModel/getMachineTransactionNumber'});
    await this.props.dispatch({type: 'adminModel/getAllTransactionByAdmin'});
    await this.props.dispatch({type: 'adminModel/getTransactionCountWithOfferLocation'});
    await this.props.dispatch({type: 'adminModel/getTransactionCountWithUserLocation'});
    await this.setState({loading: false});
    console.log(this.props.productTypeNumber);
  };

  componentWillMount() {
    this.initData().then(()=>null)
  }

  render() {

    return (
      <div>
        <PageHeader title="订单管理中心"
                    subTitle="管理员可管理平台下所有交易订单"
        />
        <Divider orientation='left' style={{fontWeight: 'bold'}}>订单全局可视化</Divider>
        <div className={style.row_flex}>
          <div style={{width: '600px', height: '300px'}}>
            <ReactEcharts option={this.echarts_option_1_pie_chart()} />
          </div>
          <div style={{width: '600px', height: '300px'}}>
            <ReactEcharts option={this.echarts_option_1_bar_chart()} />
          </div>
          <div style={{width: '600px', height: '300px'}}>
            <ReactEcharts option={this.echarts_option_2_pie_chart()} />
          </div>
          <div style={{width: '600px', height: '300px'}}>
            <ReactEcharts option={this.echarts_option_2_bar_chart()} />
          </div>
          <div style={{width: '600px', height: '300px'}}>
            <ReactEcharts option={this.echarts_option_3_pie_chart()} />
          </div>
          <div style={{width: '600px', height: '300px'}}>
            <ReactEcharts option={this.echarts_option_3_bar_chart()} />
          </div>
        </div>
        <Divider orientation='left' style={{fontWeight: 'bold'}}>平台全部订单：{this.props.transactionTable?.length}个</Divider>
        <TransactionTable dataSource={this.props.transactionTable}
                          dispatch={this.props.dispatch}
        />
      </div>
    )
  }


}

function mapStateToProps({ loginModel, adminModel  }) {
  const { isLogin, username, user_role, last_login } = loginModel;
  const { machineTransactionNumber, transactionTable, transactionCountWithOfferLocation, transactionCountWithUserLocation } = adminModel;
  return { isLogin, username, user_role, last_login, machineTransactionNumber, transactionTable, transactionCountWithOfferLocation, transactionCountWithUserLocation };
}

export default connect(mapStateToProps)(TransactionManager);
