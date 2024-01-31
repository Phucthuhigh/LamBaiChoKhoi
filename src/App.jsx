import { useEffect, useState } from "react";
import "./App.css";
import { getRndInteger } from "./utils";
import * as httpRequest from "./services/httpRequest.js";

function App() {
    const [curQuote, setCurQuote] = useState();
    const [pageIndex, setPageIndex] = useState(getRndInteger(1, 107));
    const [quoteIndex, setQuoteIndex] = useState(getRndInteger(1, 20));
    const [authorQuotes, setAuthorQuotes] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await httpRequest.get(`/quotes?page=${pageIndex}`);
                setCurQuote(data.results[quoteIndex]);
                setAuthorQuotes([]);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [pageIndex, quoteIndex]);

    const handleGetAuthorQuote = async () => {
        try {
            const data = await httpRequest.get(
                `/quotes?author=${curQuote.authorSlug}`
            );
            setAuthorQuotes(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="App">
            <button
                onClick={() => {
                    setPageIndex(getRndInteger(1, 107));
                    setQuoteIndex(getRndInteger(1, 20));
                }}>
                Random
            </button>
            {curQuote && (
                <div className="content">
                    <div className="quote">
                        <p>{curQuote?.content}</p>
                    </div>
                    <div className="author">
                        <button onClick={handleGetAuthorQuote}>
                            {curQuote?.author}
                        </button>
                    </div>
                </div>
            )}
            {authorQuotes.map((quote) => (
                <div className="quote" key={quote._id}>
                    <p>{quote?.content}</p>
                </div>
            ))}
        </div>
    );
}

export default App;
