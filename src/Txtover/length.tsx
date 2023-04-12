import React, { Component } from 'react';
import styles from './index.less';
import { Tooltip } from 'antd';
// 手动控制长度打省略点
export default class TxtOverLength extends Component {
  render() {
    let { text, children, maxLength = 18 } = this.props;
    if (typeof children == 'string' && !text) {
      text = children;
    }
    return (
      <>
        {text && text.length > maxLength ? (
          <Tooltip title={text}>
            {typeof children == 'string' && children.slice ? (
              children.slice(0, maxLength) + '...'
            ) : (
              <>{children}</>
            )}
            {/* 很奇怪，不加i,tooltip显示不出 */}
            <i></i>
          </Tooltip>
        ) : (
          <>{children}</>
        )}
      </>
    );
  }
}
