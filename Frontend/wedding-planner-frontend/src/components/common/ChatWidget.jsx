import { useEffect, useRef, useState } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { sendChatMessage } from '../../services/chatService';

const WELCOME_MESSAGE = {
  role: 'assistant',
  text: "Hi! I'm your Wedding Planner assistant. Ask me about planners, packages, pricing, or how booking and payment work.",
};

const createSessionId = () =>
  (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const sessionIdRef = useRef(createSessionId());
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setIsSending(true);

    try {
      const res = await sendChatMessage(trimmed, sessionIdRef.current);
      const reply = res?.reply || "Sorry, I couldn't come up with a reply just now.";
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      const errorText = err?.message || 'The assistant is temporarily unavailable. Please try again shortly.';
      setMessages((prev) => [...prev, { role: 'assistant', text: errorText, isError: true }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-royal-burgundy/10 bg-white shadow-2xl sm:w-96">
          <div className="flex items-center justify-between bg-royal-burgundy px-4 py-3 text-white">
            <div>
              <p className="font-serif text-base font-semibold">Wedding Assistant</p>
              <p className="text-xs text-white/70">Ask about planners, packages &amp; bookings</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-royal-burgundy/5 px-3 py-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-royal-pink text-white'
                      : msg.isError
                      ? 'bg-red-50 text-red-700'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white px-3 py-2 text-sm text-gray-400 shadow-sm">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-royal-burgundy/10 bg-white p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              disabled={isSending}
              className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm outline-none focus:border-royal-pink"
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-royal-pink text-white transition hover:bg-royal-pink-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiSend size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-royal-pink text-white shadow-lg transition hover:bg-royal-pink-hover"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;
