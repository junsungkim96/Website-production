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
    console.log('Hashed password:', hashedPassword);

    // Calculate expiration date (7days from now)
    const expirationDate = new Date();
    expirationDate.setDate(expiration.getDate() + 7);

    // Store User
    await users.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      lastLoginAt: null,
      plan: "Free Trial",
      roles: ["user"],
      autoBilling: false,
      expirationDate,
    });

    res.status(201).json({message: 'User created'});
  } catch(error){
    console.error(error);
    res.status(500).json({message: 'Internal server error', error:error.message});
  } finally{
    await client.close();
  }
}