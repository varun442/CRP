// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
//
// const PointsOverview = ({ pointsData }) => {
//     const COLORS = ['#014783', '#02866e', '#ad7701', '#9b3402'];
//
//     return (
//         <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
//             <div className="flex items-center mb-6">
//                 <Star className="w-6 h-6 mr-2 text-indigo-600" />
//                 <h3 className="text-xl font-semibold">Points Dashboard</h3>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//                 {pointsData.map((item, index) => (
//                     <div key={index} className="flex items-center p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow">
//                         {React.createElement(item.icon, { className: `w-8 h-8 mr-3 text-${COLORS[index]}` })}
//                         <div>
//                             <p className="text-xs text-gray-500">{item.name}</p>
//                             <p className="text-lg font-bold text-indigo-700">{item.value}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={pointsData}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="value" fill="#8884d8">
//                         {pointsData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                         // PointsOverview.js (continued)
//                     </Bar>
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };
//
// export default PointsOverview;