import React, { useState } from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { is } from "sequelize/types/lib/operators";
import actions from "../action/actions";
import { Border } from "../Blocks/menu";

import { moveScreenType } from "../types";

type blockWrapperProps = {
  blockIndex: number;
  len: number;
};

const BlockWrapper: FC<moveScreenType> = ({ children, blockIndex, len }) => {
  const dispatch = useDispatch();
  const createNewBlock = (): boolean => {
    dispatch(actions.openSelectBlockScreen(blockIndex));
    return true;
  };
  const removeBlock = (): boolean => {
    dispatch(actions.removeBlock(blockIndex));
    return true;
  };
  const putUpData = (): boolean => {
    dispatch(actions.putUpData(blockIndex));
    return true;
  };
  const putDownData = (): boolean => {
    const moveScreen = {
      blockIndex: blockIndex,
      len: len,
    };
    dispatch(actions.putDownData(moveScreen));
    return true;
  };

  const [isFocus, setFocus] = useState(false);
  const enterFocus = () => setFocus(true);
  const leaveFocus = () => setFocus(false);

  return (
    <div
      onMouseLeave={leaveFocus}
      onMouseEnter={enterFocus}
      style={{
        margin: "-20px",
        border: isFocus ? "#1F49A2FF 10px solid" : "#1F49A200 10px solid",
        zIndex: isFocus ? 1 : 0,
        position: "relative",
      }}
    >
      <div
        className="function-container"
        style={{ visibility: isFocus ? "visible" : "hidden" }}
      >
        <button onClick={() => putUpData()} className="putUp fn-button">
          ↑
        </button>
        <button
          onClick={() => removeBlock()}
          className="delete fn-button"
          id="delete"
        >
          ✕
        </button>
        <button onClick={() => putDownData()} className="putDown fn-button">
          ↓
        </button>
      </div>
      {children}
      <div
        className="create-new-block"
        style={{ visibility: isFocus ? "visible" : "hidden" }}
      >
        <div className="plus-icon-wrap">
          <p className="plus-icon" onClick={createNewBlock}>
            ＋
          </p>
        </div>
      </div>
    </div>
  );
};
export default BlockWrapper;
