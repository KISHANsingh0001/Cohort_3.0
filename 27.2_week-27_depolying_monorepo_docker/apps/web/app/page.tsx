import {client} from 'db/client'

export default async function Home() {

  const users = await client.user.findMany();
  return (
    <div style={{margin:10}}>
     <p style={{textAlign:'center' , fontFamily:'sans-serif'}}><h1>Users Information</h1></p>
     {users.map(({id , username , password})=>{
       return (
         <div style={{margin:20}}>
          <div style={{margin:10}}><h3>Id:</h3>{id}</div>
          <div style={{margin:10}}><h3>Username:</h3>{username}</div>
          <div style={{margin:10}}><h3>Password:</h3>{password}</div>
          <hr />
         </div>)
        {/* <div>{JSON.stringify(users)}</div> */}
      })}
    </div>   
  );
}

export const revalidate = 10 
// // revalidate every 60 seconds
// or
// Incremental site generation
// export const dynamic = 'force-dynamic'