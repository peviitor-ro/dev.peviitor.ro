import React from "react";
import { createRoot } from "react-dom/client";
import RouterApp from "./routerApp";

/* eslint-disable react/function-component-definition */

const container = document.getElementById("root");
createRoot(container).render(<RouterApp />);
