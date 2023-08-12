import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Tweet from "./Tweet";
import DateRangeFilter from "./DateRangeFilter";
import ReactPaginate from "react-paginate";

const API_URL =
    "https://cors-anywhere.herokuapp.com/http://www.mocky.io/v2/5d1ef97d310000552febe99d";

const TweetList = () => {
    const [tweets, setTweets] = useState([]);
    const [filteredTweets, setFilteredTweets] = useState([]);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });
    const [currentPage, setCurrentPage] = useState(0);
    const tweetsPerPage = 8;
    const paginationRef = useRef(null);

    useEffect(() => {
        axios
            .get(API_URL)
            .then((response) => {
                setTweets(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tweets:", error);
            });
    }, []);

    useEffect(() => {
        let filtered = [...tweets];

        if (dateRange.startDate && dateRange.endDate) {
            filtered = filtered.filter((tweet) => {
                const tweetDate = new Date(tweet.publishedDate);
                const startDate = new Date(dateRange.startDate);
                const endDate = new Date(dateRange.endDate);
                return tweetDate >= startDate && tweetDate <= endDate;
            });
        }

        setFilteredTweets(filtered);
        setCurrentPage(0);
    }, [dateRange, tweets]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
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
                ref={paginationRef}
                onPageChange={(selectedItem) => {
                    handlePageChange(selectedItem);
                    scrollToTop();
                }}
                pageCount={Math.ceil(filteredTweets.length / tweetsPerPage)}
                containerClassName="pagination flex gap-4 m-4 text-xl"
                activeClassName="active text-blue-500 text-2xl font-semibold"
            />
        </>
    );
};

export default TweetList;
