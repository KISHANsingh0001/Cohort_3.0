import {client} from '@repo/db/client'
export default async function Home() {
  const user = await client.user.findFirst();

  return <div>
    <div><h1>User Details of the first user in our database</h1></div>
    <div style={{fontSize:"30px" , color:"pink"}}>UserId : {user?.id}</div>
    <div style={{fontSize:"30px" , color:"aqua"}}>Username : {user?.username}</div>
  </div>
}