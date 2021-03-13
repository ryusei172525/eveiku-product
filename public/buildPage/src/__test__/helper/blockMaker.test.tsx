import blockMaker from "../../helper/blockMaker";
import store from "../../store/store";
import { dataType } from "../../types";
import createTestStore from "../component/createTestStore";

describe("blockMaker", () => {
  it("create block by name", () => {
    createTestStore();
    const state = store.getState();
    const data = blockMaker("viewArea", 0, state.blockTypeArr);
    const expected: dataType = {
      blockType: "viewArea",
      index: 0,
      textArr: ["サブタイトル", "イベントタイトル"],
      fontArr: ["", ""],
      colorArr: ["", ""],
      sizeArr: ["", ""],
    };
    expect(data).toEqual(expected);
  });
});
