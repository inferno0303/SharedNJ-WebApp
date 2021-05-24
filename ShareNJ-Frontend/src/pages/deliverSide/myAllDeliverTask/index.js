import React from 'react';
import { connect } from 'umi';
import { Alert, Button, Form, Input, Radio, Divider, Avatar, PageHeader, Statistic, Card } from 'antd';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.less';
import moment from 'moment';
import MainTable from './mainTable';


class myAllDeliverTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  // handle
  debug = () => {
    console.log("this.props", this.props);
  };

  // life cycle
  initData = async () => {
    await this.setState({loading: true});
    await this.setState({loading: false});
  };

  componentWillMount() {
    this.initData().then(()=>null)
  }

  render() {
    return (
      <div>
        <PageHeader title="我的所有订单记录"
                    subTitle="调配员可查看自己的所有配送订单"
        />
        <MainTable dataSource={this.props.taskTable}
                   myDeliverTaskNumber={this.props.myDeliverTaskNumber}
                   dispatch={this.props.dispatch}
        />
      </div>
    )
  }


}

function mapStateToProps({ deliverSideModel }) {
  const { myDeliverTaskNumber, taskTable } = deliverSideModel;
  return { myDeliverTaskNumber, taskTable };
}

export default connect(mapStateToProps)(myAllDeliverTask);
