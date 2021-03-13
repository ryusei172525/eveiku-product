import getJsx from "../../helper/getJsx";
import store from "../../store/store";
import actions from "../../action/actions";
import blocks from "../../Blocks";

describe("getJsx(blockTypeName)", () => {
  it("return jsx", () => {
    store.dispatch(
      actions.registerBlockType({
        name: "viewArea",
        jsx: blocks.ViewArea,
        defaultText: ["サブタイトル", "イベントタイトル"],
        defaultFont: [""],
        defaultColor: [""],
        defaultSize: [""],
      })
    );
    const expected = getJsx("viewArea");
    expect(expected).toBe(blocks.ViewArea);
  });
});
