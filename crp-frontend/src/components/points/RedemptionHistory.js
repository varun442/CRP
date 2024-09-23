import React from 'react';
import { Activity, Coffee, BookOpen, Award } from 'lucide-react';

const RedemptionHistory = () => {
    const redemptionHistory = [
        { date: '2023-09-15', item: 'Coffee Voucher', points: 50, icon: Coffee },
        { date: '2023-09-10', item: 'Local Bookstore Coupon', points: 100, icon: BookOpen },
        { date: '2023-09-05', item: 'Professional Development Course', points: 500, icon: Award },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-6">
                <Activity className="w-6 h-6 mr-2 text-indigo-600" />
                <h3 className="text-xl font-semibold">Redemption History</h3>
            </div>
            <ul className="space-y-4">
                {redemptionHistory.map((item, index) => (
                    <li key={index} className="flex items-center justify-between border-b border-gray-200 pb-4">
                        <div className="flex items-center">
                            {React.createElement(item.icon, { className: "w-6 h-6 mr-3 text-indigo-600" })}
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
    );
};

export default RedemptionHistory;