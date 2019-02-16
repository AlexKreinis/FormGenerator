import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Table.scss';

export class Table extends Component {
  state = {
    forms: [],
    loading: true
  };
  componentDidMount() {
    fetch('/api/inputs')
      .then(response => response.json())
      .then(response => {
        const forms = response.map(form => ({
          formName: form.formName,
          _id: form._id,
          submits: form.submits
        }));

        this.setState(curr => ({
          forms: [...curr.forms, ...forms],
          loading: false
        }));
      });
  }
  delete = id => {
    fetch(`/api/inputs/${id}`, {
      method: 'delete'
    })
      .then(() => {
        fetch(`/api/inputData/${id}`, {
          method: 'delete'
        });
      })
      .then(() => {
        const { forms } = this.state;
        const filteredForms = forms.filter(form => form._id !== id);
        this.setState({ forms: [...filteredForms] });
      });
  };
  render() {
    const formTable = this.state.forms.map((form, index) => {
      if (form) {
        return (
          <tr key={index}>
            <th>{index + 1}</th>
            <th>{form.formName}</th>
            <th>{form.submits}</th>
            <th>
              <Link to={`/SubmitPage/${form._id}`}>View</Link>
            </th>
            <th>
              <Link to={`/SubmissionPage/${form._id}`}>View</Link>
            </th>
            <th>
              <button className="remove" onClick={() => this.delete(form._id)}>
                X
              </button>
            </th>
          </tr>
        );
      }
      return null;
    });
    const { loading } = this.state;
    if (loading) {
      return (
        <div className="Table-container">
          <div className="load" />
        </div>
      );
    }
    return (
      <div className="Table-container">
        <div className="Table-container-Title">
          <h1>Form Builder Generator</h1>
        </div>
        <div className="Table-container-Table">
          <table>
            <tbody>
              {this.state.forms.length === 0 ? null : (
                <tr style={{ background: '#E0E0E0' }}>
                  <th>Form ID</th>
                  <th>Form Name</th>
                  <th>Submissions</th>
                  <th>Submit Page</th>
                  <th>Submission Page</th>
                  <th>Remove</th>
                </tr>
              )}
              {formTable}
            </tbody>
          </table>
        </div>
        <div>
          <a className="button" href="/form" type="button">
            Create a form
          </a>
        </div>
      </div>
    );
  }
}

export default Table;
