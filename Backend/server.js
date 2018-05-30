const express    = require('express');
const PORT       = process.env.PORT || 1000
const app        = express();
const mysql      = require('mysql');
const cors       = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path       = require('path');
var setting      = require('./config/config');
var jwt          = require('jsonwebtoken');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '12345',
    database : 'instagram'
});
db.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/data-upload', express.static(__dirname + '/data-upload'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Register New Account
app.post('/data', function(req,res){
    console.log(req.body)
    let imageFile = req.files.file;
    var data = {username  :req.body.username, 
                password  :req.body.password, 
                nama      :req.body.nama, 
                email     :req.body.email, 
                imageuser :req.body.filename + '.jpg'}
    var sql  = 'INSERT INTO user SET ?';
    
    imageFile.mv(`${__dirname}/data-upload/${req.body.filename}.jpg`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        db.query(sql, data, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send({
                type      :'POST',
                username  :req.body.username, 
                password  :req.body.password, 
                nama      :req.body.nama, 
                email     :req.body.email, 
                imageuser :req.body.filename + '.jpg',
            });
        });
    });
})

//Upload Photo
app.post('/upload', function (req, res) {
    let imageFile = req.files.file;
    var data = { image  : req.body.filename + '.jpg', 
                 caption: req.body.caption,
                 iduser : req.body.iduser };
    var sql  = 'INSERT INTO image SET ?';

    imageFile.mv(`${__dirname}/data-upload/${req.body.filename}.jpg`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        db.query(sql, data, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send({
                // type: 'POST',
                // image: req.body.filename + '.jpg',
                // caption:req.body.caption,
                // iduser: req.body.iduser,
            });
        });
    });
});

//Autentication Login
app.post('/login', (req,res)=>{
    var username = req.body.username.toString();
    var password = req.body.password.toString();
    var sql      = "SELECT * FROM user where username='"+username+"' and password='"+password+"'" ;
    db.query(sql, (err, res1) => {
        if(res1.length === 0){
            res.status(401)
        } else {
            var token = jwt.sign(JSON.stringify(res1),setting.JWT_SECRET);
            res.json({success: true,token: token});
        }
    });
})

//Post Like
app.post('/like', function (req, res) {
    var data = { iduser : req.body.iduser,
                 idimage: req.body.idimage };
    var sql  = 'INSERT INTO likeuser SET ?';
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Post Following
app.post('/following', function (req, res) {
    var data = { idfollowing : req.body.iduser,
                 iduser      : req.body.iduser };
    var sql  = 'INSERT INTO following SET ?';
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Post Follower
app.post('/follower', function (req, res) {
    var data = { iduser : req.body.iduser };
    var sql  = 'INSERT INTO follower SET ?';
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Find with Spesific byiduser
app.get('/data/:id', function(req,res){
    var iduser = req.params.id;
    var sql    = 'SELECT * FROM user WHERE iduser = ?';
    db.query(sql, iduser, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});


//Find with Spesific byusername
app.get('/pencarian/:username', function(req,res){
    var username = req.params.username;
    var sql      = 'SELECT idimage,image,imageuser,nama FROM image JOIN user USING (iduser) WHERE username = ?';
    db.query(sql, username, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Find with Spesific imageuser
app.get('/image/:iduser', function(req,res){
    var iduser = req.params.iduser;
    var sql    = 'SELECT * FROM image WHERE iduser = ? order by time desc';
    db.query(sql, iduser, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

// Get All imageuser byJOIN
app.get('/image', function(req,res){
    var sql = 'SELECT idimage,caption,image,nama,time FROM image JOIN user USING (iduser) order by time desc';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Get All datauser
app.get('/data', function(req,res){
    var sql = 'SELECT * FROM user';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Get All datalike
app.get('/like', function(req,res){
    var sql = 'SELECT * FROM likeuser';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Edit Profil
app.put('/data/:username', function(req,res){
    let imageFile = req.files.file;
    var sql = "UPDATE user SET nama='"+req.body.nama+"', imageuser='"+req.body.filename + '.jpg'+"' WHERE iduser='"+req.params.username+"'";
    imageFile.mv(`${__dirname}/data-upload/${req.body.filename}.jpg`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        db.query(sql,(err, result)=>{
            if(err){
                console.log(sql)
                console.log(err)
            };
            res.send(result);
        });
    });
})


//Delete Image user
app.delete('/image/:id', function(req,res){
    var sql = `DELETE from image WHERE idimage='${req.params.id}'`;
    db.query(sql,(err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
})

app.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`)
  })
  
