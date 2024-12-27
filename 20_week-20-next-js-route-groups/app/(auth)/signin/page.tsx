// - Parentheses allow you to create **grouped** routes that **do not** affect the URL path.
// - For example, if you have a folder named `(auth)`, Next.js will not include `(auth)` in the URL—it’s just an organizational tool to group certain routes or apply layouts without changing the URL structure.
export default function Signin() {
    return <div>
        <h1>Signin</h1>
    </div>
}