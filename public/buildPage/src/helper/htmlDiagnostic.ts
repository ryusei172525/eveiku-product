import { dataType } from "../types";

const htmlDiagnostic = (html: string): dataType[] => {
  const dataTypeArr: dataType[] = JSON.parse(html);
  return dataTypeArr;
};
export default htmlDiagnostic;
