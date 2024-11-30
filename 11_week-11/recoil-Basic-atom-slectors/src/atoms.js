import { atom, selector } from 'recoil';

// Define an atom to represent the "home" count with a default value of 0
export const home = atom({
    key: 'home',     // Unique identifier for this atom
    default: 0       // Initial value for the state
});

// Define an atom to represent the "myNetwork" count with a default value of 104
export const myNetwork = atom({
    key: 'myNetwork', // Unique identifier for this atom
    default: 104      // Initial value for the state
});

// Define an atom to represent the "jobs" count with a default value of 0
export const jobs = atom({
    key: 'jobs',      // Unique identifier for this atom
    default: 0        // Initial value for the state
});

// Define an atom to represent the "messaging" count with a default value of 0
export const messaging = atom({
    key: 'messaging', // Unique identifier for this atom
    default: 0        // Initial value for the state
});

// Define an atom to represent the "notification" count with a default value of 12
export const notification = atom({
    key: 'notification', // Unique identifier for this atom
    default: 12          // Initial value for the state
});

// Define an atom to represent the "me" count with a default value of 0
export const me = atom({
    key: 'me',       // Unique identifier for this atom
    default: 0       // Initial value for the state
});

// Define a selector to compute the total of all atom values
export const meSelector = selector({
    key: 'meSelector',      // Unique identifier for this selector
    get: ({ get }) => {     // "get" function to read the values of atoms
        const homeBar = get(home);                 // Get the value of the "home" atom
        const networkCount = get(myNetwork);       // Get the value of the "myNetwork" atom
        const jobAtomCount = get(jobs);            // Get the value of the "jobs" atom
        const notificationAtomCount = get(notification); // Get the value of the "notification" atom
        const messagingAtomCount = get(messaging);       // Get the value of the "messaging" atom

        // Return the sum of all these values
        return homeBar + jobAtomCount + messagingAtomCount + networkCount + notificationAtomCount;
    }
});