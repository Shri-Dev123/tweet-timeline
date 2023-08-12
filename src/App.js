import React from "react";
import TweetList from "./components/TweetList";
import "../src/tailwind.css";
import "../src/index.css";

function App() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container">
                <h1 className="text-2xl font-bold">Twitter Timeline</h1>
            </div>
            <TweetList />
        </div>
    );
}

export default App;
