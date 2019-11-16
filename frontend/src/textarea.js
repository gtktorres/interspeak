import React, { Component } from 'react';
import './textarea.css';

export class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange =
        this.handleChange.bind(this);

        this.handleSubmit = 
        this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value:
        event.target.value});
    }
    
    handleSubmit(event) {
        this.setState({text: event});
        console.log(event);
    }
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              <textarea className="textarea" type="submit" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input className="send" type="submit" />
          </form>
        );
    }
}

