import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";
import innerProps from "../helper/innerProps";

const Menu: FC<innerProps> = ({ index, dist, className }) => {
  return (
    <nav className={className}>
      <ul>
        <li>
          <a href="#">
            <PlainText blockIndex={index} textIndex={0} dist={dist} />
          </a>
        </li>
        <li>
          <a href="#">
            <PlainText blockIndex={index} textIndex={1} dist={dist} />
          </a>
        </li>
        <li>
          <a href="#">
            <PlainText blockIndex={index} textIndex={2} dist={dist} />
          </a>
        </li>
        <li>
          <a href="#">
            <PlainText blockIndex={index} textIndex={3} dist={dist} />
          </a>
        </li>
        <li>
          <a href="#">
            <PlainText blockIndex={index} textIndex={4} dist={dist} />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;

export const Icon: FC<blockProps> = ({ index, dist }) => (
  <Menu index={index} dist={dist} className={"menu-icon"} />
);

export const Sinple: FC<blockProps> = ({ index, dist }) => (
  <Menu index={index} dist={dist} className={"menu-sinple"} />
);

export const Border: FC<blockProps> = ({ index, dist }) => (
  <Menu index={index} dist={dist} className={"menu-border"} />
);
export const Underline: FC<blockProps> = ({ index, dist }) => (
  <Menu index={index} dist={dist} className={"menu-underline"} />
);
export const RulelineBgc: FC<blockProps> = ({ index, dist }) => (
  <Menu index={index} dist={dist} className={"menu-rulelineBgc"} />
);
export const RulelineUnder: FC<blockProps> = ({ index, dist }) => (
  <Menu index={index} dist={dist} className={"menu-rulelineunder"} />
);
export const UpperlineBgc: FC<blockProps> = ({ index, dist }) => (
  <Menu index={index} dist={dist} className={"menu-upperlineBgc"} />
);
export const Bgc: FC<blockProps> = ({ index, dist }) => (
  <Menu index={index} dist={dist} className={"menu-bgc"} />
);

export const menuArr = [
  { name: "iconMenu", jsx: Icon },
  { name: "sinpleMenu", jsx: Sinple },
  { name: "borderMenu", jsx: Border },
  { name: "underlineMenu", jsx: Underline },
  { name: "rulelineBgcMenu", jsx: RulelineBgc },
  { name: "RulelineUnderMenu", jsx: RulelineUnder },
  { name: "upperlineBgcMenu", jsx: UpperlineBgc },
  { name: "bgcMenu", jsx: Bgc },
];
