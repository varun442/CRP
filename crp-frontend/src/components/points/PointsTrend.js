import React from 'react';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PointsTrend = () => {
    const data = [
        { name: 'Jan', points: 400 },
        { name: 'Feb', points: 600 },
        { name: 'Mar', points: 550 },
        { name: 'Apr', points: 780 },
        { name: 'May', points: 850 },
        { name: 'Jun', points: 1250 },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-6">
                <TrendingUp className="w-6 h-6 mr-2 text-indigo-600" />
                <h3 className="text-xl font-semibold">Points Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="points" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PointsTrend;