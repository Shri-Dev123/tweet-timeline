import React, { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "./Tweet";
import DateRangeFilter from "./DateRangeFilter";
import ReactPaginate from "react-paginate"; // Import the react-paginate component

const API_URL = "http://www.mocky.io/v2/5d1ef97d310000552febe99d";

const TweetList = () => {
    const [tweets, setTweets] = useState([]);
    const [filteredTweets, setFilteredTweets] = useState([]);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });
    const [currentPage, setCurrentPage] = useState(0);
    const tweetsPerPage = 8;

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
        if (dateRange.startDate && dateRange.endDate) {
            const filtered = tweets.filter((tweet) => {
                const tweetDate = new Date(tweet.publishedDate);
                return (
                    tweetDate >= dateRange.startDate &&
                    tweetDate <= dateRange.endDate
                );
            });
            setFilteredTweets(filtered);
        } else {
            setFilteredTweets(tweets);
        }
    }, [dateRange, tweets]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * tweetsPerPage;
    const paginatedTweets = filteredTweets.slice(
        offset,
        offset + tweetsPerPage
    );

    return (
        <>
            <div className="">
                <DateRangeFilter onChange={setDateRange} />
                {paginatedTweets.map((tweet) => (
                    <Tweet key={tweet._id} tweet={tweet} />
                ))}
            </div>

            <ReactPaginate
                pageCount={Math.ceil(filteredTweets.length / tweetsPerPage)}
                onPageChange={handlePageChange}
                containerClassName="pagination flex gap-4 m-4 text-xl"
                activeClassName="active text-blue-500 text-2xl font-semibold"
            />
        </>
    );
};

export default TweetList;
