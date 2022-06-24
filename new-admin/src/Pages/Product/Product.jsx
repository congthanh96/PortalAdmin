/**
 * Trang chi tiết sản phẩm
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productAPI } from "../../APIs";
import CardProduct from "../../Components/product/productDetail";
import VariantProduct from "../../Components/variantProduct/variantProduct";
import { Input, Spin, Table, Modal, Rate } from "antd";
import { toast } from "react-toastify";
import TopPage from "../../Components/toppage/topPage";
import "./product.css";

const Product = () => {
  let { productID } = useParams();
  const [productDetail, setProductDetail] = useState("");
  const [variantProduct, setVariantProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dataTop = [
    {
      linkTo: "/",
      nameLink: "Trang chủ",
    },
    {
      linkTo: "/products",
      nameLink: "Danh sách sản phẩm",
    },
    {
      linkTo: "",
      nameLink: "Chi tiết sản phẩm",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      await getDetailProduct();
      await getVariantProduct();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Lấy chi tiết sản phẩm
  const getDetailProduct = async () => {
    try {
      const res = await productAPI.getDetailProduct(productID);
      setProductDetail(res);
    } catch (error) {
      toast.error("Không thể lấy chi tiết sản phẩm");
    }
  };

  // Lấy danh sách variant của sản phẩm
  const getVariantProduct = async () => {
    try {
      const res = await productAPI.getVariantProduct(productID);
      setVariantProduct(res);
    } catch (error) {
      toast.error("Không thể lấy danh sách variant của sản phẩm");
    }
  };

  return (
    <React.Fragment>
      <div className="product-container">
        <Spin spinning={isLoading}>
          <div style={{ width: "100%" }}>
            <TopPage dataProps={dataTop} />
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
            <VariantProduct variantProductData={variantProduct} setVariantProduct={setVariantProduct} />
          </div>
        </Spin>
      </div>
    </React.Fragment>
  );
};

export default Product;
