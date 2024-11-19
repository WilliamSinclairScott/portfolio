import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { getCable } from '../services/cable'; // Adjust the path based on your project structure

interface Message {
  user: string;
  message: string;
}

interface ChatChannel {
  speak: (data: { user: string; message: string }) => void;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [user, setUser] = useState<string>('Anonymous'); // Adjust user handling as needed

  useEffect(() => {
    const storedUser = document.cookie.split('; ').find(row => row.startsWith('username='));
    if (storedUser) {
      setUser(storedUser.split('=')[1]);
    } else {
      const newUser = `User_${Math.random().toString(36).substring(2, 15)}`;
      document.cookie = `username=${newUser}; path=/`;
      setUser(newUser);
    }
    const cable = getCable();
    const subscription = cable.subscriptions.create('ChatChannel', {
      received(data: Message) {
        setMessages((prevMessages) => [...prevMessages, data]);
      },
      speak(this: ChatChannel, data: { user: string; message: string }) {
        (this as any).perform('speak', data);
      },
    } as ChatChannel);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    // Assuming you have a single subscription in your cable instance
    const cable = getCable().subscriptions.subscriptions[0] as unknown as ChatChannel;
    cable.speak({ user, message });
    setMessage('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <div id="chat-box">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.user}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Enter message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
