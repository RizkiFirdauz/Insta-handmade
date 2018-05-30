import React, { Component } from 'react';
import './../style/Header.css';
import a        from './../image/logo.png';
import { Link } from 'react-router-dom';
import axios  from 'axios';

class Header extends Component {
    constructor(){
        super();
        this.state={ nama:'',
                     myprofil:[]}
    }

    input(){
        this.setState(
          {nama: this.refs.cari.value}
        );
    }

    find=(e)=>{
        if(e.key === 'Enter'){
            window.location.href=`/Pencarian/${this.state.nama}`
        // this.props.history.push(`/Pencarian/${this.state.nama}`)
        console.log(this.state.nama)
        }
    }
    
    componentWillMount() {
        this.getUser()
    }

    getUser = () => {
        var a = localStorage.getItem('jwtToken')
        var b = JSON.parse(atob(a.split('.')[1]))
        var c = b[0]
        this.setState({ iduser:c.iduser })
    }

    componentDidMount() {
        axios.get(`http://localhost:1000/data/${this.state.iduser}`).then((ambilData) => {
            this.setState({
                myprofil: ambilData.data,
            })
        })
    }

    render() {
        const potoprofil = this.state.myprofil.map((item, index) => {
            let imageuser = 'http://localhost:1000/data-upload/' + item.imageuser
            return <img className="rounded-circle img-fluid" src={imageuser} style={{marginTop:5}} alt="x"/>
        })

        const dataprofil = this.state.myprofil.map((item, index) => {
            let nama = item.nama
            return <p style={{paddingTop:10}}>{nama}</p>  
        })
        return (
            <div className="Header">
                <nav className="navbar navbar-inverse fixed-top">
                    <div className="navbar-header navbar-left">
                        <a href="/" className="btn2">
                            <i className="fab fa-angellist" style={{fontSize:30}} >  |
                                <p2 style={{fontFamily:"Kaushan Script",fontSize:24}}>V-GRAM</p2>
                            </i>
                        </a>
                    </div>
                    <div className="navbar-header navbar-center">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <input className="Input" style={{fontSize:18,width:160}} ref="cari" type="text" placeholder="Search . . ." 
                                onInput={()=>{this.input();}} onKeyPress={this.find} required />
                            <Link to ={`/Pencarian/${this.state.nama}`}>
                                <button className="btn btn-danger" style={{width:40}}>
                                    <i className="fas fa-search"></i>
                                </button>
                            </Link> 
                        </div>
                    </div>
                    <div className="navbar-header navbar-right" style={{marginTop:0}}>
                        <Link to="/Profil" className="navbar-brand">
                            <div className="row">
                            {potoprofil}{dataprofil}
                            </div>
                        </Link>
                    </div>
                </nav>
            </div> 
        );
    }
}

export default Header ;