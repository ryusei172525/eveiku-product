import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";
import innerProps from "../helper/innerProps";

const Heading: FC<innerProps> = ({ index, dist, className }) => {
  return (
    <h1 className={className}>
      <PlainText blockIndex={index} textIndex={0} dist={dist} />
    </h1>
  );
};

export default Heading;

export const Stitch: FC<blockProps> = ({ index, dist }) => (
  <Heading index={index} dist={dist} className={"heading-stitch"} />
);

export const Ribbon: FC<blockProps> = ({ index, dist }) => (
  <Heading index={index} dist={dist} className={"heading-ribbon"} />
);

export const Underline: FC<blockProps> = ({ index, dist }) => (
  <Heading index={index} dist={dist} className={"heading-underline"} />
);

export const Crossline: FC<blockProps> = ({ index, dist }) => (
  <Heading index={index} dist={dist} className={"heading-crossline"} />
);

export const Leftline: FC<blockProps> = ({ index, dist }) => (
  <Heading index={index} dist={dist} className={"heading-leftline"} />
);

export const Updownline: FC<blockProps> = ({ index, dist }) => (
  <Heading index={index} dist={dist} className={"heading-updownline"} />
);

export const Speech: FC<blockProps> = ({ index, dist }) => (
  <Heading index={index} dist={dist} className={"heading-speech"} />
);

export const Line: FC<blockProps> = ({ index, dist }) => (
  <Heading index={index} dist={dist} className={"heading-line"} />
);

export const Dashed: FC<blockProps> = ({ index, dist }) => (
  <Heading index={index} dist={dist} className={"heading-dashed"} />
);

export const Gradation: FC<blockProps> = ({ index, dist }) => (
  <Heading index={index} dist={dist} className={"heading-gradation"} />
);

export const Doubleline: FC<blockProps> = ({ index, dist }) => (
  <Heading index={index} dist={dist} className={"heading-doubleline"} />
);

export const BgcUnderline: FC<blockProps> = ({ index, dist }) => (
  <Heading index={index} dist={dist} className={"heading-bgcunderline"} />
);

export const headingArr = [
  { name: "stitch", jsx: Stitch },
  { name: "ribbon", jsx: Ribbon },
  { name: "underline", jsx: Underline },
  { name: "crossline", jsx: Crossline },
  { name: "leftline", jsx: Leftline },
  { name: "updownline", jsx: Updownline },
  { name: "speech", jsx: Speech },
  { name: "line", jsx: Line },
  { name: "dashed", jsx: Dashed },
  { name: "gradation", jsx: Gradation },
  { name: "doubleline", jsx: Doubleline },
  { name: "bgcUnderline", jsx: BgcUnderline },
];
