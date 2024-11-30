import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// importing useCounter custom hook from hooks folder
// import { useCounter } from './hooks/useCounter'

// import { useFetch } from './hooks/useFetch'
import { usePrev } from './hooks/usePrev'

function useDebounce(originalFn){
  const currentClock = useRef();

  const fn = () => {
    clearTimeout(currentClock.current);
    currentClock.current = setTimeout(originalFn , 200);
  }

  return fn;
}
function App() {
  // const [currData  , setCurrData] = useState(0);
  // const [state , setState] = useState(0);
  function sendDataToBackend(){
    fetch("api.amazon.com/search/");
  }
  const debounceFn = useDebounce(sendDataToBackend);

  // const prev = usePrev(state);
  // const {data , loading} = useFetch("https://jsonplaceholder.typicode.com/todos/" + currData );
  // if(loading){
  //   return <div>
  //      <h3>Loading........</h3>
  //   </div>
  // }
  return (
      // <div>
      //   <button onClick={() => setCurrData(1)}>1</button>
      //   <button onClick={() => setCurrData(2)}>2</button>
      //   <button onClick={() => setCurrData(3)}>3</button>
      //   <br />
      //   {/* {(loading == true) ? "Loading......." : JSON.stringify(data)} */}
      //   { JSON.stringify(data)}
      //   {/* <button onClick={increseCount}>Increse</button> */}
      // </div>
      <div>
        <input type='text' onChange={debounceFn}></input>
        {/* <div><h2>{state}</h2></div> */}
        {/* <button onClick={() => setState(state + 1)}>Increse</button> */}
        {/* <div>Preivious Value {prev}</div> */}

      </div>
  )
}

export default App
