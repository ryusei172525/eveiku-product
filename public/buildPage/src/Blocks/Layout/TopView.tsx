import { url } from "inspector";
import React from "react";
import { FC } from "react";
import { useSelector } from "react-redux";
import ChangeableImage from "../../Components/ChangeableImage";
import { dataState } from "../../reducer/buildPageReducer";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";

const TopView: FC<blockProps> = ({ index, dist }) => {
  const images = (n: number) =>
    useSelector<dataState, string>(
      (state) => state.dataTypeArr[index].imageArr[n]
    );
  return (
    <section
      id="top-view"
      className="img img-bg"
      style={{ backgroundImage: `url(${images(0)})` }}
    >
      <ChangeableImage blockIndex={index} imageIndex={0} dist={dist} />
      <div className="title-box">
        <p className="yu-Mincho">
          <PlainText blockIndex={index} textIndex={0} dist={dist} />
        </p>
        <h1 className="yu-Mincho">
          <PlainText blockIndex={index} textIndex={1} dist={dist} />
        </h1>
      </div>
      <p className="catCopy yu-Mincho">
        <span className="yellow">
          <PlainText blockIndex={index} textIndex={2} dist={dist} />
        </span>
        <PlainText blockIndex={index} textIndex={3} dist={dist} />
      </p>
    </section>
  );
};

export default TopView;
