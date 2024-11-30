// import JWT from 'jsonwebtoken'

// const JWT_PASSWORD = "./config.ts";

// function middleware(req , res , next){
//     const token = req.headers.authorization;
//     try{
//        const decoded = JWT.verify(token , JWT_PASSWORD);
//        req.userId = decoded.id;
//        next();
//     }catch(e){
//        res.Status(403).json({
//         msg:"You are not signed up"
//        })
//     }
// }
// export default middleware;
