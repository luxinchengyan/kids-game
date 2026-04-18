import React from 'react';

export default function HelloWorld({ name = 'Player' }) {
  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: 20 }}>
      <h1 style={{ color: '#ff6f61' }}>Hello, {name}!</h1>
      <p>Welcome to the kids game.</p>
      <button onClick={() => alert('Clicked!')}>Tap me</button>
    </div>
  );
}
