import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productAPI } from "../../APIs";
import CardProduct from "../../Components/product/productDetail";
export default function Product() {
  let { productID } = useParams();
  const [productDetail, setProductDetail] = useState("");
  const [variantProduct, setVariantProduct] = useState("");
  useEffect(async () => {
    getDetailProduct();
    getVariantProduct();
  }, []);

  const getDetailProduct = async () => {
    try {
      const res = await productAPI.getDetailProduct(productID);
      setProductDetail(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getVariantProduct = async () => {
    try {
        const res = await productAPI.getVariantProduct(productID);
        setVariantProduct(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <React.Fragment>
      {/* {productID} */}
      <CardProduct
        image={productDetail.link}
        name={productDetail.name}
        category={productDetail.categoryName}
        brand={productDetail.brand}
        content1={productDetail.content1}
        content2={productDetail.content2}
        content3={productDetail.content3}
        amountRating={productDetail.amountRating}
        ratingScore={productDetail.ratingScores}
        description={productDetail.description}
      />
    </React.Fragment>
  );
}
