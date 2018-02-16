import React from 'react';
import keys from 'lodash/keys';
import find from 'lodash/find';
import some from 'lodash/some';
import includes from 'lodash/includes';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Mods } from '../common/keys';
import { doAsync } from '../common/utils';

const keyActionMatches = (key, mods, ka) => {
  if (key !== ka.key) return false;
  const modMatch = !some(mods, m => !includes(ka.modifiers, m)) && !some(ka.modifiers, m => !includes(mods, m));
  return modMatch;
};

const CellMenu = ({ anchorEl, onClose, actions, onActionSelected }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      {keys(actions).map(i => (
        <MenuItem key={i} onClick={onActionSelected(i)}>{i}</MenuItem>
      ))}
    </Menu>
  );
};

export default (Wrapped) => {
  class HocComponent extends React.Component {
    state = {
      anchorEl: null,
    }
    componentWillUnmount() {
      if (this.timeout) clearTimeout(this.timeout);
    }
    onActionSelected = i => () => {
      this.handleClose();
      doAsync(this.props.actions[i].onSelect);
    }
    handleContextMenu = (e) => {
      if (this.props.actions) {
        this.setState({ anchorEl: e.currentTarget });
        e.preventDefault();
      }
    }
    handleKeyDown = (e) => {
      const key = e.which;
      const activeMods = Mods.activeMods(e);
      if (!Mods.isModKey(key)) {
        const keyAction = find(this.props.keyActions, ka => keyActionMatches(key, activeMods, ka));
        if (keyAction) {
          e.preventDefault();
          doAsync(keyAction.action);
        }
      }
    }
    handleClose = () => {
      this.setState({ anchorEl: null });
    }
    render() {
      const { actions, keyActions, ...rest } = this.props;
      const { anchorEl } = this.state;
      return (
        <div>
          <Wrapped
            onContextMenu={this.handleContextMenu}
            onKeyDown={this.handleKeyDown}
            {...rest}
          />
          {actions && <CellMenu
            anchorEl={anchorEl}
            onClose={this.handleClose}
            onActionSelected={this.onActionSelected}
            actions={actions}
          />}
        </div>
      );
    }
  }
  return HocComponent;
};
