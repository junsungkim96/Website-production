export default function handler(req, res){
    res.setheader('Set-Cookie', `toekn=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`);
    res.status(200).json({message:'Logged out'});
}