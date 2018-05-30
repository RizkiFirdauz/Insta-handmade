import React, { Component } from 'react';
import './../style/Home.css';
import axios   from 'axios';
import Header  from './Header';
import Zoom    from 'react-reveal/Zoom';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={ myimage:[],
                     iduser :'',
                     idimage:'',
                     liked  : false }

        this.onClick = this.onClick.bind(this);
    }

    //GET DATA LIKE
    componentDidMount() {
        axios.get('http://localhost:1000/like/').then((ambilData) => {
            console.log('wkwkw',ambilData)
            this.setState({
                myprofil: ambilData.data,
            })
        })
    }

    //GET DATA IMAGE
    componentDidMount() {
        axios.get('http://localhost:1000/image').then((ambilData) => {
            this.setState({
                myimage: ambilData.data,
            })
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

    onClick = (idimage) => {
        this.setState({
            liked: !this.state.liked
        });

        axios.post('http://localhost:1000/like',{
        iduser    : this.state.iduser,
        idimage   : idimage
    })
        console.log("Like")
    }

    render() {
        const label = this.state.liked ? <i className="fas fa-thumbs-up" style={{color:"red"}}></i> : <i className="far fa-thumbs-up"></i>;
        const photos = this.state.myimage.map((item, i)=>{
            var image     = 'http://localhost:1000/data-upload/'+item.image;
            var caption   = item.caption;
            var nama      = item.nama;
            var idimage   = item.idimage;
            return <div className="home">
                        <div className="box5">
                            <div style={{paddingBottom:10}}>
                                <p1 style={{color:"white",paddingRight:200,fontFamily:"Kaushan Script"}}>{nama}</p1>
                                    <button className="btn btn-danger" style={{background:"transparent",border:"transparent"}} onClick={()=>this.onClick(idimage)}>{label}</button>
                                <a href="#" data-toggle="modal" data-target="#like">    
                                    <p1 style={{color:"white",fontStyle:"italic"}}>{this.state.value} Likes</p1>
                                </a>
                            </div>
                            <img className="imagetimeline" src={image} alt="ok"/>
                                <p className="caption">- {caption} -</p>
                                
                        </div><br/>
                    </div>
                }
            )
        return (
            <div>
                <Header/>
                <Zoom cascade>
                <center style={{paddingTop:100}}>
                    {photos}
                </center>
                </Zoom>
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
        )
    }
};

export default Home ;

