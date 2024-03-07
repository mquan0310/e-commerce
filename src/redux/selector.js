//select dataHome
export const stateData = (state) => state.dataHome;
//select formatPrice
export const stateFormatPrice = (state) => state.formatPrice;
//select display Popup
export const statePopup = (state) => {
  return state.statePopup.display;
};
//select ShopPage
export const stateCategoryShopPage = (state) => state.stateCategoryShopPage;
//select dataCartProduct
export const dataCartProduct = (state) => state.dataCartProduct;

//Selectors là các hàm được sử dụng để trích xuất thông tin từ Redux store. Các selectors này đặc biệt được sử dụng trong React-Redux để lấy dữ liệu từ Redux store trong các thành phần React.
