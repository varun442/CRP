import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

const RecognitionItem = ({ recognition }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ease-in-out"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                background: isHovered ? 'linear-gradient(90deg, #f0f9ff, #e0f2fe)' : 'transparent',
            }}
        >
            <p className="font-semibold text-gray-700">{recognition.from}</p>

            <div className="flex items-center justify-center w-8 h-8">
                {isHovered ? (
                    <Zap className="text-yellow-500 animate-pulse" size={24} />
                ) : (
                    <ArrowRight className="text-blue-500" size={24} />
                )}
            </div>

            {(
                <p className="font-semibold text-gray-700">{recognition.to}</p>
            )}
        </div>
    );
};

export default RecognitionItem;