import React, { Component } from 'react';
import '../css/Form.scss';
export class form extends Component {
  state = {
    inputs: [],
    tempInput: {
      inputName: '',
      inputType: '',
      fieldLabel: ''
    },
    tempName: '',
    formName: '',
    fieldLabel: '',
    message: ''
  };
  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(curr => ({
      tempInput: { ...curr.tempInput, [name]: value }
    }));
  };
  onSubmit = e => {
    e.preventDefault();
    const { tempInput } = this.state;
    const empty = { fieldLabel: '', inputName: '', inputType: '' };
    this.setState(curr => ({
      inputs: [...curr.inputs, tempInput],
      tempInput: empty
    }));
  };
  formNameChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  formNameSubmit = e => {
    e.preventDefault();
    const tempName = this.state.tempName;
    this.setState({ formName: tempName });
  };
  sendData = e => {
    e.preventDefault();
    let inputs = this.state.inputs;
    let formName = this.state.formName;
    fetch('/api/inputs', {
      method: 'POST',
      body: JSON.stringify({ inputs, formName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Something went wrong');
        } else {
          return res.json();
        }
      })
      .then(() => this.props.history.push('/'))
      .catch(response => this.setState({ message: 'Something went wrong' }));
  };
  onSelect = ({ target }) => {
    const value = target.value;
    this.setState(curr => ({
      tempInput: { ...curr.tempInput, inputType: value }
    }));
  };
  remove = index => {
    const tempInputs = this.state.inputs.slice();
    tempInputs.splice(index, 1);
    this.setState({ inputs: [...tempInputs] });
  };
  render() {
    const inputs = this.state.inputs.map((input, i) => (
      <div className="output" key={i}>
        <div className="output-box">
          <div className="output-label">
            <label htmlFor={input.inputLabel}>{input.inputName}</label>
          </div>
          <div className="output-input">
            <input
              name={input.inputName}
              type={input.inputType}
              id={input.inputLabel}
              required
            />
            <button className="remove" onClick={() => this.remove(i)}>
              X
            </button>
          </div>
        </div>
      </div>
    ));
    const types = ['text', 'color', 'date', 'email', 'tel', 'number'];

    return (
      <div className="form-generator">
        <div className="form-generator-1">
          <h1>Form Generator</h1>
        </div>

        <div className="form-generator-2">
          <form onSubmit={this.formNameSubmit}>
            <div>
              <label htmlFor="form-name" style={{ margin: '15px' }}>
                Form Name
              </label>
              <input
                id="form-name"
                name="tempName"
                value={this.state.tempName}
                type="text"
                onChange={this.formNameChange}
                required
              />
            </div>
            <div>
              <button>Submit form-name</button>
            </div>
          </form>
        </div>

        <div className="form-generator-3">
          <form onSubmit={this.onSubmit} className="form-container">
            <div>
              <label htmlFor="fieldLabel">field Label</label>
              <input
                name="fieldLabel"
                value={this.state.tempInput.fieldLabel}
                type="text"
                onChange={this.onChange}
                id="fieldLabel"
                required
              />
            </div>

            <div>
              <label htmlFor="inputName">Input Name</label>
              <input
                name="inputName"
                value={this.state.tempInput.inputName}
                type="text"
                onChange={this.onChange}
                id="inputName"
                required
              />
            </div>

            <div>
              <label htmlFor="inputType">Input Type</label>
              <select
                onChange={this.onSelect}
                required
                value={this.state.tempInput.inputType}
              >
                <option value="">Please select a type</option>
                {types.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button>Add field</button>
            </div>
          </form>
        </div>

        <div className="form-generator-4">
          <h1>{this.state.formName}</h1>
          <div>{inputs}</div>
          <div style={{ marginTop: '2rem' }}>
            {this.state.inputs.length !== 0 && this.state.formName !== '' ? (
              <button
                style={{ fontSize: '1.5rem', fontWeight: 'bolder' }}
                onClick={this.sendData}
              >
                Submit the form
              </button>
            ) : null}
          </div>
          <div style={{ fontSize: '3rem', color: 'red' }}>
            {this.state.message}
          </div>
        </div>
        <div>
          <a href="/" type="button">
            Return to form table
          </a>
        </div>
      </div>
    );
  }
}

export default form;
