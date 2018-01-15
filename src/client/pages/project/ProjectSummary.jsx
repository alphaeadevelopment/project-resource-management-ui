import React from 'react';
import { connect } from 'react-redux';
import { getProjects } from '../../selectors';

class ProjectSummary extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      project: props.projects.find(p => p.id === Number(props.match.params.id)),
    };
  }
  render() {
    const { project } = this.state;
    return (
      <div>
        <h1>{project.name}</h1>
        <h2>Budgets</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: getProjects(state),
});

const dispatchToActions = () => ({
});

export default connect(mapStateToProps, dispatchToActions)(ProjectSummary);
