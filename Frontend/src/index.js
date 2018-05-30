import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter,Route} from 'react-router-dom';
import App       from './App';
import Profil    from './component/Profil';
import Hasil     from './component/Hasil';
import Daftar    from './component/Daftar';
import Login     from './component/Login';
import Edit      from './component/Editprofil';

ReactDOM.render(<BrowserRouter>
<div>
    <Route exact path="/"         component={App}/>
    <Route path="/Login"          component={Login}/>
    <Route path="/Profil"         component={Profil}/>
    <Route path="/Daftar"         component={Daftar}/>
    <Route path="/Edit"           component={Edit}/>
    <Route path="/Pencarian/:id"  component={Hasil}/>
</div>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
