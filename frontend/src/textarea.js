import React, { Component } from 'react';
import './textarea.css';

export class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleKeyPress =
        this.handleKeyPress.bind(this);

        this.handleSubmit =
        this.handleSubmit.bind(this);
    }

    handleKeyPress(event) {
        //this.setState({value: event.target.value});
        event.preventDefault();
        const data = {
          //id: this.refs.id.value,
          username: this.refs.username.value,
          //email: this.refs.email.value,
          //native_language: this.refs.native_language.value
        };
        var request = new Request('http://localhost:3000/api/new-username', {
          method: 'POST',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify(data)
        });

        fetch(request)
          .then(function(response){
            response.json()
              .then(function(data){
                console.log(data);
              })
          })
          .catch(function(err){
            console.log(err);
          })
        if(event.key === 'Enter'){
          console.log('PRESSED');
        }

    }

    handleSubmit(event) {
        this.setState({text: event});
        console.log(event);
    }
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              <textarea className="textarea" ref="username" type="submit" value={this.state.value} onKeyPress={this.handleKeyPress} />
            </label>

          </form>
        );
    }
}
