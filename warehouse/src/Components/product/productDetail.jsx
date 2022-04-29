import React from "react";
import "./productDetail.css";

const CardProduct = ({
  image,
  name,
  category,
  brand,
  content1,
  content2,
  content3,
  amountRating,
  ratingScore,
  description,
}) => {
  return (
    <div className="cardDetail">
      <h3>Thông tin chi tiết</h3>
      <div className="flexCard">
        <img className="imageCard" src={`${image}`} alt="" />

        <div>
          <h3>{name}</h3>
          <div>
            <h5>Category: {category}</h5>
            <h5>Brand: {brand}</h5>
          </div>
          <hr />
          <div>
            {amountRating > 0 ? (
              <span>
                Rating: {ratingScore}. Number of ratings: {amountRating}
              </span>
            ) : (
              <>
                <span style={{ color: "red" }}>
                  Rating: No one has rated it yet
                </span>
              </>
            )}
          </div>
          <hr />
          <div>
            <h5>Decription:</h5>
            <ul>
              <li className="fontText">{description}</li>
            </ul>
          </div>
          <hr />
          <div>
            <h5>Content:</h5>
            <ul>
              {content1 !== "" ? (
                <li className="fontText">{content1}</li>
              ) : (
                <></>
              )}
              {content2 !== "" ? (
                <li className="fontText">{content2}</li>
              ) : (
                <></>
              )}
              {content3 !== "" ? (
                <li className="fontText">{content3}</li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardProduct;
