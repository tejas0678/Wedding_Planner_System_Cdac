import api from './api';

export const sendChatMessage = async (message, sessionId) => {
  const res = await api.post('/chat/api/chat', { message, sessionId });
  return res;
};
