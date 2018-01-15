import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Page from '../../containers/Page';
import { loadProjects } from '../../actions';
import { getProjects } from '../../selectors';

class RawProjectList extends React.Component {
  componentDidMount() {
    this.props.loadProjects();
  }
  render() {
    const { projects } = this.props;
    return (
      <Page id={'project-list'}>
        <ul>
          {Object.values(projects).map(p => (
            <Link to={`/projects/id/${p.id}`} key={p.name}>{p.name}</Link>
          ))}
        </ul>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  projects: getProjects(state),
});

const dispatchToActions = dispatch => ({
  loadProjects: () => dispatch(loadProjects()),
});

export default connect(mapStateToProps, dispatchToActions)(RawProjectList);
