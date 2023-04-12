/*
 * @Author: Sky
 * @Date: 2021-09-27 14:05:53
 * @Description:
 */
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './index.less';

const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('@/assets/icon', true, /\.svg$/));
} catch (error) {
  // console.log(error);
}

interface Props {
  iconName: string;
  toolTitle?: string;
  onClick?: () => any;
  style?: any;
  className?: any;
}

const SvgIcon = (props: Props) => {
  const { iconName, toolTitle, className, ...rest } = props;
  const svgClass = className
    ? `svg-class ${className}`
    : 'svg-class defaultBlue';

  return (
    <>
      {toolTitle ? (
        <Tooltip title={toolTitle}>
          <svg className={svgClass} aria-hidden="true" {...rest}>
            <use xlinkHref={`#icon-${iconName}`} />
          </svg>
        </Tooltip>
      ) : (
        <svg className={svgClass} aria-hidden="true" {...rest}>
          <use xlinkHref={`#icon-${iconName}`} />
        </svg>
      )}
    </>
  );
};

SvgIcon.propTypes = {
  // svg名字
  iconName: PropTypes.string.isRequired,
};

SvgIcon.defaultProps = {
  fill: 'currentColor',
};

export default SvgIcon;
