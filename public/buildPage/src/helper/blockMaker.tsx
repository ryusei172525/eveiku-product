import { blockType, dataType } from "../types";

const blockMaker = (
  blockTypeName: string,
  index: number,
  blockTypeArr: blockType[]
): dataType | undefined => {
  const state: blockType[] = blockTypeArr;
  let ret: dataType | undefined = undefined;
  for (let item of state) {
    if (item.name === blockTypeName) {
      ret = {
        textArr: item.defaultText,
        colorArr: item.defaultColor,
        fontArr: item.defaultFont,
        sizeArr: item.defaultSize,
        blockType: item.name,
        index,
        imageArr: item.defaultImage,
      };
    }
  }
  return ret;
};

export default blockMaker;
