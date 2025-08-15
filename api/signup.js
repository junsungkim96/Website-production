import {MongoClient} from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res){
  if(req.method !== 'POST'){
    return res.status(405).json({message: 'Method Not Allowed'});
  }

  const {firstName, lastName, email, password} = req.body;
  if(!firstName || !lastName || !email || !password){
    return res.status(400).json({message: 'Missing required fields'});
  }

  try{
    await client.connect();
    const db = client.db('licenseDB');
    const users = db.collection('users');

    // Check duplicate email
    const existingUser = await users.findOne({email});
    if(existingUser){
      return res.status(409).json({message: 'Email already registered'});
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store User
    await users.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).json({message: 'User created'});
  } catch(error){
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  } finally{
    await client.close();
  }
}