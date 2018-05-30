import React, { Component } from 'react';
import './../style/Hasil.css';
import axios  from 'axios';
import {Link} from 'react-router-dom';
import Header from './Header';

class Hasil extends Component {
    constructor(props){
      super(props);
      this.state={ pencarian  :[],
                   follow     : false,
                   foto       :'',
                   nama       :'',
                   idfollowing:'',
                   iduser     :'',
                   urlku      :'http://localhost:1000/data-upload/'
                }

      this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
      axios.get(`http://localhost:1000/pencarian/${this.props.match.params.id}`).then((ambilData) => {
          this.setState({
              pencarian: ambilData.data,
              foto:ambilData.data[0].imageuser,
              nama:ambilData.data[0].nama
          })
      })
    }
    
    componentWillMount() {
        this.getUser()
    }

    getUser = () => {
        var a = localStorage.getItem('jwtToken')
        var b = JSON.parse(atob(a.split('.')[1]))
        var c = b[0]
        this.setState({ iduser: c.iduser })
    }

    onClick = (iduser) => {
        this.setState({
            follow: !this.state.follow
        });

        axios.post('http://localhost:1000/following',{
        idfollowing : this.state.idfollowing,
        iduser      : this.state.iduser
    })
        console.log("Following")
    }

    render() {
        const label  = this.state.follow ? 'Following' : 'Follow';
        const photos = this.state.pencarian.map((item, index)=>{
        var image    = 'http://localhost:1000/data-upload/'+item.image;
            return <div className="profil">
                        <div className="row3">
                            <div className="col-lg-4 card" style={{paddingTop:20,paddingBottom:20}}>
                                <img className="card-img-top" src={image} style={{borderRadius:10}} alt="ok"/>
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
                        <img className="potoprofil" src={this.state.urlku+this.state.foto} alt="ok"></img>
                    </div>
                    <div className="detail">
                        <b className="namaprofil">{this.state.nama}</b><br/><br/>
                        <div className="row">
                            <a href="#" data-toggle="modal" data-target="#follower">
                                <b className="followerprofil" >12 Followers</b></a>|
                            <a href="#" data-toggle="modal" data-target="#following">
                                <b className="followingprofil">10 Following</b></a>
                        </div><br/>
                        <button className="btn btn-danger" onClick={()=>this.onClick()}>{label}</button>
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
export default Hasil ;