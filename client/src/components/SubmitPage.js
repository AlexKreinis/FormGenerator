import React, { Component } from 'react';
import '../css/SubmitPage.scss';
export class SubmitPage extends Component {
  state = {
    formName: '',
    inputs: [],
    inputData: {
      names: [],
      values: []
    },
    formID: '',
    loading: true,
    message: ''
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ formID: id });
    fetch(`/api/inputs/${id}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Something went wrong');
        } else {
          return res.json();
        }
      })
      .then(response => {
        this.setState(curr => ({
          formName: response.formName,
          inputs: [...curr.inputs, ...response.inputs],
          loading: false
        }));
      })
      .catch(err => this.setState({ message: 'something went wrong' }));
  }
  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const [key, index] = name.split('-');

    this.setState(prevState => ({
      ...prevState,
      inputData: {
        values: Object.assign(
          [],
          { ...prevState.inputData.values },
          { [index]: value }
        ),
        names: Object.assign(
          [],
          { ...prevState.inputData.names },
          { [index]: key }
        )
      }
    }));
  };
  onSubmit = e => {
    e.preventDefault();
    const { formName, formID } = this.state;
    const { names, values } = this.state.inputData;
    fetch('/api/inputData', {
      method: 'POST',
      body: JSON.stringify({ formName, formID, names, values }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .then(() => {
        const id = this.props.match.params.id;
        fetch(`/api/inputs/submissionUpdate/${id}`, {
          method: 'POST',
          body: JSON.stringify({ true: 1 }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(() => {
            this.props.history.push('/');
          })
          .catch(error => console.log('Error', error));
      })
      .catch(error => console.error('Error:', error));
  };

  render() {
    const form = this.state.inputs.map((input, i) => {
      if (input) {
        return (
          <div key={i}>
            <div>
              <label htmlFor={input.inputLabel}>{input.inputName}</label>
            </div>
            <div className="form-input">
              <input
                name={`${input.inputName}-${i}`}
                type={input.inputType}
                id={input.inputLabel}
                onChange={this.onChange}
                required
              />
            </div>
          </div>
        );
      }
      return null;
    });
    const { loading } = this.state;
    if (loading) {
      return (
        <div className="submitPage-container">
          <div className="load" />
        </div>
      );
    }
    return (
      <div className="submitPage-container">
        <div className="submitPage-container-1">
          <h1 className="title">Submit page</h1>
        </div>
        <div className="submitPage-container-2">
          <div className="formName">
            <h1>{this.state.formName}</h1>
          </div>
          <div>
            <form onSubmit={this.onSubmit}>
              {form}
              <div className="btn">
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div>{this.state.message}</div>
        <div>
          <a className="button" href="/" type="button">
            Return
          </a>
        </div>
      </div>
    );
  }
}

export default SubmitPage;
