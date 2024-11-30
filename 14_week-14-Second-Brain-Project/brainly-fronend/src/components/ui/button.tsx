

interface ButtonProps {
    variant: "primary" | 'secondary';
    size: "sm" | "md" | "lg";
    text:string;
    startIcon?: any;
    endIcon?:any;
    onClick?: ()=> void;
}
const variantStyles = {
    "primary": "bg-blue-700 text-white text-lg",
    "secondary" : "bg-indigo-200 text-purple-600 text-lg"
}
const defaultStyles = "rounded-lg p-4 w-38 relative top-10 left-10";

const sizeStyles = {
    
    "sm" : "p-2",
     "md": "p-4",
     "lg" : "p-6"
}
export const Button = (props:ButtonProps)=>{
   return <button className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${defaultStyles} flex items-center justify-center gap-2`}>
    {props.startIcon}
    {props.text}
    {props.endIcon}
   </button>
}

{/* <Button variant="primary" size="md" onClick={()=>{}} text={"asd"} /> */}