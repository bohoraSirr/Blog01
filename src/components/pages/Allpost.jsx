import { useState, useEffect } from 'react';
import { Container, Postcard } from '../index';
import service from '../../appwrite/config';

function Allpost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await service.getPosts(); // or pass filters
                console.log("Fetched posts:", response);

                if (response && response.documents) {
                    setPosts(response.documents);
                } else {
                    setPosts([]);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to load posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                {loading && (
                    <div className="text-center w-full py-10 text-gray-500">
                        Loading posts...
                    </div>
                )}

                {error && (
                    <div className="text-center w-full py-10 text-red-500">
                        {error}
                    </div>
                )}

                {!loading && !error && posts.length === 0 && (
                    <div className="text-center w-full py-10 text-gray-500">
                        No posts found.
                    </div>
                )}

                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <Postcard {...post} />
                        </div>
                    ))} 
                </div>
            </Container>
        </div>
    );
}

export default Allpost;
