import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";
import { useSelector } from "react-redux";
import { dataState } from "../../reducer/buildPageReducer";
import ChangeableImage from "../../Components/ChangeableImage";

const Artist: FC<blockProps> = ({ index, dist }) => {
  const images = (n: number) =>
    useSelector<dataState, string>(
      (state) => state.dataTypeArr[index].imageArr[n]
    );
  return (
    <section id="artist">
      <h2 className="yellow yu-Mincho">
        <PlainText blockIndex={index} textIndex={0} dist={dist} />
      </h2>
      <div className="artist-box">
        <div className="ar1">
          <h5 className="yellow yu-Mincho">
            <PlainText blockIndex={index} textIndex={1} dist={dist} />
          </h5>

          <div className="img">
            <img src={`${images(0)}`} alt="アーティスト画像" />
            <ChangeableImage blockIndex={index} imageIndex={0} dist={dist} />
          </div>

          <p>
            <PlainText blockIndex={index} textIndex={2} dist={dist} />
          </p>
        </div>
        <div className="ar2">
          <h5 className="yellow yu-Mincho">
            <PlainText blockIndex={index} textIndex={3} dist={dist} />
          </h5>

          <div className="img">
            <img src={`${images(1)}`} alt="アーティスト画像" />
            <ChangeableImage blockIndex={index} imageIndex={1} dist={dist} />
          </div>

          <p>
            <PlainText blockIndex={index} textIndex={4} dist={dist} />
          </p>
        </div>
        <div className="ar3">
          <h5 className="yellow yu-Mincho">
            <PlainText blockIndex={index} textIndex={5} dist={dist} />
          </h5>

          <div className="img">
            <img src={`${images(2)}`} alt="アーティスト画像" />
            <ChangeableImage blockIndex={index} imageIndex={2} dist={dist} />
          </div>

          <p>
            <PlainText blockIndex={index} textIndex={6} dist={dist} />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Artist;
