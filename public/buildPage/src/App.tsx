import React, { useState, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import Build from "./Components/Build";
import EditScreen from "./Components/EditScreen";
import SelectBlockScreen from "./Components/SelectBlockScreen";
import postData from "./helper/postData";
import { dataState } from "./reducer/buildPageReducer";
import PublicOption from "./Components/PublicOption";
import EditStyle from "./Components/EditStyle";
import { openTemplate } from "./action/actions";
import postPreview from "./helper/postPreview";

export const SettingContext = createContext(
  {} as {
    settingScreen: boolean;
    setSettingScreen: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

function App() {
  const dispatch = useDispatch();

  const isSelectBlockScreenOpen: boolean = useSelector<dataState, boolean>(
    (state) => state.selectBlockScreen.open
  );
  const isEditScreenOpen: boolean = useSelector<dataState, boolean>(
    (state) => state.editScreen.open
  );

  const [selectTemplateScreenOpen, setSelectTemplateScreenOpen] = useState(
    false
  );

  const closeSelectTemplateScreenOpen = () =>
    setSelectTemplateScreenOpen(false);
  const openSelectTemplateScreenOpen = () => setSelectTemplateScreenOpen(true);

  const [settingScreen, setSettingScreen] = useState(false);

  const closeSettingScreen = () => setSettingScreen(false);
  const openSettingScreen = () => setSettingScreen(true);

  return (
    <main className="container_buildpage">
      <div className="sidebar">
        <div>
          <EditStyle />
        </div>
        <div className="container_button_func">
          {/* <button
            type="button"
            onClick={() => {
              preview();              
            }}
          >
            プレビュー
          </button> */}

          <button
            type="button"
            onClick={() => {
              openSelectTemplateScreenOpen();
            }}
          >
            テンプレートを選択
          </button>

          <button
            type="button"
            onClick={() => {
              openSettingScreen();
            }}
          >
            公開設定
          </button>
          <button
            onClick={() => {
              postPreview(true);
            }}
          >
            PCのプレビュー
          </button>
          <button
            onClick={() => {
              postData(true);
            }}
          >
            下書き保存
          </button>
          <button
            onClick={() => {
              postData(false);
            }}
          >
            公開
          </button>
        </div>
      </div>
      <div className="section-wrap">
        <Build></Build>
        <div className="modalbg display-none"></div>
        <div className="menu-modal display-none">
          <div className="modal-section">
            <ul>
              {/* <li className="modal-section-item modal-section-item1">見出し</li>
              <li className="modal-section-item modal-section-item2">
                メニュー
              </li> */}
              <li className="modal-section-item modal-section-item1 isActive">
                追加ブロック
              </li>
            </ul>
          </div>
          <div className="modal-item">
            {isSelectBlockScreenOpen && <SelectBlockScreen></SelectBlockScreen>}
          </div>
        </div>
      </div>
      {settingScreen && (
        <>
          <div
            className="btn_close_modal"
            onClick={() => closeSettingScreen()}
          ></div>
          <SettingContext.Provider value={{ settingScreen, setSettingScreen }}>
            <PublicOption />
          </SettingContext.Provider>
        </>
      )}
      {selectTemplateScreenOpen && (
        <div className="modal_template">
          <button
            className="button_close"
            onClick={() => closeSelectTemplateScreenOpen()}
          ></button>
          <div className="list_template">
            <div>
              <img src="../../images/build_page/template-1.png" alt="" />
              <button
                onClick={(e) => {
                  closeSelectTemplateScreenOpen();
                  dispatch(openTemplate(0));
                }}
              >
                使う
              </button>
            </div>
          </div>
          <div
            className="btn_close_modal"
            onClick={() => closeSelectTemplateScreenOpen()}
          ></div>
        </div>
      )}
    </main>
  );
}

export default App;
