import { Dispatch } from "react";
import actionCreatorFactory from "typescript-fsa";
import { dataState } from "../reducer/buildPageReducer";
import {
  blockType,
  editDataType,
  dataType,
  addBlockType,
  setEditScreenType,
  moveScreenType,
  template,
  event,
  publicOption,
  editScreenChangeType,
  editScreenStyleChangeType,
  changeImageType,
} from "../types";

import asyncFactory from "typescript-fsa-redux-thunk";
import queryString from "query-string";

const actionCreator = actionCreatorFactory();
export const registerBlockType = actionCreator<blockType>(
  "REGOSTER_BLOCK_TYPE"
);
export const updateBlock = actionCreator("UPDATE_BLOCK");
export const addBlock = actionCreator<dataType>("ADD_BLOCK");
export const addBlockByName = actionCreator<addBlockType>("ADD_BLOCK_BY_NAME");
export const removeBlock = actionCreator<number>("REMOVE_BLOCK");
export const setEditScreen = actionCreator<setEditScreenType>(
  "SET_EDIT_SCREEN"
);
export const editScreenChange = actionCreator<editScreenChangeType>(
  "EDIT_SCREEN_CHANGE"
);
export const editScreenStyleChange = actionCreator<editScreenStyleChangeType>(
  "EDIT_SCREEN_STYLE_CHANGE"
);
export const changeImage = actionCreator<changeImageType>("CHANGE_IMAGE");
export const editColorChange = actionCreator<string>("EDIT_COLOR_CHANGE");
export const editFontChange = actionCreator<string>("EDIT_FONT_CHANGE");
export const editSizeChange = actionCreator<string>("EDIT_SIZE_CHANGE");
export const putUpData = actionCreator<number>("PUT_UP_DATA");
export const putDownData = actionCreator<moveScreenType>("PUT_DOWN_DATA");
export const setAllState = actionCreator<dataState>("SET_ALL_STATE");
export const openSelectBlockScreen = actionCreator<number>(
  "OPEN_SELECT_BLOCK_SCREEN"
);
export const openTemplate = actionCreator<number>("OPEN_TEMPLATE");
export const closeSelectBlockScreen = actionCreator(
  "CLOSE_SELECT_BLOCK_SCREEN"
);
export const registerTemplate = actionCreator<template>("REGISTER_TEMPLATE");
export const openSlectTemplateScreen = actionCreator(
  "OPEN_SELECT_TEMPLATE_SCREEN"
);
export const closeSlectTemplateScreen = actionCreator(
  "CLOSE_SELECT_TEMPLATE_SCREEN"
);
export const selectTemplate = actionCreator<template>("SELECT_TEMPLATE");
export const loadData = actionCreator<string>("LOAD_ALL_DOCS");
export const loadPublic = actionCreator<publicOption>("LOAD_PUBLIC");
const host: string = window.location.host;
const createAsync = asyncFactory<dataState>(actionCreator);
export const loadDataAsync = createAsync(
  "LOAD_STATE_ASYNC",
  async (params, dispatch) => {
    const parsed = queryString.parse(window.location.search);
    let param: string = "";
    if (parsed.id !== undefined) {
      param = "/" + parsed.id;
    } else if (parsed.template !== undefined) {
      param = "/template/" + parsed.template;
    }
    await fetch("http://" + host + "/build-page/data" + param, {
      method: "GET",
      mode: "same-origin",
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch(loadData(json.html));
        if (json.publicOption) {
          dispatch(loadPublic(json.publicOption));
        }
        if (json.category) {
          dispatch(setAttributeOption(json.category));
        }
        if (json.title) {
          dispatch(addTitle(json.title));
        }
        if (json.city) {
          dispatch(setPlace(json.city));
        }
        if (json.capacity) {
          dispatch(setCapacity(json.capacity));
        }
        if (json.entry_way) {
          dispatch(setParticipationFormOption(json.entry_way));
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
);
export const setAttributeOption = actionCreator<number>("SET_ATTRIBUTE_OPTION");
export const setParticipationFormOption = actionCreator<number>(
  "SET_PAETICIPATION_FORM_OPTION"
);
export const addTitle = actionCreator<string>("ADD_TITLE");
export const addDescription = actionCreator<string>("ADD_DISCRIPTION");
export const addUlr = actionCreator<string>("ADD_URL");
export const addOrganizer = actionCreator<string>("ADD_ORGANIZER");
export const addDate = actionCreator<string>("ADD_DATE");
export const addHashtag = actionCreator<string>("ADD_HASHTAG");
export const removeHashtag = actionCreator<string>("REMOVE_HASHTAG");
export const setHashtag = actionCreator<string[]>("SET_HASHTAG");
export const setPrice = actionCreator<number>("SET_PRICE");
export const setOnlinePrice = actionCreator<number>("SET_ONLINE_PLACE");
export const setPlace = actionCreator<string>("SET_PLACE");
export const setOnlineUrl = actionCreator<string>("SET_ONLINE_URL");
export const setCapacity = actionCreator<number>("SET_CAPACITY");
export const setOnlineCapacity = actionCreator<number>("SET_ONLINE_CAPACITY");
export const setApplicants = actionCreator<number>("SET_APPLICANTS");
export const setPublicOption = actionCreator<publicOption>("SET_PUBLIC_OPTION");
export const setID = actionCreator<number>("SET_ID");

const actions = {
  registerBlockType,
  updateBlock,
  addBlock,
  setEditScreen,
  addBlockByName,
  removeBlock,
  putDownData,
  changeImage,
  editScreenChange,
  editColorChange,
  editFontChange,
  editSizeChange,
  putUpData,
  setAllState,
  openSelectBlockScreen,
  openTemplate,
  closeSelectBlockScreen,
  registerTemplate,
  openSlectTemplateScreen,
  closeSlectTemplateScreen,
  selectTemplate,
  loadData,
  loadPublic,
  loadDataAsync,
  setAttributeOption,
  setParticipationFormOption,
  addTitle,
  addDescription,
  addOrganizer,
  addUlr,
  addHashtag,
  addDate,
  removeHashtag,
  setHashtag,
  setPrice,
  setOnlinePrice,
  setPlace,
  setOnlineUrl,
  setCapacity,
  setOnlineCapacity,
  setApplicants,
  setID,
};
export default actions;
