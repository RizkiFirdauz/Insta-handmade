import React, { Component } from 'react';

class App extends Component {
    constructor() {
      super();
      this.state = {
        value: 0,
        liked: false
      }
      this.onClick = this.onClick.bind(this);
    }
   
    onClick = () => {
      this.setState({
        value: this.state.value + 1,
        liked: !this.state.liked
      });
    }
    render(){
        const text = this.state.liked ? 'liked' : 'haven\'t liked';
        const label = this.state.liked ? 'Unlike' : 'Like'
      return( 
        <div>
          <button className="btn btn-danger" onClick={this.onClick}>{label}</button> 
          <div>{this.state.value} Likes
          </div>        
        </div>
      );
    }
 }

 export default App;

 