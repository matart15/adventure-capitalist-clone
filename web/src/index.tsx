import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./Pages/App";
import * as serviceWorker from "./serviceWorker";
import { GameComponent } from "./Components/Game";
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
