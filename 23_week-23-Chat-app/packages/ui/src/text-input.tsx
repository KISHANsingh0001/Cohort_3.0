interface TextInputProps {
    placeholder: string;
    size:"big" | "small";
}
export function TextInput({placeholder , size}: TextInputProps) {
    return <div style={{flex:'1'}}>
        <input type="text" placeholder={placeholder} style={{
        padding: size === 'big' ? '10px' : '5px',
        margin: size == 'big' ? '10px' : '5px',
        borderColor: 'black',
        borderWidth: '1px',
    }}/>
    </div>
}