import React, { useState, useEffect, useRef } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, Cell
} from 'recharts';
import {
    Users, Heart, Zap, AlertTriangle, BookOpen, Leaf,
    Wallet, TrendingUp, HandCoins, Coins, Coffee, Gift, Award,
    Star, Activity, Search, X
} from 'lucide-react';
import RedeemButton from "../utils/AnimatedButton";
import { fetchUsers, getUserAllPoints, submitRecognition, getAllRecognitions, getAllRecognitionsForUser } from "../services/api";
import RecognitionItem from "../utils/RecognitionItem";

const COLORS = ['#014783', '#02866e', '#ad7701', '#9b3402', '#8884d8', '#82ca9d'];
const RECOGNITIONS_PER_PAGE = 5;

const PointsManagement = () => {
    const [recognitionText, setRecognitionText] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [recognitionPoints, setRecognitionPoints] = useState(0);
    const [showPersonalRecognitions, setShowPersonalRecognitions] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [pointsData, setPointsData] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(JSON.parse(localStorage.getItem('user')).id);
    const [communityRecognitions, setCommunityRecognitions] = useState([]);
    const [personalRecognitions, setPersonalRecognitions] = useState([]);
    const [recognitionsPage, setRecognitionsPage] = useState(1);
    const [formErrors, setFormErrors] = useState({});
    const topRef = useRef(null);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [fetchedUsers, pointsInfo, allRecognitions, userRecognitions] = await Promise.all([
                    fetchUsers(),
                    getUserAllPoints(currentUserId),
                    getAllRecognitions(),
                    getAllRecognitionsForUser(currentUserId)
                ]);

                setUsers(fetchedUsers);
                setPointsData([
                    { name: 'Total', value: pointsInfo.points, icon: Wallet },
                    { name: 'Gained', value: pointsInfo.gained_points, icon: TrendingUp },
                    { name: 'Gifted', value: pointsInfo.gifted_points, icon: HandCoins },
                    { name: 'Available', value: pointsInfo.available_points || 0, icon: Coins },
                ]);
                setCommunityRecognitions(allRecognitions.recognitions);
                setPersonalRecognitions(userRecognitions.recognitions);

            } catch (error) {
                console.error('Failed to load initial data:', error);
                setAlert({ show: true, message: 'Failed to load data. Please try again later.', type: 'error' });
            }
        };
        loadInitialData();
    }, [currentUserId]);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
        setShowDropdown(searchTerm.length > 0);
    }, [searchTerm, users]);

    const handleUserSelect = (user) => {
        setSelectedUser(user._id);
        setSearchTerm(user.fullName);
        setShowDropdown(false);
        setFormErrors(prev => ({ ...prev, selectedUser: '' }));
    };

    const chartData = [
        {name: 'Community Events', value: 400, color: '#0088FE', icon: Users},
        {name: 'Volunteer Work', value: 300, color: '#00C49F', icon: Heart},
        {name: 'Neighborly Acts', value: 200, color: '#FFBB28', icon: Zap},
        {name: 'Issue Reporting', value: 100, color: '#FF8042', icon: AlertTriangle},
        {name: 'Skill Sharing', value: 150, color: '#8884d8', icon: BookOpen},
        {name: 'Green Initiatives', value: 100, color: '#82ca9d', icon: Leaf},
    ];

    const redemptionHistory = [
        {date: '2023-09-15', item: 'Coffee Voucher', points: 50, icon: Coffee},
        {date: '2023-09-10', item: 'Local Bookstore Coupon', points: 100, icon: BookOpen},
        {date: '2023-09-05', item: 'Professional Development Course', points: 500, icon: Award},
    ];

    const availableVouchers = [
        {name: 'Coffee Shop Voucher', points: 100, icon: Coffee},
        {name: 'Local Store Discount', points: 200, icon: Gift},
        {name: 'Online Course Access', points: 500, icon: BookOpen},
        {name: 'Community Event Ticket', points: 150, icon: Users},
    ];

    const validateForm = () => {
        const errors = {};
        if (!selectedUser) errors.selectedUser = 'Please select a user';
        if (!recognitionText) errors.recognitionText = 'Please enter a recognition message';
        if (!selectedCategory) errors.selectedCategory = 'Please select a category';
        if (recognitionPoints <= 0) errors.recognitionPoints = 'Please enter a valid number of points';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleRecognition = async () => {
        if (validateForm()) {
            try {

                const availablePoints = pointsData.find(item => item.name === 'Available').value;
                console.log(availablePoints);
                if (recognitionPoints <= availablePoints) {
                    await submitRecognition({
                        fromUserId: currentUserId,
                        toUserId: selectedUser,
                        message: recognitionText,
                        category: selectedCategory,
                        points: recognitionPoints
                    });

                    setAlert({show: true, message: 'Recognition submitted successfully!', type: 'success'});
                    setRecognitionText('');
                    setSelectedUser('');
                    setSelectedCategory(null);
                    setRecognitionPoints(0);
                    setSearchTerm('');
                    setFormErrors({});
                } else {
                    setAlert({ show: true, message: `Failed to submit recognition. Please select points less than ${availablePoints}`, type: 'error' });
                }

                // Refresh data after successful recognition
                const [updatedPointsInfo, allRecognitions, userRecognitions] = await Promise.all([
                    getUserAllPoints(currentUserId),
                    getAllRecognitions(),
                    getAllRecognitionsForUser(currentUserId)
                ]);

                setPointsData([
                    { name: 'Total', value: updatedPointsInfo.points, icon: Wallet },
                    { name: 'Gained', value: updatedPointsInfo.gained_points, icon: TrendingUp },
                    { name: 'Gifted', value: updatedPointsInfo.gifted_points, icon: HandCoins },
                    { name: 'Available', value: updatedPointsInfo.available_points || 0, icon: Coins },
                ]);
                setCommunityRecognitions(allRecognitions.recognitions);
                setPersonalRecognitions(userRecognitions.recognitions);

                topRef.current.scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                console.error('Failed to submit recognition:', error);
                setAlert({ show: true, message: 'Failed to submit recognition. Please try again.', type: 'error' });
            }
        }

    };

    const getCategoryIcon = (categoryName) => {
        const category = chartData.find(c => c.name === categoryName);
        return category ? category.icon : AlertTriangle;
    };

    const SectionHeader = ({icon: Icon, title}) => (
        <div className="flex items-center space-x-2 mb-6 bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-3 rounded-lg shadow-md">
            <Icon className="w-6 h-6"/>
            <h3 className="text-xl font-semibold">{title}</h3>
        </div>
    );

    const loadMoreRecognitions = () => {
        setRecognitionsPage(prev => prev + 1);
    };

    return (
        <div className="bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen p-8" ref={topRef}>
            <div className="container mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
                    <div className="flex items-center justify-center space-x-4 mb-8">
                        <Activity className="w-12 h-12 text-indigo-600"/>
                        <h1 className="text-4xl font-bold text-indigo-700">Community Engagement Hub</h1>
                    </div>
                    <p className="text-center text-gray-600 text-lg transition-all duration-1000 transform hover:scale-105">
                        Catalyzing positive change through collaborative community action and recognition
                    </p>
                </div>

                {alert.show && (
                    <div className={`${alert.type === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'} border-l-4 p-4 rounded-lg mb-8 animate-fade-in-down relative`} role="alert">
                        <p className="font-bold">{alert.type === 'success' ? 'Success!' : 'Error!'}</p>
                        <p>{alert.message}</p>
                        <button
                            onClick={() => setAlert({ ...alert, show: false })}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Points Overview */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
                            <SectionHeader icon={Star} title="Points Dashboard"/>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                {pointsData.map((item, index) => (
                                    <div key={index} className="flex items-center p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow">
                                        <item.icon className={`w-8 h-8 mr-3 text-${COLORS[index]}`}/>
                                        <div>
                                            <p className="text-xs text-gray-500">{item.name}</p>
                                            <p className="text-lg font-bold text-indigo-700">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="value" fill="#8884d8">
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color}/>
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Recognize Someone */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
                            <SectionHeader icon={Award} title="Recognize a Neighbor"/>
                            <div className="space-y-4">
                                <div className="relative">
                                    <div className={`flex items-center border ${formErrors.selectedUser ? 'border-red-500' : 'border-gray-300'} rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500`}>
                                        <Search className="w-5 h-5 text-gray-400 ml-3"/>
                                        <input
                                            type="text"
                                            className="w-full p-3 pl-2 rounded-xl focus:outline-none"
                                            placeholder="Search for a neighbor..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onFocus={() => setShowDropdown(true)}
                                        />
                                    </div>
                                    {formErrors.selectedUser && <p className="text-red-500 text-sm mt-1">{formErrors.selectedUser}</p>}
                                    {showDropdown && (
                                        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
                                            {filteredUsers.map((user) => (
                                                <li
                                                    key={user._id}
                                                    className="p-2 hover:bg-indigo-100 cursor-pointer"
                                                    onClick={() => handleUserSelect(user)}
                                                >
                                                    {user.fullName}
                                                </li>
                                            ))}
                                            {filteredUsers.length === 0 && (
                                                <li className="p-2 text-gray-500">No matching users found</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className={`w-full p-3 border ${formErrors.recognitionText ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                                        placeholder="Write a recognition message..."
                                        value={recognitionText}
                                        onChange={(e) => {
                                            setRecognitionText(e.target.value);
                                            setFormErrors(prev => ({ ...prev, recognitionText: '' }));
                                        }}
                                    />
                                    {formErrors.recognitionText && <p className="text-red-500 text-sm mt-1">{formErrors.recognitionText}</p>}
                                </div>
                                <div>
                                    <div className="flex flex-wrap gap-2">
                                        {chartData.map((category, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setSelectedCategory(category.name);
                                                    setFormErrors(prev => ({ ...prev, selectedCategory: '' }));
                                                }}
                                                className={`p-2 rounded-xl flex items-center ${selectedCategory === category.name ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'} hover:bg-indigo-200 transition-colors duration-200 ${formErrors.selectedCategory ? 'border border-red-500' : ''}`}
                                            >
                                                {React.createElement(category.icon, {className: "w-4 h-4 mr-1"})}
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                    {formErrors.selectedCategory && <p className="text-red-500 text-sm mt-1">{formErrors.selectedCategory}</p>}
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        className={`w-full p-3 border ${formErrors.recognitionPoints ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                                        placeholder="Points to award"
                                        value={recognitionPoints}
                                        onChange={(e) => {
                                            setRecognitionPoints(Number(e.target.value));
                                            setFormErrors(prev => ({ ...prev, recognitionPoints: '' }));
                                        }}
                                        min="0"
                                        max={pointsData.find(item => item.name === 'Available')?.value || 0}
                                    />
                                    {formErrors.recognitionPoints && <p className="text-red-500 text-sm mt-1">{formErrors.recognitionPoints}</p>}
                                </div>
                                <button
                                    onClick={handleRecognition}
                                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
                                >
                                    <Award className="w-5 h-5 mr-2"/>
                                    Send Recognition
                                </button>
                            </div>
                        </div>

                        {/* Recognitions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <SectionHeader icon={Heart} title="Community Recognitions"/>
                                <button
                                    onClick={() => setShowPersonalRecognitions(!showPersonalRecognitions)}
                                    className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-200 transition-colors duration-200"
                                >
                                    {showPersonalRecognitions ? 'Community Feed' : 'Your Recognitions'}
                                </button>
                            </div>
                            <ul className="space-y-4 max-h-96 overflow-y-auto">
                                {(showPersonalRecognitions ? personalRecognitions : communityRecognitions)
                                    .slice(0, recognitionsPage * RECOGNITIONS_PER_PAGE)
                                    .map((recognition, index) => (
                                        <li key={recognition.id} className="border-b border-gray-200 pb-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                        {React.createElement(getCategoryIcon(recognition.category), {className: "w-6 h-6 text-indigo-600"})}
                                                    </div>
                                                    <div>
                                                        <RecognitionItem recognition={recognition}  />
                                                        <p className="text-sm text-indigo-500">{recognition.category}</p>
                                                    </div>
                                                </div>
                                                <span className="text-indigo-600 font-medium bg-indigo-100 px-3 py-1 rounded-full">{recognition.points} pts</span>
                                            </div>
                                            <p className="text-gray-600 mt-2">{recognition.message}</p>
                                            <p className="text-xs text-gray-400 mt-1">{new Date(recognition.date).toLocaleString()}</p>
                                        </li>
                                    ))}
                            </ul>
                            {(showPersonalRecognitions ? personalRecognitions : communityRecognitions).length > recognitionsPage * RECOGNITIONS_PER_PAGE && (
                                <button
                                    onClick={loadMoreRecognitions}
                                    className="mt-4 w-full bg-indigo-100 text-indigo-600 py-2 px-4 rounded-xl hover:bg-indigo-200 transition-colors duration-200"
                                >
                                    Load More
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Available Vouchers */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
                            <SectionHeader icon={Gift} title="Available Rewards"/>
                            <ul className="space-y-4">
                                {availableVouchers.map((voucher, index) => (
                                    <li key={index} className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl shadow">
                                        <div className="flex items-center">
                                            {React.createElement(voucher.icon, {className: "w-6 h-6 mr-3 text-indigo-600"})}
                                            <span className="font-medium text-gray-700">{voucher.name}</span>
                                        </div>
                                        <RedeemButton points={voucher.points}/>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Redemption History */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
                            <SectionHeader icon={Activity} title="Redemption History"/>
                            <ul className="space-y-4">
                                {redemptionHistory.map((item, index) => (
                                    <li key={index} className="flex items-center justify-between border-b border-gray-200 pb-4">
                                        <div className="flex items-center">
                                            {React.createElement(item.icon, {className: "w-6 h-6 mr-3 text-indigo-600"})}
                                            <div>
                                                <p className="font-medium text-gray-700">{item.item}</p>
                                                <p className="text-xs text-gray-500">{item.date}</p>
                                            </div>
                                        </div>
                                        <span className="text-indigo-600 font-medium bg-indigo-100 px-3 py-1 rounded-full">-{item.points} pts</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Points Over Time Chart */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
                            <SectionHeader icon={TrendingUp} title="Points Trend"/>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={[
                                    {name: 'Jan', points: 400},
                                    {name: 'Feb', points: 600},
                                    {name: 'Mar', points: 550},
                                    {name: 'Apr', points: 780},
                                    {name: 'May', points: 850},
                                    {name: 'Jun', points: 1250},
                                ]}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Line type="monotone" dataKey="points" stroke="#8884d8" strokeWidth={2} dot={{r: 4}}/>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointsManagement;