import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, ThumbsUp, ThumbsDown, Loader, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateResponse } from '../services/geminiAPI';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setMessages([
                {
                    id: 1,
                    points: [
                        "Hello! I'm your Community Restoration Project assistant.",
                        "How can I help you today?",
                        "Ask me about events, volunteering, or community initiatives!"
                    ],
                    sender: 'bot'
                },
            ]);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            const newUserMessage = { id: Date.now(), points: [input], sender: 'user' };
            setMessages(prev => [...prev, newUserMessage]);
            setInput('');
            setIsLoading(true);
            setIsTyping(true);

            try {
                const response = await generateResponse(input);
                setIsTyping(false);
                setTimeout(() => {
                    const points = response.split('\n').filter(point => point.trim() !== '');
                    const newBotMessage = { id: Date.now(), points, sender: 'bot' };
                    setMessages(prev => [...prev, newBotMessage]);
                    setIsLoading(false);
                }, 500);
            } catch (error) {
                console.error('Error generating response:', error);
                setMessages(prev => [...prev, { id: Date.now(), points: ["I'm sorry, I couldn't process your request. Please try again."], sender: 'bot' }]);
                setIsLoading(false);
                setIsTyping(false);
            }
        }
    };

    const handleReaction = (messageId, reaction) => {
        setMessages(prev =>
            prev.map(msg =>
                msg.id === messageId
                    ? { ...msg, reaction: msg.reaction === reaction ? null : reaction }
                    : msg
            )
        );
    };

    const renderMessageContent = (msg) => {
        if (Array.isArray(msg.points) && msg.points.length > 0) {
            return (
                <ul className="list-none p-0 m-0 space-y-1">
                    {msg.points.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            );
        } else if (typeof msg.text === 'string') {
            return <p>{msg.text}</p>;
        } else {
            return <p>Error: Unable to display message content.</p>;
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={toggleChat}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                    >
                        <MessageSquare size={28} />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-white rounded-lg shadow-2xl w-96 h-[32rem] flex flex-col overflow-hidden"
                    >
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex justify-between items-center">
                            <h3 className="font-bold text-lg flex items-center">
                                <Bot size={24} className="mr-2" />
                                Community Assistant
                            </h3>
                            <button onClick={toggleChat} className="text-white hover:text-gray-200 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-3/4 p-3 rounded-lg shadow-md ${
                                        msg.sender === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {renderMessageContent(msg)}
                                        {msg.sender === 'bot' && (
                                            <div className="mt-2 flex justify-end space-x-2">
                                                <button onClick={() => handleReaction(msg.id, 'like')} className={`p-1 rounded ${msg.reaction === 'like' ? 'bg-green-200' : 'hover:bg-gray-200'}`}>
                                                    <ThumbsUp size={16} />
                                                </button>
                                                <button onClick={() => handleReaction(msg.id, 'dislike')} className={`p-1 rounded ${msg.reaction === 'dislike' ? 'bg-red-200' : 'hover:bg-gray-200'}`}>
                                                    <ThumbsDown size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg shadow-md flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full p-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                                >
                                    {isLoading ? <Loader size={24} className="animate-spin" /> : <Send size={24} />}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBot;