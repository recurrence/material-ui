var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent TableCell

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Input from '../Input';
import { MenuItem } from '../Menu';
import Select from '../Select';
import TableCell from './TableCell';
import Toolbar from '../Toolbar';
import Typography from '../Typography';
import TablePaginationActions from './TablePaginationActions';

export const styles = theme => ({
  root: {
    // Increase the specificity to override TableCell.
    '&:last-child': {
      padding: 0
    }
  },
  toolbar: {
    height: 56,
    minHeight: 56,
    paddingRight: 2
  },
  spacer: {
    flex: '1 1 100%'
  },
  caption: {
    flexShrink: 0
  },
  input: {
    fontSize: 'inherit',
    flexShrink: 0
  },
  selectRoot: {
    marginRight: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit,
    color: theme.palette.text.secondary
  },
  select: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2
  },
  selectIcon: {
    top: 1
  },
  actions: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 */
class TablePagination extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { count, onChangePage, rowsPerPage } = nextProps;
    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
    if (this.props.page > newLastPage) {
      onChangePage(null, newLastPage);
    }
  }

  render() {
    const _props = this.props,
          {
      Actions,
      backIconButtonProps,
      classes,
      colSpan: colSpanProp,
      component: Component,
      count,
      labelDisplayedRows,
      labelRowsPerPage,
      nextIconButtonProps,
      onChangePage,
      onChangeRowsPerPage,
      page,
      rowsPerPage,
      rowsPerPageOptions
    } = _props,
          other = _objectWithoutProperties(_props, ['Actions', 'backIconButtonProps', 'classes', 'colSpan', 'component', 'count', 'labelDisplayedRows', 'labelRowsPerPage', 'nextIconButtonProps', 'onChangePage', 'onChangeRowsPerPage', 'page', 'rowsPerPage', 'rowsPerPageOptions']);

    let colSpan;

    if (Component === TableCell || Component === 'td') {
      colSpan = colSpanProp || 1000; // col-span over everything
    }

    return React.createElement(
      Component,
      _extends({ className: classes.root, colSpan: colSpan }, other),
      React.createElement(
        Toolbar,
        { className: classes.toolbar },
        React.createElement('div', { className: classes.spacer }),
        rowsPerPageOptions.length > 1 && React.createElement(
          Typography,
          { type: 'caption', className: classes.caption },
          labelRowsPerPage
        ),
        rowsPerPageOptions.length > 1 && React.createElement(
          Select,
          {
            classes: {
              root: classes.selectRoot,
              select: classes.select,
              icon: classes.selectIcon
            },
            input: React.createElement(Input, {
              classes: {
                root: classes.input
              },
              disableUnderline: true
            }),
            value: rowsPerPage,
            onChange: onChangeRowsPerPage
          },
          rowsPerPageOptions.map(rowsPerPageOption => React.createElement(
            MenuItem,
            { key: rowsPerPageOption, value: rowsPerPageOption },
            rowsPerPageOption
          ))
        ),
        React.createElement(
          Typography,
          { type: 'caption', className: classes.caption },
          labelDisplayedRows({
            from: count === 0 ? 0 : page * rowsPerPage + 1,
            to: Math.min(count, (page + 1) * rowsPerPage),
            count,
            page
          })
        ),
        React.createElement(Actions, {
          backIconButtonProps: backIconButtonProps,
          count: count,
          nextIconButtonProps: nextIconButtonProps,
          onChangePage: onChangePage,
          page: page,
          rowsPerPage: rowsPerPage
        })
      )
    );
  }
}

TablePagination.propTypes = {
  /**
   * The component used for displaying the actions.
   * Either a string to use a DOM element or a component.
   */
  Actions: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Properties applied to the back arrow `IconButton` component.
   */
  backIconButtonProps: PropTypes.object,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  colSpan: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * The total number of rows.
   */
  count: PropTypes.number.isRequired,
  /**
   * Useful to customize the displayed rows label.
   */
  labelDisplayedRows: PropTypes.func,
  /**
   * Useful to customize the rows per page label. Invoked with a `{ from, to, count, page }`
   * object.
   */
  labelRowsPerPage: PropTypes.node,
  /**
   * Properties applied to the next arrow `IconButton` component.
   */
  nextIconButtonProps: PropTypes.object,
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback
   * @param {number} page The page selected
   */
  onChangePage: PropTypes.func.isRequired,
  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {object} event The event source of the callback
   */
  onChangeRowsPerPage: PropTypes.func,
  /**
   * The zero-based index of the current page.
   */
  page: PropTypes.number.isRequired,
  /**
   * The number of rows per page.
   */
  rowsPerPage: PropTypes.number.isRequired,
  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   */
  rowsPerPageOptions: PropTypes.array
};

TablePagination.defaultProps = {
  Actions: TablePaginationActions,
  component: TableCell,
  labelDisplayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,
  labelRowsPerPage: 'Rows per page:',
  rowsPerPageOptions: [5, 10, 25]
};

export default withStyles(styles, { name: 'MuiTablePagination' })(TablePagination);