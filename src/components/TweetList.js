import React, { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "./Tweet";
import DateRangeFilter from "./DateRangeFilter";

const API_URL = "http://www.mocky.io/v2/5d1ef97d310000552febe99d";

const TweetList = () => {
    const [tweets, setTweets] = useState([]);
    const [filteredTweets, setFilteredTweets] = useState([]);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });

    useEffect(() => {
        axios
            .get(API_URL)
            .then((response) => {
                setTweets(response.data);
                setFilteredTweets(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tweets:", error);
            });
    }, []);

    useEffect(() => {
        console.log("Date Range:", dateRange);
        if (dateRange.startDate && dateRange.endDate) {
            const filtered = tweets.filter((tweet) => {
                const tweetDate = new Date(tweet.publishedDate);
                console.log("Tweet Date:", tweetDate);
                return (
                    tweetDate >= new Date(dateRange.startDate) &&
                    tweetDate <= new Date(dateRange.endDate)
                );
            });
            console.log("Filtered Tweets:", filtered);
            setFilteredTweets(filtered);
        } else {
            setFilteredTweets(tweets);
        }
    }, [dateRange, tweets]);

    return (
        <>
            <DateRangeFilter onChange={setDateRange} />
            <div className="flex gap-4 items-center flex-wrap">
                {filteredTweets.map((tweet) => (
                    <Tweet key={tweet.id} tweet={tweet} />
                ))}
            </div>
        </>
    );
};

export default TweetList;
