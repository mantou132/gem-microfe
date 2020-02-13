import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function Home() {
  return <>Home</>;
}

function About() {
  return <>About</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/r/a">Home</Link>
        <Link to="/r/b">About</Link>
      </nav>
      <Route path="/r/a" exact component={Home}></Route>
      <Route path="/r/b" component={About}></Route>
    </BrowserRouter>
  );
}
