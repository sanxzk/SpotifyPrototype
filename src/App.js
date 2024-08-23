import { Provider } from "react-redux";
import "./App.css";
import Home from "./Pages/Home/Home";
import store from "./store/store";

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
