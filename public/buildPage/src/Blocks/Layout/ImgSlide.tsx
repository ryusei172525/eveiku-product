import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";

const ImgSlide: FC<blockProps> = ({ index, dist }) => {
  return (
    <section id="img-slide">
      <div className="top-slide">
        <div className="loopSlider">
          <ul>
            <li className="img">
              <img src="/images/top01.jpg" alt="" className="upload-img" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top02.jpg" alt="" className="upload-img" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top03.jpg" alt="" className="upload-img" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top04.jpg" alt="" className="upload-img" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top05.jpg" alt="" className="upload-img" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top06.jpg" alt="" className="upload-img" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top07.jpg" alt="" className="upload-img" />
              <button className="upload-img">画像変更</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom-slide">
        <div className="loopSlider2">
          <ul>
            <li className="img">
              <img src="/images/top05.jpg" alt="" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top06.jpg" alt="" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top07.jpg" alt="" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top01.jpg" alt="" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top03.jpg" alt="" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top04.jpg" alt="" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top03.jpg" alt="" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top04.jpg" alt="" />
              <button className="upload-img">画像変更</button>
            </li>
            <li className="img">
              <img src="/images/top05.jpg" alt="" />
              <button className="upload-img">画像変更</button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ImgSlide;
