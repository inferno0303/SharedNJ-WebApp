import style from './commonStyleSheet.less';
import { Empty, Spin } from 'antd';
import { FrownTwoTone } from '@ant-design/icons';
import React from 'react';


// render loading placeholder, show msg in the middle area.
export const myLoading = (msg, height) => (
  <div className={style.loading_in_middle_wrapper} style={{height: height ?? null}}>
    <Spin size='large' />
    <div>{msg}</div>
  </div>
);

// render empty placeholder, show msg in the middle area.
// selected option: height, if height is null, default is 50vh
export const myEmptyStatus = (msg, height) => {
  return <div className={style.row_in_middle_wrapper} style={{height: height ?? null}}>
    <Empty description={msg} />
  </div>
};

export const myPermissionDenied = (msg, height) => {
  return <div className={style.column_in_middle_wrapper} style={{height: height ?? null}}>
    <FrownTwoTone style={{fontSize: '48px', padding: '15px 0'}} />
    <div>{msg}</div>
  </div>
};
