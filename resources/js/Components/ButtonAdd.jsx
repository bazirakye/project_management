import React, { useState } from 'react';

const ClickCounter = ({ initialCount = 0 }) => {
  // Using useState hook to manage the click count state
  const [count, setCount] = useState(initialCount);

  // Function to handle button click
  const handleClick = () => {
    setCount(count + 1);
  };

  // Styles for the button element
  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div>
        <button
            style={buttonStyle}
            onClick={handleClick}
        >
            Click count: {count}
        </button>
    </div>
  );
};
export default ClickCounter;
