import React from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Checkbox, Select, InputNumber, DatePicker, Divider, Tag, Radio } from 'antd';
import moment from 'moment';
import style from './index.less';
import { API } from '../../../config/requestConfig';
import { myEmptyStatus } from '../../../layouts/commonComponents';
import TransactionStatusTag from '../../commonComponents/transactionStatusTag';

class TransactionActionModal extends React.Component {
  constructor(props) {
    super(props);
    this.form = null;
    this.state = {
      newTransactionStatus: null,
      selectedDeliver: null
    }
  }

  // handle
  onCancel = () => {
    this.props.hide()
  };

  onOk = async () => {
    if (this.props.record?.status === 1 && this.props.record?.status !== this.state.newTransactionStatus) {
      const payload = {
        transaction_md5: this.props.record?.transaction_md5,
        status: this.state.newTransactionStatus,
        deliver: this.state.selectedDeliver
      };
      await this.props.dispatch({ type: 'offerSideModel/setTransactionStatus', payload: payload });
      await this.props.dispatch({type: 'offerSideModel/getOfferTransactionTypeNumber'});
      await this.props.getData();
    }
    await this.onCancel()
  };

  onRadioChange = e => {
    this.setState({
      newTransactionStatus: e.target.value
    })
  };

  onSelectChange = value => {
    this.setState({
      selectedDeliver: value
    })
  }
;
  // calc
  isRecordLoad = () => {
    return this.props.record !== null
  };

  // init Data
  initData = async () => {
    await this.props.dispatch({type: 'offerSideModel/getAllDeliver'})
  };

  componentWillMount() {
    this.initData().then()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.record?.status !== this.state.newTransactionStatus) {
      this.setState({newTransactionStatus: nextProps.record?.status})
    }
    if (nextProps.allDeliver.length > 0 && this.state.selectedDeliver !== nextProps.allDeliver[0]) {
      this.setState({selectedDeliver: nextProps.allDeliver[0]})
    }
  }

  render() {

    const renderGoodDetail = () => {
      if (this.isRecordLoad()) {
        return <div>
          <div className={style.good_title}>农机名：{this.props.record?.machine_name}</div>
          <div className={style.flex_tow_side}>
            <div className={style.good_detail_img}>
              <img src={this.isRecordLoad() ? `${API}/static/nongji_${this.props.record?.machine_id}.png` : null}
                   className={style.good_detail_img}
                   alt={''}
              />
            </div>
            <div className={style.good_infos_side}>
              <div className={style.good_describe}>用户名：{this.props.record?.user_username}</div>
              <div
                className={style.good_describe}>下单时间：{moment(this.props.record?.release_time).format('YYYY-MM-DD HH:mm:ss')}</div>
              <div className={style.good_describe}>单价：<span className={style.good_price}>￥{Number(this.props.record?.unit_price).toFixed(2)}</span></div>
              <div className={style.good_describe}>数量：{this.props.record?.require_number}</div>
              <div className={style.good_describe}>发货地：{this.props.record?.offer_location}</div>
              <div className={style.good_describe}>收货地：{this.props.record?.user_location}</div>
              <div className={style.good_describe}>支付金额：<span className={style.good_price}>￥{Number(this.props.record?.total_price).toFixed(2)}</span></div>
              <div className={style.good_describe}>订单备注：{this.props.record?.msg}</div>
              <div className={style.good_describe}>
                订单状态：
                <TransactionStatusTag status={this.props.record?.status} />
                {
                  this.props.record?.status === 2 || 3 ? <span>调配员：<Tag color={'#87d068'}>{this.props.record?.deliver_username}</Tag></span> : null
                }
              </div>
              {
                renderUpdateTransactionStatus()
              }
            </div>
          </div>
        </div>
      } else {
        return <div>
          {myEmptyStatus("")}
        </div>
      }
    };

    const renderUpdateTransactionStatus = () => {
      if (this.props.record?.status === 1) {
        return <div>
          <Divider orientation='left' style={{fontWeight: 'bold'}}>商家更改订单状态</Divider>
          <div className={style.good_describe}>
            <span>订单状态：</span>
            <Radio.Group value={this.state.newTransactionStatus} onChange={this.onRadioChange} size={'small'} buttonStyle="solid">
              <Radio.Button value={1}>未处理</Radio.Button>
              <Radio.Button value={2}>已调配</Radio.Button>
              <Radio.Button value={3}>已完成</Radio.Button>
              <Radio.Button value={4}>已取消</Radio.Button>
            </Radio.Group>
          </div>
          {
            renderSetDispatcher()
          }
        </div>
      }
    };

    const renderSetDispatcher = () => {
      if (this.props.record?.status === this.state.newTransactionStatus) {
        return <div className={style.good_describe} style={{color: '#999999', fontSize: 'small', fontStyle: 'italic', textAlign: 'center'}}>
          当前未更改状态
        </div>
      } else if (this.state.newTransactionStatus === 2) {
        return <div className={style.good_describe}>
          <span>选择调配员：</span>
          <Select value={this.state.selectedDeliver} onChange={this.onSelectChange} style={{ width: 200 }} bordered={false}>
            {
              this.props.allDeliver.map((item, index) => (
                <Select.Option key={index} value={item}>{item}</Select.Option>
              ))
            }
          </Select>
        </div>
      }
    };

    return <div>
      <Modal
        title="订单详情"
        visible={this.props.visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        afterClose={this.props.afterClose}
        centered={true}
        width={800}
      >
        {
          renderGoodDetail()
        }
      </Modal>
    </div>
  }
}

function mapStateToProps({ offerSideModel }) {
  const { allDeliver } = offerSideModel;
  return { allDeliver };
}

export default connect(mapStateToProps)(TransactionActionModal);
