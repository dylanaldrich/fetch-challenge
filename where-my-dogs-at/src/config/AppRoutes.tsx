/* imports */
import { Routes, Route } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';

import Home from '../pages/Home';
// import About from '../pages/About';
// import RecipeDetail from '../pages/RecipeDetail';
// import Profile from '../pages/Profile';
// import FoodbookDetail from '../pages/FoodbookDetail';
// import { loggedInState } from '../recoil/selectors';
// import Index from '../pages/Index';

/* Routes */
const AppRoutes = () => {
  // const loggedIn = useRecoilValue(loggedInState);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<Home />} />
      <Route path="/recipe/:id" element={<Home />} /> */}
      {/* Auth Required Routes */}
      {/* {loggedIn && <Route path="/index" element={<Index />} />} */}

      {/* <Route path='*' element={NotFound} /> */}
    </Routes>
  );
};

export default AppRoutes;
