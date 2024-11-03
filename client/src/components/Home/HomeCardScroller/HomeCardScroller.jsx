import React, { useEffect } from "react";
import "./homecardscroller.css";
import Commerce from "./images/commerce.png";
import Engineering from "./images/engineering.png";
import Geology from "./images/geology.png";
import Management from "./images/management.png";
import Math from "./images/math.png";
import Programming from "./images/programming.png";
import Science from "./images/science.png";
import Medical from "./images/medical.png";
export default function HomeCardScroller() {
  return (
    <div className="home-card-scroller">
      <div className="home-card-scroller-items">
        <div
          className="home-card-scroller-items-wrapper"
          style={{ "--time": "30s" }}
        >
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Science} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Science</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Math} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Mathematics</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Geology} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Geology</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Engineering} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Engineering</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Management} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Management</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Commerce} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Commerce</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Programming} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Programming</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Medical} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Medical</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
        </div>
        <div
          className="home-card-scroller-items-wrapper"
          style={{ "--time": "30s" }}
        >
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Science} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Science</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Math} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Mathematics</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Geology} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Geology</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Engineering} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Engineering</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Management} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Management</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Commerce} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Commerce</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Programming} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Programming</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
          {/* card items */}
          <div className="home-card-scroller-card">
            <div className="home-card-scroller-card-details">
              <div className="home-card-scroller-card-img">
                <img src={Medical} alt="" />
              </div>
              <p className="home-card-scroller-card-text-body">Medical</p>
            </div>
            <button className="home-card-scroller-card-button">
              More info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
