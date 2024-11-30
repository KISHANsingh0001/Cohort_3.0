// atoms.js
import { atomFamily } from 'recoil';
import { TODO } from './todos';

// atomFamily allows creation of an atom for each unique 'id' passed in
export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily', // Unique key for this atom family
  default: (id) => {
    // Default function that returns the todo item with the matching ID
    return TODO.find((x) => x.id === id);
  },
});