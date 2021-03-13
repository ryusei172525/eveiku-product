import store from "../store/store";
import actions from "../action/actions";
import fetchMock from "fetch-mock";
import { dataType } from "../types";
import createTestStore from "./component/createTestStore";

const html = `
<!-- block:viewArea -->
<div className="view-area">
    <div className="sns-icon">
        <img src="/img/icon-removebg-preview@2x.png" alt="" />
    </div>

    <div className="text-area">
        <p className="sub-title">
            <!-- index:1 -->
            hoge
            <!-- /1 -->
        </p>
        <p className="event-title">
            <!-- index:2 -->
            fuga
            <!-- /2 -->
        </p>
    </div>

    <div className="ticket-icon">
        <img className="above" src="/img/チケットのアイコン素材 (1)@2x.png" alt="" />
        <img className="under" src="/img/チケットのアイコン素材@2x.png" alt="" />
        <p className="ticket-icon__text">
            チケットは
            <br />
            こちら
        </p>
    </div>
</div>
<!-- blockend -->
<!-- block:test -->
<div>
</div>
<!-- blockend -->
`;
describe("loadAsync", () => {
  beforeEach(() => {
    createTestStore();
  });
  it("receive data from server and set data", async () => {
    fetchMock.get("http://" + window.location.host + "/build-page/data", {
      status: 200,
      body: JSON.stringify({
        html,
        price: 100,
        capacity: 10,
        city: "hoge",
        entry_way: 1,
        category: 1,
      }),
    });
    await store.dispatch(actions.loadDataAsync());
    const state = store.getState();
    const expected: dataType[] = [
      {
        blockType: "viewArea",
        textArr: ["hoge", "fuga"],
        fontArr: ["", ""],
        colorArr: ["", ""],
        sizeArr: ["", ""],
        index: 0,
      },
      {
        blockType: "test",
        textArr: [],
        fontArr: ["", ""],
        colorArr: ["", ""],
        sizeArr: ["", ""],
        index: 1,
      },
    ];
    expect(state.dataTypeArr).toEqual(expected);
  });
  it("get data from id param", async () => {
    Object.defineProperty(window, "location", {
      value: {
        search: "?id=1",
        host: "localhost",
      },
    });
    fetchMock.get("http://" + window.location.host + "/build-page/data/1", {
      status: 200,
      body: html,
    });
    await store.dispatch(actions.loadDataAsync());
    const state = store.getState();
    expect(state.dataTypeArr[0].textArr).toEqual(["hoge", "fuga"]);
  });
  it("get data from template param", async () => {
    Object.defineProperty(window, "location", {
      value: {
        search: "?template=1",
        host: "localhost",
      },
    });
    fetchMock.get(
      "http://" + window.location.host + "/build-page/data/template/1",
      {
        status: 200,
        body: html,
      }
    );
    await store.dispatch(actions.loadDataAsync());
  });
});
