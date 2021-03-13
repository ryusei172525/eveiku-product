import { FC } from "react";
import store from "../store/store";
import blockType, { blockProps } from "../types/blockType";

const getJsx = (blockTypeName: string): FC<blockProps> | undefined => {
  const state: blockType[] = store.getState().blockTypeArr;
  let jsx: FC<blockProps> | undefined;
  for (let item of state) {
    if (item.name === blockTypeName) {
      jsx = item.jsx;
    }
  }
  return jsx;
};

export default getJsx;
