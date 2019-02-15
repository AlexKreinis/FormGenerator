import React, { Component } from 'react';
import '../css/SubmissionPage.scss';

export class SubmissionPage extends Component {
  state = {
    submitData: []
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`/api/inputData/${id}`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          submitData: response
        });
      });
  }

  render() {
    if (this.state.submitData && this.state.submitData[0]) {
      var table = this.state.submitData.map((data, index) => (
        <tr key={index}>
          {data.values.map((value, index) => (
            <th key={index}>{value}</th>
          ))}
        </tr>
      ));
      var names = this.state.submitData[0].names.map((name, index) => (
        <th key={index}>{name} </th>
      ));
    }

    return (
      <div className="submission-container">
        <div>
          <h1 className="title">All the form's submissions</h1>
        </div>
        {this.state.submitData.length !== 0 ? null : (
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
