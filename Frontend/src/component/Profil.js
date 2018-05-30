import React, { Component } from 'react';
import './../style/Profil.css';
import Header from './Header';
import swal   from 'sweetalert';
import axios  from 'axios';
import { Link } from 'react-router-dom';

class Profil extends Component {
    constructor(props) {
        super(props);
        this.state = { myprofil:[],
                       myimage :[],
                       imageURL: '',
                       caption :'',
                       iduser  :'',
                       idimage :'',
                    //    value   : 0,
                    //    liked   : false 
                    };
                       
        this.handleUploadImage = this.handleUploadImage.bind(this);
        // this.onClick = this.onClick.bind(this);
    }

     input(){
        this.setState({
          caption : this.refs.caption.value,
        });
      }

      logout = () => {
        localStorage.removeItem('jwtToken');
      }

    //UPLOAD IMAGE
     handleUploadImage(a) {
        a.preventDefault();

        const data = new FormData();
        data.append('file'    , this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);
        data.append('caption' , this.state.caption);
        data.append('iduser'  , this.state.iduser);

        fetch('http://localhost:1000/upload', {
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
            title : "Congratulation",
            text  : "Your photo has been UPLOADED!",
            icon  : "success",
            button: "Auto Close",
          })
    }

    //GET USER LOCAL
    componentWillMount() {
        this.getUser()
    }

    getUser = () => {
        var a = localStorage.getItem('jwtToken')
        var b = JSON.parse(atob(a.split('.')[1]))
        var c = b[0]
        this.setState({ iduser: c.iduser })
    }

    //GET DATA USER DAN IMAGE
    componentDidMount() {
        axios.get(`http://localhost:1000/data/${this.state.iduser}`).then((ambilData) => {
            this.setState({
                myprofil: ambilData.data,
            })
        }).then(
            axios.get(`http://localhost:1000/image/${this.state.iduser}`).then((ambilData) => {
                this.setState({
                    myimage: ambilData.data,
                })
            })
        )
    }

    //DELETE IMAGE
    deletephoto(idimage){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                const data = new FormData();
                data.append('idimage' , idimage);
    
        fetch(`http://localhost:1000/image/${idimage}`, {
            method: 'DELETE',
            body  : data,
        })
        window.location.reload()
        swal("Poof! Your data has been DELETED!", {
            icon: "success",
        });
        } else {
            swal("Your data is safe!");
        }
    });
    }
    
    // onClick = () => {
    //     this.setState({
    //       value: this.state.value + 1,
    //       liked: !this.state.liked
    //     });
    // }

    render() {
        // const label = this.state.liked ? 
        //     <i onClick={this.onClick} className="fas fa-thumbs-up"></i> : <i onClick={this.onClick} className="far fa-thumbs-up"></i>
        const potoprofil = this.state.myprofil.map((item, index) => {
            let imageuser = 'http://localhost:1000/data-upload/' + item.imageuser
            return <img className="potoprofil" src={imageuser} alt="ok"></img>  
        })

        const dataprofil = this.state.myprofil.map((item, index) => {
            let nama = item.nama
            return <b className="namaprofil">{nama}</b>  
        })

        const photos = this.state.myimage.map((item, index)=>{
            var image     = 'http://localhost:1000/data-upload/'+item.image;
            var caption   = item.caption;
            var idimage   = item.idimage;
            return <div className="profil">
                        <div className="row3">
                            <div className="col-lg-4 card" style={{paddingTop:20,paddingBottom:20}}>
                                <img className="card-img-top" src={image} style={{borderRadius:10}} alt="ok"/>
                                    <div className="card-footer" style={{background:"green"}}>
                                        <p className="caption">- {caption} -</p>
                                        <center>
                                            {/* {label} */}
                                            <a href="#" data-toggle="modal" data-target="#like">    
                                                <p1 style={{color:"white",paddingRight:30,paddingLeft:5}}>Likes</p1></a>
                                                <i class="fas fa-trash-alt" onClick={()=>this.deletephoto(idimage)}></i>
                                            {/* <i className="fas fa-comment"></i>
                                                <a href="#" data-toggle="modal" data-target="#comment">
                                                    <p1 style={{color:"white"}}>  4 Comments</p1></a> */}
                                        </center>
                                    </div>
                            </div>
                        </div>
                        <div className="modal fade" id="like" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered " role="document">
                                <div className="modal-content width-modal-fol">
                                    <div class="modal-body">
                                        <p>who's Likes on here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="comment" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered " role="document">
                                <div className="modal-content width-modal-fol">
                                    <div class="modal-body">
                                        <p>who's Comments on here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            )
        return (
            <div className="Hasil">
            <Header/>
            <center>
            <div className="box3">
                <div className="row">
                    <div className="poto">
                        {potoprofil}
                    </div>
                    <div className="detail">
                        {dataprofil}<br/><br/>
                        <div className="row">
                            <a href="#" data-toggle="modal" data-target="#follower">
                                <b className="followerprofil" data-toggle="modal" data-target="#follower" >12 Followers</b></a>|
                            <a href="#" data-toggle="modal" data-target="#following">
                                <b className="followingprofil">10 Following</b></a>
                        </div><br/>
                        <div className="row">
                            <Link to="/Edit">
                            <button className="btn btn-danger" style={{marginLeft:25,marginRight:10,color:"white"}}>
                                Edit Profil</button></Link>
                            <button className="btn btn-danger" data-toggle="modal" style={{marginRight:10}}
                                data-target="#Upload">Upload Photo</button>
                            {localStorage.getItem('jwtToken') &&
                                <Link to="/login">
                                <button className="btn btn-danger" onClick={this.logout} title="Logout">
                                    <i className="fab fa-xbox" style={{fontSize:16}}></i>
                                </button>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="Upload" tabindex="-1" role="dialog" aria-labelledby="Label" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content" style={{width:400,borderRadius:10}}>
                            <div className="modal-header" style={{background:"skyblue",textAlign:"center"}}><p className="modal-title" id="Label">
                                <b><center>UPLOAD FOTO</center></b></p>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body"> 
                                <form onSubmit={this.handleUploadImage}>
                                    <div>
                                        <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                                    </div>
                                    <div>
                                        <input className="Input" style={{border:"solid",fontFamily:"Dosis",marginTop:5,marginBottom:10}}
                                            ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Change name of Photo" />
                                        <input className="Input" style={{border:"solid",fontFamily:"Dosis",marginBottom:10}}
                                          onInput={()=>{this.input();}} required ref="caption" type="text" placeholder="Caption" />
                                    </div><br />
                                        <button className="btn btn-primary">Upload</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="follower" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered " role="document">
                        <div className="modal-content width-modal-fol">
                            <div class="modal-body">
                                <p>who's Follower on here</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="following" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered " role="document">
                        <div className="modal-content width-modal-fol">
                            <div class="modal-body">
                                <p>who's Following on here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </center>
            {photos}
            </div>
        );
    }
}

export default Profil ;
