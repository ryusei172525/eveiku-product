import createTestStore from "../component/createTestStore";
import createHtml from "../../helper/createHtml";
import store from "../../store/store";
import actions from "../../action/actions";
import News from "../../Blocks/News";

const expected = `<!-- block:viewArea -->
<div class="view-area">
  <div class="sns-icon">
    <img src="/img/icon-removebg-preview@2x.png" alt="" />
  </div>
  <div class="text-area">
    <p class="sub-title">
      <!-- index:0 -->
      サブタイトル
    </p>
    <p class="event-title">
      <!-- index:1 -->
      イベントタイトル
    </p>
  </div>
  <div class="ticket-icon">
    <img
      class="above"
      src="/images/ticket01.png"
      alt=""
    /><img class="under" src="/images/ticket02.png" alt="" />
    <p class="ticket-icon__text">チケットは<br />こちら</p>
  </div>
</div>
<!-- blockend -->
`;
describe("createHtml", () => {
  it("create html by store", () => {
    createTestStore();
    const html = createHtml();
    expect(html).toBe(expected);
  });
  it("does not output </span", () => {
    createTestStore();
    store.dispatch(
      actions.registerBlockType({
        name: "newsLayout",
        jsx: News,
        defaultText: ["News", "2020.9.5", "○○を公開しました！"],
        defaultFont: [""],
        defaultColor: [""],
        defaultSize: [""],
      })
    );
    store.dispatch(actions.addBlockByName({ name: "newsLayout", index: 0 }));
    store.dispatch(actions.removeBlock(1));
    const html = createHtml();
    console.log(html);
    expect(html.match(/<\/span(?!>)/)).toBeNull();
  });
});
