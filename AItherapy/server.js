const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors=require('cors');

const JWT_SECRET = 'yWbS38U8t9FMQn6uPV'

// mongodb+srv://test:test@cluster0.ba5xxwq.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb://localhost:27017/ayu', {
	// useNewUrlParser: true,
	useUnifiedTopology: true,
	// useCreateIndex: true
},
function (error) {
    if (error) {
        throw error;
    }
    console.log("MongoDB connection established....");
});

const app = express()
app.use(cors({
    orgin: "*",
}))
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
})
app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname+'/register.html'));
})
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname+'/login.html'));
})
app.get('/start',(req,res)=>{
	// 
	const token=req.header("x-auth-token");
	// console.log(token)
	if(!token){
		return res.status(401).json({msg:"No authetication token, autherization denied"});
	}
	var verified=jwt.verify(token,JWT_SECRET);
	if(!verified){
		return res.status(401).json({msg:"Token verification failed, autherization denied"});
	}
	else
	{
		// return res.json({ status: 'true' });
		res.sendFile(path.join(__dirname+'/start.html'));
		// res.render('/start.html')
	}
	
})
app.get('/logout',(req,res)=>{
	// 
		// return res.json({ status: 'true' });
		res.sendFile(path.join(__dirname+'/index.html'));
		// res.render('/start.html')
	}
)
// app.post('/api/change-password', async (req, res) => {
// 	const { token, newpassword: plainTextPassword } = req.body

// 	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
// 		return res.json({ status: 'error', error: 'Invalid password' })
// 	}

// 	if (plainTextPassword.length < 5) {
// 		return res.json({
// 			status: 'error',
// 			error: 'Password too small. Should be atleast 6 characters'
// 		})
// 	}

// 	try {
// 		const user = jwt.verify(token, JWT_SECRET)

// 		const _id = user.id

// 		const password = await bcrypt.hash(plainTextPassword, 10)

// 		await User.updateOne(
// 			{ _id },
// 			{
// 				$set: { password }
// 			}
// 		)
// 		res.json({ status: 'ok' })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ status: 'error', error: ';))' })
// 	}
// })

app.post('/api/login', async (req, res) => {
	const { email, password } = req.body
    // console.log(email)
	const user = await User.findOne({ email }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/register', async (req, res) => {
	const { email, epassword, passwordchk } = req.body
    console.log(epassword)
	if (!email) {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!epassword) {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (epassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}
    if(epassword!=passwordchk){
        return res.json({ error: "password is not match to the confirm password" });
    }
    const existingUser=await User.findOne({email:email});
        if(existingUser){
            return res.json({ error: "An account with this email already exists" });
        }

	const password = await bcrypt.hash(epassword, 10)

	try {
		const response = await User.create({
			email,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})
app.post("/tokenIsValid",async function(req,res){
    try{
        const token=req.header("x-auth-token");
        if(!token){
           return res.json({ status: 'false' });
        }
        const verified=jwt.verify(token,"yWbS38U8t9FMQn6uPV");
        if(!verified){
           return res.json({ status: 'false' });
        }
        // const user=await User.findById(verified.id);
        // if(!user){
        //    return res.json({ status: 'false' });
        // }
        return res.json({ status: 'true' });
    }catch(err){
        return res.status(500).json({msg:err.message});
    }
});
app.listen(9999, () => {
	console.log('Server up at 9999')
})