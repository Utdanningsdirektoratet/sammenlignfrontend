// TODO: remove when IE11 dies
import "react-app-polyfill/ie11";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ReactModal from "react-modal";

import "./util/NoUndefinedClass";
import Widget from "./components/widget/Widget";
import { Lang } from "./components/app/Translate";

const root = document.getElementById("udir_sammenligning_root_8rBHo7hGy");
if (root) {
  ReactModal.setAppElement("#udir_sammenligning_root_8rBHo7hGy");
  ReactDOM.render(<App />, root);
}

const widgets = document.getElementsByClassName("sammenligning-widget");
for (let i = 0; i < widgets.length; i++) {
  const widget = widgets[i];
  ReactDOM.render(
    <Widget
      uno_id={widget.getAttribute("data-uno-id") || ""}
      widget_name={widget.getAttribute("data-widget-name") || ""}
      lang={(widget.getAttribute("lang") as Lang) || "nb"}
    />,
    widget
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
