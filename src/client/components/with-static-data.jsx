import React from 'react';
import { connect } from 'react-redux';
import pickBy from 'lodash/pickBy';
import * as Selectors from '../selectors';

export default (Wrapped) => {
  class HocComponent extends React.Component {
    getLocationMultiplier = (location) => {
      const { locations } = this.props;
      const loc = locations[location];
      if (loc && loc.rate) return loc.rate;
      if (loc && loc.type === 'city') return this.getLocationMultiplier(loc.country);
      return 1;
    }
    getDefaultRateForRole = role => (location) => {
      if (!location || !role) return null;
      const { roles } = this.props;
      const mult = this.getLocationMultiplier(location);
      return roles[role].rate * mult;
    }
    getLocationDisplayName = loc => (this.props.locations[loc] || {}).name
    getRoleDisplayName = roleId => (this.props.roles[roleId] || {}).name
    getResourceLocation = r => (this.props.resources[r] || {}).location
    getResource = r => (r ? ({ ...this.props.resources[r], id: r }) : null);
    getResourcesForRole = (role) => {
      const resources = pickBy(this.props.resources, r => r.role === role);
      return resources;
    }
    render() {
      const { roles, locations, resources, ...rest } = this.props;
      const staticData = {
        roles,
        resources,
        locations,
        getResource: this.getResource,
        getResourceLocation: this.getResourceLocation,
        getDefaultRateForRole: this.getDefaultRateForRole,
        getLocationDisplayName: this.getLocationDisplayName,
        getRoleDisplayName: this.getRoleDisplayName,
        getResourcesForRole: this.getResourcesForRole,
      };
      return (
        <Wrapped
          {...rest}
          staticData={staticData}
        />
      );
    }
  }
  const mapStateToProps = state => ({
    roles: Selectors.getAllRoles(state),
    resources: Selectors.getAllResources(state),
    locations: Selectors.getAllLocations(state),
  });
  return connect(mapStateToProps)(HocComponent);
};
