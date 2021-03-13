import React, { Fragment, useState } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditScreen, editScreenChange } from "../../action/actions";
import { dataState } from "../../reducer/buildPageReducer";
import { helperComponent } from "./BlockHelper";
import ContentEditable from "react-contenteditable";

const PlainText: FC<helperComponent> = ({
  blockIndex,
  textIndex,
  dist = false,
}) => {
  const dispatch = useDispatch();

  let text = useSelector<dataState, string>(
    (state) => state.dataTypeArr[blockIndex].textArr[textIndex]
  );

  const texts = text.split("<div>").map((text) => {
    return (
      <span>
        {text.replace("</div>", "")}
        <br />
      </span>
    );
  });

  const color = useSelector<dataState, string>(
    (state) => state.dataTypeArr[blockIndex].colorArr[textIndex]
  );
  const font = useSelector<dataState, string>(
    (state) => state.dataTypeArr[blockIndex].fontArr[textIndex]
  );
  const size = useSelector<dataState, string>(
    (state) => state.dataTypeArr[blockIndex].sizeArr[textIndex]
  );

  const [isFocus, setFocus] = useState(false);
  const enterFocus = () => setFocus(true);
  const leaveFocus = () => setFocus(false);

  return (
    <>
      {dist ? (
        <>
          <span
            style={{
              fontSize: size + "px",
              color: color,
            }}
            className={font}
          >
            {texts}
          </span>
        </>
      ) : (
        <div>
          <ContentEditable
            style={{
              fontSize: size + "px",
              color: color,
              border: isFocus ? "#ffffffff 2px solid" : "#ffffff00 2px solid",
            }}
            className={font}
            html={text}
            onClick={() =>
              dispatch(
                setEditScreen({
                  blockIndex,
                  textIndex,
                })
              )
            }
            onMouseLeave={leaveFocus}
            onMouseEnter={enterFocus}
            onChange={(e) => {
              let textContent: string = e.target.value;
              dispatch(
                editScreenChange({
                  blockIndex,
                  textIndex,
                  textContent,
                })
              );
            }}
          />
        </div>
      )}
    </>
  );
};

export default PlainText;
