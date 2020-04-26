// import React from "react";
import ReactDOM from "react-dom/server";
import dom from 'cheerio';
import { ReactElementType } from "./types";

export const Render = (component: ReactElementType) =>
    dom.load(ReactDOM.renderToStaticMarkup(component));