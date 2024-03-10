import React from 'react';

function Header() {
  return (
    <header className="header flex">
      <div className="brand flex">
        <img src="../src/assets/logo.png" alt="troll face" />
        <h2 className="brand--name">Meme Generator</h2>
      </div>
      <h4>React Course - Project 3</h4>
    </header>
  );
}

export default Header;
