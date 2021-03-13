import dataType from "../types/dataType";
import blockType from "../types/blockType";
import dataTypeArr from "../types/dataType";
import { Action } from "redux";
import actions, {
  editScreenChange,
  editScreenStyleChange,
  editColorChange,
  editFontChange,
  editSizeChange,
  putUpData,
  putDownData,
  changeImage,
} from "../action/actions";
import { isType } from "typescript-fsa";
import {
  editScreen,
  selectBlockScreen,
  selectTemplateScreen,
  template,
  publicOption,
  moveScreenType,
} from "../types";
import htmlDiagnostic from "../helper/htmlDiagnostic";
import _, { has } from "lodash";
import blockMaker from "../helper/blockMaker";
import { act } from "react-test-renderer";

export type dataState = {
  blockTypeArr: blockType[];
  dataTypeArr: dataType[];
  editScreen: editScreen;
  selectBlockScreen: selectBlockScreen;
  templates: template[];
  selectTemplateScreen: selectTemplateScreen;
  publicOption: publicOption;
  id: number | null;
  moveScreen: moveScreenType;
};

const templateList = [
  [
    {
      blockType: "topViewLayout",
      textArr: [
        "サブタイトル",
        "イベントタイトル",
        "キャッチコピー",
        "が入ります。",
      ],
      colorArr: ["#ffffff"],
      fontArr: ["Georgia"],
      sizeArr: ["20"],
      index: 0,
      imageArr: ["/images/template-top01.jpg"],
    },
    {
      blockType: "placeboxLayout",
      textArr: [
        "幕張メッセ　展示ホール○～○階",
        "〒123-4567 ○○市△△区2-1",
        "【Web】www.a-bcdef.co.jp",
        "日程： 2018年8月11日(土)〜",
        "15日(水)・17日(金)〜19日(日)",
      ],
      colorArr: [""],
      fontArr: [""],
      sizeArr: [""],
      index: 2,
      imageArr: [],
    },
    {
      blockType: "ticketButton",
      textArr: ["チケットはこちら"],
      colorArr: ["#ffffff"],
      fontArr: ["Georgia"],
      sizeArr: ["20"],
      index: 3,
      imageArr: [],
    },
    {
      blockType: "organizerLayout",
      textArr: [
        "○○　○○○○",
        "主催者の紹介文が入ります。主催者の紹介文が入ります。主催者の紹介文が入ります。主催者の紹介文が入ります。ここは後で差し替えます。",
      ],
      colorArr: [""],
      fontArr: [""],
      sizeArr: [""],
      index: 4,
      imageArr: ["/images/artist01.jpg"],
    },
    {
      blockType: "AboutLayout",
      textArr: [
        "「イベントタイトル」とは？",
        "サンプルテキストです。サンプルテキストです。",
        "サンプルテキストです。サンプルテキストです。",
      ],
      colorArr: [""],
      fontArr: [""],
      sizeArr: [""],
      index: 5,
      imageArr: ["/images/top04.jpg"],
    },
    {
      blockType: "arrow",
      textArr: [""],
      colorArr: [""],
      fontArr: [""],
      sizeArr: [""],
      index: 6,
      imageArr: [],
    },
    {
      blockType: "ProgramLayout",
      textArr: [
        "プログラムタイトル",
        "プログラム1の説明が入ります。",
        "プログラムタイトル",
        "プログラム2の説明が入ります。",
        "プログラムタイトル",
        "プログラム3の説明が入ります。",
        "プログラムタイトル",
        "プログラム4の説明が入ります。",
      ],
      colorArr: [""],
      fontArr: [""],
      sizeArr: [""],
      index: 7,
      imageArr: [],
    },
    {
      blockType: "artist",
      textArr: [
        "アーティスト",
        "アーティスト1",
        "アーティストの説明が入ります。アーティストの説明が入ります。",
        "アーティスト2",
        "アーティストの説明が入ります。アーティストの説明が入ります。",
        "アーティスト3",
        "アーティストの説明が入ります。アーティストの説明が入ります。",
      ],
      colorArr: [""],
      fontArr: [""],
      sizeArr: [""],
      index: 9,
      imageArr: [
        "/images/artist01.jpg",
        "/images/artist02.jpg",
        "/images/artist03.jpg",
      ],
    },
    {
      blockType: "place2",
      textArr: [
        "幕張メッセ　展示ホール〇～〇階",
        "住所：〒123-4567 ○○市△△区2-1",
        "Web：www.a-bcdef.co.jp",
        "TEL:：000-0000-0000",
      ],
      colorArr: [""],
      fontArr: [""],
      sizeArr: [""],
      index: 10,
      imageArr: ["/images/map.jpg"],
    },
    {
      blockType: "ticketButton",
      textArr: ["チケットはこちら"],
      colorArr: ["#ffffff"],
      fontArr: ["Georgia"],
      sizeArr: ["20"],
      index: 11,
      imageArr: [],
    },
    {
      blockType: "caution",
      textArr: [
        "注意事項",
        "注意事項1が入ります。",
        "注意事項2が入ります。",
        "注意事項3が入ります。",
        "サンプルテキストです。",
        "この文章は後で差し替えます。",
      ],
      colorArr: [""],
      fontArr: [""],
      sizeArr: [""],
      index: 12,
      imageArr: [],
    },
    // {
    //   blockType: "SHARE",
    //   textArr: [],
    //   colorArr: [],
    //   fontArr: [],
    //   sizeArr: [],
    //   index: 13,
    //   imageArr: [],
    // },
  ],
];

const initialState: dataState = {
  blockTypeArr: [],
  dataTypeArr: templateList[0],
  editScreen: {
    open: false,
    text: "",
    color: "",
    font: "",
    size: "",
    blockIndex: 0,
    textIndex: 0,
  },
  selectBlockScreen: {
    open: false,
    blockIndex: 0,
  },
  templates: [],
  selectTemplateScreen: {
    open: false,
  },
  publicOption: {
    title: "",
    description: "",
    organizer: "",
    url: "",
    attribute: 0,
    participationForm: 0,
    hashtag: "",
    date: "2020-12-31",
    price: 0,
    place: "",
    capacity: 0,
    applicants: 0,
    onlineCapacity: 0,
    onlinePrice: 0,
    onlineUrl: "",
  },
  id: null,
  moveScreen: {
    blockIndex: 0,
    len: 0,
  },
};

const buildPageReducer = (
  state: dataState = initialState,
  action: Action
): dataState => {
  // console.log("action", action, typeof action);
  if (isType(action, actions.registerBlockType)) {
    state.blockTypeArr.push(action.payload);
    return state;
  } else if (isType(action, actions.updateBlock)) {
    state.dataTypeArr[state.editScreen.blockIndex].textArr[
      state.editScreen.textIndex
    ] = state.editScreen.text;

    state.dataTypeArr[state.editScreen.blockIndex].colorArr[
      state.editScreen.textIndex
    ] = state.editScreen.color;

    state.dataTypeArr[state.editScreen.blockIndex].fontArr[
      state.editScreen.textIndex
    ] = state.editScreen.font;

    state.dataTypeArr[state.editScreen.blockIndex].sizeArr[
      state.editScreen.textIndex
    ] = state.editScreen.size;

    state.editScreen.open = false;
    return { ...state, dataTypeArr: _.cloneDeep(state.dataTypeArr) };
  } else if (isType(action, actions.addBlock)) {
    state.dataTypeArr.splice(action.payload.index, 0, action.payload);
    state.dataTypeArr.map((item, index) => {
      item.index = index;
      return item;
    });
    const newDataTypeArr = _.cloneDeep(state.dataTypeArr);
    return { ...state, dataTypeArr: newDataTypeArr };
  } else if (isType(action, actions.addBlockByName)) {
    const block = blockMaker(
      action.payload.name,
      action.payload.index,
      state.blockTypeArr
    );
    if (!block) return state;
    state.dataTypeArr.splice(action.payload.index, 0, block);
    state.dataTypeArr.map((item, index) => {
      item.index = index;
      return item;
    });
    const newDataTypeArr = _.cloneDeep(state.dataTypeArr);
    return { ...state, dataTypeArr: newDataTypeArr };
  } else if (isType(action, actions.removeBlock)) {
    state.dataTypeArr.splice(action.payload, 1);
    state.dataTypeArr.map((item, index) => {
      item.index = index;
      return item;
    });
    const newDataTypeArr = _.cloneDeep(state.dataTypeArr);
    return { ...state, dataTypeArr: newDataTypeArr };
  } else if (isType(action, actions.setEditScreen)) {
    state.editScreen.open = false;

    // const text =
    //   state.dataTypeArr[action.payload.blockIndex].textArr[
    //     action.payload.textIndex
    //   ];
    // state.editScreen.text = text;

    // const color =
    //   state.dataTypeArr[action.payload.blockIndex].colorArr[
    //     action.payload.textIndex
    //   ];
    // state.editScreen.color = color;

    // const font =
    //   state.dataTypeArr[action.payload.blockIndex].fontArr[
    //     action.payload.textIndex
    //   ];
    // state.editScreen.font = font;

    // const size =
    //   state.dataTypeArr[action.payload.blockIndex].sizeArr[
    //     action.payload.textIndex
    //   ];
    // state.editScreen.size = size;

    state.editScreen.blockIndex = action.payload.blockIndex;
    state.editScreen.textIndex = action.payload.textIndex;
    const newDataTypeArr = _.cloneDeep(state.editScreen);
    return { ...state, editScreen: newDataTypeArr };
    // console.log(state.editScreen.blockIndex, state.editScreen.textIndex);
    // return state;
    return { ...state };
  } else if (isType(action, editScreenChange)) {
    state.dataTypeArr[action.payload.blockIndex].textArr[
      action.payload.textIndex
    ] = action.payload.textContent;
    // console.log("実行", action.payload.textContent);
    state.editScreen.open = true;

    return state;
  } else if (isType(action, editScreenStyleChange)) {
    if (action.payload.style == 0) {
      state.dataTypeArr[action.payload.blockIndex].fontArr[
        action.payload.textIndex
      ] = action.payload.value;
    }
    if (action.payload.style == 1) {
      state.dataTypeArr[action.payload.blockIndex].colorArr[
        action.payload.textIndex
      ] = action.payload.value;
    }
    if (action.payload.style == 2) {
      state.dataTypeArr[action.payload.blockIndex].sizeArr[
        action.payload.textIndex
      ] = action.payload.value;
    }
    // console.log("実行", action.payload.value);
    const newDataTypeArr = _.cloneDeep(state.dataTypeArr);
    return { ...state, dataTypeArr: newDataTypeArr };
  } else if (isType(action, editColorChange)) {
    state.editScreen.color = action.payload;
    return state;
  } else if (isType(action, editFontChange)) {
    state.editScreen.font = action.payload;
    return state;
  } else if (isType(action, editSizeChange)) {
    state.editScreen.size = action.payload;
    return state;
  } else if (isType(action, putUpData)) {
    let i = action.payload;
    if (i == 0) {
      const newDataTypeArr = _.cloneDeep(state.dataTypeArr);
      return { ...state, dataTypeArr: newDataTypeArr };
    }
    const temp = state.dataTypeArr[i];
    state.dataTypeArr[i] = state.dataTypeArr[i - 1];
    state.dataTypeArr[i - 1] = temp;
    state.dataTypeArr.map((item, index) => {
      item.index = index;
      return item;
    });
    const newDataTypeArr = _.cloneDeep(state.dataTypeArr);
    return { ...state, dataTypeArr: newDataTypeArr };
  } else if (isType(action, putDownData)) {
    let i = action.payload.blockIndex;
    const last = action.payload.len - 1;
    const temp = state.dataTypeArr[i];
    if (i >= last) {
      // console.log("stop");
      const newDataTypeArr = _.cloneDeep(state.dataTypeArr);
      return { ...state, dataTypeArr: newDataTypeArr };
    }
    state.dataTypeArr[i] = state.dataTypeArr[i + 1];
    state.dataTypeArr[i + 1] = temp;
    state.dataTypeArr.map((item, index) => {
      item.index = index;
      return item;
    });
    const newDataTypeArr = _.cloneDeep(state.dataTypeArr);
    return { ...state, dataTypeArr: newDataTypeArr };
  } else if (isType(action, actions.setAllState)) {
    return action.payload;
  } else if (isType(action, actions.openSelectBlockScreen)) {
    state.selectBlockScreen.open = true;
    state.selectBlockScreen.blockIndex = action.payload;
    return state;
  } else if (isType(action, actions.openTemplate)) {
    state.dataTypeArr = templateList[action.payload];
    const newDataTypeArr = _.cloneDeep(state.dataTypeArr);
    return { ...state, dataTypeArr: newDataTypeArr };
  } else if (isType(action, actions.closeSelectBlockScreen)) {
    state.selectBlockScreen.open = false;
    return state;
  } else if (isType(action, actions.registerTemplate)) {
    state.templates.push(action.payload);
    return state;
  } else if (isType(action, actions.openSlectTemplateScreen)) {
    state.selectTemplateScreen.open = true;
    return state;
  } else if (isType(action, actions.closeSlectTemplateScreen)) {
    state.selectTemplateScreen.open = false;
    return state;
  } else if (isType(action, actions.selectTemplate)) {
    state.dataTypeArr = action.payload.data;
    state.selectTemplateScreen.open = false;
    return state;
  } else if (isType(action, actions.loadData)) {
    const dataTypeArr: dataType[] = htmlDiagnostic(action.payload);
    state.dataTypeArr = dataTypeArr;
    return { ...state, dataTypeArr };
  } else if (isType(action, actions.loadPublic)) {
    const publicOption = action.payload;
    state.publicOption = publicOption;
    return { ...state, publicOption };
  } else if (isType(action, actions.changeImage)) {
    state.dataTypeArr[action.payload.blockIndex].imageArr[
      action.payload.imageIndex
    ] = action.payload.image;
    const newDataTypeArr = _.cloneDeep(state.dataTypeArr);
    return { ...state, dataTypeArr: newDataTypeArr };
  } else if (isType(action, actions.setAttributeOption)) {
    return {
      ...state,
      publicOption: { ...state.publicOption, attribute: action.payload },
    };
  } else if (isType(action, actions.setParticipationFormOption)) {
    return {
      ...state,
      publicOption: {
        ...state.publicOption,
        participationForm: action.payload,
      },
    };
  } else if (isType(action, actions.addTitle)) {
    let title = state.publicOption.title;
    title = action.payload;
    return { ...state, publicOption: { ...state.publicOption, title } };
  } else if (isType(action, actions.addDescription)) {
    let description = state.publicOption.description;
    description = action.payload;
    return { ...state, publicOption: { ...state.publicOption, description } };
  } else if (isType(action, actions.addOrganizer)) {
    let organizer = state.publicOption.organizer;
    organizer = action.payload;
    return { ...state, publicOption: { ...state.publicOption, organizer } };
  } else if (isType(action, actions.addUlr)) {
    let url = state.publicOption.url;
    url = action.payload;
    return { ...state, publicOption: { ...state.publicOption, url } };
  } else if (isType(action, actions.addDate)) {
    let date = state.publicOption.date;
    date = action.payload;
    return { ...state, publicOption: { ...state.publicOption, date } };
  } else if (isType(action, actions.addHashtag)) {
    let hashtag = state.publicOption.hashtag;
    hashtag = action.payload;
    return { ...state, publicOption: { ...state.publicOption, hashtag } };
  }

  // else if (isType(action, actions.removeHashtag)) {
  //   let hashtag = state.publicOption.hashtag;
  //   hashtag = _.pull(hashtag, action.payload);
  //   return { ...state, publicOption: { ...state.publicOption, hashtag } };
  // } else if (isType(action, actions.setHashtag)) {
  //   return {
  //     ...state,
  //     publicOption: { ...state.publicOption, hashtag: action.payload },
  //   };
  // }
  else if (isType(action, actions.setPrice)) {
    return {
      ...state,
      publicOption: { ...state.publicOption, price: action.payload },
    };
  } else if (isType(action, actions.setOnlinePrice)) {
    return {
      ...state,
      publicOption: { ...state.publicOption, onlinePrice: action.payload },
    };
  } else if (isType(action, actions.setPlace)) {
    return {
      ...state,
      publicOption: { ...state.publicOption, place: action.payload },
    };
  } else if (isType(action, actions.setOnlineUrl)) {
    return {
      ...state,
      publicOption: { ...state.publicOption, onlineUrl: action.payload },
    };
  } else if (isType(action, actions.setCapacity)) {
    return {
      ...state,
      publicOption: { ...state.publicOption, capacity: action.payload },
    };
  } else if (isType(action, actions.setOnlineCapacity)) {
    return {
      ...state,
      publicOption: { ...state.publicOption, onlineCapacity: action.payload },
    };
  } else if (isType(action, actions.setApplicants)) {
    return {
      ...state,
      publicOption: { ...state.publicOption, applicants: action.payload },
    };
  } else if (isType(action, actions.setID)) {
    return { ...state, id: action.payload };
  }
  return state;
};

export default buildPageReducer;
