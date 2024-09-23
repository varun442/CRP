import React from 'react';
import { Heart } from 'lucide-react';

const RecognitionsList = ({ showPersonalRecognitions, onTogglePersonal }) => {
    const communityRecognitions = [
        {
            from: 'John Doe',
            to: 'Jane Smith',
            message: 'Thanks for organizing the neighborhood watch!',
            category: 'Community Events',
            points: 50
        },
        {
            from: 'Emily Brown',
            to: 'Mike Johnson',
            message: 'Great job on the community garden!',
            category: 'Green Initiatives',
            points: 75
        },
        {
            from: 'David Wilson',
            to: 'John Doe',
            message: 'Your efforts in the cleanup drive were amazing!',
            category: 'Volunteer Work',
            points: 100
        },
    ];

    const personalRecognitions = [
        {
            from: 'Jane Smith',
            message: 'Thank you for helping with the elderly care program!',
            category: 'Neighborly Acts',
            points: 80
        },
        {
            from: 'Mike Johnson',
            message: 'Your initiative in starting the book club is appreciated!',
            category: 'Skill Sharing',
            points: 60
        },
    ];

    const recognitions = showPersonalRecognitions ? personalRecognitions : communityRecognitions;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <Heart className="w-6 h-6 mr-2 text-indigo-600" />
                    <h3 className="text-xl font-semibold">Community Recognitions</h3>
                </div>
                <button
                    onClick={onTogglePersonal}
                    className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-200 transition-colors duration-200"
                >
                    {showPersonalRecognitions ? 'Community Feed' : 'Your Recognitions'}
                </button>
            </div>
            <ul className="space-y-4">
                {recognitions.map((recognition, index) => (
                    <li key={index} className="border-b border-gray-200 pb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-700">{recognition.from} {showPersonalRecognitions ? '' : `→ ${recognition.to}`}</p>
                                    <p className="text-sm text-indigo-500">{recognition.category}</p>
                                </div>
                            </div>
                            <span className="text-indigo-600 font-medium bg-indigo-100 px-3 py-1 rounded-full">{recognition.points} pts</span>
                        </div>
                        <p className="text-gray-600 mt-2">{recognition.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecognitionsList;