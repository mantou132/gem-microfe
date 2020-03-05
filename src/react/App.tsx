import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/r/a">Home</Link>
        <Link to="/r/b">About</Link>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/r/a" exact component={Home}></Route>
        <Route path="/r/b" get component={About}></Route>
      </Suspense>
    </BrowserRouter>
  );
}
