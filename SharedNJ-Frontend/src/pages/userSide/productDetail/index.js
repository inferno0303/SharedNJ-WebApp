import React from 'react';
import { connect, history } from 'umi';
import { Button, Card, PageHeader, Select, Tag } from 'antd';
import { AlipayOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import style from './index.less';
import { delay } from '../../../utils/myUtils';
import PayModal from './payModal';
import { API } from '../../../config/requestConfig';
import { myLoading } from '../../../layouts/commonComponents';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loading: false,
      dispatchFeeLoading: false,
      // 表单
      city_end: '',
      number: 1,
    }
  }

  // handle
  showModal = async () => {
    await this.props.dispatch({ type: 'commonModel/transactionMD5', payload: null });
    await this.setState({modalVisible: true});
  };

  hideModal = async () => {
    await this.setState({modalVisible: false});
  };

  payBtnOnClick = () => {
    this.showModal()
  };

  // getDispatchFee 根据两城市获取运费
  getDispatchFee = async () => {
    console.log("hello");
    await this.setState({dispatchFeeLoading: true});
    await this.props.dispatch({type: 'commonModel/getDispatchFeeByTwoCity', payload: {city_start: this.props.good_detail.location, city_end: this.state.city_end}});
    await this.setState({dispatchFeeLoading: false});
  };

  // calc
  isGoodDetailLoad = () => {
    return this.props.good_detail !== null
  };

  isMachineDetailLoad = () => {
    return this.props.machineDetail !== null
  };

  // life cycle
  initData = async () => {
    await this.setState({loading: true});
    // 获取url查询参数
    const keyArr = Object.keys(this.props.location.query);
    console.log(keyArr);
    if (keyArr.length > 0) {
      const id = this.props.location.query.id;
      if (id) {
        // 加载商品信息
        await this.props.dispatch({type: 'commonModel/getProductListById', payload: {id: id}});
        if (this.isGoodDetailLoad) {
          // 商品信息加载完后，加载农机信息
          await this.props.dispatch({type: 'commonModel/getMachineById', payload: {machineId: this.props.good_detail.machine_id}});
          // 加载城市列表信息
          await this.props.dispatch({type: 'commonModel/getCityList'});
          await this.setState({city_end: this.props.city_list[0]});
          await this.getDispatchFee();
        }
      }
    }
    await delay(400);
    await this.setState({loading: false});
  };

  componentWillMount() {
    this.initData().then(()=>null)
  }

  componentWillUnmount() {
  }

  render() {

    const renderGoodPic = () => {
      return <img src={this.isGoodDetailLoad() ? `${API}/static/nongji_${this.props.good_detail?.machine_id}.png` : null}
                  className={style.good_detail_img}
                  alt={''}
      />
    };

    const renderGoodInfos = () => {
      if (this.isGoodDetailLoad() && this.isMachineDetailLoad()) {
        return <div>
          <div className={style.good_title}>{this.props.good_detail.machine_name}</div>
          <div className={style.good_price}>￥{this.props.good_detail.unit_price}元/台/月<Tag className={style.good_price_tag}>闪送服务</Tag></div>
          <div className={style.good_location}>
            <span style={{paddingRight: '20px'}}>发货地：{this.props.good_detail.location}</span>
            <span style={{paddingRight: '20px'}}>
              收货地：
              <Select value={this.state.city_end} onChange={async value => {await this.setState({city_end: value}); await this.getDispatchFee()}} style={{ width: 100 }} bordered={false}>
                {
                  this.props.city_list.map((item, index) => {
                    return <Select.Option key={index} value={item}>{item}</Select.Option>
                  })
                }
              </Select>
            </span>
          </div>
          <div className={style.good_dispatch_fee_price_tag}>
            {this.state.dispatchFeeLoading ?  "计算运费中..." : <span>配送费：￥{this.props.dispatchFee.dispatch_fee}元</span>}
          </div>
          <div className={style.good_describe}>剩余库存：<Tag>{this.props.good_detail.total_count - this.state.number}台</Tag></div>
          <div className={style.good_describe}>农机特性：{this.props.machineDetail.machine_features}</div>
          <div className={style.good_describe}>农机功能：{this.props.machineDetail.machine_function}</div>
          <div className={style.good_describe}>
            <span>租用数量：</span>
            <Button shape={'round'} size={'small'} icon={<MinusOutlined />} disabled={this.state.number <= 1} onClick={() => this.setState({number: this.state.number - 1})} />
            <span style={{padding: '0 10px'}}>{this.state.number}</span>
            <Button shape={'round'} size={'small'} icon={<PlusOutlined />}  disabled={this.state.number >= this.props.good_detail.total_count} onClick={() => this.setState({number: this.state.number + 1})} />
          </div>
          <div className={style.good_buy_btn}>
            <Button type={'primary'}
                    icon={<AlipayOutlined />}
                    onClick={this.payBtnOnClick}
                    style={{width: '200px'}}
            >
              立即租用
            </Button>
          </div>
        </div>
      } else {
        return myLoading("加载中")
      }
    };

    return (
      <div>
        <PageHeader
          onBack={() => history.goBack()}
          title="商品详情"
          subTitle={this.isGoodDetailLoad() ? this.props.good_detail.machine_name : ''}
        />
        <Card style={{width: '95%', margin: 'auto'}}>
          <div className={style.flex_tow_side}>
            <div>
              {renderGoodPic()}
            </div>
            <div className={style.good_infos_side}>
              {renderGoodInfos()}
            </div>
          </div>
        </Card>
        <PayModal visible={this.state.modalVisible}
                  hide={this.hideModal}
                  good_detail={this.props.good_detail}
                  machineDetail={this.props.machineDetail}
                  city_end={this.state.city_end}
                  dispatchFee={this.props.dispatchFee}
                  number={this.state.number}
                  dispatch={this.props.dispatch}
                  userBalance={this.props.userBalance}
                  transactionMD5={this.props.transactionMD5}
        />
      </div>
    )
  }


}

function mapStateToProps({ loginModel, commonModel }) {
  const { isLogin, username, user_role } = loginModel;
  const { userDemand, good_detail, machineDetail, city_list, dispatchFee, userBalance, transactionMD5 } = commonModel;

  return { isLogin, username, user_role, userDemand, good_detail, machineDetail, city_list, dispatchFee, userBalance, transactionMD5 };
}

export default connect(mapStateToProps)(ProductDetail);
