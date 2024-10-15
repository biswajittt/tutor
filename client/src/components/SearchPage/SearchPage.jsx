import React from "react";
import { useLocation } from "react-router-dom";
import "./searchpage.css";
import NavBar from "../Navbar/Navbar";
import p1 from "./p1.jpg";
import { useState, useEffect } from "react";
import handleSearchResult from "../../handler/handleSearchResults";
export default function SearchPage() {
  // Use the useLocation hook to get the location object
  const location = useLocation();
  // set loading
  const [loading, setLoading] = useState(false);

  // Extract the search query from the URL
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  // Example: get the value of a query parameter called 'query'
  const [searchTerm, setSearchTerm] = useState(query); // null if 'query' is not present

  //fuction to fetch the search results from database
  const getSearchResult = async (searchTerm) => {
    setLoading(true);
    const res = await handleSearchResult(searchTerm);
    if (res) {
      setLoading(false);
    }
  };

  //get the search term on search page load
  useEffect(() => {
    setSearchTerm(queryParams.get("query"));
    // call the async fuction to fetch the data from database
    getSearchResult(searchTerm);
    console.log(query);
  }, [query]);

  return (
    <div className="learnerby-searchpage">
      <NavBar />
      <div className="learnerby-searchpage-section">
        <div className="learnerby-searchpage-section-box"></div>
        <div className="learnerby-searchpage-section-text">
          Javascript mentor online
        </div>
        <div className="learnerby-searchpage-section-search-results">
          <div className="learnerby-searchpage-section-search-results-continer">
            <div className="header">
              <div className="header-img">
                <img src={p1} alt="" />
              </div>
              <div className="name">Biswajit Debnath</div>
              <div className="expertise">
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
              </div>
            </div>
            <div className="vertical-line"></div>
            <div className="footer">
              <div className="foooter-price-location">
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  ₹3000
                </span>
                <div>Agartala</div>
              </div>
              <div className="foooter-mentor-details">Details</div>
            </div>
          </div>
          <div className="learnerby-searchpage-section-search-results-continer">
            <div className="header">
              <div className="header-img">
                <img src={p1} alt="" />
              </div>
              <div className="name">Biswajit Debnath</div>
              <div className="expertise">
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
              </div>
            </div>
            <div className="vertical-line"></div>
            <div className="footer">
              <div className="foooter-price-location">
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  ₹3000
                </span>
                <div>Agartala</div>
              </div>
              <div className="foooter-mentor-details">Details</div>
            </div>
          </div>
          <div className="learnerby-searchpage-section-search-results-continer">
            <div className="header">
              <div className="header-img">
                <img src={p1} alt="" />
              </div>
              <div className="name">Biswajit Debnath</div>
              <div className="expertise">
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
              </div>
            </div>
            <div className="vertical-line"></div>
            <div className="footer">
              <div className="foooter-price-location">
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  ₹3000
                </span>
                <div>Agartala</div>
              </div>
              <div className="foooter-mentor-details">Details</div>
            </div>
          </div>
          <div className="learnerby-searchpage-section-search-results-continer">
            <div className="header">
              <div className="header-img">
                <img src={p1} alt="" />
              </div>
              <div className="name">Biswajit Debnath</div>
              <div className="expertise">
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
              </div>
            </div>
            <div className="vertical-line"></div>
            <div className="footer">
              <div className="foooter-price-location">
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  ₹3000
                </span>
                <div>Agartala</div>
              </div>
              <div className="foooter-mentor-details">Details</div>
            </div>
          </div>
          <div className="learnerby-searchpage-section-search-results-continer">
            <div className="header">
              <div className="header-img">
                <img src={p1} alt="" />
              </div>
              <div className="name">Biswajit Debnath</div>
              <div className="expertise">
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
              </div>
            </div>
            <div className="vertical-line"></div>
            <div className="footer">
              <div className="foooter-price-location">
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  ₹3000
                </span>
                <div>Agartala</div>
              </div>
              <div className="foooter-mentor-details">Details</div>
            </div>
          </div>
          <div className="learnerby-searchpage-section-search-results-continer">
            <div className="header">
              <div className="header-img">
                <img src={p1} alt="" />
              </div>
              <div className="name">Biswajit Debnath</div>
              <div className="expertise">
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
              </div>
            </div>
            <div className="vertical-line"></div>
            <div className="footer">
              <div className="foooter-price-location">
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  ₹3000
                </span>
                <div>Agartala</div>
              </div>
              <div className="foooter-mentor-details">Details</div>
            </div>
          </div>
          <div className="learnerby-searchpage-section-search-results-continer">
            <div className="header">
              <div className="header-img">
                <img src={p1} alt="" />
              </div>
              <div className="name">Biswajit Debnath</div>
              <div className="expertise">
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
                <span>javaSCript</span>
              </div>
            </div>
            <div className="vertical-line"></div>
            <div className="footer">
              <div className="foooter-price-location">
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  ₹3000
                </span>
                <div>Agartala</div>
              </div>
              <div className="foooter-mentor-details">Details</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
