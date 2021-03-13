import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";
import { useSelector } from "react-redux";
import { dataState } from "../../reducer/buildPageReducer";
import ChangeableImage from "../../Components/ChangeableImage";

const About: FC<blockProps> = ({ index, dist }) => {
  const images = (n: number) =>
    useSelector<dataState, string>(
      (state) => state.dataTypeArr[index].imageArr[n]
    );
  return (
    <section id="about" style={{ backgroundImage: `url(${images(0)})` }}>
      <ChangeableImage blockIndex={index} imageIndex={0} dist={dist} />
      <h2 className="yu-Mincho">
        <PlainText blockIndex={index} textIndex={0} dist={dist} />
      </h2>
      <p className="yu-Mincho">
        <span className="yellow">
          <PlainText blockIndex={index} textIndex={1} dist={dist} />
        </span>
        <span className="yellow">
          <PlainText blockIndex={index} textIndex={2} dist={dist} />
        </span>
      </p>
    </section>
  );
};

export default About;
