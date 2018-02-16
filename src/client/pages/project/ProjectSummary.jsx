import React from 'react';
import { connect } from 'react-redux';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import { Page, RemoteData } from '../../containers';
import { BudgetList } from '../budget';
import { Title } from '../../components';

class ProjectSummary extends React.Component {
  componentDidMount() {
    this.props.setProject(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    const { loadProjectBudgets, match, setProject } = this.props;
    const { params } = match;
    if (params.id !== nextProps.match.params.id) {
      setProject(nextProps.match.params.id);
    }
    else if (nextProps.currentProjectId && nextProps.project && !nextProps.project.budgets) {
      loadProjectBudgets(nextProps.currentProjectId);
    }
  }
  render() {
    const { project, currentProjectId, loadProjectBudgets } = this.props;
    if (!project) return null;
    return (
      <Page id={'project-summary'}>
        <Title>{project.name}</Title>
        <RemoteData onRefresh={() => loadProjectBudgets(currentProjectId)}>
          <BudgetList projectId={project.id} budgets={project.budgets || []} />
        </RemoteData>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  project: Selectors.getCurrentProject(state),
  currentProjectId: Selectors.getCurrentProjectId(state),
});

const dispatchToActions = dispatch => ({
  setProject: id => dispatch(Actions.setCurrentProject(id)),
  loadProjectBudgets: id => dispatch(Actions.loadProjectBudgets(id)),
});

export default connect(mapStateToProps, dispatchToActions)(ProjectSummary);
