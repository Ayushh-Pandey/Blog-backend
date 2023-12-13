const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const Token = require('../model/token');

const User = require('../model/user');

dotenv.config();

const singupUser = async (request, response) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        // const hashedPassword = await bcrypt.hash(request.body.password, 10);// by default 10 means salt

        const user = { username: request.body.username, name: request.body.name, password: hashedPassword }
        const userFound = await User.find({username:request.body.username})
        if(userFound.length>0){
            console.log(userFound);
            return response.status(400).json({msg:'Username already exist'});
        }
        
        const newUser = new User(user);
        await newUser.save();

        response.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        console.log('l',error)
        response.status(500).json({ msg: 'Error while signing up user' });
    }
}


const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, username: user.username });
        
        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
}

const logoutUser = async (request, response) => {
    const token = request.body.token;
    await Token.deleteOne({ token: token });
    
    response.status(204).json({ msg: 'logout successfull' });
    console.log("done");
}

module.exports = {loginUser,logoutUser,singupUser};