import React, { useState, useEffect } from "react";
import localforage from "localforage";
import likedImage from "../images/heart_Red.png";
import likeImage from "../images/heart_white.png";

const LikeButton = ({ tweet }) => {
    const [liked, setLiked] = useState(false);
    const { _id } = tweet;
    const parts = _id.split("/");
    const tweetId = parts[parts.length - 1];
    const handleLikeToggle = () => {
        setLiked((prevLiked) => !prevLiked);
    };

    useEffect(() => {
        localforage
            .getItem(`tweet_${tweetId}`)
            .then((likedState) => {
                if (likedState !== null) {
                    setLiked(likedState);
                }
            })
            .catch((error) => {
                console.error(
                    "Error loading liked state from local storage:",
                    error
                );
            });
    }, [tweetId]);

    useEffect(() => {
        localforage.setItem(`tweet_${tweetId}`, liked).catch((error) => {
            console.error("Error saving liked state to local storage:", error);
        });
    }, [tweetId, liked]);

    return (
        <button
            onClick={handleLikeToggle}
            className={`flex items-center w-8 text-gray-500 pt-2 ${
                liked ? "text-red-500" : "text-gray-500"
            }`}
        >
            <img
                className="h-6 w-6 mr-2"
                src={liked ? likedImage : likeImage}
                alt="like"
            />
            {liked ? "Liked" : "Like"}
        </button>
    );
};

export default LikeButton;
