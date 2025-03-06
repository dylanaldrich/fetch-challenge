/* imports */
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Index from '../pages/Index';

/* Routes */
const AppRoutes = () => {
  return (
    <Routes>
      {/* {!loggedIn && <Route path="*" element={<Home />} />} */}
      <Route path="/" element={<Home />} />
      <Route path="/index" element={<Index />} />
      {/* <Route path="/about" element={<Home />} />
      <Route path="/recipe/:id" element={<Home />} /> */}
      {/* Auth Required Routes */}
    </Routes>
  );
};

export default AppRoutes;
