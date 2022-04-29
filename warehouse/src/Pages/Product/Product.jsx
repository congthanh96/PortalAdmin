import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productAPI } from "../../APIs";
import CardProduct from "../../Components/product/productDetail";
import VariantProduct from "../../Components/variantProduct/variantProduct";
import ColoredLinearProgress from "../../Common/LineProgress";
import "./product.css";

export default function Product() {
  let { productID } = useParams();
  const [productDetail, setProductDetail] = useState("");
  const [variantProduct, setVariantProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(async () => {
    setIsLoading(true);
    await getDetailProduct();
    await getVariantProduct();
    setIsLoading(false);
  }, []);

//useEffect(()=>{},[variantProduct]);
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

  // function updateAmountVariantProduct(id, count) {
  //   setVariantProduct((variantProduct) => {
  //     return variantProduct.map((row, index) =>
  //       index === id
  //         ? { ...row, count: count }
  //         : row
  //     );
  //   });
  // }
  return (
    <React.Fragment>
      {isLoading ? (
        <div className="linear">
          <ColoredLinearProgress />
        </div>
      ) : (
        <div>
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
          <VariantProduct
            variantProductData={variantProduct}
            //update={updateAmountVariantProduct}
          />
        </div>
      )}
    </React.Fragment>
  );
}
