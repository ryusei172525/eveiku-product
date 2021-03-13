import React from "react";
import { FC } from "react";
import store from "../store/store";
import { Provider, useSelector } from "react-redux";
import ReactDOMServer from "react-dom/server";
import parserHtml from "prettier/parser-html";
import prettier from "prettier";
import { dataState } from "../reducer/buildPageReducer";
import getJsx from "./getJsx";

const Dist: FC = () => {
  const data: dataState = useSelector<dataState, dataState>((state) => state);
  return (
    <>
      {data.dataTypeArr.map((data, index) => {
        const Jsx = getJsx(data.blockType);
        if (Jsx !== undefined) {
          return (
            <>
              {`<!-- block:${data.blockType} -->`}
              <Jsx index={index} dist key={index} />
              {`<!-- blockend -->`}
            </>
          );
        }
      })}
    </>
  );
};

const Wrapper: FC = () => {
  return (
    <Provider store={store}>
      <Dist />
    </Provider>
  );
};

const createHtml = (): string => {
  const component = <Wrapper />;
  let rawHtml = ReactDOMServer.renderToString(component);
  const commentOutRegExp = /&lt;!-- (.+?) --&gt;/g;
  rawHtml = rawHtml.replace(commentOutRegExp, "\n<!-- $1 -->\n");
  const parsedHtml = prettier.format(rawHtml, {
    semi: false,
    parser: "html",
    htmlWhitespaceSensitivity: "ignore",
    plugins: [parserHtml],
  });
  return parsedHtml;
};

export default createHtml;
