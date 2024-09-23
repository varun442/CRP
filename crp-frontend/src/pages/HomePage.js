import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Home as HomeIcon, Users, X, Send, Bot } from 'lucide-react';
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

const TypeWriter = ({ text, speed = 100 }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayText('');
                setCurrentIndex(0);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    return <span>{displayText}</span>;
};

const HomePage = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

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
            setMessages(prevMessages => [...prevMessages, {
                text: "Sorry, I couldn't process your request.",
                sender: 'bot'
            }]);
        }
    };

    const redirectToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="flex flex-col min-h-screen relative bg-gray-200">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-cyan-500 to-cyan-700 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="bg-white/10 backdrop-blur-lg border-none text-white p-8 rounded-lg">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="md:w-1/2 mb-8 md:mb-0">
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-950 via-cyan-800 to-red-500">
                                        <TypeWriter text="Building Stronger Communities Together" speed={100} />
                                    </span>
                                </h1>
                                <div className="h-8"></div>
                                <p className="text-xl mb-6"><i>Join us in creating a vibrant, connected neighborhood where
                                    everyone thrives.</i></p>
                                <div className="space-x-4">
                                    <button
                                        onClick={redirectToLogin}
                                        className="
                                            inline-block px-6 py-3 rounded-full font-semibold text-white
                                            bg-gradient-to-r from-blue-800 via-purple-900 to-pink-900
                                            hover:from-blue-600 hover:via-purple-600 hover:to-pink-600
                                            transform hover:scale-105 transition duration-300
                                            shadow-lg hover:shadow-xl
                                            border border-white/20 backdrop-blur-sm
                                        "
                                    >
                                        Get Involved
                                    </button>
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <img
                                    src='https://static.vecteezy.com/system/resources/previews/026/797/560/non_2x/solidarity-unite-people-hands-together-community-teamwork-realistic-image-ultra-hd-free-photo.jpg'
                                    alt="Community" className="rounded-lg shadow-lg h-[500px] w-[900px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto my-16 px-4">
                {/* Featured Quote */}
                <div className="mb-16 p-8 text-center bg-gradient-to-r from-blue-400 to-blue-200 rounded-lg shadow">
                    <blockquote className="text-2xl text-gray-700 mb-4">
                        "The greatness of a community is most accurately measured by the compassionate actions of its
                        members."
                    </blockquote>
                    <p className="text-gray-600 font-semibold">- Coretta Scott King</p>
                </div>

                {/* Upcoming Events Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Upcoming Events</h2>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} onClick={redirectToLogin} />
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <button onClick={redirectToLogin} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold">
                            View All Events <ArrowRight size={20} className="ml-2" />
                        </button>
                    </div>
                </section>

                {/* Features Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Why Join Our Community?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Calendar,
                                title: "Engaging Events",
                                description: "Participate in a variety of community events and activities."
                            },
                            {
                                icon: Users,
                                title: "Connect with Neighbors",
                                description: "Build meaningful relationships within your community."
                            },
                            {
                                icon: HomeIcon,
                                title: "Improve Your Area",
                                description: "Contribute to projects that enhance our shared spaces."
                            }
                        ].map((feature, index) => (
                            <div key={index}
                                 className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                 onClick={redirectToLogin}
                            >
                                <feature.icon size={48} className="mx-auto mb-4 text-blue-600" />
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
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
                            <div key={index}
                                 className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <span
                                    className={`inline-block p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
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