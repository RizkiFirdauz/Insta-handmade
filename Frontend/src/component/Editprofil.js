import React, { Component } from 'react';
import './../style/Editprofil.css';
import Zoom     from 'react-reveal/Zoom';
import {Link}   from 'react-router-dom';
import swal     from 'sweetalert';
import Header   from './Header'; 
import Axios from 'axios';

class Edit extends Component {
  constructor(props){
    super(props);
    this.state= { nama     :'', 
                  imageURL :'', 
                  myprofil:[]};

    this.editprofile = this.editprofile.bind(this);
  }

  //GET USER LOCAL
  componentWillMount() {
       this.getUser()
  }


  getUser = () => {
        var a = localStorage.getItem('jwtToken')
        var b = JSON.parse(atob(a.split('.')[1]))
        var c = b[0]
        this.setState({ iduser:c.iduser })
  }

  input(){
    this.setState({
      nama     : this.refs.nama.value,
    });
  }

  editprofile(x) {
    x.preventDefault();

    const data = new FormData();
    data.append('nama'    , this.state.nama);
    data.append('file'    , this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch(`http://localhost:1000/data/${this.state.iduser}`, {
        method: 'PUT',
        body  : data,
    })
    // window.location.reload()
    .then((response) => {
        response.json().then((body) => {
            this.setState({ imageURL: `http://localhost:1000/${body.file}` });
            console.log(this.state.imageURL)  
            window.location.reload()
        });
    });
    swal({
      title : "Done",
      text  : "Your data has been EDITED!",
      icon  : "success"
    })
  }

  render() {
    const dataprofil = this.state.myprofil.map((item, index) => {
      let nama = item.nama
      return <b className="namaprofil">{nama}</b>  
    })
    return (
      <div className="edit">
      <Header/>
        <center>
        <div className="jarak" style={{paddingTop:120}}>
        <Zoom>
        <div className="box4">
          <p style={{color:"white",fontSize:30,fontFamily:"Kaushan Script"}}><b>EDIT PROFILE</b></p>
            <form onSubmit={this.editprofile}>
              <input className="Input" style={{marginBottom:10}} ref="nama"    type="text"      placeholder="Name " 
                onInput={()=>{this.input();}} required /><br/>
              <p><a data-toggle="collapse" href="#file" role="button" aria-expanded="false" aria-controls="collapseExample" 
                    style={{color:"white"}}>Choose Photo to Change</a></p>
              <div className="collapse" id="file">
                <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                <input className="Input" style={{fontFamily:"Dosis",marginTop:5,marginBottom:10}}
                  ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Change name of Photo" />
              </div>
              <button className="btn btn-danger" style={{width:100,textAlign:"center",fontFamily:"Dosis",marginTop:0}}>
                <b>SAVE</b>
              </button>
            </form>
            <p className="quotes">“The Way Get Started Is To Quit Talking And Begin Doing.” <br/>– Walt Disney –</p>
        </div>
        </Zoom>
        </div>
        </center>
      </div>
    );
  }
}

export default Edit;
