// 初期値はbuild-page.jsとcssから

import React from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editScreenChange,
  editColorChange,
  editFontChange,
  editSizeChange,
  updateBlock,
} from "../action/actions";
import { dataState } from "../reducer/buildPageReducer";
import { editScreen } from "../types";
import data from "../types/dataType";

const EditScreen: FC = () => {
  const dispatch = useDispatch();

  const editScreenText: string = useSelector<dataState, string>(
    (state) => state.editScreen.text
  );

  const editScreenColor: string = useSelector<dataState, string>(
    (state) => state.editScreen.color
  );

  const editScreenFont: string = useSelector<dataState, string>(
    (state) => state.editScreen.font
  );

  const editScreenSize: string = useSelector<dataState, string>(
    (state) => state.editScreen.size
  );

  const editScreenOpen: boolean = useSelector<dataState, boolean>(
    (state) => state.editScreen.open
  );

  return (
    <>
      {editScreenOpen && (
        <div className="modal-update">
          <div className="text-update">
            <div className="update-input">
              <textarea
                // onChange={(e) => dispatch(editScreenChange(e.target.value))}
                value={editScreenText}
                style={{
                  whiteSpace: "pre-line",
                }}
              />
              <div className="change-text-style">
                <label htmlFor="">
                  カラー
                  <input
                    type="color"
                    onChange={(e) => dispatch(editColorChange(e.target.value))}
                    value={editScreenColor}
                  />
                </label>
                <label htmlFor="">
                  フォント
                  <select
                    onChange={(e) => dispatch(editFontChange(e.target.value))}
                    value={editScreenFont}
                  >
                    <option value="Georgia">Georgia</option>
                    <option value="KosugiMaru">Kosugi Maru</option>
                    <option value="NotoSansJP">Noto Sans</option>
                    <option value="NotoSerifJP">Noto Serif</option>
                    <option value="Roboto">Roboto</option>
                    <option value="RobotoSlab">Roboto Slab</option>
                  </select>
                </label>
                <label htmlFor="">
                  サイズ
                  <input
                    type="number"
                    onChange={(e) => dispatch(editSizeChange(e.target.value))}
                    value={editScreenSize}
                    min={1}
                    max={255}
                  />
                </label>
              </div>
            </div>
            <div className="update-text">
              <p>テキスト入力後に更新ボタンを押すと変更が反映されます</p>
            </div>
            <div className="triangle"></div>
            <div className="update-button">
              <button onClick={(e) => dispatch(updateBlock())}>更新</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditScreen;
