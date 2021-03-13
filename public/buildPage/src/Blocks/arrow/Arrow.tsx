import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";

const Arrow: FC<blockProps> = ({ index, dist }) => {
  return <div className="arrow"></div>;
};
export default Arrow;
