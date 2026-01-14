import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Halo, ada yang bisa saya bantu?', sender: 'admin', time: '10:30' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');

      setTimeout(() => {
        const adminMessage = {
          id: messages.length + 2,
          text: 'Terima kasih telah menghubungi kami. Tim kami akan segera merespons.',
          sender: 'admin',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, adminMessage]);
      }, 500);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 md:right-8 w-80 bg-white rounded-2xl shadow-2xl flex flex-col h-96 z-40">
          <div className="bg-green-600 text-white p-4 flex justify-between items-center rounded-t-2xl">
            <h3 className="font-bold">Chat Admin Beres.in</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-700 p-1 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-xs mt-1 block ${
                      msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-3 flex gap-2">
            <input
              type="text"
              placeholder="Ketik pesan..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
              onClick={handleSend}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:right-8 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-40 flex items-center gap-2"
      >
        <MessageCircle size={24} />
        {!isOpen && <span className="text-sm font-medium">Chat Admin</span>}
      </button>
    </>
  );
}
