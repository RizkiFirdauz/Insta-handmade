import React, { Component } from 'react';
import './../style/Footer.css';
import Zoom  from 'react-reveal/Zoom';

class Footer extends Component {
    render() {
        return (
            <div className="Footer">
              <Zoom right cascade>
                <h4>Jaring Nelayan Banten - Copyright &copy;2018</h4>
              </Zoom>
            </div>
        );
    }
}
export default Footer ;