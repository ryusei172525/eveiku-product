import htmlDiagnostic from "../../helper/htmlDiagnostic";
import { dataType } from "../../types";
import html1 from "./html";

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
describe("htmlDiagnostic", () => {
  it("get data from html", () => {
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
    expect(htmlDiagnostic(html)).toEqual(expected);
  });
  it("test", () => {
    const data = htmlDiagnostic(html1);
    console.log(data);
  });
});
