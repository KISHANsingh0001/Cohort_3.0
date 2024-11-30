import { useState } from 'react'
import './App.css'
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { counterAtom } from './store/atoms/counter';

// The main App component serves as the root of the application.
// It wraps the Counter component inside RecoilRoot to provide the global Recoil state management context.
function App() {

  return (
    <RecoilRoot>
     {/* Render the Counter component which includes functionality to display and modify the count */}
     <Counter />
    </RecoilRoot>
  )
}

// The Counter component is responsible for rendering the current count value
// and providing buttons to increase or decrease the counter.
function Counter() {

  return (
    <div>
      {/* Renders the current count */}
      <CurrentCount />
      {/* Renders the button to increase the count */}
      <Increase />
      {/* Renders the button to decrease the count */}
      <Decrease />
    </div>
  )
}

// CurrentCount component displays the current counter value from the Recoil state.
function CurrentCount() {
  // useRecoilValue retrieves the current value of the counterAtom from Recoil state
  const count = useRecoilValue(counterAtom);

  return (
    <div>
      {/* Display the current count value */}
      {count}
    </div>
  )
}

// Decrease component contains logic to decrement the counter value.
function Decrease() {
  // useSetRecoilState allows updating the state of counterAtom
  const setCount = useSetRecoilState(counterAtom); // useSetRecoilState return a updater function 

  // Function to decrease the counter value by 1
  function decrease() {
    setCount(c => c - 1);
  }

  return (
    <div>
      {/* Button to trigger the decrease function */}
      <button onClick={decrease}>Decrease</button>
    </div>
  )
}

// Increase component contains logic to increment the counter value.
function Increase() {
  // useSetRecoilState allows updating the state of counterAtom
  const setCount = useSetRecoilState(counterAtom);

  // Function to increase the counter value by 1
  function increase() {
    setCount(c => c + 1);
  }

  return (
    <div>
      {/* Button to trigger the increase function */}
      <button onClick={increase}>Increase</button>
    </div>
  )
}

export default App;