import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";

const Share: FC<blockProps> = ({ index, dist }) => {
  return (
    <section id="share">
      <h2 className="yu-Mincho">SHARE</h2>
      <div className="sns-boxes">
        <div className="facebook-box">
          <a href="#">
            <i className="fab fa-facebook-f fa-lg"></i>
            <span>Facebook</span>
          </a>
        </div>
        <div className="twitter-box">
          <a href="#">
            <img src="img/twitter01.png" alt="" />
            <span>Twitter</span>
          </a>
        </div>
        <div className="line-box">
          <a href="#">
            <img src="img/line01.png" alt="" />
            <span>LINE</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Share;
