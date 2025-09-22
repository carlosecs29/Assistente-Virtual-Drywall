import React, { useRef, useEffect } from 'react';
import { ChatMessage, MessageAuthor } from '../types';
import { BotIcon, UserIcon } from './IconComponents';

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-2">
    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
  </div>
);

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.author === MessageAuthor.USER;

  // Simple markdown-to-HTML for bolding, newlines, and list items.
  const formatContent = (text: string) => {
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />')
      .replace(/<br \/>\s*\*\s/g, '<br />• ')
      .replace(/<br \/>\s*-\s/g, '<br />• ');
    return { __html: formattedText };
  };

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
          <BotIcon className="w-5 h-5 text-slate-600" />
        </div>
      )}
      <div
        className={`max-w-[80%] p-3 rounded-2xl prose prose-sm max-w-none break-words ${
          isUser
            ? 'bg-sky-600 text-white rounded-br-none'
            : 'bg-slate-100 text-slate-800 rounded-bl-none'
        }`}
      >
        {message.author === MessageAuthor.ASSISTANT && !message.content ? (
          <TypingIndicator />
        ) : (
          <div
            dangerouslySetInnerHTML={formatContent(message.content)}
          />
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-slate-600" />
        </div>
      )}
    </div>
  );
};

const ChatDisplay: React.FC<{ messages: ChatMessage[]; isLoading: boolean }> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change to show the latest message.
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-grow p-6 space-y-6 overflow-y-auto">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}
    </div>
  );
};

export default ChatDisplay;
