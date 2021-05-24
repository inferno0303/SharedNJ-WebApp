import React from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Checkbox, Select, InputNumber, DatePicker, Divider, Tag, Result } from 'antd';
import { AlipayOutlined, CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import style from './index.less';
import { myLoading } from '../../../layouts/commonComponents';
import { delay } from '../../../utils/myUtils';


class PayModal extends React.Component {
  constructor(props) {
    super(props);
    this.form = null;
    this.state = {
      loading: false
    }
  }

  // handle
  onSubmit = async () => {
    await this.setState({loading: true});
    const payload = {
      productListId: this.props.good_detail.id,
      require_number: this.props.number,
      user_location: this.props.city_end,
      msg: this.state.msg
    };
    await delay(500);
    await this.props.dispatch({ type: 'commonModel/insertTransactionRecord', payload: payload });
    await this.setState({loading: false});
  };

  onCancel = async () => {
    this.props.hide();
  };

  msgOnChange = e => {
    this.setState({
      msg: e.target.value
    })
  };

  // calc
  isGoodDetailLoad = () => {
    return this.props.good_detail !== null
  };

  isMachineDetailLoad = () => {
    return this.props.machineDetail !== null
  };

  getTotalPrice = () => {
    if (this.isGoodDetailLoad()) {
      return this.props.good_detail.unit_price * this.props.number + this.props.dispatchFee.dispatch_fee
    } else return 0
  };

  isPaySuccess = () => {
    return this.props.transactionMD5 !== null
  };

  // life cycle
  initData = async () => {
    await this.props.dispatch({type: 'commonModel/getUserBalance'});
  };

  componentWillMount() {
    this.initData().then(()=>null)
  }

  render() {

    const renderCheck = () => {
      if (this.state.loading) {
        return myLoading("确认订单中")
      }
      if (this.isGoodDetailLoad() && !this.isPaySuccess()) {
        return <div>
          <div className={style.good_describe}>农机名：{this.props.good_detail.machine_name}</div>
          <div className={style.good_describe}>
            出租单价：
            <span className={style.pay_modal_small_price_tag}>￥{Number(this.props.good_detail.unit_price).toFixed(2)}元/台/月</span>
          </div>
          <div className={style.good_describe}>商家名：{this.props.good_detail.username}</div>
          <div className={style.good_describe}>
                <span>
                  配送费：
                  <span className={style.good_describe}>￥{Number(this.props.dispatchFee.dispatch_fee).toFixed(2)}元</span>
                </span>
            <Divider type="vertical" />
            <span>
                  发货地：{this.props.dispatchFee.city_start}
                </span>
            <Divider type="vertical" />
            <span>
                  收货地：{this.props.dispatchFee.city_end}
                </span>
          </div>
          <div className={style.good_describe}>租用数量：{this.props.number}台</div>
          <div className={style.good_describe}>
            总价：<Tag>{Number(this.props.good_detail.unit_price).toFixed(2)}</Tag>*<Tag>{this.props.number}</Tag>+<Tag>{Number(this.props.dispatchFee.dispatch_fee).toFixed(2)}</Tag>=
            <span className={style.pay_modal_small_price_tag} style={{paddingLeft: '5px'}}>￥{Number(this.getTotalPrice()).toFixed(2)}元</span>
          </div>
          <div className={style.good_describe}>
            <span>订单备注：</span>
            <Input value={this.state.msg} onChange={this.msgOnChange}/>
          </div>
          <Divider />
          <div className={style.good_describe}>
            您的余额：
            <span className={style.pay_modal_small_price_tag} style={{paddingLeft: '5px'}}>￥{Number(this.props.userBalance).toFixed(2)}元</span>
          </div>
          <div className={style.good_describe}>
            结算后余额：
            <span className={style.pay_modal_small_price_tag} style={{paddingLeft: '5px'}}>￥{Number(this.props.userBalance - this.getTotalPrice()).toFixed(2)}元</span>
          </div>
        </div>
      } else if(this.isPaySuccess()) {
        return <Result
          status="success"
          title="订单提交成功"
          subTitle={
            <div>
              <div>您的订单号为：<Tag>{this.props.transactionMD5}</Tag></div>
              <div>商户已收到订单，请耐心等待商户确认及调配。</div>
            </div>
          }
        />
      } else {
        return myLoading("确认订单中")
      }
    };

    return (
      <div>
        <Modal
          title="结算页"
          visible={this.props.visible}
          onOk={this.isPaySuccess() ? this.onCancel : this.onSubmit}
          onCancel={this.onCancel}
          okText={this.isPaySuccess() ? '好的' : '付款'}
          okButtonProps={this.isPaySuccess() ? {icon: <CheckOutlined />} : {icon: <AlipayOutlined />, disabled: this.state.loading}}
          cancelText={'取消'}
          width={600}
        >
          {
            renderCheck()
          }
        </Modal>
      </div>
    )
  }


}

function mapStateToProps({ loginModel, commonModel }) {
  return {}
}

export default connect(mapStateToProps)(PayModal);
