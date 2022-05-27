/**
 * Trang chi tiết sản phẩm
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productAPI } from "../../APIs";
import CardProduct from "../../Components/product/productDetail";
import VariantProduct from "../../Components/variantProduct/variantProduct";
import VariantCartImport from "../../Components/variantCart/variantCartImport";
import ColoredLinearProgress from "../../Common/LineProgress";
import { toastr } from "react-redux-toastr";
import "./importProductMount.css";

export default function ImportProductMount() {
  let { productID } = useParams();
  const [productDetail, setProductDetail] = useState("");
  const [variantProduct, setVariantProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(async () => {
    setIsLoading(true);
    await getDetailProduct();
    await getVariantProduct();
    setIsLoading(false);
  }, []);

  // Lấy chi tiết sản phẩm
  const getDetailProduct = async () => {
    try {
      const res = await productAPI.getDetailProduct(productID);
      setProductDetail(res);
    } catch (error) {
      toastr.warning("Không thể lấy chi tiết sản phẩm");
    }
  };

  // Lấy danh sách variant của sản phẩm
  const getVariantProduct = async () => {
    try {
      const res = await productAPI.getVariantProduct(productID);
      setVariantProduct(res);
    } catch (error) {
      toastr.warning("Không thể lấy danh sách variant của sản phẩm");
    }
  };
  console.log((variantProduct))
  return (
    <React.Fragment>
      {isLoading ? (
        <div className="linear">
          <ColoredLinearProgress />
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          {variantProduct && (
            <VariantCartImport
              variantProductData={variantProduct}
              name={productDetail.name}
              updateVariant = {setVariantProduct}
              isImport = {true}
            />
          )}
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
          {variantProduct && (
            <VariantProduct
              variantProductData={variantProduct}
              name={productDetail.name}
              updateVariant = {setVariantProduct}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
}
