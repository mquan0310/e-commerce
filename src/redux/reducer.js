import { getTolocalStorage } from "../data/localstorage";

//1.format price
const formatPrice = (str) => {
  //chuyển str thành kiểu chuỗi
  const string = String(str);
  return string
    .split("") //chuyển chuỗi thành một mảng các ký tự.
    .reverse() //đảo ngược thứ tự các ký tự trong mảng.
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ".") + prev;
    });
};

//2.initial state - trạng thái ban đầu
const initialState = {
  stateDataLogin: {},
  dataHome: [],
  formatPrice,
  statePopup: { display: false },
  stateCategoryShopPage: "All",
  dataCartProduct: localStorage.getItem("dataCart") ? getTolocalStorage("dataCart") : [],
};

//3.reducer
const rootReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    //Thêm dataHome
    case "data-home":
      return {
        ...state,
        dataHome: action.payload,
      };
    //Hiện popup
    case "show-popup":
      return {
        ...state,
        statePopup: {
          ...state.statePopup,
          display: action.payload.display,
        },
      };
    //Ẩn popup
    case "hide-popup":
      return {
        ...state,
        statePopup: {
          ...state.statePopup,
          display: action.payload.display,
        },
      };
    case "show-shop":
      return {
        ...state,
        stateCategoryShopPage: action.payload,
      };
    //login - logout
    case "on-login":
      return {
        ...state,
        stateDataLogin: {
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    case "on-logout":
      return {
        ...state,
        stateDataLogin: {
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    //Đặt hàng
    case "add-cart":
      return {
        ...state,
        dataCartProduct: [...state.dataCartProduct, action.payload],
      };
    //Đặt thêm-bớt hàng
    case "update-cart":
      let updateCart = [...state.dataCartProduct];
      updateCart[action.payload.index].quantityCart =
        updateCart[action.payload.index].quantityCart + action.payload.quantityUpdate;

      return {
        ...state,
        dataCartProduct: updateCart,
      };
    //Xóa sản phẩm
    case "remove-cart":
      const removeCart = [...state.dataCartProduct];
      removeCart.splice(action.payload, 1);
      return { ...state, dataCartProduct: removeCart };
    default:
      return state;
  }
};
export default rootReducer;
