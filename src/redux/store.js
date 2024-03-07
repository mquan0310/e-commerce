import { createStore } from "redux";
import rootReducer from "./reducer";

//3.tao store
const store = createStore(rootReducer);
export default store;

//Sử dụng createStore để tạo một Redux store. Hàm này nhận vào một reducer (trong trường hợp này là rootReducer) để xử lý các action và cập nhật trạng thái của ứng dụng. store sau đó chứa toàn bộ trạng thái của ứng dụng và các phương thức để dispatch actions, lắng nghe sự thay đổi của trạng thái, và nhiều tính năng khác liên quan đến quản lý trạng thái.
