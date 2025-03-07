/* imports */
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';

/* Routes */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Auth Required Routes */}
      <Route path="/dogs/search" element={<Search />} />
    </Routes>
  );
};

export default AppRoutes;
