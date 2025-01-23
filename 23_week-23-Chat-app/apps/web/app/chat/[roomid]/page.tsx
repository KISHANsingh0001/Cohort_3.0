import { TextInput } from "@repo/ui/text-input";

export default function Chat(){
    return <div style={{
        
        width:"100vw",
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
    }}>
       <div> Chat</div>
       <div>
        <TextInput size="big" placeholder="Chat here"></TextInput>
       </div>
    </div>
}