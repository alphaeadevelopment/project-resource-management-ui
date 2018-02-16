import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';
import { TableCell, TableRow } from 'material-ui/Table';
import budgetStyles from './budget-styles';
import { GenericCell } from '../../components';
import months from './months';
import getResourceOptions from './get-resource-options';
import getLocationOptions from './get-location-options';
import { Mods, Keys } from '../../common/keys';

export default withStyles(budgetStyles)(({
  allocation, idx, classes, type, onChangeMonthAllocation, editing, onSplitAllocation,
  onFillRight, onFillLeft, staticData,
  onChangeField, onCellFocussed, activeAllocation, activeRole, activeMonth, roleIdx, onNextCell, onPreviousCell,
  onGoToMonth, onPreviousRow, onNextRow, onSetRoleExpanded, roleResources,
}) => {
  const { location, rate } = allocation;
  const resourceId = allocation.resource;
  const resource = staticData.getResource(resourceId);
  return (
    <TableRow>
      {editing &&
        <TableCell className={classes.checkCell} ><Checkbox className={classes.check} /></TableCell>
      }
      <TableCell className={classes.cell} />
      <GenericCell
        editing={editing}
        className={classes.cell}
        displayValue={(resource || {}).name}
        onChange={onChangeField('resource')}
        options={getResourceOptions(roleResources, resource)}
        value={resourceId}
      />
      <GenericCell
        editing={editing}
        className={classes.cell}
        onChange={onChangeField('location')}
        options={getLocationOptions(staticData.locations)}
        value={location}
        displayValue={staticData.getLocationDisplayName(location)}
      />
      <GenericCell
        editing={editing}
        className={classes.cell}
        onChange={onChangeField('rate')}
        value={rate}
      />
      {
        months.map((month) => {
          return (
            <GenericCell
              key={month}
              className={classes.cell}
              editing={editing}
              onFocus={onCellFocussed(month)}
              autoFocus={activeAllocation === idx && activeRole === roleIdx && activeMonth === month}
              keyActions={
                [
                  {
                    key: Keys.Codes.ARROW_LEFT,
                    modifiers: [Mods.ALT],
                    action: onFillLeft(month),
                  },
                  {
                    key: Keys.Codes.ARROW_RIGHT,
                    modifiers: [Mods.ALT],
                    action: onFillRight(month),
                  },
                  {
                    key: Keys.Codes.ARROW_RIGHT,
                    action: onNextCell,
                  },
                  {
                    key: Keys.Codes.ARROW_LEFT,
                    action: onPreviousCell,
                  },
                  {
                    key: Keys.Codes.ARROW_RIGHT,
                    modifiers: [Mods.CTRL],
                    action: onGoToMonth(11),
                  },
                  {
                    key: Keys.Codes.ARROW_LEFT,
                    modifiers: [Mods.CTRL],
                    action: onGoToMonth(0),
                  },
                  {
                    key: Keys.Codes.ARROW_UP,
                    action: onPreviousRow,
                  },
                  {
                    key: Keys.Codes.ARROW_DOWN,
                    action: onNextRow,
                  },
                  {
                    key: Keys.Codes.ARROW_DOWN,
                    modifiers: [Mods.ALT],
                    action: onSetRoleExpanded(roleIdx, true),
                  },
                  {
                    key: Keys.Codes.ARROW_UP,
                    modifiers: [Mods.ALT],
                    action: onSetRoleExpanded(roleIdx, false),
                  },
                ]}
              editingActions={{
                'Split from here': { onSelect: onSplitAllocation(month) },
                'Fill right': { onSelect: onFillRight(month) },
                'Fill left': { onSelect: onFillLeft(month) },
              }}
              onChange={(v) => {
                onChangeMonthAllocation(idx, month)(v);
              }}
              value={allocation[type][month]}
            />
          );
        })
      }
    </TableRow >
  );
});
