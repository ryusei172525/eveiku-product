import { FC } from "react";

export type blockProps = {
  index: number;
  dist?: boolean;
};
type blockType = {
  name: string;
  displayName: string;
  jsx: FC<blockProps>;
  defaultText: string[];
  defaultColor: string[];
  defaultFont: string[];
  defaultSize: string[];
  defaultImage: string[];
};

export default blockType;
