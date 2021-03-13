import React, { useState } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editScreenStyleChange, openTemplate } from "../action/actions";
import { dataState } from "../reducer/buildPageReducer";
import { editScreen } from "../types";
import data from "../types/dataType";
import store from "../store/store";
import PublicOption from "./PublicOption";

const EditStyle: FC = (editStyle) => {
  const dispatch = useDispatch();

  // const isEditScreenOpen: boolean = useSelector<dataState, boolean>(
  //   (state) => state.editScreen.open
  // );

  function handleGetDefaultValue() {
    const state = store.getState();
    const blockIndex = state.editScreen.blockIndex;
    const textIndex = state.editScreen.textIndex;
    return useSelector<dataState, string>(
      (state) => state.dataTypeArr[blockIndex].colorArr[textIndex]
    );
  }

  function handleEditScreenStyleChange(value: string, style: number) {
    const state = store.getState();
    const blockIndex = state.editScreen.blockIndex;
    const textIndex = state.editScreen.textIndex;
    dispatch(
      editScreenStyleChange({
        blockIndex,
        textIndex,
        value,
        style,
      })
    );
  }
  const isSelectBlockScreenOpen: boolean = useSelector<dataState, boolean>(
    (state) => state.selectBlockScreen.open
  );

  return (
    <>
      <p>
        <label htmlFor="editStyleFont">フォント</label>

        <select
          id={"editStyleFont"}
          onChange={(e) => {
            const value = e.target.value;
            const style = 0;
            handleEditScreenStyleChange(value, style);
          }}
        >
          <option value="Georgia">Georgia</option>
          <option value="KosugiMaru">Kosugi Maru</option>
          <option value="NotoSansJP">Noto Sans</option>
          <option value="NotoSerifJP">Noto Serif</option>
          <option value="Roboto">Roboto</option>
          <option value="RobotoSlab">Roboto Slab</option>
        </select>
      </p>
      <p>
        <label htmlFor="editStyleSize">サイズ</label>

        <input
          id={"editStyleSize"}
          type="number"
          onChange={(e) => {
            const value = e.target.value;
            const style = 2;
            handleEditScreenStyleChange(value, style);
          }}
          min={1}
          max={255}
        />
      </p>
      <p>
        <label htmlFor="editStyleColor">カラー</label>
        <input
          id={"editStyleColor"}
          type="color"
          // value={handleGetDefaultValue()}
          onChange={(e) => {
            const value = e.target.value;
            const style = 1;
            handleEditScreenStyleChange(value, style);
          }}
        />
      </p>
    </>
  );
};

export default EditStyle;
