import * as React from "react";
import { render } from "react-dom";
import { Dashboard } from "./Dashboard";

import './styles.css';

declare const acquireVsCodeApi: <T = unknown>() => {
  getState: () => T;
  setState: (data: T) => void;
  postMessage: (msg: unknown) => void;
};

const elm = document.querySelector("#app");
render(<Dashboard />, elm);
