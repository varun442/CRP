const dummyPosts = [
    {
        _id: "66efdfae306057572b7829e9",
        title: "Welcome to our Community Forum!",
        content: "Hello everyone! This is our first post on the new Community Restoration Project forum. We're excited to start building connections and fostering community engagement. Feel free to introduce yourselves and share your ideas for community improvement!",
        author: {
            _id: "66efdfac306057572b7829a3",
            username: "CRP Admin"
        },
        likes: [
            "66efdfab306057572b782999",
            "66efdfab306057572b78299b",
            "66efdfac306057572b78299d",
            "66efdfac306057572b78299f",
            "66efdfac306057572b7829a1",
            "66efdfac306057572b7829a3",
            "66efdfac306057572b7829a5"
        ],
        comments: [
            {
                _id: "66efdfae306057572b7829ea",
                author: {
                    _id: "66efdfac306057572b7829a1",
                    username: "Jane Neighbor"
                },
                content: "This is fantastic! I'm looking forward to connecting with everyone and working together to improve our community.",
                likes: ["66efdfab306057572b782999"],
                createdAt: "2024-05-22T10:15:30.076Z",
                updatedAt: "2024-05-22T10:15:30.076Z"
            }
        ],
        tags: ["welcome", "community"],
        createdAt: "2024-05-22T10:00:00.077Z",
        updatedAt: "2024-05-22T10:00:00.077Z"
    },
    {
        _id: "66efdfae306057572b7829e8",
        title: "Upcoming Community Cleanup Event",
        content: "Join us this Saturday for a community-wide cleanup event! We'll be meeting at Central Park at 9 AM. Gloves and trash bags will be provided. Let's work together to keep our neighborhood beautiful!",
        author: {
            _id: "66efdfac306057572b7829a4",
            username: "Event Coordinator"
        },
        likes: [
            "66efdfab306057572b782998",
            "66efdfab306057572b78299c",
            "66efdfac306057572b78299e"
        ],
        comments: [
            {
                _id: "66efdfae306057572b7829eb",
                author: {
                    _id: "66efdfac306057572b7829a2",
                    username: "Green Thumb"
                },
                content: "Count me in! I'll bring some extra gardening tools in case we need them.",
                likes: [],
                createdAt: "2024-05-23T14:30:45.123Z",
                updatedAt: "2024-05-23T14:30:45.123Z"
            }
        ],
        tags: ["events", "volunteer", "cleanup"],
        createdAt: "2024-05-23T12:00:00.000Z",
        updatedAt: "2024-05-23T12:00:00.000Z"
    },
    {
        _id: "66efdfae306057572b7829e7",
        title: "Ideas for New Community Center Programs",
        content: "We're looking to expand our offerings at the Community Center. What kinds of classes or programs would you like to see? Share your ideas and let's make our center a hub of learning and growth!",
        author: {
            _id: "66efdfac306057572b7829a5",
            username: "Program Director"
        },
        likes: [
            "66efdfab306057572b78299a",
            "66efdfac306057572b7829a0",
            "66efdfac306057572b7829a2",
            "66efdfac306057572b7829a4"
        ],
        comments: [
            {
                _id: "66efdfae306057572b7829ec",
                author: {
                    _id: "66efdfac306057572b7829a3",
                    username: "ArtEnthusiast"
                },
                content: "How about art classes for different age groups? It could be a great way to bring people together!",
                likes: ["66efdfab306057572b78299a"],
                createdAt: "2024-05-24T09:45:22.789Z",
                updatedAt: "2024-05-24T09:45:22.789Z"
            }
        ],
        tags: ["community center", "programs", "ideas"],
        createdAt: "2024-05-24T08:30:00.000Z",
        updatedAt: "2024-05-24T08:30:00.000Z"
    },
    {
        _id: "66efdfae306057572b7829e6",
        title: "Reporting: Broken Swing in Oakwood Playground",
        content: "I noticed that one of the swings in Oakwood Playground is broken. It could be dangerous for children. Can we get this fixed soon?",
        author: {
            _id: "66efdfac306057572b7829a6",
            username: "Concerned Parent"
        },
        likes: [
            "66efdfab306057572b78299b",
            "66efdfac306057572b78299d"
        ],
        comments: [
            {
                _id: "66efdfae306057572b7829ed",
                author: {
                    _id: "66efdfac306057572b7829a4",
                    username: "Maintenance Crew"
                },
                content: "Thank you for reporting this. We'll send a team to inspect and repair the swing tomorrow morning.",
                likes: ["66efdfac306057572b7829a6"],
                createdAt: "2024-05-25T11:20:15.456Z",
                updatedAt: "2024-05-25T11:20:15.456Z"
            }
        ],
        tags: ["issues", "playground", "maintenance"],
        createdAt: "2024-05-25T10:45:00.000Z",
        updatedAt: "2024-05-25T10:45:00.000Z"
    },
    {
        _id: "66efdfae306057572b7829e5",
        title: "Monthly Town Hall Meeting - Agenda Items",
        content: "Our next town hall meeting is coming up on the 15th. What topics would you like to see on the agenda? This is your chance to bring up important community matters!",
        author: {
            _id: "66efdfac306057572b7829a3",
            username: "CRP Admin"
        },
        likes: [
            "66efdfab306057572b782999",
            "66efdfab306057572b78299c",
            "66efdfac306057572b7829a1",
            "66efdfac306057572b7829a5"
        ],
        comments: [
            {
                _id: "66efdfae306057572b7829ee",
                author: {
                    _id: "66efdfac306057572b7829a0",
                    username: "LocalBizOwner"
                },
                content: "Can we discuss ways to support local businesses? Maybe a monthly community market?",
                likes: ["66efdfab306057572b782999", "66efdfac306057572b7829a1"],
                createdAt: "2024-05-26T15:10:33.234Z",
                updatedAt: "2024-05-26T15:10:33.234Z"
            }
        ],
        tags: ["town hall", "community", "events"],
        createdAt: "2024-05-26T14:00:00.000Z",
        updatedAt: "2024-05-26T14:00:00.000Z"
    }
];

export default dummyPosts;