import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Home as HomeIcon, Users, MessageCircle, X, Send, Bot } from 'lucide-react';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { generateResponse } from '../services/geminiAPI';

const events = [
    {
        id: 1,
        title: 'Community Clean-up',
        date: '2024-10-01',
        description: 'Join us for a neighborhood clean-up event!',
        location: 'Main Street Park',
        organizer: 'Green Initiative',
        attendees: 30,
        type: 'Volunteer Opportunity'
    },
    {
        id: 2,
        title: 'Town Hall Meeting',
        date: '2024-10-15',
        description: 'Discuss important community issues with local leaders.',
        location: 'City Hall',
        organizer: 'Mayor\'s Office',
        attendees: 50,
        type: 'Town Hall'
    },
    {
        id: 3,
        title: 'Volunteer Fair',
        date: '2024-10-30',
        description: 'Explore various volunteer opportunities in our area.',
        location: 'Community Center',
        organizer: 'Volunteer Network',
        attendees: 75,
        type: 'Community Event'
    },
];

const HomePage = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('Explain about your app');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleChatToggle = () => {
        setIsChatOpen(!isChatOpen);
        if (!isChatOpen && messages.length === 0) {
            setMessages([{ 
                text: "Hi there! I'm Restore Connect, an AI assistant for the Community Restoration Project app. How can I help you today?", 
                sender: 'bot' 
            }]);
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;
    
        setMessages([...messages, { text: inputMessage, sender: 'user' }]);
        setInputMessage('');
    
        try {
            const response = await generateResponse(inputMessage);
            setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot' }]);
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            setMessages(prevMessages => [...prevMessages, { text: "Sorry, I couldn't process your request.", sender: 'bot' }]);
        }
    };

    return (
        <div className="flex flex-col min-h-screen relative">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Building Stronger Communities Together</h1>
                            <p className="text-xl mb-6">Join us in creating a vibrant, connected neighborhood where everyone thrives.</p>
                            <Link to="/signup" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
                                Get Involved
                            </Link>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src='https://static.vecteezy.com/system/resources/previews/026/797/560/non_2x/solidarity-unite-people-hands-together-community-teamwork-realistic-image-ultra-hd-free-photo.jpg'
                                alt="Community" className="rounded-lg shadow-lg h-[500px] w-[900px]"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto my-16 px-4">
                {/* Featured Quote */}
                <div className="text-center mb-16">
                    <blockquote className="text-2xl text-gray-600 mb-4">
                        "The greatness of a community is most accurately measured by the compassionate actions of its members."
                    </blockquote>
                    <p className="text-gray-500">- Coretta Scott King</p>
                </div>

                {/* Upcoming Events Section */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event}/>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link to="/events" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold">
                            View All Events <ArrowRight size={20} className="ml-2"/>
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section className="mb-16 pt-50">
                    <h2 className="text-3xl font-bold mb-8 text-center">Why Join Our Community?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <Calendar size={48} className="mx-auto mb-4 text-blue-600"/>
                            <h3 className="text-xl font-semibold mb-2">Engaging Events</h3>
                            <p className="text-gray-600">Participate in a variety of community events and activities.</p>
                        </div>
                        <div className="text-center">
                            <Users size={48} className="mx-auto mb-4 text-blue-600"/>
                            <h3 className="text-xl font-semibold mb-2">Connect with Neighbors</h3>
                            <p className="text-gray-600">Build meaningful relationships within your community.</p>
                        </div>
                        <div className="text-center">
                            <HomeIcon size={48} className="mx-auto mb-4 text-blue-600"/>
                            <h3 className="text-xl font-semibold mb-2">Improve Your Area</h3>
                            <p className="text-gray-600">Contribute to projects that enhance our shared spaces.</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Chat Button */}
            <button
                className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                onClick={handleChatToggle}
            >
                <Bot size={32} />
            </button>

            {/* Chat Window */}
            {isChatOpen && (
                <div className="fixed bottom-24 right-4 w-96 bg-white rounded-lg shadow-xl flex flex-col">
                    <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-t-lg">
                        <h3 className="font-semibold text-lg flex items-center">
                            <Bot size={24} className="mr-2" />
                            Restore Connect
                        </h3>
                        <button onClick={handleChatToggle} className="text-white hover:text-gray-200">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex-grow overflow-y-auto p-4 h-96">
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <span className={`inline-block p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                    {message.text}
                                </span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type a message..."
                                className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 transition duration-300"
                            >
                                <Send size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;