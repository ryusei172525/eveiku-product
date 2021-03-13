import React from "react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { blockProps } from "../../types/blockType";
import { dataState } from "../../reducer/buildPageReducer";

import PlainText from "../helper/PlainText";
import ChangeableImage from "../../Components/ChangeableImage";

const Organizer: FC<blockProps> = ({ index, dist }) => {
  const images = (n: number) =>
    useSelector<dataState, string>(
      (state) => state.dataTypeArr[index].imageArr[n]
    );
  return (
    <section id="organizer">
      <div
        className="organizer-img img"
        style={{ backgroundImage: `url(${images(0)})` }}
      >
        <ChangeableImage blockIndex={index} imageIndex={0} dist={dist} />
      </div>
      <div className="organizer-text">
        <h3>
          <PlainText blockIndex={index} dist={dist} textIndex={0} />
        </h3>
        <p>
          <PlainText blockIndex={index} dist={dist} textIndex={1} />
        </p>
      </div>
    </section>
  );
};

export default Organizer;
