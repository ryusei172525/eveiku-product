import { ViewArea } from "../../Blocks";
import { dataState } from "../../reducer/buildPageReducer";
import store from "../../store/store";
import actions from "../../action/actions";

const initialStore: dataState = {
  blockTypeArr: [
    {
      name: "viewArea",
      jsx: ViewArea,
      defaultText: ["サブタイトル", "イベントタイトル"],
      defaultFont: [""],
      defaultColor: [""],
      defaultSize: [""],
    },
  ],
  dataTypeArr: [
    {
      blockType: "viewArea",
      textArr: ["サブタイトル", "イベントタイトル"],
      fontArr: [],
      colorArr: [],
      sizeArr: [],
      index: 0,
    },
  ],
  editScreen: {
    open: false,
    text: "",
    font: "", //for font
    color: "",
    size: "",
    blockIndex: 0,
    textIndex: 0,
  },
  templates: [],
  selectBlockScreen: {
    open: false,
    blockIndex: 0,
  },
  selectTemplateScreen: {
    open: false,
  },
  publicOption: {
    attribute: 0,
    participationForm: 0,
    hashtag: [],
    date: "string",
    price: 0,
    place: "",
    capacity: 0,
    applicants: 0,
  },
  id: null,
};

const createTestStore = (): void => {
  store.dispatch(actions.setAllState(initialStore));
};

export default createTestStore;
