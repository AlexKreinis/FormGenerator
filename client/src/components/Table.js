import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchFromDatabase } from './utilities/Utilities';
import { deleteFromDatabase } from './utilities/Utilities';
import Spinner from './Spinner';
import '../css/Table.scss';

export class Table extends Component {
  state = {
    forms: [],
    loading: true
  };
  componentDidMount() {
    const inputFetchAdress = '/api/inputs';
    fetchFromDatabase(inputFetchAdress).then(response => {
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
    const deleteInputsbyIDAddress = `/api/inputs/${id}`;
    const deleteInputDatabyIDaddress = `/api/inputData/${id}`;
    deleteFromDatabase(deleteInputsbyIDAddress)
      .then(() => {
        deleteFromDatabase(deleteInputDatabyIDaddress);
      })
      .then(() => {
        const { forms } = this.state;
        const filteredForms = forms.filter(form => form._id !== id);
        this.setState({ forms: [...filteredForms] });
      });
  };
  renderFormTable = () => {
    return this.state.forms.map((form, index) => {
      if (form) {
        return (
          <tr key={form._id}>
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
  };
  ifEmptyForms = () => {
    if (this.state.forms.length === 0) return true;
    else return false;
  };

  render() {
    const formTable = this.renderFormTable();
    const { loading } = this.state;
    if (loading) {
      return <Spinner />;
    }

    return (
      <div className="Table-container">
        <div className="Table-container-Title">
          <h1>Form Builder Generator</h1>
        </div>
        <div className="Table-container-Table">
          <table>
            <tbody>
              {this.ifEmptyForms() ? null : (
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
