import React from 'react';
import { Spin } from 'antd';

export default () => (
  <Spin
    size="large"
    style={{
      width: '100%',
      position: 'absolute',
      top: '50%'
    }}
  />
);
