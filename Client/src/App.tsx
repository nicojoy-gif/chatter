import React from 'react';
import Index from './Routes/Index';

import ReactGA from 'react-ga4';
import AnalyticsView from './Components/Analytics/AnaltyicView';

// Initialize Google Analytics with your tracking ID
ReactGA.initialize('395139730');

function App() {
  return (
    <div>
    
  <Index />
  
    </div>
  );
}

export default App;
