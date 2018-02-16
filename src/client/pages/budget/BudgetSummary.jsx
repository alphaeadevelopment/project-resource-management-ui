import React from 'react';
import { connect } from 'react-redux';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import { Page, RemoteData } from '../../containers';
import BudgetRoleList from './BudgetRoleList';
import * as Paths from '../../paths';

class BudgetSummary extends React.Component {
  componentDidMount() {
    this.props.setCurrentBudget(this.props.match.params.budgetId);
    this.props.setCurrentProject(this.props.match.params.projectId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentBudgetId && !nextProps.budget && nextProps.currentProjectId) {
      this.loadBudget(nextProps.currentProjectId, nextProps.currentBudgetId);
    }
  }
  loadBudget = (projectId, budgetId) => {
    const { loadBudget } = this.props;
    loadBudget(projectId || this.props.currentProjectId, budgetId || this.props.currentBudgetId);
  }
  render() {
    const { budget, onStartEditBudget, editingBudget, onCancelEditBudget, onSaveBudget } = this.props;
    const theBudget = editingBudget || budget;
    if (!theBudget) return null;
    return (
      <Page id={'project-summary'} title={budget.name} backTo={Paths.projectSummary(budget.projectId)}>
        <RemoteData onRefresh={this.loadBudget}>
          <BudgetRoleList
            initialRoles={theBudget.roles}
            editing={Boolean(editingBudget)}
            onStartEdit={() => onStartEditBudget(budget)}
            onCancelEdit={() => onCancelEditBudget()}
            onSave={roles => onSaveBudget(Object.assign({}, budget, { roles }))}
          />
        </RemoteData>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  budget: Selectors.getCurrentBudget(state),
  currentBudgetId: Selectors.getCurrentBudgetId(state),
  currentProjectId: Selectors.getCurrentProjectId(state),
  editingBudget: Selectors.getEditingBudget(state),
});

const dispatchToActions = dispatch => ({
  setCurrentBudget: id => dispatch(Actions.setCurrentBudget(id)),
  setCurrentProject: id => dispatch(Actions.setCurrentProject(id)),
  loadBudget: (projectId, budgetId) => dispatch(Actions.loadBudget(projectId, budgetId)),
  onStartEditBudget: budget => dispatch(Actions.onStartEditBudget(budget)),
  onCancelEditBudget: () => dispatch(Actions.onCancelEditBudget()),
  onSaveBudget: budget => dispatch(Actions.onSaveBudget(budget)),
});
export default connect(mapStateToProps, dispatchToActions)(BudgetSummary);
