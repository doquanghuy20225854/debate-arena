import { useState } from 'react';

const useRoomState = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [topic, setTopic] = useState<string>('Placeholder Topic');

  return { participants, setParticipants, topic, setTopic } as const;
};

export default useRoomState;
