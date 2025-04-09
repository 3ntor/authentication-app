const usersModel = require('../models/users.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register =async function(req,res) {
      try {
        let newUser = await usersModel(req.body)
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        newUser.password = hashedPassword
        let user = await newUser.save()
        return res.json( {message:'user registered successfully', user: { name: user.name, email: user.email }})
      } catch(err) {
        console.log("🚀 ~ exports.register=function ~ err:", err) 
        res.status(400).send({message: err})
      }
}
exports.login = async function (req, res) {
  try {
    let user = await usersModel.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(400).send({ message: 'invalid email or password' });
    }
    const token = jwt.sign({ email: user.email , _id: user._id }, 'secret');
    return res.json({ message: 'user logged in successfully', user: { name: user.name, email: user.email , jwt: token } });
  } catch (err) {
    console.log("🚀 ~ exports.login=function ~ err:", err);
    res.status(400).send({ message: err.message || err });
  }
  
};