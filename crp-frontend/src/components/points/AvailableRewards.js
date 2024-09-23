
import React from 'react';
import { Gift, Coffee, BookOpen, Users } from 'lucide-react';
import RedeemButton from './RedeemButton';

const AvailableRewards = () => {
    const availableVouchers = [
        { name: 'Coffee Shop Voucher', points: 100, icon: Coffee },
        { name: 'Local Store Discount', points: 200, icon: Gift },
        { name: 'Online Course Access', points: 500, icon: BookOpen },
        { name: 'Community Event Ticket', points: 150, icon: Users },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-6">
                <Gift className="w-6 h-6 mr-2 text-indigo-600" />
                <h3 className="text-xl font-semibold">Available Rewards</h3>
            </div>
            <ul className="space-y-4">
                {availableVouchers.map((voucher, index) => (
                    <li key={index} className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl shadow">
                        <div className="flex items-center">
                            {React.createElement(voucher.icon, { className: "w-6 h-6 mr-3 text-indigo-600" })}
                            <span className="font-medium text-gray-700">{voucher.name}</span>
                        </div>
                        <RedeemButton points={voucher.points} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AvailableRewards;