import reducer, { dataState } from "../reducer/buildPageReducer";
import actions from "../action/actions";
import React, { FC } from "react";
import { blockType, dataType, template } from "../types";

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

const TestBlock: FC = () => <div></div>;
let initialState: dataState;
beforeEach(() => {
  initialState = {
    blockTypeArr: [],
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
    selectBlockScreen: {
      open: false,
      blockIndex: 0,
    },
    templates: [],
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
});

describe("buildPageReducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle registerBlockType", () => {
    const addedBlockType: blockType = {
      name: "test",
      jsx: TestBlock,
      defaultText: [""],
      defaultFont: [""],
      defaultColor: [""],
      defaultSize: [""],
    };
    expect(
      reducer(undefined, actions.registerBlockType(addedBlockType)).blockTypeArr
    ).toContainEqual(addedBlockType);
  });

  it("should handle updateBlock", () => {
    initialState.editScreen = {
      text: "test",
      font: "", //for font
      color: "",
      size: "",
      open: true,
      blockIndex: 0,
      textIndex: 0,
    };
    const state: dataState = reducer(initialState, actions.updateBlock());
    expect(state.dataTypeArr[0].textArr[0]).toBe("test");
    expect(state.editScreen.open).toBe(false);
  });

  it("should handle addBlock", () => {
    const addedBlockType: dataType = {
      blockType: "test",
      textArr: [""],
      fontArr: [],
      colorArr: [],
      sizeArr: [],
      index: 1,
    };
    expect(
      reducer(undefined, actions.addBlock(addedBlockType)).dataTypeArr
    ).toContainEqual(addedBlockType);
  });

  it("should control interrups with addBlock action", () => {
    let state = initialState;
    const addedBlockType1 = {
      blockType: "fuga",
      textArr: [""],
      fontArr: [],
      colorArr: [],
      sizeArr: [],
      index: 1,
    };
    const addedBlockType2 = {
      blockType: "hoge",
      textArr: [""],
      fontArr: [],
      colorArr: [],
      sizeArr: [],
      index: 1,
    };
    state = reducer(initialState, actions.addBlock(addedBlockType1));
    state = reducer(state, actions.addBlock(addedBlockType2));
    expect(state.dataTypeArr[1]).toEqual(addedBlockType2);
    expect(state.dataTypeArr[2]).toEqual({
      blockType: "fuga",
      textArr: [""],
      fontArr: [],
      colorArr: [],
      sizeArr: [],
      index: 2,
    });
  });

  it("should control addBlockByName", () => {
    const addedBlockType: blockType = {
      name: "test",
      jsx: TestBlock,
      defaultText: ["test"],
      defaultFont: [""],
      defaultColor: [""],
      defaultSize: [""],
    };
    let state: dataState = reducer(
      initialState,
      actions.registerBlockType(addedBlockType)
    );
    state = reducer(state, actions.addBlockByName({ name: "test", index: 1 }));
    expect(state.dataTypeArr.length).toBe(2);
  });
  it("should control setEditScreen", () => {
    let initialDataTypeArr: dataType[] = [
      {
        blockType: "viewArea",
        textArr: ["hoge", "fuga"],
        fontArr: [],
        colorArr: [],
        sizeArr: [],
        index: 0,
      },
    ];
    initialState.dataTypeArr = initialDataTypeArr;
    const updatedState: dataState = reducer(
      initialState,
      actions.setEditScreen({ blockIndex: 0, textIndex: 0 })
    );
    expect(updatedState.editScreen.open).toBe(true);
    expect(updatedState.editScreen.text).toBe("hoge");
  });
  it("should control editScreenChange", () => {
    let state: dataState = reducer(
      initialState,
      actions.setEditScreen({ blockIndex: 0, textIndex: 0 })
    );
    state = reducer(state, actions.editScreenChange("hoge"));
    expect(state.editScreen.text).toBe("hoge");
  });
  it("should control removeBlock", () => {
    initialState.dataTypeArr.push({
      blockType: "test",
      textArr: [""],
      fontArr: [],
      colorArr: [],
      sizeArr: [],
      index: 1,
    });
    const recieved = reducer(initialState, actions.removeBlock(0));
    expect(recieved.dataTypeArr.length).toBe(1);
    expect(recieved.dataTypeArr[0]).toEqual({
      blockType: "test",
      textArr: [""],
      fontArr: [],
      colorArr: [],
      sizeArr: [],
      index: 0,
    });
  });
  it("should control openSelectBlockScreen", () => {
    const recieved = reducer(initialState, actions.openSelectBlockScreen(0));
    expect(recieved.selectBlockScreen.open).toBeTruthy();
    expect(recieved.selectBlockScreen.blockIndex).toBe(0);
  });
  it("should control closeSelectBlockScreen", () => {
    const recieved = reducer(initialState, actions.closeSelectBlockScreen());
    expect(recieved.selectBlockScreen.open).not.toBeTruthy();
  });
  it("should control registerTemplate", () => {
    const template: template = {
      name: "test",
      data: [
        {
          blockType: "test",
          textArr: [""],
          fontArr: [],
          colorArr: [],
          sizeArr: [],
          index: 0,
        },
      ],
    };
    const state = reducer(initialState, actions.registerTemplate(template));
    expect(state.templates.length).toBe(1);
    expect(state.templates[0]).toBe(template);
  });
  it("should control openSelectTemplateScreen", () => {
    const state = reducer(initialState, actions.openSlectTemplateScreen());
    expect(state.selectTemplateScreen.open).toBeTruthy();
  });
  it("should control closeSelectTemplateScreen", () => {
    let state = reducer(initialState, actions.openSlectTemplateScreen());
    expect(state.selectTemplateScreen.open).toBeTruthy();
    state = reducer(state, actions.closeSlectTemplateScreen());
    expect(state.selectTemplateScreen.open).not.toBeTruthy();
  });
  it("should control selectTemplate", () => {
    const data = [
      {
        blockType: "test",
        textArr: [""],
        fontArr: [],
        colorArr: [],
        sizeArr: [],
        index: 0,
      },
    ];
    const template: template = {
      name: "test",
      data,
    };
    const state = reducer(initialState, actions.selectTemplate(template));
    expect(state.dataTypeArr).toBe(data);
    expect(state.selectTemplateScreen.open).toBeFalsy();
  });
  it("should control loadData", () => {
    const state = reducer(initialState, actions.loadData(html));
    const expected: dataType[] = [
      {
        blockType: "viewArea",
        textArr: ["hoge", "fuga"],
        fontArr: [],
        colorArr: [],
        sizeArr: [],
        index: 0,
      },
      {
        blockType: "test",
        textArr: [],
        fontArr: [],
        colorArr: [],
        sizeArr: [],
        index: 1,
      },
    ];
    expect(state.dataTypeArr).toStrictEqual(expected);
  });
  it("should controll setAttributeOption", () => {
    const state = reducer(initialState, actions.setAttributeOption(1));
    expect(state.publicOption.attribute).toBe(1);
  });
  it("should controll setParticipationFormOption", () => {
    const state = reducer(initialState, actions.setParticipationFormOption(1));
    expect(state.publicOption.participationForm).toBe(1);
  });
  it("should controll addHashtag", () => {
    const state = reducer(initialState, actions.addHashtag("hoge"));
    expect(state.publicOption.hashtag.length).toBe(1);
    expect(state.publicOption.hashtag[0]).toBe("hoge");
  });
  it("should controll removeHashtag", () => {
    let state = reducer(initialState, actions.addHashtag("hoge"));
    state = reducer(state, actions.addHashtag("fuga"));
    expect(state.publicOption.hashtag.length).toBe(2);
    expect(state.publicOption.hashtag[0]).toBe("hoge");
    state = reducer(state, actions.removeHashtag("hoge"));
    expect(state.publicOption.hashtag.length).toBe(1);
    expect(state.publicOption.hashtag[0]).toBe("fuga");
  });
  it("should controll setHashtag", () => {
    const expected = ["hoge", "fuga"];
    let state = reducer(initialState, actions.setHashtag(expected));
    expect(state.publicOption.hashtag).toBe(expected);
  });
  it("should controll setPrive", () => {
    let state = reducer(initialState, actions.setPrice(100));
    expect(state.publicOption.price).toBe(100);
  });
  it("should controll setCapacity", () => {
    let state = reducer(initialState, actions.setCapacity(1));
    expect(state.publicOption.capacity).toBe(1);
  });
  it("should controll setApplicants", () => {
    let state = reducer(initialState, actions.setApplicants(1));
    expect(state.publicOption.applicants).toBe(1);
  });
});
