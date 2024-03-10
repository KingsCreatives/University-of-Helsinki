import React from 'react';

function Main() {
  return (
    <main className="main">
      <div className="main--inputs">
        <label htmlFor="top">
          <input type="text" id="top" />
        </label>
        <label htmlFor="bottom">
          <input type="text" id="bottom" />
        </label>
      </div>
      <button className="main--btn">Generate meme</button>
    </main>
  );
}

export default Main;
