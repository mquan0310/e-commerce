import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_POPUP } from "../../redux/action";
import { stateData, stateFormatPrice, statePopup } from "../../redux/selector";
import Popup from "../Popup/Popup";
import "./ListProducts.css";

const ListProducts = () => {
  const [idImage, setidImage] = useState("");

  //Hàm truyền action
  const dispatch = useDispatch();

  //Lấy dữ liệu
  const data = useSelector(stateData);
  // console.log(data);

  //Lấy formatPrice
  const formatPrice = useSelector(stateFormatPrice);
  //Lấy showPopup
  const showPopup = useSelector(statePopup);

  //Xử lý sự kiện click ảnh
  const clickHandler = (e) => {
    //console.log(e._id.$oid);
    //Truyền action
    dispatch(SHOW_POPUP());
    setidImage(e._id.$oid);
  };
  //Lọc mảng lấy data Popup
  const dataPopup = data.filter((item) => item._id.$oid === idImage);

  //render
  return (
    <div className="wapperList">
      <div className="row itemList1">
        <p>Made in hard way</p>
        <h3>Top Trending products</h3>
      </div>
      <div className="row itemList2">
        {data.map((item) => (
          <div key={item._id.$oid} className="col-md-4">
            <img
              id={item._id.$oid}
              onClick={() => clickHandler(item)}
              src={item.img1}
              alt=""
            />
            <p>{item.name}</p>
            <b>{formatPrice(item.price)} VND</b>
          </div>
        ))}
      </div>
      {showPopup && <Popup dataList={dataPopup[0]} />}
    </div>
  );
};

export default ListProducts;
