import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../appwrite/config";
import {Button, Container} from '../index'
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    // Fetch the post
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    // Prevent background scroll when popup is active
    useEffect(() => {
        document.body.style.overflow = showConfirm ? "hidden" : "auto";
    }, [showConfirm]);

    // Handle delete confirmation flow
    const handleDelete = () => {
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            const deleted = await service.deletePost(post.$id);
            if (deleted) {
                await service.deleteFile(post.featuredImage);
                navigate("/");
            } else {
                setError("Failed to delete the post.");
            }
        } catch (err) {
            console.error("Delete error:", err);
            setError("An error occurred during deletion.");
        } finally {
            setShowConfirm(false);
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                {/* Featured Image */}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl max-h-[500px] object-cover"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Title */}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>

                {/* Content */}
                <div className="browser-css">{parse(post.content)}</div>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 text-red-600 font-semibold text-center">
                        {error}
                    </div>
                )}
            </Container>

            {/* Confirm Deletion Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-11/12 max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                        <p className="mb-6">Are you sure you want to delete this post?</p>
                        <div className="flex justify-center gap-4">
                            <Button bgColor="bg-gray-300" onClick={() => setShowConfirm(false)}>
                                Cancel
                            </Button>
                            <Button bgColor="bg-red-500" onClick={confirmDelete}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : null;
}
