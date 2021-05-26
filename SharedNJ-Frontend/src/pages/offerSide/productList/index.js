import React from 'react';
import { connect } from 'umi';
import moment from 'moment';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Descriptions,
  Divider,
  Form,
  Input,
  PageHeader,
  Radio, Spin,
  Tag,
  Tooltip,
} from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import style from './index.less';
import { delay } from '../../../utils/myUtils';
import NewProductModal from './newProductModal';
import { API } from '../../../config/requestConfig';
import { myEmptyStatus } from '../../../layouts/commonComponents';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loading: false,
    }
  }

  // handle
  showModal = () => {
    this.props.dispatch({ type: 'commonModel/getAllMachineInfo' });
    this.props.dispatch({ type: 'commonModel/getCityList' });
    this.setState({modalVisible: true});
  };

  hideModal = () => {
    this.setState({modalVisible: false});
  };

  imgOnClick = documentId => {
    const ele = document.getElementById(documentId);
    if (ele.style.width === '400px') ele.style.width = '800px';
    else ele.style.width = '400px';
  };

  // life cycle
  initData = async () => {
    await this.setState({loading: true});
    await this.props.dispatch({type: 'offerSideModel/getAllProductList'});
    await delay(400);
    await this.setState({loading: false});
  };

  componentWillMount() {
    this.initData().then(()=>null)
  }

  render() {

    const renderDescriptions = () => {
      return (
        this.props.allProductList.length > 0 ? this.props.allProductList.map((item, index) => {
            return (
              <Descriptions style={{width: '1000px'}} bordered key={index} title={
                <Divider orientation='left' style={{fontWeight: 'bold'}}>
                  <Avatar size="large" className={style.avatar_wrapper}>#{index + 1}</Avatar>
                  {this.props.username === item.username ? '我' : item.username}发布了商品：{item.machine_name}
                </Divider>
              }>
                <Descriptions.Item span={1} label="用户名">{item.username}</Descriptions.Item>
                <Descriptions.Item span={2} label="农机名称">
                  <Tag color="green">{item.machine_name}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="库存数量">{item.total_count}</Descriptions.Item>
                <Descriptions.Item label="发货地点">{item.location}</Descriptions.Item>
                <Descriptions.Item label="出租单价">{item.unit_price + `元`}</Descriptions.Item>
                <Descriptions.Item label="当前状态">
                  <Badge status="processing" text="正在出租" />
                </Descriptions.Item>
                <Descriptions.Item label="发布时间" span={2}>{moment(item.release_time).toNow(true) + `前`}</Descriptions.Item>
                <Descriptions.Item label="详细信息" span={3} >{item.detail}</Descriptions.Item>
                <Descriptions.Item label={'农机图片'} span={3}>
                  <img src={`${API}/static/nongji_${item.machine_id}.png`}
                       id={index}
                       onClick={this.imgOnClick.bind(this, index)}
                       style={{width: '400px', display: 'block', margin: 'auto'}}
                       alt={item.machine_name}
                  />
                </Descriptions.Item>
              </Descriptions>
            )
          }) :
          myEmptyStatus("暂无商家出租数据")
      )
    };


    return (
      <div>
        <PageHeader title="农机出租列表"
                    subTitle="商家可以在此发布农机出租信息"
                    extra={[
                      <Button loading={this.state.loading} onClick={this.initData} icon={<ReloadOutlined />} type="primary">刷新</Button>,
                      <Button onClick={this.showModal} icon={<PlusOutlined />} type="primary">发布商品</Button>
                    ]}
        />
        <div className={style.flex_middle}>
          <spin spinning={this.state.loading}>
            {
              renderDescriptions()
            }
          </spin>
        </div>
        <NewProductModal visible={this.state.modalVisible} hide={this.hideModal} />
      </div>
    )
  }


}

function mapStateToProps({ loginModel, commonModel, offerSideModel }) {
  const { isLogin, username, user_role } = loginModel;
  const { allProductList } = offerSideModel;
  const { userDemand } = commonModel;

  return { isLogin, username, user_role, userDemand, allProductList };
}

export default connect(mapStateToProps)(ProductList);
