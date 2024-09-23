import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X, AlertTriangle } from 'lucide-react';

const Logout = ({ onClose, onLogout }) => {
    const handleLogout = () => {
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md"
            >
                <div className="relative bg-gradient-to-br from-red-400 to-pink-500 p-8 text-white">
                    <motion.h2
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold mb-2"
                    >
                        Logout Confirmation
                    </motion.h2>
                    <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-red-100"
                    >
                        Are you sure you want to log out?
                    </motion.p>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 500 }}
                        className="absolute top-4 right-4 w-20 h-20 bg-white bg-opacity-30 rounded-full flex items-center justify-center"
                    >
                        <AlertTriangle size={40} className="text-white" />
                    </motion.div>
                </div>
                <div className="p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="logout-confirmation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <p className="text-gray-600 text-center">
                                You will be signed out of your account. Any unsaved changes may be lost.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    <X className="w-5 h-5 mr-2" />
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                >
                                    <LogOut className="w-5 h-5 mr-2" />
                                    Logout
                                </motion.button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default Logout;