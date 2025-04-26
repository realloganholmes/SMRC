import { BrowserRouter } from "react-router-dom";
import './App.css';
import { useEffect, useState } from 'react';
import { subscribeLoading } from './Utilities/loading';
import InnerApp from "./InnerApp";

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeLoading(setLoading);
    return unsubscribe;
  }, []);

  return (
    <div style={{ pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.5 : 1 }}>
      {loading && <div className="spinner"></div>}
      <BrowserRouter>
        <InnerApp></InnerApp>
      </BrowserRouter>
    </div>
  );
};



export default App;