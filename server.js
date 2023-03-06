const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')
const profileId = require('./controllers/profileId')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'eknopp',
      password : '',
      database : 'face-recognition-brain'
    }
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working') })
app.post('/signin', signin.handleSignin(db, bcrypt)) 
app.post('/register',(req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => {profileId.handleId(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(provess.env.PORT || 3000, () =>{
    console.log(`app is running on port ${provess.env.PORT}`)
})



/*
--> res = this is working
signing --> POST = success/fail
register --> POST = user
profile/:userId --> GET = user 
image --> PUT --> user

*/