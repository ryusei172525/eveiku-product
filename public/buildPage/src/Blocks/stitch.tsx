import React from "react";
import { FC } from "react";
import { blockProps } from "../types/blockType";
import PlainText from "./helper/PlainText";

const style: { [key: string]: string } = {
  position: "relative",
  padding: "0.5em",
  background: "#a6d3c8",
  color: "white",
};
const Stitch: FC<blockProps> = ({ index, dist }) => {
  return (
    <h1 style={style}>
      <PlainText blockIndex={index} textIndex={0} dist={dist} />
    </h1>
  );
};
export default Stitch;
