import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";

const Placebox: FC<blockProps> = ({ index, dist }) => {
  return (
    <section id="place-box">
      <h2>
        <PlainText blockIndex={index} textIndex={0} dist={dist} />
      </h2>
      <p>
        <PlainText blockIndex={index} textIndex={1} dist={dist} />
        <br className="pc-none" />
        <PlainText blockIndex={index} textIndex={2} dist={dist} />
      </p>
      <h3>
        <PlainText blockIndex={index} textIndex={3} dist={dist} />
        <br className="pc-none" />
        <PlainText blockIndex={index} textIndex={4} dist={dist} />
      </h3>
    </section>
  );
};

export default Placebox;
