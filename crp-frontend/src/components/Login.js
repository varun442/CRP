import React, {useState, useRef, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Mail, Lock, User, ArrowRight, LogIn, Twitter, Facebook, ArrowLeft, Eye, EyeOff, Check, X} from 'lucide-react';

const Login = ({onClose, onLogin}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLogin && password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }
        setPasswordMismatch(false);
        onLogin(email, password, !isLogin);
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setPassword('');
        setConfirmPassword('');
        setPasswordMismatch(false);
        setIsForgotPassword(false);
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        // Simulate sending a password reset email
        setTimeout(() => {
            setResetEmailSent(true);
            // Redirect back to login after 3 seconds
            setTimeout(() => {
                setIsForgotPassword(false);
                setResetEmailSent(false);
            }, 3000);
        }, 1500);
    };

    const passwordRules = [
        {rule: 'At least 8 characters long', regex: /.{8,}/},
        {rule: 'Contains at least one uppercase letter', regex: /[A-Z]/},
        {rule: 'Contains at least one lowercase letter', regex: /[a-z]/},
        {rule: 'Contains at least one number', regex: /\d/},
        {rule: 'Contains at least one special character', regex: /[!@#$%^&*(),.?":{}|<>]/},
    ];

    const checkPasswordStrength = (password) => {
        return passwordRules.filter(({regex}) => regex.test(password)).length;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <motion.div
                ref={modalRef}
                initial={{scale: 0.9, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                exit={{scale: 0.9, opacity: 0}}
                transition={{type: 'spring', stiffness: 300, damping: 30}}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md"
            >
                <div className="relative bg-gradient-to-br from-blue-400 to-purple-500 p-8 text-white">
                    <motion.h2
                        initial={{y: -20, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{delay: 0.1}}
                        className="text-3xl font-bold mb-2"
                    >
                        {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
                    </motion.h2>
                    <motion.p
                        initial={{y: -20, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{delay: 0.2}}
                        className="text-blue-100"
                    >
                        {isForgotPassword
                            ? 'Enter your email to reset your password'
                            : isLogin
                                ? 'Log in to access your account'
                                : 'Sign up to get started'}
                    </motion.p>
                    <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{delay: 0.3, type: 'spring', stiffness: 500}}
                        className="absolute top-4 right-4 w-20 h-20 bg-white bg-opacity-30 rounded-full flex items-center justify-center"
                    >
                        <User size={40} className="text-white"/>
                    </motion.div>
                </div>
                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {isForgotPassword ? (
                            <motion.form
                                key="forgot-password"
                                initial={{opacity: 0, x: 20}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -20}}
                                transition={{duration: 0.3}}
                                onSubmit={handleForgotPassword}
                                className="space-y-6"
                            >
                                <motion.div
                                    className="space-y-2"
                                    whileHover={{scale: 1.02}}
                                    transition={{type: 'spring', stiffness: 400, damping: 10}}
                                >
                                    <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400"/>
                                        </div>
                                        <input
                                            id="reset-email"
                                            name="reset-email"
                                            type="email"
                                            required
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-md transition-all"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </motion.div>
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    type="submit"
                                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    {resetEmailSent ? 'Email Sent!' : 'Reset Password'}
                                </motion.button>
                                {resetEmailSent && (
                                    <motion.p
                                        initial={{opacity: 0, y: 10}}
                                        animate={{opacity: 1, y: 0}}
                                        className="text-sm text-green-600 text-center"
                                    >
                                        Check your email for reset instructions.
                                    </motion.p>
                                )}
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    onClick={() => setIsForgotPassword(false)}
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center mx-auto"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4"/>
                                    Back to Login
                                </motion.button>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="login-signup"
                                initial={{opacity: 0, x: 20}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -20}}
                                transition={{duration: 0.3}}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <motion.div
                                    className="space-y-2"
                                    whileHover={{scale: 1.02}}
                                    transition={{type: 'spring', stiffness: 400, damping: 10}}
                                >
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400"/>
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-md transition-all"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="space-y-2"
                                    whileHover={{scale: 1.02}}
                                    transition={{type: 'spring', stiffness: 400, damping: 10}}
                                >
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400"/>
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 py-3 sm:text-sm border-gray-300 rounded-md transition-all ${
                                                passwordMismatch ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                                            }`}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5"/> :
                                                    <Eye className="h-5 w-5"/>}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>

                                {!isLogin && (
                                    <motion.div
                                        className="space-y-2"
                                        whileHover={{scale: 1.02}}
                                        transition={{type: 'spring', stiffness: 400, damping: 10}}
                                    >
                                        <label htmlFor="confirmPassword"
                                               className="block text-sm font-medium text-gray-700">
                                            Confirm Password
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div
                                                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400"/>
                                            </div>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                required
                                                className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 py-3 sm:text-sm border-gray-300 rounded-md transition-all ${
                                                    passwordMismatch ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                                                }`}
                                                placeholder="••••••••"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-5 w-5"/> :
                                                        <Eye className="h-5 w-5"/>}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {!isLogin && (
                                    <motion.div
                                        initial={{opacity: 0, y: -10}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: -10}}
                                        className="text-sm space-y-2"
                                    >
                                        <h4 className="font-semibold text-gray-700">Password strength:</h4>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                                                initial={{width: '0%'}}
                                                animate={{width: `${(checkPasswordStrength(password) / passwordRules.length) * 100}%`}}
                                                transition={{duration: 0.5}}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            {passwordRules.map(({rule, regex}, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{opacity: 0, x: -20}}
                                                    animate={{opacity: 1, x: 0}}
                                                    transition={{delay: index * 0.1}}
                                                    className={`flex items-center transition-colors duration-300 ${
                                                        password.match(regex) ? 'text-green-600' : 'text-red-600'
                                                    }`}
                                                >
                                                    {password.match(regex) ? (
                                                        <Check className="h-4 w-4 mr-2"/>
                                                    ) : (
                                                        <X className="h-4 w-4 mr-2"/>
                                                    )}
                                                    <span>{rule}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {passwordMismatch && (
                                    <motion.p
                                        initial={{opacity: 0, y: -10}}
                                        animate={{opacity: 1, y: 0}}
                                        className="text-sm text-red-600 flex items-center"
                                    >
                                        <X className="h-4 w-4 mr-2"/>
                                        Passwords do not match
                                    </motion.p>
                                )}

                                {isLogin && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm">
                                            <button
                                                type="button"
                                                onClick={() => setIsForgotPassword(true)}
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Forgot your password?
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    type="submit"
                                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    <LogIn className="w-5 h-5 mr-2"/>
                                    {isLogin ? 'Sign In' : 'Sign Up'}
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {!isForgotPassword && (
                        <>
                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"/>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    <motion.a
                                        href="https://twitter.com/login"
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.9}}
                                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                                    >
                                        <Twitter className="h-5 w-5 text-blue-400"/>
                                    </motion.a>
                                    <motion.a
                                        href="https://www.facebook.com/login"
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.9}}
                                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                                    >
                                        <Facebook className="h-5 w-5 text-blue-600"/>
                                    </motion.a>
                                    <motion.a
                                        href="https://accounts.google.com/signin"
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.9}}
                                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                                    >
                                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                            <path d="M1 1h22v22H1z" fill="none"/>
                                        </svg>
                                    </motion.a>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    onClick={switchMode}
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center mx-auto"
                                >
                                    {isLogin ? (
                                        <>
                                            Need an account? Sign Up
                                            <ArrowRight className="ml-2 h-4 w-4"/>
                                        </>
                                    ) : (
                                        <>
                                            <ArrowLeft className="mr-2 h-4 w-4"/>
                                            Already have an account? Sign In
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Login;