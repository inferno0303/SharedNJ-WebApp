import React from 'react';
import { connect, history } from 'umi';
import { Avatar, Button, Card, PageHeader, Tag } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
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

  hideModal = () => {
    this.setState({modalVisible: false});
  };

  linkToDetailPage = id => {
    history.push(`/user/productList/productDetail?id=${id}`)
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
              <div className={style.good_card}>
                <Card style={{ width: 300 }}
                      key={index}
                      cover={
                        <img
                          alt={item.machine_name}
                          src={`${API}/static/nongji_${item.machine_id}.png`}
                          className={style.good_img}
                          onClick={this.linkToDetailPage.bind(this, item.id)}
                        />
                      }
                >
                  <Card.Meta
                    avatar={<Avatar size="large" className={style.avatar_wrapper}>#{index + 1}</Avatar>}
                    title={<div className={style.price_text}>￥{item.unit_price}/台/月<Tag className={style.tag_text}>闪送服务</Tag></div>}
                    description={<div>
                      <div>发货地：广西 {item.location}</div>
                      <div>库存剩：{item.total_count}台</div>
                    </div>}
                  />
                  <div className={style.good_name} onClick={this.linkToDetailPage.bind(this, item.id)}>商品名：{item.machine_name}</div>
                </Card>
              </div>
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
                      <Button loading={this.state.loading} onClick={this.initData} icon={<ReloadOutlined />} type="primary" key={1}>刷新</Button>
                    ]}
        />
        <div className={style.good_card_row_flex}>
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
