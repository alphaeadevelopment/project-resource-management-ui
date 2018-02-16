import React from 'react';
import keys from 'lodash/keys';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import actionButtonStyles from './action-button-styles';

class RawActionsButton extends React.Component {
  state = {
    anchorEl: null,
  }
  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  itemSelected = func => () => {
    this.setState({ anchorEl: null });
    func.call(null);
  }
  render() {
    const { title, actions } = this.props;
    const { anchorEl } = this.state;
    return (
      <div>
        <Button variant='raised' onClick={this.handleClick}>
          {title}
          <ArrowDropDown />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {keys(actions).map(i => (
            <MenuItem key={i} disabled={actions[i].disabled} onClick={this.itemSelected(actions[i].onSelect)}>
              {i}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}
export default withStyles(actionButtonStyles)(RawActionsButton);
