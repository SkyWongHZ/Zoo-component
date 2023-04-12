import * as React from 'react';
import styles from './index.less';
import { Tooltip } from 'antd';

interface textOverProps {
  textkey: any;
}

export default class TextOver extends React.Component<textOverProps> {
  constructor(props) {
    super(props);
    this.state = {
      needDomShow: false,
    };
  }
  componentDidMount() {
    if (
      document.getElementById(`text_over${this.props.textkey}`) &&
      this.props.isneddKey
    ) {
      const element = document.getElementById(`text_over${this.props.textkey}`);
      let showTool = element.clientWidth < element.scrollWidth;
      this.setState({ needDomShow: showTool });
    }
    const element = this.refs.text_over;
    if (!this.props.isneddKey && element) {
      window.addEventListener('resize', () => {
        this.showTool = element.clientWidth < element.scrollWidth;
      });
    }
  }

  render() {
    const { text, textkey, isneddKey, totalText, isOver, style } = this.props;
    const element = this.refs[`text_over${textkey}`];
    this.showTool = element ? element.clientWidth < element.scrollWidth : false;
    // totalText:当外部去截断手动打省略号时配合使用，在悬浮框处完整的展示文本
    // isOver:当外部去截断手动打省略号时配合使用，手动控制是否展示悬浮框
    return (
      <>
        {(isneddKey && this.state.needDomShow) || this.showTool || isOver ? (
          <Tooltip placement="bottom" title={totalText || text}>
            <div
              ref={`text_over${textkey}`}
              id={`text_over${textkey}`}
              className={styles.over_text}
              style={style}
            >
              {text}
            </div>
          </Tooltip>
        ) : (
          <div
            ref={`text_over${textkey}`}
            id={`text_over${textkey}`}
            className={styles.over_text}
            style={style}
          >
            {text}
          </div>
        )}
      </>
    );
  }
}
