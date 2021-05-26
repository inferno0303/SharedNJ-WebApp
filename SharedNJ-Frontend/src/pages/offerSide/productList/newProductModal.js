import React from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Checkbox, Select, InputNumber, DatePicker } from 'antd';
import moment from 'moment';


class NewProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.form = null;
    this.state = {
      submitBtnLoading: false
    }
  }
  formRef = React.createRef();

  // handle
  onSubmit = () => {
    this.formRef.current.validateFields()
      .then(async values => {
        await this.props.dispatch({type: 'offerSideModel/newProductList', payload: values});
        await this.props.hide();
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      });
  };

  handleCancelBtnClick = async () => {
    this.props.hide()
  };

  // life cycle
  initData = async () => {

  };

  componentWillMount() {
    this.initData().then(()=>null)
  }

  render() {

    return (
      <div>
        <Modal
          title="商家发布农机出租"
          visible={this.props.visible}
          onOk={this.onSubmit}
          onCancel={this.handleCancelBtnClick}
        >
          <Form
            labelCol={{span: 6}}
            wrapperCol={{span: 16}}
            ref={this.formRef}
            name="control-ref"
            initialValues={{
              total_count: 49,
              unit_price: 2899
            }}
            onFinish={this.onFinish}
          >

            <Form.Item
              label="选择农机名称"
              name="machine_name"
              rules={[{ required: true, message: '请选择农机名称' }]}
            >
              <Select>
                {
                  this.props.machineInfo.map((item, index) => {
                    return <Select.Option key={index} value={item.machine_name}>{item.machine_name}</Select.Option>
                  })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="库存数量"
              name="total_count"
              rules={[{ required: true, type: 'number', message: '请输入库存数量' }]}
            >
              <InputNumber min={1} max={9999} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
              label="发货地点"
              name="location"
              rules={[{ required: true, message: '请选择地点' }]}
            >
              <Select>
                {
                  this.props.city_list.map((item, index) => {
                    return <Select.Option key={index} value={item}>{item}</Select.Option>
                  })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="出租单价"
              name="unit_price"
              rules={[{ required: true, message: '请输入出租单价' }]}
            >
              <InputNumber min={1} max={99999} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
              label="详细说明"
              name="detail"
              rules={[{ required: true, message: '请输入详细说明' }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

          </Form>
        </Modal>
      </div>
    )
  }


}

function mapStateToProps({ loginModel, commonModel }) {
  const { isLogin, username, user_role } = loginModel;
  const { machineInfo, city_list } = commonModel;
  return { isLogin, username, user_role, machineInfo, city_list };
}

export default connect(mapStateToProps)(NewProductModal);
