import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataState } from "../reducer/buildPageReducer";
import { blockType, dataType, template } from "../types";
import actions from "../action/actions";

const SelectTemplateScreen: FC = () => {
  const dispatch = useDispatch();
  const templateArr: template[] = useSelector<dataState, template[]>(
    (state) => state.templates
  );
  const selectTemplate = (template: template) => {
    dispatch(actions.selectTemplate(template));
  };
  return (
    <>
      {templateArr.map((template, index) => (
        <div
          key={index}
          onClick={() => {
            selectTemplate(template);
          }}
        >
          {template.name}
        </div>
      ))}
    </>
  );
};
export default SelectTemplateScreen;
