import React from "react";
import { Provider } from "react-redux";
import createStore from "./redux/createStore";
import AbTestContainer from "./modules/MainPage";

const store = createStore();

const App = () => {
    return (
        <Provider store={store}>
            <AbTestContainer/>
        </Provider>
    );
};

export default App;
