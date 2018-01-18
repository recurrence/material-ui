var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

const SIZE = 50;

function getRelativeValue(value, min, max) {
  const clampedValue = Math.min(Math.max(min, value), max);
  return (clampedValue - min) / (max - min);
}

export const styles = theme => ({
  root: {
    display: 'inline-block'
  },
  colorPrimary: {
    color: theme.palette.primary.main
  },
  colorSecondary: {
    color: theme.palette.secondary.light
  },
  svgIndeterminate: {
    animation: 'mui-progress-circular-rotate 1.4s linear infinite'
  },
  svgDeterminate: {
    transform: 'rotate(-90deg)'
  },
  circle: {
    stroke: 'currentColor',
    strokeLinecap: 'round'
  },
  circleIndeterminate: {
    animation: 'mui-progress-circular-dash 1.4s ease-in-out infinite',
    // Some default value that looks fine waiting for the animation to kicks in.
    strokeDasharray: '80px, 200px',
    strokeDashoffset: '0px' // Add the unit to fix a Edge 16 and below bug.
  },
  '@keyframes mui-progress-circular-rotate': {
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
  '@keyframes mui-progress-circular-dash': {
    '0%': {
      strokeDasharray: '1px, 200px',
      strokeDashoffset: '0px'
    },
    '50%': {
      strokeDasharray: '100px, 200px',
      strokeDashoffset: '-15px'
    },
    '100%': {
      strokeDasharray: '100px, 200px',
      strokeDashoffset: '-120px'
    }
  }
});

function CircularProgress(props) {
  const {
    classes,
    className,
    color,
    max,
    min,
    mode,
    size,
    style,
    thickness,
    value
  } = props,
        other = _objectWithoutProperties(props, ['classes', 'className', 'color', 'max', 'min', 'mode', 'size', 'style', 'thickness', 'value']);

  const rootProps = {};

  const circleStyle = {};
  if (mode === 'determinate') {
    const relVal = getRelativeValue(value, min, max) * 100;
    const circumference = 2 * Math.PI * (SIZE / 2 - 5);

    circleStyle.strokeDashoffset = `${Math.round((100 - relVal) / 100 * circumference * 1000) / 1000}px`;
    circleStyle.strokeDasharray = Math.round(circumference * 1000) / 1000;

    rootProps['aria-valuenow'] = value;
    rootProps['aria-valuemin'] = min;
    rootProps['aria-valuemax'] = max;
  }

  return React.createElement(
    'div',
    _extends({
      className: classNames(classes.root, {
        [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'inherit'
      }, className),
      style: _extends({ width: size, height: size }, style),
      role: 'progressbar'
    }, rootProps, other),
    React.createElement(
      'svg',
      {
        className: classNames({
          [classes.svgIndeterminate]: mode === 'indeterminate',
          [classes.svgDeterminate]: mode === 'determinate'
        }),
        viewBox: `0 0 ${SIZE} ${SIZE}`
      },
      React.createElement('circle', {
        className: classNames(classes.circle, {
          [classes.circleIndeterminate]: mode === 'indeterminate'
        }),
        style: circleStyle,
        cx: SIZE / 2,
        cy: SIZE / 2,
        r: SIZE / 2 - 5,
        fill: 'none',
        strokeWidth: thickness
      })
    )
  );
}

CircularProgress.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'inherit']),
  /**
   * The max value of progress in determinate mode.
   */
  max: PropTypes.number,
  /**
   * The min value of progress in determinate mode.
   */
  min: PropTypes.number,
  /**
   * The mode of show your progress. Indeterminate
   * for when there is no value for progress.
   * Determinate for controlled progress value.
   */
  mode: PropTypes.oneOf(['determinate', 'indeterminate']),
  /**
   * The size of the circle.
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The thickness of the circle.
   */
  thickness: PropTypes.number,
  /**
   * The value of progress in determinate mode.
   */
  value: PropTypes.number
};

CircularProgress.defaultProps = {
  color: 'primary',
  max: 100,
  min: 0,
  mode: 'indeterminate',
  size: 40,
  thickness: 3.6,
  value: 0
};

export default withStyles(styles, { name: 'MuiCircularProgress', flip: false })(CircularProgress);