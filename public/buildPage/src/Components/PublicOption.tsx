import React from "react";
import { FC, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editScreenChange, updateBlock } from "../action/actions";
import { publicOption } from "../types";
import Select, { OptionsType, OptionTypeBase, ValueType } from "react-select";
import { dataState } from "../reducer/buildPageReducer";
import actions from "../action/actions";
import { SettingContext } from "../App";

const PublicOption: FC = ({ children }) => {
  const dispatch = useDispatch();
  const publicOption: publicOption = useSelector<dataState, publicOption>(
    (state) => state.publicOption
  );
  const attributeOption: OptionTypeBase[] = [
    { value: 1, label: "-選択してください-" },
    { value: 2, label: "テスト1" },
    { value: 3, label: "テスト2" },
  ];
  const participationForm: OptionTypeBase[] = [
    { value: 0, label: "-選択してください-" },
    { value: 1, label: "オフライン" },
    { value: 2, label: "オンライン" },
    { value: 3, label: "オンライン / オフライン" },
  ];

  const excludeNaN = (value: any) => {
    if (value === NaN) return 0;
    else return value;
  };

  // const [settingScreen, setSettingScreen] = useState(true);
  const { settingScreen, setSettingScreen } = useContext(SettingContext);

  const closeSettingScreen = () => setSettingScreen(false);

  return (
    <>
      <section className="modal_setting">
        <button
          onClick={() => {
            closeSettingScreen();
          }}
          className="button_close"
        ></button>
        <h2>
          公開設定
          {/* <br />
          <span>変更は自動保存されます</span> */}
        </h2>
        <div>
          <div>
            <p>イベントタイトル</p>
            <input
              type="text"
              value={publicOption.title}
              onChange={(e) => dispatch(actions.addTitle(e.target.value))}
            />
          </div>

          <div>
            <p>イベント概要</p>
            <input
              type="text"
              value={publicOption.description}
              onChange={(e) => dispatch(actions.addDescription(e.target.value))}
            />
          </div>

          <div>
            <p>主催者</p>
            <input
              type="text"
              value={publicOption.organizer}
              onChange={(e) => dispatch(actions.addOrganizer(e.target.value))}
            />
          </div>

          <div>
            <p>URL</p>
            <input
              type="text"
              value={publicOption.url}
              onChange={(e) => dispatch(actions.addUlr(e.target.value))}
            />
          </div>
          {/*<div>
        <p className="setting-title">イベントの属性</p>
        <div className="setting-text-wrap">
          <Select
            options={attributeOption}
            value={attributeOption[publicOption.attribute]}
            onChange={(index) => {
              if (!index) return;
              dispatch(actions.setAttributeOption(index.value));
            }}
          />
        </div>
          </div> */}
          <div>
            <p>参加形態</p>
            <select
              // options={participationForm}
              defaultValue={publicOption.participationForm}
              value={publicOption.participationForm}
              onChange={(index) => {
                if (!index) return;
                dispatch(
                  actions.setParticipationFormOption(
                    index.target.options.selectedIndex
                  )
                );
              }}
            >
              <option value="0" hidden>
                選択してください
              </option>
              <option value="1">オフライン</option>
              <option value="2">オンライン</option>
              <option value="3">オンライン / オフライン</option>
            </select>
          </div>

          <div>
            <p>ハッシュタグ</p>
            <input
              type="text"
              placeholder="#スタートアップ #セールスマネジメント"
              value={publicOption.hashtag}
              onChange={(e) => dispatch(actions.addHashtag(e.target.value))}
            />
          </div>

          <div>
            <p>開催日</p>
            <input
              type="date"
              value={publicOption.date}
              defaultValue={publicOption.date}
              onChange={(e) => {
                dispatch(actions.addDate(e.target.value));
              }}
            />
          </div>
          <div>
            <p>開催場所</p>
            <input
              type="text"
              value={publicOption.place}
              onChange={(e) => dispatch(actions.setPlace(e.target.value))}
            />
          </div>

          <div>
            <p>
              開催場所( オンライン )<br />
              <span>オフラインのみの場合空白</span>
            </p>
            <input
              type="text"
              value={publicOption.onlineUrl}
              placeholder="例:https://us04web.zoom.us/..., https://meet.google.com/..."
              onChange={(e) => dispatch(actions.setOnlineUrl(e.target.value))}
            />
          </div>

          <div>
            <p>募集定員</p>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              min="0"
              value={publicOption.capacity}
              onChange={(e) =>
                dispatch(actions.setCapacity(excludeNaN(e.target.value)))
              }
            />
          </div>
          <div>
            <p>
              募集定員( オンライン )<br />
              <span>オフラインのみの場合は0</span>
            </p>

            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              min="0"
              value={publicOption.onlineCapacity}
              onChange={(e) =>
                dispatch(actions.setOnlineCapacity(excludeNaN(e.target.value)))
              }
            />
          </div>
          <div>
            <p>価格設定</p>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              min="0"
              value={publicOption.price}
              onChange={(e) => {
                dispatch(actions.setPrice(excludeNaN(e.target.value)));
              }}
              step={1}
            />
          </div>
          <div>
            <p>
              価格設定( オンライン )<br />
              <span>オンラインのみの場合は0</span>
            </p>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              min="0"
              value={publicOption.onlinePrice}
              onChange={(e) =>
                dispatch(actions.setOnlinePrice(excludeNaN(e.target.value)))
              }
              step={1}
            />
          </div>
        </div>

        <button
          className="btn_close"
          onClick={() => {
            closeSettingScreen();
          }}
        >
          OK
        </button>
      </section>
      <div
        className="bg_modal_setting"
        onClick={() => {
          closeSettingScreen();
        }}
      ></div>
    </>
  );
};

export default PublicOption;
