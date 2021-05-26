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
import NewUserDemandModal from './newUserDemandModal';
import { delay } from '../../utils/myUtils';

class UserDemand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      reloadDataBtnLoading: false,
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
    this.handleReloadData().then();
  };

  handleReloadData = async () => {
    await this.setState({reloadDataBtnLoading: true});
    await this.props.dispatch({type: 'commonModel/getAllUserDemand'});
    await delay(500);
    await this.setState({reloadDataBtnLoading: false});
  };

  // life cycle
  initData = async () => {
    await this.setState({loading: true});
    await this.props.dispatch({type: 'commonModel/getAllUserDemand'});
    await delay(400);
    await this.setState({loading: false});
  };

  componentWillMount() {
    this.initData().then(()=>null)
  }

  render() {

    const renderDescriptions = () => {
      return (
        this.props.userDemand.map((item, index) => {
          return (
            <Descriptions style={{width: '1000px'}} bordered key={index} title={
              <Divider orientation='left' style={{fontWeight: 'bold'}}>
                <Avatar size="large" className={style.avatar_wrapper}>#{index + 1}</Avatar>
                {item.username}：求租{item.machine_name}
              </Divider>
            }>
              <Descriptions.Item span={1} label="用户名">{item.username}</Descriptions.Item>
              <Descriptions.Item span={2} label="农机名称">
                <Tag color="green">{item.machine_name}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="求租数量">{item.number}</Descriptions.Item>
              <Descriptions.Item label="求租时间" span={2}>{moment(item.start_time).format("YYYY-MM-DD HH:mm:ss") + `~` + moment(item.end_time).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>
              <Descriptions.Item label="求租天数">{moment(item.start_time).to(moment(item.end_time), true).replace("days", "天")}</Descriptions.Item>
              <Descriptions.Item label="用户地点">{item.location}</Descriptions.Item>
              <Descriptions.Item label="求租期望价格">{item.offer_price + `元`}</Descriptions.Item>
              <Descriptions.Item label="当前状态">
                <Badge status="processing" text="正在求租" />
              </Descriptions.Item>
              <Descriptions.Item label="发布时间">{moment(item.release_time).toNow(true) + `前`}</Descriptions.Item>
              <Descriptions.Item label="详细信息">{item.detail_info}</Descriptions.Item>
            </Descriptions>
          )
        })
      )
    };


    return (
      <div>
        <PageHeader title="用户需求发布"
                    subTitle="用户可在此发布农机求租信息"
                    extra={[
                      <Button loading={this.state.reloadDataBtnLoading} onClick={this.handleReloadData} icon={<ReloadOutlined />} type="primary">刷新</Button>,
                      <Button onClick={this.showModal} icon={<PlusOutlined />} type="primary">新增</Button>
                    ]}
        />
        <div className={style.flex_middle}>
          <spin spinning={this.state.loading}>
            {
              renderDescriptions()
            }
          </spin>
        </div>
        <NewUserDemandModal visible={this.state.modalVisible} hide={this.hideModal} />
      </div>
    )
  }


}

function mapStateToProps({ loginModel, commonModel }) {
  const { isLogin, username, user_role } = loginModel;
  const { userDemand } = commonModel;

  return { isLogin, username, user_role, userDemand };
}

export default connect(mapStateToProps)(UserDemand);
