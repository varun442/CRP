// // RecognitionForm.js
// import React, { useState } from 'react';
// import { Award, Search } from 'lucide-react';
//
// const RecognitionForm = ({ users, currentUserId, availablePoints, onRecognize }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedUser, setSelectedUser] = useState('');
//     const [recognitionText, setRecognitionText] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [recognitionPoints, setRecognitionPoints] = useState(0);
//     const [showDropdown, setShowDropdown] = useState(false);
//
//     const filteredUsers = users.filter(user =>
//         user._id !== currentUserId &&
//         (user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             user.username.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//
//     const handleUserSelect = (user) => {
//         setSelectedUser(user._id);
//         setSearchTerm(user.fullName);
//         setShowDropdown(false);
//     };
//
//     const handleSubmit = () => {
//         if (selectedUser && recognitionText && selectedCategory && recognitionPoints > 0) {
//             onRecognize(selectedUser, recognitionPoints, selectedCategory, recognitionText);
//             setSearchTerm('');
//             setSelectedUser('');
//             setRecognitionText('');
//             setSelectedCategory('');
//             setRecognitionPoints(0);
//         }
//     };
//
//     const categories = [
//         { name: 'Community Events', icon: Users },
//         { name: 'Volunteer Work', icon: Heart },
//         { name: 'Neighborly Acts', icon: Zap },
//         { name: 'Issue Reporting', icon: AlertTriangle },
//         { name: 'Skill Sharing', icon: BookOpen },
//         { name: 'Green Initiatives', icon: Leaf },
//     ];
//
//     return (
//         <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
//             <div className="flex items-center mb-6">
//                 <Award className="w-6 h-6 mr-2 text-indigo-600" />
//                 <h3 className="text-xl font-semibold">Recognize a Neighbor</h3>
//             </div>
//             <div className="space-y-4">
//                 <div className="relative">
//                     <div className="flex items-center border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
//                         <Search className="w-5 h-5 text-gray-400 ml-3" />
//                         <input
//                             type="text"
//                             className="w-full p-3 pl-2 rounded-xl focus:outline-none"
//                             placeholder="Search for a neighbor..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             onFocus={() => setShowDropdown(true)}
//                         />
//                     </div>
//                     {showDropdown && (
//                         <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
//                             {filteredUsers.map((user) => (
//                                 <li
//                                     key={user._id}
//                                     className="p-2 hover:bg-indigo-100 cursor-pointer"
//                                     onClick={() => handleUserSelect(user)}
//                                 >
//                                     {user.fullName}
//                                 </li>
//                             ))}
//                             {filteredUsers.length === 0 && (
//                                 <li className="p-2 text-gray-500">No matching users found</li>
//                             )}
//                         </ul>
//                     )}
//                 </div>
//                 <input
//                     type="text"
//                     className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Write a recognition message..."
//                     value={recognitionText}
//                     onChange={(e) => setRecognitionText(e.target.value)}
//                 />
//                 <div className="flex flex-wrap gap-2">
//                     {categories.map((category, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setSelectedCategory(category.name)}
//                             className={`p-2 rounded-xl flex items-center ${selectedCategory === category.name ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'} hover:bg-indigo-200 transition-colors duration-200`}
//                         >
//                             {React.createElement(category.icon, { className: "w-4 h-4 mr-1" })}
//                             {category.name}
//                         </button>
//                     ))}
//                 </div>
//                 <input
//                     type="number"
//                     className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Points to award"
//                     value={recognitionPoints}
//                     onChange={(e) => setRecognitionPoints(Number(e.target.value))}
//                     min="0"
//                     max={availablePoints}
//                 />
//                 <button
//                     onClick={handleSubmit}
//                     className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
//                 >
//                     <Award className="w-5 h-5 mr-2" />
//                     Send Recognition
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default RecognitionForm;