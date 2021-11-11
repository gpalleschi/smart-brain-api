const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: {
       rejectUnauthorized: false
    }    
//    ssl : true,
  }
});

/* Example to select on table 
db.select('*').from('users').then(data =>{
	console.log(data);
});
*/

const app = express()

// Per spacchettare correttamente il body
app.use(express.json())
// Per i permessi di accesso CORS tra client e server
app.use(cors())

const port=process.env.PORT;

/*
const database = {
	users: [
		{id : '123',
	         name: 'John',
		 email: 'John@gmail.com',
		 password: 'cookies',
		 entries: 0,
		 joined: new Date() 
		},
		{id : '124',
	         name: 'Sally',
		 email: 'Sally@gmail.com',
		 password: 'bananas',
		 entries: 0,
		 joined: new Date() 
		}
	]
}
*/

app.get('/',(req,res)=>{
	res.send('success')
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)}); 
app.get('/profile/:id', (req,res) => {profile.handleProfile(req, res, db)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(port, () => {
	console.log('app is running on port ' + port)
})



/*
/ res --> this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/