import { RecoilRoot, useRecoilValue } from 'recoil';
import { home, jobs, meSelector, messaging, myNetwork, notification } from './atoms';

function App() {
  return (
    <>
     <RecoilRoot>
     <TopBar />
     </RecoilRoot>
    </>
  );
}

function TopBar() {
  const home1 = useRecoilValue(home);
  const network = useRecoilValue(myNetwork);
  const jobCount = useRecoilValue(jobs);
  const messageCount = useRecoilValue(messaging);
  const notifications = useRecoilValue(notification);
  
  const networkCount = network >= 100 ? "99+" : network

  const totalNumberOfCount = useRecoilValue(meSelector)
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <button>Home ({home1})</button>
      <button>My Network ({networkCount})</button>
      <button>Jobs ({jobCount})</button>
      <button>Messaging ({messageCount})</button>
      <button>Notification ({notifications})</button>
      <button>Me {totalNumberOfCount}</button>
    </div>
  );
}

export default App;