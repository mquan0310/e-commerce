import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PreviewImages from "../../components/PreviewImages/PreviewImages";
import RelatedProduct from "../../components/RelatedProduct/RelatedProduct";
import { saveToLocalStorage } from "../../data/localstorage";
import { ADD_CART, UPDATE_CART } from "../../redux/action";
import { dataCartProduct, stateData, stateFormatPrice } from "../../redux/selector";
import "./DetailPage.css";

const DetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataCart = useSelector(dataCartProduct);
  // console.log(dataCart);
  //Lưu dataCart LocalStorage
  saveToLocalStorage("dataCart", dataCart);
  // console.log(dataCart);

  //Lấy dữ liệu
  const data = useSelector(stateData);
  // console.log(data);
  //Lấy formatPrice
  const formatPrice = useSelector(stateFormatPrice);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const para = useParams().id;
  // console.log(para);

  //Lọc sản phẩm từ Id
  const [item] = data.filter((item) => item._id.$oid === para);
  // console.log(item);

  useEffect(() => {
    setProduct(item);
  }, [item]);
  // console.log("product:", product);

  //Tăng giảm
  const minusHandler = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      } else {
        return prev - 1;
      }
    });
  };
  const plusHandler = () => {
    setQuantity((prev) => {
      return prev + 1;
    });
  };

  //addCart
  const addCartHandler = () => {
    const indexCart = dataCart.findIndex((e) => e.item._id.$oid === product._id.$oid);
    // console.log(indexCart);
    // Truyền action update
    if (indexCart >= 0) {
      dispatch(UPDATE_CART({ index: indexCart, quantityUpdate: quantity }));
    } else {
      //Truyền action add
      dispatch(
        ADD_CART({
          item: product,
          quantityCart: quantity,
        })
      );
    }
    alert("Thêm vào giỏ hàng thành công!");
    navigate("/cart");
  };

  return (
    <div>
      {product && product.length !== 0 && (
        <div className="containerDetail row">
          <div className="itemDetail">
            <div className="col-md-6">
              <PreviewImages product={product} />
            </div>
            <div className="col-md-6">
              <div className="productDetail">
                <p className="productDetail_p1">{product.name}</p>
                <p className="productDetail_p2">{formatPrice(product.price)} VND</p>
                <p className="productDetail_p3">{product.short_desc}</p>
                <p className="">
                  <span className="productDetail_p4_span1">
                    CATEGORY:{"  "}
                    <span className="productDetail_p4_span2">{product.category}</span>
                  </span>
                </p>
                <div className="containerQuantityDetail">
                  <div className="quantityDetail">
                    <button className="quantityDetail_button">QUANTITY</button>
                    <div
                      className="quantityDetail_span_plus_minus"
                      onClick={minusHandler}
                    >
                      <FontAwesomeIcon icon={faCaretLeft} />
                    </div>
                    <span className="quantityDetail_span">{quantity}</span>
                    <div
                      className="quantityDetail_span_plus_minus "
                      onClick={plusHandler}
                    >
                      <FontAwesomeIcon icon={faCaretRight} />
                    </div>
                  </div>

                  <button className="addButtonDetail" onClick={addCartHandler}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Description  */}
          <div className="descriptionDetail">
            <button className="descriptionDetail_button">DESCRIPTION</button>
            <p className="descriptionDetail_p1">PRODUCCT DESCRIPTION</p>
            <p className="descriptionDetail_p2">{product.long_desc} </p>
          </div>
          <RelatedProduct products={product} />
        </div>
      )}
    </div>
  );
};

export default DetailPage;
