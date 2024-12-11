import axios from "axios";

async function getBlogs(){
    const res  = await axios.get("https://jsonplaceholder.typicode.com/todos/");
    return res.data;
}
export default async function Blogs(){
    const blogs  = await getBlogs();
    return <div>
        <h1 className="text-green-500 text-4xl p-4">Best Platform to Learn React - Recoil Redux </h1>
        {blogs.map((x:ITodo)=><Todo title={x.title} completed={x.completed}/>)}
    </div>
}
interface ITodo{
    title:string;
    completed:boolean;
}
function Todo({title , completed}:ITodo){
    return <div>
        {title} {completed?"Done!" : "Not Done!!"}
    </div>
}