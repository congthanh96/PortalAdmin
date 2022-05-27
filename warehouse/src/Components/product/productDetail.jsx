/**
 * Component chi tiết sản phẩm của trang chi tiết sản phẩm
 */
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
      <h2>Thông tin sản phẩm</h2>
      <hr />
      <div className="flexCard">
        <img className="imageCard" src={`${image}`} alt="" />

        <div>
          <h3>Tên sản phẩm: {name}</h3>
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
                  Rating: Chưa có đánh giá
                </span>
              </>
            )}
          </div>
          <hr />
          <div>
            <h5>Decription:</h5>
            {description === "" ? (
                <>Chưa có mô tả</>
            ) : (
            
              <ul>
                <li className="fontText">{description}</li>
              </ul>
            )}
          </div>
          {content1 === "" && content2 === "" && content3 === "" ? (
            <></>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default CardProduct;
