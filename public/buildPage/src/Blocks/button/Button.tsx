import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";

const Button: FC<blockProps> = ({ index, dist }) => {
  return dist ? (
    <div className="btn">
      <a href="/verify">
        <img src="/images/ticket02.png" alt="チケット画像" />
        <p className="yu-Gothic">
          <PlainText blockIndex={index} textIndex={0} dist={dist} />
        </p>
      </a>
    </div>
  ) : (
    <div className="btn">
      <a>
        <img src="/images/ticket02.png" alt="チケット画像" />
        <p className="yu-Gothic">
          <PlainText blockIndex={index} textIndex={0} dist={dist} />
        </p>
      </a>
    </div>
  );
};
export default Button;
