import React from 'react';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ChevronRight from 'material-ui-icons/ChevronRight';
import { TableCell, TableBody, TableRow } from 'material-ui/Table';
import { GenericCell } from '../../components';
import budgetStyles from './budget-styles';
import AllocationRow from './AllocationRow';
import months from './months';
import RoleAllocationsActions from './RoleAllocationsActions';
import getLocationOptions from './get-location-options';
import getRoleOptions from './get-role-options';
import { Mods, Keys } from '../../common/keys';
import { createAsyncFunction } from '../../common/utils';

const RoleAllocations = ({
  role, onChangeMonthAllocation, editing, onSplitAllocation, onAddAllocation,
  onFillLeft, onFillRight, onChangeField, onCellFocussed, ...rest
}) => {
  const rows = [];
  rows.push(role.allocations.map((alloc, allocIdx) => (
    <AllocationRow
      key={allocIdx // eslint-disable-line react/no-array-index-key
      }
      allocation={alloc}
      idx={allocIdx}
      editing={editing}
      onSplitAllocation={onSplitAllocation(allocIdx, 'forecast')}
      onFillLeft={onFillLeft(allocIdx, 'forecast')}
      onFillRight={onFillRight(allocIdx, 'forecast')}
      onChangeMonthAllocation={onChangeMonthAllocation('forecast')}
      type={'forecast'}
      onChangeField={onChangeField(allocIdx)}
      onCellFocussed={onCellFocussed(allocIdx)}
      roleResources={rest.staticData.getResourcesForRole(role.role)}
      {...rest}
    />
  )));
  if (editing) rows.push(<RoleAllocationsActions onAddAllocation={onAddAllocation} key={'allocActions'} />);
  return rows;
};

export default withStyles(budgetStyles)(({
  role, idx, editing, classes, onToggleSelected, selected, onChangeMonthBudget, onChangeField,
  onFillRoleLeft, onFillRoleRight,
  onChangeAllocationField, activeAllocation, activeRole, activeMonth, expanded, ...rest
}) => {
  const { rate, location } = role;
  const roleType = role.role;
  return (
    <TableBody>
      <TableRow>
        {editing &&
          <TableCell className={classes.checkCell}>
            <Checkbox
              className={classes.check}
              checked={selected[idx]}
              onChange={createAsyncFunction(onToggleSelected(idx))}
            />
          </TableCell>
        }
        <TableCell className={classes.expandCell}>
          <IconButton onClick={createAsyncFunction(rest.onSetRoleExpanded(idx, !expanded[idx]))}>
            {expanded[idx] && <ExpandMore />}
            {!expanded[idx] && <ChevronRight />}
          </IconButton>
        </TableCell>
        <GenericCell editing={editing} onChange={onChangeField('role')} options={getRoleOptions(rest.staticData.roles)} displayValue={rest.staticData.getRoleDisplayName(roleType)} value={roleType} />
        <GenericCell editing={editing} onChange={onChangeField('location')} value={location} options={getLocationOptions(rest.staticData.locations)} displayValue={rest.staticData.getLocationDisplayName(location)} />
        <GenericCell
          editing={editing}
          className={classes.cell}
          value={rate}
          onChange={onChangeField('rate')}
        />
        {months.map((month) => {
          return (
            <GenericCell
              key={month}
              editing={editing}
              onFocus={rest.onCellFocussed(null)(month)}
              className={classes.cell}
              onChange={onChangeMonthBudget(month)}
              month={month}
              autoFocus={activeAllocation === null && activeRole === idx && activeMonth === month}
              value={role.budget[month]}
              keyActions={[
                {
                  key: Keys.Codes.ARROW_LEFT,
                  modifiers: [Mods.ALT],
                  action: onFillRoleLeft(month),
                },
                {
                  key: Keys.Codes.ARROW_RIGHT,
                  modifiers: [Mods.ALT],
                  action: onFillRoleRight(month),
                },
                {
                  key: Keys.Codes.ARROW_RIGHT,
                  action: rest.onNextCell,
                },
                {
                  key: Keys.Codes.ARROW_LEFT,
                  action: rest.onPreviousCell,
                },
                {
                  key: Keys.Codes.ARROW_RIGHT,
                  modifiers: [Mods.CTRL],
                  action: rest.onGoToMonth(11),
                },
                {
                  key: Keys.Codes.ARROW_LEFT,
                  modifiers: [Mods.CTRL],
                  action: rest.onGoToMonth(0),
                },
                {
                  key: Keys.Codes.ARROW_UP,
                  action: rest.onPreviousRow,
                },
                {
                  key: Keys.Codes.ARROW_DOWN,
                  action: rest.onNextRow,
                },
                {
                  key: Keys.Codes.ARROW_DOWN,
                  modifiers: [Mods.ALT],
                  action: rest.onSetRoleExpanded(idx, true),
                },
                {
                  key: Keys.Codes.ARROW_UP,
                  modifiers: [Mods.ALT],
                  action: rest.onSetRoleExpanded(idx, false),
                },
              ]}
              editingActions={{
                'Fill right': { onSelect: onFillRoleRight(month) },
                'Fill left': { onSelect: onFillRoleLeft(month) },
              }}
            />
          );
        })}
      </TableRow>
      {
        expanded[idx] && role.allocations &&
        <RoleAllocations
          roleIdx={idx}
          cellClassName={classes.cell}
          role={role}
          onChangeField={onChangeAllocationField}
          editing={editing}
          activeAllocation={activeAllocation}
          activeRole={activeRole}
          activeMonth={activeMonth}
          {...rest}
        />
      }
    </TableBody>
  );
});
