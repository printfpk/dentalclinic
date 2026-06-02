import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GeneralDentistry from './pages/GeneralDentistry';
import CosmeticDentistry from './pages/CosmeticDentistry';
import ImplantsProsthetics from './pages/ImplantsProsthetics';
import RestorativeDentistry from './pages/RestorativeDentistry';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/general-dentistry" element={<GeneralDentistry />} />
        <Route path="/services/cosmetic-dentistry" element={<CosmeticDentistry />} />
        <Route path="/services/implants-prosthetics" element={<ImplantsProsthetics />} />
        <Route path="/services/restorative-dentistry" element={<RestorativeDentistry />} />
      </Routes>
    </Router>
  );
}

export default App;
