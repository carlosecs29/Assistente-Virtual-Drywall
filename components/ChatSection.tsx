
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Chat } from '@google/genai';
import { createChat } from '../services/geminiService';
import { ChatMessage, MessageAuthor } from '../types';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';

const ChatSection: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      author: MessageAuthor.ASSISTANT,
      content: "Olá! Sou o ConstructoBot. Como posso ajudar com suas dúvidas sobre drywall ou steel frame hoje?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize the chat session when the component mounts
    setChat(createChat());
  }, []);

  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!inputText.trim() || isLoading || !chat) return;

    const newUserMessage: ChatMessage = { author: MessageAuthor.USER, content: inputText };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    setError(null);

    // Add a placeholder for the assistant's response
    setMessages(prev => [...prev, { author: MessageAuthor.ASSISTANT, content: '' }]);

    try {
      const stream = await chat.sendMessageStream({ message: inputText });
      
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.author === MessageAuthor.ASSISTANT) {
            const updatedMessages = [...prev];
            updatedMessages[prev.length - 1] = {
              ...lastMessage,
              content: lastMessage.content + chunkText,
            };
            return updatedMessages;
          }
          return prev;
        });
      }
    } catch (e) {
      console.error(e);
      const errorMessage = "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.";
      setError(errorMessage);
       setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.author === MessageAuthor.ASSISTANT && lastMessage.content === '') {
             const updatedMessages = [...prev];
             updatedMessages[prev.length - 1] = { ...lastMessage, content: errorMessage };
             return updatedMessages;
          }
          return [...prev, { author: MessageAuthor.ASSISTANT, content: errorMessage }];
       });

    } finally {
      setIsLoading(false);
    }
  }, [isLoading, chat]);

  return (
    <section id="chat" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/50 flex flex-col h-[70vh]">
            <div className="p-4 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 text-center">Converse com o Especialista</h2>
            </div>
            <ChatDisplay messages={messages} isLoading={isLoading} />
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
             {error && <p className="p-4 text-center text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;
