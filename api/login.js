import {MongoClient} from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res){
  const allowedOrigin = 'https://www.qblackai.com'

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin); // 개발 중에는 *로 허용
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if(req.method === 'OPTIONS'){
    return res.status(200).end();
  }

  if(req.method !== 'POST'){
    return res.status(405).json({message: 'Method Not Allowed'});
  }

  const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).json({message: 'Email and password are required'});
  }

  try{
    await client.connect();
    const db = client.db('licenseDB');
    const users = db.collection('users');

    const user = await users.findOne({email});
    if(!user){
      return res.status(401).json({message: 'Invalid email or password'});
    }

    // assume password is stored as hash
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
      return res.status(401).json({message: 'Invalid email or password'});
    }

    // JWT 생성 (valid for 7 days)
    const token = jwt.sign(
      {email: user.email, firstName: user.firstName},
      process.env.JWT_SECRET,
      {expiresIn: '7d'}
    );

    // send to HttpOnly cookie
    res.setHeader('Set-Cookie', `token=${toekn}; HttpOnly; Path=/; Max-Age=${7*24*60*60}; SameSite=Lax`);

    // login successful
    res.status(200).json({message: 'Login successful', firstName: user.firstName});
  } catch(error){
    console.error(error);
    res.status(500).json({message: error.message || 'Internal server error'});
  } finally{
    await client.close();
  }
}