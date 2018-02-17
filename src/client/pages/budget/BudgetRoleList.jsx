import React from 'react';
import uuid from 'uuid';
import keys from 'lodash/keys';
import values from 'lodash/values';
import mapValues from 'lodash/mapValues';
import omitBy from 'lodash/omitBy';
import filter from 'lodash/filter';
import { withStyles } from 'material-ui/styles';
import Table, { TableCell, TableHead, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import update from 'immutability-helper';
import Button from 'material-ui/Button';
import RoleRow from './RoleRow';
import budgetStyles from './budget-styles';
import { ButtonBar, ActionsButton, withStaticData } from '../../components';
import months, { monthNames } from './months';
import * as UpdateSpecs from './update-specs';
import { createAsyncFunction } from '../../common/utils';

const List = withStyles(budgetStyles)((
  {
    editing, roles, classes, onChangeField, onChangeMonthBudget, onChangeMonthAllocation, numSelected,
    onToggleAllSelected, onSplitAllocation, onAddAllocation, onFillLeft, onFillRight,
    onFillRoleLeft, onFillRoleRight, onChangeAllocationField, onCellFocussed, ...rest
  },
) => {
  const roleIds = keys(roles);
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {editing &&
            <TableCell className={classes.checkCell}>
              <Checkbox indeterminate={numSelected < roleIds.length && numSelected > 0} className={classes.check} checked={numSelected > 0} onChange={onToggleAllSelected} />
            </TableCell>
          }
          <TableCell className={classes.expandCell} />
          <TableCell className={classes.cell} colSpan={1}>Role</TableCell>
          <TableCell className={classes.cell} colSpan={1}>Location</TableCell>
          <TableCell className={classes.cell} colSpan={1}>Rate</TableCell>
          {months.map(i => <TableCell className={classes.cell} padding={'dense'} key={i}>{monthNames[i]}</TableCell>)}
        </TableRow>
      </TableHead>
      {roleIds.map(id => (
        <RoleRow
          key={id}
          editing={editing}
          onAddAllocation={onAddAllocation(id)}
          role={roles[id]}
          onChangeMonthBudget={onChangeMonthBudget(id)}
          onChangeMonthAllocation={onChangeMonthAllocation(id)}
          onChangeField={onChangeField(id)}
          onChangeAllocationField={onChangeAllocationField(id)}
          onSplitAllocation={onSplitAllocation(id)}
          onCellFocussed={onCellFocussed(id)}
          onFillLeft={onFillLeft(id)}
          onFillRight={onFillRight(id)}
          onFillRoleLeft={onFillRoleLeft(id)}
          onFillRoleRight={onFillRoleRight(id)}
          {...rest}
        />
      ))}
    </Table>
  );
});

const newRole = () => ({
  budget: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  allocations: [],
  id: uuid(),
});

const newAllocation = resource => ({
  id: uuid(),
  resource,
  forecast: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  actual: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
});

const duplicateRole = r => update(r, {
  id: { $set: uuid() },
});
const duplicateAllocation = (a, resource) => update(a, UpdateSpecs.duplicateAllocation(resource));

// eslint-disable-next-line react/prefer-stateless-function
class RawBudgetRoleList extends React.Component {
  state = {
    roles: this.props.initialRoles,
    roleSelected: mapValues(this.props.initialRoles, () => false),
    roleExpanded: mapValues(this.props.initialRoles, () => false),
    activeMonth: 0,
    activeAllocation: null,
    activeRole: 0,
  }
  componentWillReceiveProps(nextProps) {
    this.setState(update(this.state, UpdateSpecs.nextProps(nextProps, this.state)));
  }
  onAddRole = () => {
    this.setState(update(this.state, UpdateSpecs.addRole(newRole())));
  }
  onChangeRoleField = roleId => field => (value) => {
    const { staticData } = this.props;
    this.setState(update(this.state, UpdateSpecs.changeRoleValue(roleId, field, value, staticData, this.state)));
  }
  onChangeAllocationField = roleId => allocationIdx => field => (value) => {
    const { staticData } = this.props;
    this.setState(update(this.state,
      UpdateSpecs.changeAllocationValue(roleId, allocationIdx, field, value, staticData, this.state)));
  }
  onChangeMonthBudget = roleId => month => (value) => {
    this.setState(update(this.state, UpdateSpecs.changeRoleMonthBudget(roleId, month, value)));
  }
  onChangeMonthAllocation = roleId => type => (allocationIdx, month) => (value) => {
    this.setState(update(this.state, UpdateSpecs.changeMonthAllocation(roleId, allocationIdx, type, month, value)));
  }
  onToggleSelected = roleId => () => {
    this.setState(update(this.state, UpdateSpecs.toggleSelected(roleId)));
  }
  onSetRoleExpanded = (roleId, expanded) => () => {
    this.setState(update(this.state, UpdateSpecs.setRoleExpanded(roleId, expanded, this.state.activeRole)));
  }
  onSave = () => {
    this.props.onSave(this.state.roles);
  }
  onToggleAllSelected = () => {
    this.setState(update(this.state, UpdateSpecs.toggleAllSelected(this.getNumSelected() !== 0)));
  }
  onDuplicateItem = () => {
    const selected = this.getSelectedRoles();
    const newRoles = selected.map(r => duplicateRole(r));
    this.setState(update(this.state, {
      roles: { $push: newRoles },
      roleSelected: { $push: newRoles.map(() => false) },
      roleExpanded: { $push: newRoles.map(() => false) },
    }));
  }
  onDeleteItem = () => {
    console.log('Delete selected');
  }
  onCellFocussed = roleId => allocationId => month => () => {
    this.setState(update(this.state, {
      activeRole: { $set: roleId },
      activeAllocation: { $set: allocationId },
      activeMonth: { $set: month },
    }));
  }
  onGoToMonth = m => () => {
    this.setState(update(this.state, {
      activeMonth: { $set: m },
    }));
  }
  onSplitAllocation = roleId => allocId => month => () => {
    const allocation = this.state.roles[roleId].allocations[allocId];
    const newAlloc = duplicateAllocation(allocation, this.nextTbc(roleId));
    this.setState(update(this.state, UpdateSpecs.splitAllocation(roleId, allocId, newAlloc, month)));
  }
  onFillLeft = roleId => (allocId, type) => month => () => {
    const value = this.state.roles[roleId].allocations[allocId][type][month];
    this.setState(update(this.state, UpdateSpecs.fillLeft(roleId, allocId, type, month, value)));
  }
  onFillRight = roleId => (allocId, type) => month => () => {
    const value = this.state.roles[roleId].allocations[allocId][type][month];
    this.setState(update(this.state, UpdateSpecs.fillRight(roleId, allocId, type, month, value)));
  }
  onFillRoleLeft = roleId => month => () => {
    const value = this.state.roles[roleId].budget[month];
    this.setState(update(this.state, UpdateSpecs.fillRoleLeft(roleId, month, value)));
  }
  onFillRoleRight = roleId => month => () => {
    const value = this.state.roles[roleId].budget[month];
    this.setState(update(this.state, UpdateSpecs.fillRoleRight(roleId, month, value)));
  }
  onAddAllocation = roleId => () => {
    this.setState(update(this.state, UpdateSpecs.addAllocation(roleId, newAllocation(this.nextTbc(roleId)))));
  }
  onNextCell = () => {
    this.setState(update(this.state, UpdateSpecs.nextCell(this.state)));
  }
  onPreviousCell = () => {
    this.setState(update(this.state, UpdateSpecs.previousCell(this.state)));
  }
  onNextRow = () => {
    this.setState(update(this.state, UpdateSpecs.nextRow(this.state)));
  }
  onPreviousRow = () => {
    this.setState(update(this.state, UpdateSpecs.previousRow(this.state)));
  }
  getNumSelected = () => filter(keys(this.state.roleSelected), r => this.state.roleSelected[r]).length
  getSelectedRoles = () => {
    const { roleSelected, roles } = this.state;
    const selected = omitBy(roleSelected, s => !s);
    return mapValues(selected, (v, k) => roles[k]);
  }
  getNumTbcs = roleId => filter(values(this.state.roles[roleId].allocations), a => a.resource.indexOf('tbc') === 0).length
  nextTbc = roleId => (`tbc${this.getNumTbcs(roleId) + 1}`)
  render() {
    const { editing, onStartEdit, onCancelEdit, classes, ...rest } = this.props;
    const { roles, roleSelected, roleExpanded } = this.state;
    const numSelected = filter(keys(roleSelected), r => roleSelected[r]).length;
    const actions = {
      'Duplicate': {
        onSelect: this.onDuplicateItem,
        disabled: numSelected !== 1,
      },
      'Delete': {
        onSelect: this.onDeleteItem,
        disabled: numSelected === 0,
      },
    };
    return (
      <div>
        <div>
          {editing &&
            <ButtonBar>
              <Button variant='raised' color={'primary'} onClick={createAsyncFunction(this.onAddRole)}>Add Role</Button>
              <ActionsButton
                title={'Actions'}
                actions={actions}
              />
            </ButtonBar>
          }
        </div>
        <List
          editing={editing}
          roles={roles}
          onChangeField={this.onChangeRoleField}
          onChangeAllocationField={this.onChangeAllocationField}
          onChangeMonthBudget={this.onChangeMonthBudget}
          onChangeMonthAllocation={this.onChangeMonthAllocation}
          selected={roleSelected}
          numSelected={numSelected}
          onToggleSelected={this.onToggleSelected}
          onToggleAllSelected={this.onToggleAllSelected}
          onSplitAllocation={this.onSplitAllocation}
          onFillLeft={this.onFillLeft}
          onFillRight={this.onFillRight}
          onFillRoleLeft={this.onFillRoleLeft}
          onFillRoleRight={this.onFillRoleRight}
          onAddAllocation={this.onAddAllocation}
          activeAllocation={this.state.activeAllocation}
          activeRole={this.state.activeRole}
          activeMonth={this.state.activeMonth}
          onCellFocussed={this.onCellFocussed}
          onNextCell={this.onNextCell}
          onPreviousCell={this.onPreviousCell}
          onNextRow={this.onNextRow}
          onPreviousRow={this.onPreviousRow}
          onSetRoleExpanded={this.onSetRoleExpanded}
          expanded={roleExpanded}
          onGoToMonth={this.onGoToMonth}
          {...rest}
        />
        <div className={classes.buttonBar}>
          {!editing && <Button variant='raised' color={'primary'} onClick={createAsyncFunction(onStartEdit)}>Edit</Button>}
          {editing &&
            <div>
              <Button onClick={onCancelEdit}>Cancel</Button>
              <Button variant='raised' color={'primary'} onClick={this.onSave}>Save</Button>
            </div>
          }
        </div>
      </div>
    );
  }
}
export default withStyles(budgetStyles)(withStaticData(RawBudgetRoleList));
