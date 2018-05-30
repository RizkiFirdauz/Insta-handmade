import React, { Component } from 'react';
import './../style/Login.css';
import Rotate   from 'react-reveal/Rotate';
import Zoom     from 'react-reveal/Zoom';
import {Link}   from 'react-router-dom';
import avatar   from './../image/avatar2.gif';
import axios    from 'axios';
import swal     from 'sweetalert';

class Login extends Component {
  constructor(props){
    super(props);
    this.state= {username:'', 
                 password:'',
                 message:''}
  }

  input(){
    this.setState({
      username  : this.refs.name.value,
      password  : this.refs.pass.value
    });
  }

  find(){
    axios.post('http://localhost:1000/login', {
      username: this.state.username,
      password: this.state.password            
    }).then((result) => {
        console.log(result);
        localStorage.setItem('jwtToken', result.data.token);
        this.props.history.push('/');
    })
    // .catch((err) =>{  
    //   if (err.response.status === 401){
    //     swal("Username & Password Don't Match, Please try again!");
    //     }  
    //   }
    // )
  }

  render() {
    return (
      <div className="Login">
        <center>
          <div className="jarak" style={{paddingTop:40}}>
            <Zoom bottom>
            <div className="box"><br/>
              <p style={{color:"white",fontSize:30,fontFamily:"Kaushan Script"}}><b>WELCOME</b></p>
              <Rotate>
              <img src={avatar} className="avatar" alt="Avatar" />
              </Rotate>
              <p style={{color:"white",paddingTop:10,fontFamily:"Dosis",fontWeight:"bold"}}>Please Login !</p>
              <form>
                <input className="Input" style={{marginBottom:10}} ref="name" type="text" placeholder="Username" 
                  onInput={()=>{this.input();}} required /><br/>
                <input className="Input" style={{marginBottom:10}} ref="pass" type="password" placeholder="Password" 
                  onInput={()=>{this.input();}} required /><br/>
                <div className="btn btn-danger" onClick={()=>{this.find();}} type="submit" style={{width:100,borderRadius:50,fontFamily:"Dosis"}}>
                  <b>Login</b>
                </div><br/>
                <p style={{color:"white",paddingTop:5,fontSize:14}}>not have an account?
                  <Link to="/Daftar" style={{color:"white"}}> <i>Register.</i></Link>
                </p>
              </form>
            </div>
            </Zoom>
          </div>
        </center>
      </div>
    );
  }
}

export default Login;
