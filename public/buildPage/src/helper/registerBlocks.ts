import store from "../store/store";
import actions from "../action/actions";
import ViewArea from "../Blocks/ViewArea";
import News from "../Blocks/News";
import { headingArr } from "../Blocks/heading/index";
import { menuArr } from "../Blocks/menu/index";
import { layoutArr } from "../Blocks/Layout";
import Button from "../Blocks/button/Button";
import Arrow from "../Blocks/arrow/Arrow";

const registerBlocks = () => {
  layoutArr.map((item) => {
    store.dispatch(actions.registerBlockType(item));
  });
  store.dispatch(
    actions.registerBlockType({
      name: "viewArea",
      displayName: "トップ画面2",

      jsx: ViewArea,
      defaultText: ["サブタイトル", "イベントタイトル"],
      defaultColor: ["rgb(0, 0, 0)", "rgb(0, 0, 0)"],
      defaultFont: ["font", "font"],
      defaultSize: ["35", "55"],
      defaultImage: [""],
    })
  );
  store.dispatch(
    actions.registerBlockType({
      name: "news",
      displayName: "注意事項",

      jsx: News,
      defaultText: ["2020.9.5 ○○を公開しました！"],
      defaultColor: [""],
      defaultFont: [""],
      defaultSize: [""],
      defaultImage: [""],
    })
  );
  // headingArr.map(({ name, jsx }) => {
  //   store.dispatch(
  //     actions.registerBlockType({
  //       name: name,
  //       jsx: jsx,
  //       defaultText: ["見出し"],
  //       defaultColor: [""],
  //       defaultFont: [""],
  //       defaultSize: [""],
  //     })
  //   );
  // });
  // menuArr.map(({ name, jsx }) => {
  //   store.dispatch(
  //     actions.registerBlockType({
  //       name: name,
  //       jsx: jsx,
  //       defaultText: ["Home", "News", "About", "Access", "Blog"],
  //       defaultColor: [""],
  //       defaultFont: [""],
  //       defaultSize: [""],
  //     })
  //   );
  // });

  store.dispatch(
    actions.registerBlockType({
      name: "ticketButton",
      displayName: "チケット購入ボタン",

      jsx: Button,
      defaultText: ["チケットはこちら"],
      defaultColor: [""],
      defaultFont: [""],
      defaultSize: [""],
      defaultImage: [""],
    })
  );
  store.dispatch(
    actions.registerBlockType({
      name: "arrow",
      displayName: "矢印",
      jsx: Arrow,
      defaultText: [],
      defaultColor: [],
      defaultFont: [],
      defaultSize: [],
      defaultImage: [""],
    })
  );
};

export default registerBlocks;
