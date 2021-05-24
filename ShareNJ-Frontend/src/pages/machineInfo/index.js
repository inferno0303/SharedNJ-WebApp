import React from 'react';
import { connect } from 'umi';
import { PageHeader } from 'antd';
import MainTable from './mainTable';


class MachineInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // handle

  // life cycle
  initData = async () => {

  };

  componentWillMount() {
    this.initData().then(()=>null)
  }

  render() {
    return (
      <div>
        <PageHeader title={'农机信息'} subTitle={'支持查看农机信息'} />
        <MainTable dataSource={this.props.machineInfo}
                   dispatch={this.props.dispatch}
        />
      </div>
    )
  }


}

function mapStateToProps({ commonModel }) {
  const { machineInfo } = commonModel;
  return { machineInfo };
}

export default connect(mapStateToProps)(MachineInfo);
