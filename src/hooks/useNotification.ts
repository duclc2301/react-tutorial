import NotificationContext from 'context/NotificationContext';
import { useContext } from 'react';

const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'NotificationContext must be used within a NotificationProvider'
    );
  }

  return context;
};

export default useNotification;
