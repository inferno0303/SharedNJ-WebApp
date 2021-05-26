import React from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Checkbox, Select, InputNumber, DatePicker } from 'antd';
import moment from 'moment';


class NewUserDemandModal extends React.Component {
  constructor(props) {
    super(props);
    this.form = null;
    this.state = {
      submitBtnLoading: false
    }
  }
  formRef = React.createRef();

  // handle
  handleSubmitBtnClick = async () => {
    this.formRef.current.validateFields()
      .then(async values => {
        const payload = {
          ...values,
          start_time: values['start_time'].format('x'),
          end_time: values['end_time'].format('x'),
        };
        console.log(payload);
        await this.props.dispatch({type: 'commonModel/newUserDemand', payload: payload});
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
          title="新增用户需求"
          visible={this.props.visible}
          onOk={this.handleSubmitBtnClick}
          onCancel={this.handleCancelBtnClick}
        >
          <Form
            labelCol={{span: 6}}
            wrapperCol={{span: 16}}
            ref={this.formRef}
            name="control-ref"
            initialValues={{
              number: 1,
              offer_price: 2100,
              start_time: moment(),
              end_time: moment().add(7, 'days'),
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
              label="求租数量"
              name="number"
              rules={[{ required: true, type: 'number', message: '请输入求租数量' }]}
            >
              <InputNumber min={1} max={10} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
              label="使用地点"
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
              label="预期价"
              name="offer_price"
              rules={[{ required: true, message: '请输入预期价' }]}
            >
              <InputNumber min={1} max={99999} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
              label="开始租用时间"
              name="start_time"
              rules={[{ required: true, message: '请选择开始租用时间' }]}
            >
              <DatePicker showTime allowClear={false} style={{width: '100%'}} />
            </Form.Item>

            <Form.Item
              label="结束租用时间"
              name="end_time"
              rules={[{ required: true, message: '请选择结束租用时间' }]}
            >
              <DatePicker showTime allowClear={false} style={{width: '100%'}} />
            </Form.Item>

            <Form.Item
              label="详细说明"
              name="detail_info"
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

export default connect(mapStateToProps)(NewUserDemandModal);
