// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <h1>Welcome to Just do it — React version</h1>
        <p>Go to <Link to="/login">Login</Link> to continue.</p>
      </div>
    </>
  );
}
