import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataState } from "../reducer/buildPageReducer";
import { blockType } from "../types";
import actions from "../action/actions";

const SelectBlockScreen: FC = () => {
  const dispatch = useDispatch();
  const blockTypeArr: blockType[] = useSelector<dataState, blockType[]>(
    (state) => state.blockTypeArr
  );
  const blockIndex: number = useSelector<dataState, number>(
    (state) => state.selectBlockScreen.blockIndex
  );
  const addBlock = (blockType: string) => {
    dispatch(
      actions.addBlockByName({
        name: blockType,
        index: blockIndex + 1,
      })
    );
  };
  const closeSelectBlockScreen = () => {
    actions.closeSelectBlockScreen();
  };
  return (
    <>
      {blockTypeArr.map((blockType, index) => (
        <div className="menu-item">
          <div
            key={index}
            style={{ color: "white" }}
            onClick={() => {
              addBlock(blockType.name);
            }}
          >
            {blockType.displayName}
          </div>
        </div>
      ))}
    </>
  );
};
export default SelectBlockScreen;
