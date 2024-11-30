// App.js
import './App.css';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { todosAtomFamily } from './atoms';

// Main App component that renders multiple Todo components within a RecoilRoot
function App() {
  return (
    // RecoilRoot provides the global Recoil state context to the app
    <RecoilRoot>
      {/* Each Todo component takes a unique ID to fetch specific data */}
      <Todo id={1} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

// Todo component that receives an 'id' prop to fetch specific todo data
function Todo({ id }) {
  // Using Recoil's useRecoilValue hook to get the todo item by its ID
  const currTodo = useRecoilValue(todosAtomFamily(id));
  
  // Displaying the title and description of the todo item
  return (
    <>
      <h2>{currTodo.title}</h2>
      <p>{currTodo.description}</p>
    </>
  );
}

export default App;