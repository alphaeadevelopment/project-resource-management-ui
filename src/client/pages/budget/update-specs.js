import mapValues from 'lodash/mapValues';
import values from 'lodash/values';
import update from 'immutability-helper';
import uuid from 'uuid';

export const changeMonthAllocation = (roleId, allocationIdx, type, month, value) => ({
  roles: {
    [roleId]: {
      allocations: {
        [allocationIdx]: {
          [type]: {
            [month]: { $set: value },
          },
        },
      },
    },
  },
});

export const addRole = role => ({
  roles: {
    $push: [role],
  },
  roleSelected: {
    $push: [false],
  },
  roleExpanded: {
    $push: [false],
  },
});

export const changeRoleValue = (roleId, field, value, staticData, state) => {
  const roleUpdater = {
    [field]: { $set: value },
  };
  if (field === 'location') {
    roleUpdater.rate = {
      $set: staticData.getDefaultRateForRole(state.roles[roleId].role)(value),
    };
  }
  else if (field === 'role') {
    roleUpdater.rate = {
      $set: staticData.getDefaultRateForRole(value)(state.roles[roleId].location),
    };
  }
  return ({
    roles: {
      [roleId]: roleUpdater,
    },
  });
};

export const changeAllocationValue = (roleId, allocationIdx, field, value, staticData, state) => {
  const allocationUpdates = {
    [field]: { $set: value },
  };
  if (field === 'resource') {
    const role = state.roles[roleId];
    const resource = staticData.getResource(value);
    const resourceRate = resource.rate;
    const location = resource.location || role.location;
    const defaultRate = staticData.getDefaultRateForRole(role.role)(location);
    allocationUpdates.rate = { $set: resourceRate || defaultRate };
    allocationUpdates.location = { $set: location };
  }
  return ({
    roles: {
      [roleId]: {
        allocations: {
          [allocationIdx]: allocationUpdates,
        },
      },
    },
  });
};

export const nextProps = (props, currentState) => ({
  roles: { $set: values(props.initialRoles || {}) },
  roleSelected: { $set: values(props.initialRoles).map((r, idx) => currentState.roleSelected[idx] || false) },
  roleExpanded: { $set: values(props.initialRoles).map((r, idx) => currentState.roleExpanded[idx] || false) },
});

export const changeRoleMonthBudget = (roleId, month, value) => ({
  roles: {
    [roleId]: {
      budget: {
        [month]: { $set: value },
      },
    },
  },
});

export const toggleSelected = idx => ({
  roleSelected: {
    [idx]: { $apply: v => !v },
  },
});

export const setRoleExpanded = (idx, expanded, activeRole) => ({
  roleExpanded: {
    [idx]: { $set: expanded },
  },
  activeAllocation: {
    $apply: v => ((activeRole === idx && !expanded) ? null : v),
  },
});

export const toggleAllSelected = on => ({
  roleSelected: mapValues(values(this.state.roles), () => ({ $set: on })),
});

const zeroFrom = month => allocations => allocations.map((a, idx) => (idx >= month ? 0 : a));
const zeroTo = month => allocations => allocations.map((a, idx) => (idx < month ? 0 : a));
const doFillRight = (month, value) => arr => arr.map((a, idx) => (idx > month ? value : a));
const doFillLeft = (month, value) => arr => arr.map((a, idx) => (idx < month ? value : a));

export const splitAllocation = (roleId, allocIdx, newAlloc, month) => {
  const adjAlloc = update(newAlloc, {
    forecast: { $apply: a => zeroTo(month)(a) },
  });
  const filler = zeroFrom(month);
  return ({
    roles: {
      [roleId]: {
        allocations: {
          [allocIdx]: {
            forecast: {
              $apply: a => filler(a),
            },
            actual: {
              $apply: a => filler(a),
            },
          },
          $push: [adjAlloc],
        },
      },
    },
  });
};
export const fillRight = (roleId, allocIdx, type, month, value) => {
  const filler = doFillRight(month, value);
  return ({
    roles: {
      [roleId]: {
        allocations: {
          [allocIdx]: {
            [type]: {
              $apply: a => filler(a),
            },
          },
        },
      },
    },
  });
};
export const fillLeft = (roleId, allocIdx, type, month, value) => {
  const filler = doFillLeft(month, value);
  return ({
    roles: {
      [roleId]: {
        allocations: {
          [allocIdx]: {
            [type]: {
              $apply: a => filler(a),
            },
          },
        },
      },
    },
  });
};
export const fillRoleRight = (roleId, month, value) => {
  const filler = doFillRight(month, value);
  return ({
    roles: {
      [roleId]: {
        budget: {
          $apply: a => filler(a),
        },
      },
    },
  });
};
export const fillRoleLeft = (roleId, month, value) => {
  const filler = doFillLeft(month, value);
  return ({
    roles: {
      [roleId]: {
        budget: {
          $apply: a => filler(a),
        },
      },
    },
  });
};

export const duplicateAllocation = name => ({
  id: { $set: uuid() },
  resource: { name: { $set: name } },
});

export const addAllocation = (roleIdx, alloc) => {
  return ({
    roles: {
      [roleIdx]: {
        allocations: {
          $push: [alloc],
        },
      },
    },
  });
};

export const nextCell = (state) => {
  console.log('next cell');
  const { activeMonth, activeAllocation, activeRole } = state;
  let toBeRole = activeRole;
  let toBeAllocation = activeAllocation;
  let toBeMonth = activeMonth + 1;
  if (activeMonth === 11) {
    const roleExpanded = state.roleExpanded[activeRole];
    const allocations = state.roles[activeRole].allocations.length;
    toBeMonth = 0;
    if (roleExpanded && allocations > 0 && (activeAllocation === null || activeAllocation < allocations - 1)) {
      if (activeAllocation === null) {
        toBeAllocation = 0;
      }
      else {
        toBeAllocation = activeAllocation + 1;
      }
    }
    else if (state.roles.length > activeRole + 1) {
      toBeRole = activeRole + 1;
      toBeAllocation = null;
    }
    else {
      toBeRole = 0;
      toBeAllocation = null;
    }
  }
  return ({
    activeMonth: { $set: toBeMonth },
    activeRole: { $set: toBeRole },
    activeAllocation: { $set: toBeAllocation },
  });
};

export const previousCell = (state) => {
  console.log('previous cell');
  const { activeMonth, activeAllocation, activeRole } = state;
  let toBeRole = activeRole;
  let toBeAllocation = activeAllocation;

  if (activeMonth === 0) {
    if (activeAllocation !== null) {
      toBeAllocation = (activeAllocation > 0) ? activeAllocation - 1 : null;
    }
    else if (activeRole > 0) {
      toBeRole = activeRole - 1;
      const previousExpanded = state.roleExpanded[activeRole - 1];
      const previousAllocations = state.roles[activeRole - 1].allocations.length;
      if (previousExpanded && previousAllocations > 0) {
        toBeAllocation = previousAllocations - 1;
      }
    }
  }
  const toBeMonth = (activeMonth === 0 ? 11 : activeMonth - 1);
  return ({
    activeMonth: { $set: toBeMonth },
    activeRole: { $set: toBeRole },
    activeAllocation: { $set: toBeAllocation },
  });
};

export const nextRow = (state) => {
  console.log('next row');
  const { activeAllocation, activeRole } = state;
  let toBeRole = activeRole;
  let toBeAllocation = activeAllocation;
  const roleExpanded = state.roleExpanded[activeRole];
  const allocations = state.roles[activeRole].allocations.length;
  // next allocation
  if (roleExpanded && allocations > 0 && (activeAllocation === null || activeAllocation < allocations - 1)) {
    if (activeAllocation === null) {
      toBeAllocation = 0;
    }
    else {
      toBeAllocation = activeAllocation + 1;
    }
  }
  // next role
  else if (state.roles.length > activeRole + 1) {
    toBeRole = activeRole + 1;
    toBeAllocation = null;
  }
  // wrap around
  else {
    toBeRole = 0;
    toBeAllocation = null;
  }
  return ({
    activeRole: { $set: toBeRole },
    activeAllocation: { $set: toBeAllocation },
  });
};

export const previousRow = (state) => {
  console.log('previous row');
  const { activeAllocation, activeRole } = state;
  let toBeRole = activeRole;
  let toBeAllocation = activeAllocation;

  // previous allocation
  if (activeAllocation !== null) {
    toBeAllocation = (activeAllocation > 0) ? activeAllocation - 1 : null;
  }
  // previous role
  else if (activeRole > 0) {
    toBeRole = activeRole - 1;
    const previousExpanded = state.roleExpanded[activeRole - 1];
    const previousAllocations = state.roles[activeRole - 1].allocations.length;
    if (previousExpanded && previousAllocations > 0) {
      toBeAllocation = previousAllocations - 1;
    }
  }
  // wrap around
  else {
    toBeRole = state.roles.length - 1;
    const targetRoleExpanded = state.roleExpanded[toBeRole];
    const numAllocations = state.roles[toBeRole].allocations.length;
    toBeAllocation = (!targetRoleExpanded || numAllocations === 0) ? null : numAllocations - 1;
  }
  return ({
    activeRole: { $set: toBeRole },
    activeAllocation: { $set: toBeAllocation },
  });
};
