import React from 'react';
import TextField from 'material-ui/TextField';
import { TableCell } from 'material-ui/Table';
import { ReadonlyCell, SelectCell, withActions } from '../components';
import { doAsync } from '../common/utils';

const valueOrEmpty = v => (v === undefined || v === null ? '' : v);

const EditableOptionsField = ({ onChange, value, options, nullOption, ...rest }) => (
  <SelectCell
    value={valueOrEmpty(value)}
    onChange={e => doAsync(onChange, [e.target.value])}
    nullOption={nullOption}
    options={options}
    {...rest}
  />
);
class RawEditableTextField extends React.Component {
  state = {
    el: null,
  }
  componentWillReceiveProps = (nextProps) => {
    const { el } = this.state;
    if (this.state.el && !this.props.autoFocus && nextProps.autoFocus) {
      el.focus();
      el.select();
    }
  }
  onChange = (e) => {
    doAsync(this.props.onChange, [e.target.value]);
  }
  handleRef = (ref) => {
    this.setState({ el: ref });
  }
  render() {
    const { onChange, value, ...rest } = this.props;
    return (
      <TextField
        inputRef={this.handleRef}
        value={valueOrEmpty(value)}
        onChange={this.onChange}
        {...rest}
      />
    );
  }
}

const ReadonlyField = withActions(ReadonlyCell);
const EditableTextField = withActions(RawEditableTextField);

export default ({
  readonlyActions, keyActions, editingActions, editing, className, value, displayValue, options, autoFocus, ...rest
}) => {
  return (
    <TableCell className={className}>
      {editing && options && <EditableOptionsField autoFocus={autoFocus} {...rest} keyActions={keyActions} options={options} value={value} />}
      {editing && !options && <EditableTextField autoFocus={autoFocus} keyActions={keyActions} actions={editingActions} {...rest} value={value} />}
      {!editing && <ReadonlyField actions={readonlyActions} value={displayValue || value} {...rest} />}
    </TableCell>
  );
};
