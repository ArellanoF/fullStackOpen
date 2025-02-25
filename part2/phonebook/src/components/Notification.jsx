import { useState, useEffect } from "react";

const Notification = ({ message }) => {
  const [visibleMessage, setVisibleMessage] = useState(message);

  useEffect(() => {
    if (message) {
      setVisibleMessage(message);
      const timer = setTimeout(() => {
        setVisibleMessage(null);
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visibleMessage) {
    return null;
  }

  return <div className="error">{visibleMessage}</div>;
};

export default Notification;
