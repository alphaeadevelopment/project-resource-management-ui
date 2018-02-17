import mapValues from 'lodash/mapValues';
import values from 'lodash/values';
import findKey from 'lodash/findKey';
import size from 'lodash/size';
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
    $merge: { [role.id]: role },
  },
  roleSelected: {
    $merge: { [role.id]: false },
  },
  roleExpanded: {
    $merge: { [role.id]: false },
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

export const changeAllocationValue = (roleId, allocationId, field, value, staticData, state) => {
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
          [allocationId]: allocationUpdates,
        },
      },
    },
  });
};

export const nextProps = (props, currentState) => ({
  roles: { $set: props.initialRoles || {} },
  roleSelected: { $set: mapValues(props.initialRoles, r => currentState.roleSelected[r.id] || false) },
  roleExpanded: { $set: mapValues(props.initialRoles, r => currentState.roleExpanded[r.id] || false) },
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

export const splitAllocation = (roleId, allocId, newAlloc, month) => {
  const adjAlloc = update(newAlloc, {
    forecast: { $apply: a => zeroTo(month)(a) },
  });
  const filler = zeroFrom(month);
  return ({
    roles: {
      [roleId]: {
        allocations: {
          [allocId]: {
            forecast: {
              $apply: a => filler(a),
            },
            actual: {
              $apply: a => filler(a),
            },
          },
          $merge: {
            [adjAlloc.id]: adjAlloc,
          },
        },
      },
    },
  });
};
export const fillRight = (roleId, allocId, type, month, value) => {
  const filler = doFillRight(month, value);
  return ({
    roles: {
      [roleId]: {
        allocations: {
          [allocId]: {
            [type]: {
              $apply: a => filler(a),
            },
          },
        },
      },
    },
  });
};
export const fillLeft = (roleId, allocId, type, month, value) => {
  const filler = doFillLeft(month, value);
  return ({
    roles: {
      [roleId]: {
        allocations: {
          [allocId]: {
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

export const duplicateAllocation = resource => ({
  id: { $set: uuid() },
  resource: { $set: resource },
});

export const addAllocation = (roleId, alloc) => {
  return ({
    roles: {
      [roleId]: {
        allocations: {
          $merge: {
            [alloc.id]: alloc,
          },
        },
      },
    },
  });
};

export const nextCell = (state) => {
  const { activeMonth, activeAllocation, activeRole } = state;
  let toBeRole = activeRole;
  let toBeAllocation = activeAllocation;
  let toBeMonth = activeMonth + 1;
  if (activeMonth === 11) {
    const roleExpanded = state.roleExpanded[activeRole];
    const { allocations } = state.roles[activeRole];
    const numAllocations = size(allocations);
    const allocationIndex = Number(findKey(values(allocations), a => a.id === activeAllocation));
    const activeRoleIndex = Number(findKey(values(state.roles), r => r.id === activeRole));
    toBeMonth = 0;
    if (roleExpanded && numAllocations > 0 && (activeAllocation === null || allocationIndex < numAllocations - 1)) {
      if (activeAllocation === null) {
        toBeAllocation = values(allocations)[0].id;
      }
      else {
        toBeAllocation = values(allocations)[allocationIndex + 1].id;
      }
    }
    else if (size(state.roles) > activeRoleIndex + 1) {
      toBeRole = values(state.roles)[activeRoleIndex + 1].id;
      toBeAllocation = null;
    }
    else {
      toBeRole = values(state.roles)[0].id;
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
  const { activeMonth, activeAllocation, activeRole } = state;
  let toBeRole = activeRole;
  let toBeAllocation = activeAllocation;
  let toBeMonth = activeMonth - 1;
  const activeRoleIndex = Number(findKey(values(state.roles), r => r.id === activeRole));
  if (activeMonth === 0) {
    toBeMonth = 11;
    if (activeAllocation !== null) {
      const { allocations } = state.roles[activeRole];
      const allocationIndex = Number(findKey(values(allocations), a => a.id === activeAllocation));
      toBeAllocation = (allocationIndex > 0) ? values(allocations)[allocationIndex - 1].id : null;
    }
    else if (activeRoleIndex > 0) {
      toBeRole = values(state.roles)[activeRoleIndex - 1].id;
      const previousExpanded = state.roleExpanded[toBeRole];
      const previousAllocations = state.roles[toBeRole].allocations;
      const numPreviousAllocations = size(previousAllocations);
      if (previousExpanded && numPreviousAllocations > 0) {
        toBeAllocation = values(previousAllocations)[numPreviousAllocations - 1].id;
      }
    }
  }
  return ({
    activeMonth: { $set: toBeMonth },
    activeRole: { $set: toBeRole },
    activeAllocation: { $set: toBeAllocation },
  });
};

export const nextRow = (state) => {
  const { activeAllocation, activeRole } = state;
  let toBeRole = activeRole;
  let toBeAllocation = activeAllocation;
  const roleExpanded = state.roleExpanded[activeRole];
  const { allocations } = state.roles[activeRole];
  const numAllocations = size(allocations);
  const activeAllocationIndex = Number(findKey(values(allocations), i => i.id === activeAllocation));
  const activeRoleIndex = Number(findKey(values(state.roles), i => i.id === activeRole));
  // next allocation
  if (roleExpanded && numAllocations > 0 && (activeAllocation === null || activeAllocationIndex < numAllocations - 1)) {
    if (activeAllocation === null) {
      toBeAllocation = values(allocations)[0].id;
    }
    else {
      toBeAllocation = values(allocations)[activeAllocationIndex + 1].id;
    }
  }
  // next role
  else if (size(state.roles) > activeRoleIndex + 1) {
    toBeRole = values(state.roles)[activeRoleIndex + 1].id;
    toBeAllocation = null;
  }
  // wrap around
  else {
    toBeRole = values(state.roles)[0].id;
    toBeAllocation = null;
  }
  return ({
    activeRole: { $set: toBeRole },
    activeAllocation: { $set: toBeAllocation },
  });
};

export const previousRow = (state) => {
  const { activeAllocation, activeRole } = state;
  let toBeRole = activeRole;
  let toBeAllocation = activeAllocation;

  const activeRoleIndex = Number(findKey(values(state.roles), r => r.id === activeRole));
  // previous allocation
  if (activeAllocation !== null) {
    const allocations = values(state.roles[activeRole].allocations);
    const activeAllocationIndex = Number(findKey(allocations, a => a.id === activeAllocation));
    toBeAllocation = (activeAllocationIndex > 0) ? allocations[activeAllocationIndex - 1].id : null;
  }
  // previous role
  else if (activeRoleIndex > 0) {
    toBeRole = values(state.roles)[activeRoleIndex - 1].id;
    const previousExpanded = state.roleExpanded[toBeRole];
    const previousAllocations = state.roles[toBeRole].allocations;
    const numPreviousAllocations = size(previousAllocations);
    if (previousExpanded && numPreviousAllocations > 0) {
      toBeAllocation = values(previousAllocations)[numPreviousAllocations - 1].id;
    }
  }
  // wrap around
  else {
    toBeRole = values(state.roles)[size(state.roles) - 1].id;
    const targetRoleExpanded = state.roleExpanded[toBeRole];
    const { allocations } = state.roles[toBeRole];
    const numAllocations = size(allocations);
    toBeAllocation = (!targetRoleExpanded || numAllocations === 0) ? null : values(allocations)[numAllocations - 1].id;
  }
  return ({
    activeRole: { $set: toBeRole },
    activeAllocation: { $set: toBeAllocation },
  });
};
