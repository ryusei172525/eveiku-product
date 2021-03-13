import React, { FC } from "react";
import { useSelector } from "react-redux";
import { dataState } from "../reducer/buildPageReducer";
import getJsx from "../helper/getJsx";
import BlockWrapper from "./BlockWrapper";
import { Border } from "../Blocks/menu";

const Build: FC = () => {
  const data: dataState = useSelector<dataState, dataState>((state) => state);
  const len = data.dataTypeArr.length;
  return (
    <section className="build gg" style={{ border: "#ffffff00 20px solid" }}>
      {data.dataTypeArr.map((data, index) => {
        const Jsx = getJsx(data.blockType);
        if (Jsx !== undefined) {
          return (
            <BlockWrapper
              key={"blockWrapper" + index}
              blockIndex={index}
              len={len}
            >
              <Jsx index={index} dist={false} />
            </BlockWrapper>
          );
        }
      })}
    </section>
  );
};

export default Build;
