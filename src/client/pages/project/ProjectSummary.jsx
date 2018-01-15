import React from 'react';
import { connect } from 'react-redux';
import { getProjects } from '../../selectors';
import { setCurrentProject } from '../../actions';
import Page from '../../containers/Page';

class ProjectSummary extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      project: props.projects.find(p => p.id === Number(props.match.params.id)),
    };
  }
  componentDidMount() {
    this.props.setProject(this.state.project.id);
  }
  render() {
    const { project } = this.state;
    return (
      <Page id={'project-summary'}>
        <h1>{project.name}</h1>
        <h2>Budgets</h2>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  projects: getProjects(state),
});

const dispatchToActions = dispatch => ({
  setProject: id => dispatch(setCurrentProject(id)),
});

export default connect(mapStateToProps, dispatchToActions)(ProjectSummary);
