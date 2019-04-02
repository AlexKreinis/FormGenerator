import React, { Component } from 'react';
import '../css/SubmitPage.scss';
import { sendToDatabase } from './utilities/Utilities';
import { fetchFromDatabase } from './utilities/Utilities';
import Spinner from './Spinner';

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
    const fetchInputsbyIdAddress = `/api/inputs/${id}`;
    this.setState({ formID: id });
    fetchFromDatabase(fetchInputsbyIdAddress)
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
    const data = { formName, formID, names, values };
    const id = this.props.match.params.id;
    const inc = { true: 1 };
    const inputDataAddrress = '/api/inputData';
    const inputDataIncAddress = `/api/inputs/submissionUpdate/${id}`;

    sendToDatabase(inputDataAddrress, data)
      .then(() => {
        sendToDatabase(inputDataIncAddress, inc).then(() => {
          this.props.history.push('/');
        });
      })
      .catch(error => console.log(error));
  };

  makeForm = () => {
    return this.state.inputs.map((input, i) => {
      if (input) {
        return (
          <div key={input._id}>
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
      } else return null;
    });
  };

  render() {
    const form = this.makeForm();
    const { loading } = this.state;
    if (loading) {
      return <Spinner />;
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
