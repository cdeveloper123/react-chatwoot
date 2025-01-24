import { io, Socket } from 'socket.io-client';
import { Message } from '../types/chat';

let socket: Socket | undefined;

export const initSocket = (url: string): Socket => {
  socket = io(url);

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initSocket first.');
  }
  return socket;
};

export const fetchMessages = (conversationId: string): Promise<Message[]> => {
  return new Promise((resolve, reject) => {
    socket.emit('fetch_messages', { conversationId }, (response: { messages: Message[] }) => {
      if (response.messages) {
        resolve(response.messages);
      } else {
        reject(new Error('Failed to fetch messages'));
      }
    });
  });
};

