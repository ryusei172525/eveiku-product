import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";

const Program: FC<blockProps> = ({ index, dist }) => {
  return (
    <section id="program">
      <div className="program-box box1">
        <span className="yu-Mincho yellow num">01</span>
        <div className="program-text-box">
          <h4>
            <PlainText blockIndex={index} textIndex={0} dist={dist} />
          </h4>
          <p>
            <PlainText blockIndex={index} textIndex={1} dist={dist} />
          </p>
        </div>
      </div>
      <div className="program-box box2">
        <span className="yu-Mincho yellow num">02</span>
        <div className="program-text-box">
          <h4>
            <PlainText blockIndex={index} textIndex={2} dist={dist} />
          </h4>
          <p>
            <PlainText blockIndex={index} textIndex={3} dist={dist} />
          </p>
        </div>
      </div>
      <div className="program-box box3">
        <span className="yu-Mincho yellow num">03</span>
        <div className="program-text-box">
          <h4>
            <PlainText blockIndex={index} textIndex={4} dist={dist} />
          </h4>
          <p>
            <PlainText blockIndex={index} textIndex={5} dist={dist} />
          </p>
        </div>
      </div>
      <div className="program-box box4">
        <span className="yu-Mincho yellow num">04</span>
        <div className="program-text-box">
          <h4>
            <PlainText blockIndex={index} textIndex={6} dist={dist} />
          </h4>
          <p>
            <PlainText blockIndex={index} textIndex={7} dist={dist} />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Program;
