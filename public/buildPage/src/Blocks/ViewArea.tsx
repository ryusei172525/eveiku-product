import React, { FC } from "react";
import { blockProps } from "../types/blockType";
import PlainText from "./helper/PlainText";

const ViewArea: FC<blockProps> = ({ index, dist }) => {
  return (
    <div className="view-area img img-bg">
      <div className="sns-icon">
        <img src="/images/icon-removebg-preview@2x.png" alt="" />
      </div>

      <div className="text-area">
        <p className="sub-title">
          <PlainText blockIndex={index} textIndex={0} dist={dist} />
        </p>
        <p className="event-title">
          <PlainText blockIndex={index} textIndex={1} dist={dist} />
        </p>
      </div>
      <a href="/verify">
        <div className="ticket-icon">
          <img className="above" src="/images/ticket01.png" alt="" />
          <img className="under" src="/images/ticket02.png" alt="" />
          <p className="ticket-icon__text">
            チケットは
            <br />
            こちら
          </p>
        </div>
      </a>
    </div>
  );
};

export default ViewArea;
