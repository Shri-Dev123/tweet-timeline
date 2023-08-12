import React, { useState } from "react";
import LikeButton from "./LikeButton";

const Tweet = ({ tweet }) => {
    const { _id, imageUrl, text, author, publishedDate, images } = tweet;
    const [isTruncated, setIsTruncated] = useState(true);
    const parts = _id.split("/");
    const tweetId = parts[parts.length - 1];

    return (
        <div className="bg-white shadow-md rounded-md w-80 p-6 mb-4">
            <div className="flex">
                <img
                    src={imageUrl}
                    alt={author}
                    className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                    <h3 className="font-semibold">{author}</h3>
                    <p className="text-gray-600">@{author}</p>
                </div>
            </div>
            <p
                onClick={() => setIsTruncated(!isTruncated)}
                className={`${isTruncated ? "truncate" : ""}`}
            >
                {text}
            </p>
            {images && (
                <div className="mt-2">
                    {images.map((imageUrl, index) => (
                        <img
                            key={tweetId}
                            src={imageUrl}
                            alt={`${index + 1}`}
                            className="mt-2 rounded-md"
                        />
                    ))}
                </div>
            )}
            <p className="text-gray-500 text-sm mt-2">{publishedDate}</p>
            <div className="flex items-left flex-col gap-2">
                <LikeButton tweet={tweet} />
                <a
                    href={`https://twitter.com/${author}/status/${tweetId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" text-blue-500 hover:underline"
                >
                    Go to original tweet
                </a>
            </div>
        </div>
    );
};

export default Tweet;
