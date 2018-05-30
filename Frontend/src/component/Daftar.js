import React, { Component } from 'react';
import './../style/Daftar.css';
import Zoom     from 'react-reveal/Zoom';
import {Link}   from 'react-router-dom';
import swal     from 'sweetalert';

class Daftar extends Component {
  constructor(props){
    super(props);
    this.state= {username :'', 
                 password :'', 
                 nama     :'', 
                 email    :'',
                 imageURL :'',
                };
    this.register = this.register.bind(this);
  }

  input(){
    this.setState({
      username : this.refs.username.value,
      password : this.refs.password.value,
      nama     : this.refs.nama.value,
      email    : this.refs.email.value,
    });
  }

  register(x) {
    x.preventDefault();

    const data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    data.append('nama'    , this.state.nama);
    data.append('email'   , this.state.email);
    data.append('file'    , this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:1000/data', {
        method: 'POST',
        body  : data,
    }).then((response) => {
        response.json().then((body) => {
            this.setState({ imageURL: `http://localhost:1000/${body.file}` });
            console.log(this.state.imageURL)  
            window.location.reload()
        });
    });
    swal({
      title : "Done",
      text  : "Your data has been REGISTERED!",
      icon  : "success"
    })
  }

  render() {
    return (
      <div className="daftar">
        <center>
        <div className="jarak" style={{paddingTop:40}}>
        <Zoom top>
        <div className="box2">
          <Link to ="/Login" className="up">
              <i className="fas fa-chevron-circle-left" style={{fontSize:30,paddingLeft:"85%",color:"white"}} title="Back to Login"></i>
            </Link>
          <p style={{color:"white",fontSize:30,fontFamily:"Kaushan Script"}}><b>REGISTER</b></p>
            <form onSubmit={this.register}>
              <input className="Input" style={{marginBottom:10}} ref="username" type="text"     placeholder="Username" 
                onInput={()=>{this.input();}} required /><br/>
              <input className="Input" style={{marginBottom:10}} ref="password" type="password" placeholder="Password" 
                onInput={()=>{this.input();}} required /><br/>
              <input className="Input" style={{marginBottom:10}} ref="nama"    type="text"      placeholder="Name " 
                onInput={()=>{this.input();}} required /><br/>
              <input className="Input" style={{marginBottom:10}} ref="email"   type="email"     placeholder="Email" 
                onInput={()=>{this.input();}} required /><br/>
              <p><a data-toggle="collapse" href="#file" role="button" aria-expanded="false" aria-controls="collapseExample" 
                    style={{color:"green"}}>Choose Photo Profile</a></p>
              <div className="collapse" id="file">
                <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                <input className="Input" style={{fontFamily:"Dosis",marginTop:5,marginBottom:10}}
                  ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Change name of Photo" />
              </div>
              <button className="btn btn-danger" style={{width:100,textAlign:"center",fontFamily:"Dosis",marginTop:0}}>
                <b>Register</b>
              </button>
            </form>
            <p className="quotes">"Knowledge is nothing, applying what you know is everything."</p>
        </div>
        </Zoom>
        </div>
        </center>
      </div>
    );
  }
}

export default Daftar;
