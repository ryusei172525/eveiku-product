import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";
import { useSelector } from "react-redux";
import { dataState } from "../../reducer/buildPageReducer";
import ChangeableImage from "../../Components/ChangeableImage";

const Place2: FC<blockProps> = ({ index, dist }) => {
  const images = (n: number) =>
    useSelector<dataState, string>(
      (state) => state.dataTypeArr[index].imageArr[n]
    );
  return (
    <section id="place2">
      <div
        className="place2-img img"
        style={{ backgroundImage: `url(${images(0)})` }}
      >
        <ChangeableImage blockIndex={index} imageIndex={0} dist={dist} />
      </div>
      <div className="place2-text">
        <h3>
          <PlainText blockIndex={index} textIndex={0} dist={dist} />
        </h3>
        <p>
          <PlainText blockIndex={index} textIndex={1} dist={dist} />
          <br />
          <PlainText blockIndex={index} textIndex={2} dist={dist} />
          <br />
          <PlainText blockIndex={index} textIndex={3} dist={dist} />
        </p>
      </div>
    </section>
  );
};

export default Place2;
