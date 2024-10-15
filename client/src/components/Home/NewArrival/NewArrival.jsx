import React from "react";
import "./newarrival.css";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import img4 from "./images/img4.jpg";
import img5 from "./images/img5.jpg";
export default function NewArrival() {
  return (
    <div className="newarrival">
      <div className="newarrival-title">Explore newly added books</div>
      <div className="newarrival-container">
        <div className="newarrival-card">
          <div className="newarrival-top">
            <img className="newarrival-top-img" src={img1} alt="" />
          </div>
          <div className="newarrival-bottom">
            <div className="newarrival-bottom-seller">
              <div className="newarrival-bottom-seller-logo"></div>
              <div className="newarrival-bottom-seller-name">Biswajit</div>
            </div>
            <div className="newarrival-bottom-book-price-view">
              <div className="newarrival-bottom-book-price">
                <i className="fa-solid fa-indian-rupee-sign"></i>200
              </div>
              <div className="newarrival-bottom-book-view">
                <i className="fa-solid fa-eye"></i>10k
              </div>
            </div>
          </div>
        </div>
        <div className="newarrival-card">
          <div className="newarrival-top">
            <img className="newarrival-top-img" src={img2} alt="" />
          </div>
          <div className="newarrival-bottom">
            <div className="newarrival-bottom-seller">
              <div className="newarrival-bottom-seller-logo"></div>
              <div className="newarrival-bottom-seller-name">Biswajit</div>
            </div>
            <div className="newarrival-bottom-book-price-view">
              <div className="newarrival-bottom-book-price">
                <i className="fa-solid fa-indian-rupee-sign"></i>200
              </div>
              <div className="newarrival-bottom-book-view">
                <i className="fa-solid fa-eye"></i>10k
              </div>
            </div>
          </div>
        </div>
        <div className="newarrival-card">
          <div className="newarrival-top">
            <img className="newarrival-top-img" src={img3} alt="" />
          </div>
          <div className="newarrival-bottom">
            <div className="newarrival-bottom-seller">
              <div className="newarrival-bottom-seller-logo"></div>
              <div className="newarrival-bottom-seller-name">Biswajit</div>
            </div>
            <div className="newarrival-bottom-book-price-view">
              <div className="newarrival-bottom-book-price">
                <i className="fa-solid fa-indian-rupee-sign"></i>200
              </div>
              <div className="newarrival-bottom-book-view">
                <i className="fa-solid fa-eye"></i>10k
              </div>
            </div>
          </div>
        </div>
        <div className="newarrival-card">
          <div className="newarrival-top">
            <img className="newarrival-top-img" src={img4} alt="" />
          </div>
          <div className="newarrival-bottom">
            <div className="newarrival-bottom-seller">
              <div className="newarrival-bottom-seller-logo"></div>
              <div className="newarrival-bottom-seller-name">Biswajit</div>
            </div>
            <div className="newarrival-bottom-book-price-view">
              <div className="newarrival-bottom-book-price">
                <i className="fa-solid fa-indian-rupee-sign"></i>200
              </div>
              <div className="newarrival-bottom-book-view">
                <i className="fa-solid fa-eye"></i>10k
              </div>
            </div>
          </div>
        </div>
        <div className="newarrival-card">
          <div className="newarrival-top">
            <img className="newarrival-top-img" src={img5} alt="" />
          </div>
          <div className="newarrival-bottom">
            <div className="newarrival-bottom-seller">
              <div className="newarrival-bottom-seller-logo"></div>
              <div className="newarrival-bottom-seller-name">Biswajit</div>
            </div>
            <div className="newarrival-bottom-book-price-view">
              <div className="newarrival-bottom-book-price">
                <i className="fa-solid fa-indian-rupee-sign"></i>200
              </div>
              <div className="newarrival-bottom-book-view">
                <i className="fa-solid fa-eye"></i>10k
              </div>
            </div>
          </div>
        </div>
        <div className="newarrival-card">
          <div className="newarrival-top">
            <img className="newarrival-top-img" src={img1} alt="" />
          </div>
          <div className="newarrival-bottom">
            <div className="newarrival-bottom-seller">
              <div className="newarrival-bottom-seller-logo"></div>
              <div className="newarrival-bottom-seller-name">Biswajit</div>
            </div>
            <div className="newarrival-bottom-book-price-view">
              <div className="newarrival-bottom-book-price">
                <i className="fa-solid fa-indian-rupee-sign"></i>200
              </div>
              <div className="newarrival-bottom-book-view">
                <i className="fa-solid fa-eye"></i>10k
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
