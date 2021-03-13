import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";

const Caution: FC<blockProps> = ({ index, dist }) => {
  return (
    <section id="caution">
      <h2 className="yellow yu-Mincho">
        <PlainText blockIndex={index} textIndex={0} dist={dist} />
      </h2>
      <div className="container">
        <p>
          <span className="yellow">※</span>
          <PlainText blockIndex={index} textIndex={1} dist={dist} />
        </p>
        <p>
          <span className="yellow">※</span>
          <PlainText blockIndex={index} textIndex={2} dist={dist} />
        </p>
        <p>
          <span className="yellow">※</span>
          <PlainText blockIndex={index} textIndex={3} dist={dist} />
        </p>
        <p>
          <span className="yellow">※</span>
          <PlainText blockIndex={index} textIndex={4} dist={dist} />
        </p>
        <p>
          <span className="yellow">※</span>
          <PlainText blockIndex={index} textIndex={5} dist={dist} />
        </p>
      </div>
    </section>
  );
};

export default Caution;
