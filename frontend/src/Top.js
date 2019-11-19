import React from 'react';
import { Bottom } from './Bottom';


export class Top extends React.Component {

    constructor(props) {
        super(props)
        this.state = ({
            messages : []
        });
    }

    onReceive(props) {
        this.setState = ({
            messages : this.messages + this.props.onReceive
        });
    }
    render() {
        return(
            <div className="Top">
               <output>{this.props.messages}
               </output> 
            </div>
        );
    }
}