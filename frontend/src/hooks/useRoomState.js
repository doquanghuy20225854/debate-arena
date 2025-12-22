import { useState } from 'react';

const useRoomState = () => {
  const [participants, setParticipants] = useState([]);
  const [topic, setTopic] = useState('Placeholder Topic');

  return { participants, setParticipants, topic, setTopic };
};

export default useRoomState;
