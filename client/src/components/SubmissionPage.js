import React, { Component } from 'react';
import Spinner from './Spinner';
import { fetchFromDatabase } from './utilities/Utilities';
import '../css/SubmissionPage.scss';

export class SubmissionPage extends Component {
  state = {
    submitData: [],
    loading: true
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    const fetchDataByIDaddress = `/api/inputData/${id}`;
    fetchFromDatabase(fetchDataByIDaddress).then(response => {
      this.setState({
        submitData: response,
        loading: false
      });
    });
  }
  stateNotEmpty = () => {
    if (this.state.submitData && this.state.submitData[0]) return true;
    else return false;
  };
  renderTable = () => {
    return this.state.submitData.map(data => (
      <tr key={data._id}>
        {data.values.map(value => (
          <th key={value._id}>{value}</th>
        ))}
      </tr>
    ));
  };
  renderNameTags = () => {
    return this.state.submitData[0].names.map(name => (
      <th key={name._id}>{name} </th>
    ));
  };
  submitDataIsNull = () => {
    if (this.state.submitData.length !== 0) return true;
    else return false;
  };
  render() {
    const { loading } = this.state;
    if (loading) {
      return <Spinner />;
    }

    if (this.stateNotEmpty()) {
      var table = this.renderTable();
      var names = this.renderNameTags();
    }

    return (
      <div className="submission-container">
        <div>
          <h1 className="title">All the form's submissions</h1>
        </div>
        {this.submitDataIsNull() ? null : (
          <div style={{ fontSize: '2.5rem' }}> You have no submits yet </div>
        )}
        <table>
          <tbody>
            <tr style={{ background: '#E0E0E0' }}>{names}</tr>
          </tbody>
          <tbody>{table}</tbody>
        </table>
        <div>
          <a className="button" href="/" type="button">
            Return
          </a>
        </div>
      </div>
    );
  }
}

export default SubmissionPage;
