import React, { useState, useEffect } from 'react';

const CustomAlert = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Adjust the time as per your preference (5000 ms = 5 seconds)

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`alert ${isVisible ? 'show' : 'hide'}`}>
      {message}
    </div>
  );
};

export default CustomAlert;