import React, {useState, useEffect} from 'react';
import {
    ThumbsUp, MessageCircle, Share2, MoreHorizontal, Send, Filter,
    Bookmark, Award, Trash2, Edit, ChevronDown, ChevronUp, Plus, User
} from 'lucide-react';
import dummyPosts from "../data/DummyPosts";


const ForumFeed = () => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [filterTag, setFilterTag] = useState('all');
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [newPost, setNewPost] = useState({title: '', content: '', tags: []});
    const [hoveredButton, setHoveredButton] = useState(null);
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
    const [viewFilter, setViewFilter] = useState('all'); // 'all', 'myPosts', 'bookmarks'

    const [chats, setChats] = useState([
        {id: 1, username: 'Mary', lastMessage: 'Hey, how are you?', unread: 2},
        {id: 2, username: 'Vanessa', lastMessage: 'See you at the event!', unread: 0},
        {id: 3, username: 'Bob', lastMessage: 'Thanks for your help!', unread: 1},
        {id: 4, username: 'Alice', lastMessage: 'Did you see the new community post?', unread: 3},
        {id: 5, username: 'Charlie', lastMessage: 'I have a question about the upcoming meeting.', unread: 0},
        {id: 6, username: 'Eva', lastMessage: 'The park cleanup was a great success!', unread: 1},
        {id: 7, username: 'David', lastMessage: 'Can you help me with a neighborhood issue?', unread: 0},
    ]);

    const [selectedChat, setSelectedChat] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const currentUserId = JSON.parse(localStorage.getItem('user')).id;
    const userName = JSON.parse(localStorage.getItem('user')).fullName;
    useEffect(() => {
        // Simulating an API call
        setPosts(dummyPosts);
    }, []);

    const handleCreatePost = () => {
        const post = {
            _id: Date.now().toString(),
            ...newPost,
            author: {_id: currentUserId, username: userName},
            likes: [],
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setPosts([post, ...posts]);
        setNewPost({title: '', content: '', tags: []});
        setShowCreatePost(false);
    };

    const handleLike = (postId) => {
        setPosts(posts.map(post =>
            post._id === postId
                ? {
                    ...post, likes: post.likes.includes(currentUserId)
                        ? post.likes.filter(id => id !== currentUserId)
                        : [...post.likes, userName]
                }
                : post
        ));
    };

    const handleComment = (postId, newComment) => {
        setPosts(posts.map(post =>
            post._id === postId
                ? {
                    ...post,
                    comments: [
                        ...post.comments,
                        {
                            _id: Date.now().toString(),
                            author: {_id: currentUserId, username: userName},
                            content: newComment,
                            likes: [],
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        }
                    ]
                }
                : post
        ));
    };

    const handleChatSelect = (chatId) => {
        setSelectedChat(chatId);
        // Simulating fetching chat messages
        setChatMessages([
            {
                id: 1,
                sender: chats.find(c => c.id === chatId).username,
                content: 'Hey, how are you?',
                timestamp: '2023-09-22T10:30:00Z'
            },
            {
                id: 2,
                sender: 'CurrentUser',
                content: "I'm doing great, thanks! How about you?",
                timestamp: '2023-09-22T10:31:00Z'
            },
            {
                id: 3,
                sender: chats.find(c => c.id === chatId).username,
                content: "I'm good too. Are you coming to the community event this weekend?",
                timestamp: '2023-09-22T10:32:00Z'
            },
        ]);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setChatMessages([...chatMessages, {
                id: Date.now(),
                sender: userName,
                content: newMessage,
                timestamp: new Date().toISOString()
            }]);
            setNewMessage('');
        }
    };

    const handleBookmark = (postId) => {
        if (bookmarkedPosts.includes(postId)) {
            setBookmarkedPosts(bookmarkedPosts.filter(id => id !== postId));
        } else {
            setBookmarkedPosts([...bookmarkedPosts, postId]);
        }
    };

    const filteredPosts = posts.filter(post => {
        if (viewFilter === 'myPosts') {
            return post.author._id === currentUserId;
        } else if (viewFilter === 'bookmarks') {
            return bookmarkedPosts.includes(post._id);
        } else {
            return filterTag === 'all' || post.tags.includes(filterTag);
        }
    });

    const sortedAndFilteredPosts = filteredPosts.sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === 'mostLiked') return b.likes.length - a.likes.length;
        if (sortBy === 'mostCommented') return b.comments.length - a.comments.length;
        return 0;
    });

    const quickActions = [
        {title: 'New Post', icon: <Plus className="w-6 h-6"/>, action: () => setShowCreatePost(true)},
        {title: 'My Posts', icon: <Edit className="w-6 h-6"/>, action: () => setViewFilter('myPosts')},
        {title: 'Bookmarks', icon: <Bookmark className="w-6 h-6"/>, action: () => setViewFilter('bookmarks')},
    ];

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-blue-500">Community Forum</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {quickActions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={action.action}
                                        className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 ${
                                            hoveredButton === action.title
                                                ? 'bg-blue-100 transform scale-105'
                                                : 'bg-gray-100 hover:bg-blue-50'
                                        } ${viewFilter === action.title.toLowerCase().replace(' ', '') ? 'bg-blue-200' : ''}`}
                                        onMouseEnter={() => setHoveredButton(action.title)}
                                        onMouseLeave={() => setHoveredButton(null)}
                                    >
                                        <div className="text-blue-600 mb-2">{action.icon}</div>
                                        <span className="text-sm font-medium">{action.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Create Post Form */}
                        {showCreatePost && (
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
                                <input
                                    type="text"
                                    placeholder="Post Title"
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <textarea
                                    placeholder="Post Content"
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                />
                                <input
                                    type="text"
                                    placeholder="Tags (comma separated)"
                                    value={newPost.tags.join(', ')}
                                    onChange={(e) => setNewPost({
                                        ...newPost,
                                        tags: e.target.value.split(',').map(tag => tag.trim())
                                    })}
                                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleCreatePost}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        Create Post
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Posts */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">
                                    {viewFilter === 'myPosts' ? 'My Posts' :
                                        viewFilter === 'bookmarks' ? 'Bookmarked Posts' : 'Forum Posts'}
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="mostLiked">Most Liked</option>
                                        <option value="mostCommented">Most Commented</option>
                                    </select>
                                    {viewFilter === 'all' && (
                                        <select
                                            value={filterTag}
                                            onChange={(e) => setFilterTag(e.target.value)}
                                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="all">All Tags</option>
                                            <option value="welcome">Welcome</option>
                                            <option value="community">Community</option>
                                            <option value="events">Events</option>
                                            <option value="volunteer">Volunteer</option>
                                            <option value="issues">Issues</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-6">
                                {sortedAndFilteredPosts.map((post) => (
                                    <PostCard
                                        key={post._id}
                                        post={post}
                                        onLike={handleLike}
                                        onComment={handleComment}
                                        onBookmark={handleBookmark}
                                        isBookmarked={bookmarkedPosts.includes(post._id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chat Section */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Chats</h2>
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {chats.map((chat) => (
                                    <div
                                        key={chat.id}
                                        className={`flex items-center p-3 rounded-lg cursor-pointer ${selectedChat === chat.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                        onClick={() => handleChatSelect(chat.id)}
                                    >
                                        <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${chat.username}`}
                                             alt={chat.username} className="w-10 h-10 rounded-full mr-3"/>
                                        <div className="flex-grow">
                                            <h3 className="font-semibold">{chat.username}</h3>
                                            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                                        </div>
                                        {chat.unread > 0 && (
                                            <span
                                                className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">{chat.unread}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selectedChat && (
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-xl font-semibold mb-4">Chat
                                    with {chats.find(chat => chat.id === selectedChat)?.username}</h2>
                                <div className="h-64 overflow-y-auto mb-4">
                                    {chatMessages.map((message) => (
                                        <div key={message.id}
                                             className={`mb-2 ${message.sender === 'CurrentUser' ? 'text-right' : 'text-left'}`}>
                                            <div
                                                className={`inline-block p-2 rounded-lg ${message.sender === 'CurrentUser' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                                <p>{message.content}</p>
                                                <p className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleSendMessage} className="flex">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 transition-all duration-300"
                                    >
                                        <Send size={20}/>
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PostCard = ({post, onLike, onComment, onBookmark, isBookmarked}) => {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            onComment(post._id, newComment);
            setNewComment('');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author.username}`}
                             alt={post.author.username} className="w-10 h-10 rounded-full mr-4"/>
                        <div>
                            <h3 className="font-semibold">{post.author.username}</h3>
                            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onBookmark(post._id)}
                        className={`p-2 rounded-full transition-all duration-300 ${isBookmarked ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
                    >
                        <Bookmark size={20}/>
                    </button>
                </div>
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                        <span key={index}
                              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-between text-gray-500">
                    <button
                        onClick={() => onLike(post._id)}
                        className={`flex items-center transition-all duration-300 ${post.likes.includes('currentUserId') ? 'text-blue-600' : 'hover:text-blue-600'}`}
                    >
                        <ThumbsUp size={20} className="mr-2"/>
                        <span>{post.likes.length} Likes</span>
                    </button>
                    <button onClick={() => setShowComments(!showComments)}
                            className="flex items-center hover:text-blue-600 transition-all duration-300">
                        <MessageCircle size={20} className="mr-2"/>
                        <span>{post.comments.length} Comments</span>
                    </button>
                    <button className="flex items-center hover:text-blue-600 transition-all duration-300">
                        <Share2 size={20} className="mr-2"/>
                        <span>Share</span>
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-all duration-300">
                        <MoreHorizontal size={20}/>
                    </button>
                </div>
            </div>
            {showComments && (
                <div className="bg-gray-50 p-6">
                    <form onSubmit={handleSubmitComment} className="mb-4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 transition-all duration-300"
                            >
                                <Send size={20}/>
                            </button>
                        </div>
                    </form>
                    {post.comments.map((comment) => (
                        <div key={comment._id} className="mb-4 last:mb-0">
                            <div className="flex items-start">
                                <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author.username}`}
                                     alt={comment.author.username} className="w-8 h-8 rounded-full mr-3"/>
                                <div className="flex-grow">
                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                        <p className="font-semibold text-gray-800">{comment.author.username}</p>
                                        <p className="text-gray-600">{comment.content}</p>
                                    </div>
                                    <div className="flex items-center mt-2 text-sm text-gray-500">
                                        <button className="mr-4 hover:text-blue-600 transition-all duration-300">Like
                                        </button>
                                        <button className="mr-4 hover:text-blue-600 transition-all duration-300">Reply
                                        </button>
                                        <span>{new Date(comment.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ForumFeed;