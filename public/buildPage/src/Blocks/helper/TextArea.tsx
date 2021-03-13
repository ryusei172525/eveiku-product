import React, { Fragment } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditScreen } from "../../action/actions";
import { dataState } from "../../reducer/buildPageReducer";
import { helperComponent } from "./BlockHelper";

const TextArea: FC<helperComponent> = ({
  blockIndex,
  textIndex,
  dist = false,
}) => {
  const dispatch = useDispatch();
  const state = useSelector<dataState, string>(
    (state) => state.dataTypeArr[blockIndex].textArr[textIndex]
  );
  return (
    <>
      {dist ? (
        <>{`<!-- index:${textIndex} -->${state}`}</>
      ) : (
        <span
          onClick={() => {
            dispatch(setEditScreen({ blockIndex, textIndex }));
          }}
          style={{
            border: "1px solid",
          }}
        >
          {state}
        </span>
      )}
    </>
  );
};

export default TextArea;
