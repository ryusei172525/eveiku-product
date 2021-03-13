import createHtml from "./createHtml";
import queryString from "query-string";
import store from "../store/store";
import action from "../action/actions";
import { reduceRight } from "lodash";

const postData = async (draft: boolean) => {
  // const publicOption = store.getState().publicOption;
  const state = store.getState();
  var id = store.getState().id;
  const parsed = queryString.parse(window.location.search);
  let param: string = "";
  if (parsed.id !== undefined) {
    param = "/" + parsed.id;
  } else if (id) {
    param = "/" + id;
  }
  const postUrl: string = draft
    ? "http://" + window.location.host + "/build-page/draft" + param
    : "http://" + window.location.host + "/build-page/test" + param;
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };
  const state_json = JSON.stringify(state);
  const body = JSON.stringify({
    html: { row: createHtml(), json: state_json },
    ...state.publicOption,
  });
  await fetch(postUrl, { method, headers, body })
    .then((res) => res.json())
    .then((json) => {
      const url = json.url;
      let eveint_id = json.event_id;
      let openUrl =
        "http://" + window.location.host + "/build-page?id=" + eveint_id;
      if (url.match(/ERROR$/)) {
        alert("URLが同じです");
        return;
      }
      if (url == "DRAFTSAVE") {
        alert("下書き保存完了");
        window.open(openUrl, "_self");
        return;
      }
      store.dispatch(action.setID(json.id));
      window.open(url, "_blank");
      window.open(openUrl, "_self");
    });
};

export default postData;
