
import axios from "axios";
import { atom, selector } from "recoil";

export const notifications = atom({
  key: "networkAtom",
  default: selector({
    key: "networkAtomsSelector",
    get: async () => {
      try {
        const res = await axios.get("https://sum-server.100xdevs.com/notification");
        return res.data;
      } catch (error) {
        console.error("Error fetching notifications:", error);
        return { network: 0, jobs: 0, messaging: 0, notifications: 0 }; // Fallback value
      }
    },
  }),
});

export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const allNotifications = get(notifications);
    return (
      allNotifications.network +
      allNotifications.jobs +
      allNotifications.notifications +
      allNotifications.messaging
    );
  },
});
// Asynchronous Data quires 
// export const notifications = atom({
//     key: "networkAtom",
//     default: {
//         network: 0, 
//         jobs: 0, 
//         messaging: 0, 
//         notifications: 0
//     }
// });
// if we know that default value comes asynchronously through backend then we will write atom like this
