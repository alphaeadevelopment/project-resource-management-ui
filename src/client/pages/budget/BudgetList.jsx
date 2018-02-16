import React from 'react';
import { withRouter } from 'react-router-dom';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as Paths from '../../paths';

// const form = [
//   'name',
//   'email',
//   {
//     'key': 'comment',
//     'type': 'textarea',
//     'placeholder': 'Make a comment',
//   },
// ];
// const schema = {
//   'type': 'object',
//   'title': 'Comment',
//   'properties': {
//     'name': {
//       'title': 'Name',
//       'type': 'string',
//       'default': 'Steve',
//     },
//     'email': {
//       'title': 'Email',
//       'type': 'string',
//       'pattern': '^\\S+@\\S+$',
//       'validationMessage': 'Email must be of proper format: example@example',
//       'description': 'Email will be used for evil.',
//     },
//     'comment': {
//       'title': 'Comment',
//       'type': 'string',
//       'maxLength': 20,
//       'validationMessage': "Don't be greedy! 20 Characters max please :)",
//       'description': 'Please write your comment here.',
//     },
//   },
//   'required': [
//     'name',
//     'email',
//     'comment',
//   ],
// };

// const AddBudgetForm = ({ onChange, formData }) => (
//   <SchemaForm
//     schema={schema}
//     form={form}
//     model={formData}
//     onModelChange={onChange}
//   />
// );


class RawBudgetList extends React.Component {
  state = {
    showAddForm: false,
    formData: {},
  }
  onShowAddForm = () => {
    this.setState({ showAddForm: true });
  }
  onChange = ({ formData }) => {
    this.setState({ formData });
  }
  onSubmit = ({ formData }) => {
    const { onAddBudget, projectId } = this.props;
    onAddBudget({ ...formData, projectId });
    this.onHideAddForm();
  }
  onHideAddForm = () => {
    this.setState({ showAddForm: false });
  }
  render() {
    const { budgets, projectId, history } = this.props;
    const { showAddForm, formData } = this.state;
    console.log(formData);
    return (
      <div>
        <List>
          {budgets.map((b) => {
            const budgetSelected = () => history.push(Paths.budgetSummary(projectId, b.id));
            return (
              <ListItem button key={b.id} onClick={budgetSelected}>
                <ListItemText primary={b.name} />
              </ListItem>
            );
          })}
        </List>
        {!showAddForm && <button onClick={this.onShowAddForm}>Add</button>}
      </div>
    );
  }
}
// {showAddForm && <AddBudgetForm onSubmit={this.onSubmit} onChange={this.onChange} formData={formData} />}

const mapStateToProps = state => ({
  currentProject: Selectors.getCurrentProject(state),
});

const dispatchToActions = dispatch => ({
  onAddBudget: b => dispatch(Actions.addBudget(b)),
});

export default withRouter(connect(mapStateToProps, dispatchToActions)(RawBudgetList));
