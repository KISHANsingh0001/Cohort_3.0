import axios from "axios"
import Link from "next/link"
// how can we add loading state in this component
export default async function App(){
  // const response = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details");
  // const data = response.data;

  return <div className=" w-screen h-screen flex justify-center items-center ">
     {/* <h1 className="text-3xl font-bold">User Details</h1>
     <div>{data.name}</div>
     <div>{data.email}</div> */}
     <div>
      <h1>TODO Application</h1>
      <div className="m-6">
        <Link className="border p-3" href="/signin">SignIn</Link>
      </div>
      <div className="m-6">
        <Link className="border p-3" href="/signup">Signup</Link>
      </div>
     </div>

  </div>
}
