import React from "react";
import { FC } from "react";
import { blockProps } from "../types/blockType";
import PlainText from "./helper/PlainText";

const News: FC<blockProps> = ({ index, dist }) => {
  return (
    <div className="news">
      <div className="news-wrap">
        <p className="news-title">NEWS</p>
        <p className="news-text">
          <PlainText blockIndex={index} textIndex={0} dist={dist} />
        </p>
      </div>
    </div>
  );
};
export default News;
