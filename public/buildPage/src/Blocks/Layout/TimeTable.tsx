import React from "react";
import { FC } from "react";
import { blockProps } from "../../types/blockType";
import PlainText from "../helper/PlainText";
const TimeTable: FC<blockProps> = ({ index, dist }) => {
  return (
    <section id="timetable">
      <h2 className="yellow yu-Mincho">タイムテーブル</h2>
      <div className="timetable-box">
        <div className="stage1-box">
          <div className="yu-Mincho">
            <PlainText blockIndex={index} textIndex={0} dist={dist} />
          </div>
          <div className="yu-Mincho">
            <PlainText blockIndex={index} textIndex={1} dist={dist} />
          </div>
          <div className="yu-Mincho">
            <PlainText blockIndex={index} textIndex={2} dist={dist} />
          </div>
          <div className="yu-Mincho">
            <PlainText blockIndex={index} textIndex={3} dist={dist} />
          </div>
        </div>
        <div className="time-box">
          <span>
            <PlainText blockIndex={index} textIndex={4} dist={dist} />
          </span>
          <span>-</span>
          <span>-</span>
          <span>-</span>
          <span>
            <PlainText blockIndex={index} textIndex={5} dist={dist} />
          </span>
          <span>-</span>
          <span>-</span>
          <span>-</span>
          <span>
            <PlainText blockIndex={index} textIndex={6} dist={dist} />
          </span>
          <span>-</span>
          <span>-</span>
          <span>-</span>
          <span>
            <PlainText blockIndex={index} textIndex={7} dist={dist} />
          </span>
          <span>-</span>
          <span>-</span>
          <span>-</span>
          <span>
            <PlainText blockIndex={index} textIndex={8} dist={dist} />
          </span>
          <span>-</span>
          <span>-</span>
          <span>-</span>
          <span>
            <PlainText blockIndex={index} textIndex={9} dist={dist} />
          </span>
          <span>-</span>
          <span>-</span>
          <span>-</span>
          <span>
            <PlainText blockIndex={index} textIndex={10} dist={dist} />
          </span>
          <span>-</span>
          <span>-</span>
          <span>-</span>
          <span>
            <PlainText blockIndex={index} textIndex={11} dist={dist} />
          </span>
          <span>-</span>
          <span>-</span>
          <span>-</span>
          <span>
            <PlainText blockIndex={index} textIndex={12} dist={dist} />
          </span>
          <span>-</span>
          <span>-</span>
          <span>-</span>
          <span>
            <PlainText blockIndex={index} textIndex={13} dist={dist} />
          </span>
        </div>
        <div className="stage2-box">
          <div className="yu-Mincho">
            <PlainText blockIndex={index} textIndex={14} dist={dist} />
          </div>
          <div className="yu-Mincho">
            <PlainText blockIndex={index} textIndex={15} dist={dist} />
          </div>
          <div className="yu-Mincho">
            <PlainText blockIndex={index} textIndex={16} dist={dist} />
          </div>
          <div className="yu-Mincho">
            <PlainText blockIndex={index} textIndex={17} dist={dist} />
          </div>
          <div className="yu-Mincho">
            <PlainText blockIndex={index} textIndex={18} dist={dist} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeTable;
