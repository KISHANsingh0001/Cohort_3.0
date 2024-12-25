import axios from "axios"

// how can we add loading state in this component
export default async function User(){
  const response = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details");
  const data = response.data;
  await new Promise(r => setTimeout(r,5000));
  return <div className="p-4 m-4 border ">
     <h1 className="text-3xl font-bold">User Details</h1>
     <div>{data.name}</div>
     <div>{data.email}</div>
  </div>
}