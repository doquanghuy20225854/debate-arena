import { useEffect } from 'react';

const useSocket = (url) => {
  useEffect(() => {
    // placeholder for socket connection
    // const socket = io(url || '/');
    // return () => socket.disconnect();
  }, [url]);

  return null;
};

export default useSocket;
