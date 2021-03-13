import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";

const News: FC<blockProps> = ({ index, dist }) => {
  return (
    <section id="news">
      <span className="yellow yu-Mincho">
        <PlainText blockIndex={index} textIndex={0} dist={dist} />
      </span>
      <p className="news-box">
        <span className="date">
          <PlainText blockIndex={index} textIndex={1} dist={dist} />
        </span>
        <span className="news-content">
          <PlainText blockIndex={index} textIndex={2} dist={dist} />
        </span>
      </p>
    </section>
  );
};

export default News;
