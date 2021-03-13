import React, { FC } from "react";

type itemType = "arrow" | "radio" | "image";
type SideMenuItemProps = {
  itemType: itemType;
  list: string[];
};

const SideMenuItem: FC<SideMenuItemProps> = ({ itemType, list, children }) => {
  return (
    <>
      <h3 className="side-menu__title">{children}</h3>
      <ul className="side-menu__list">
        {itemType === "arrow" &&
          list.map((item, index) => <ItemArrow key={index}>{item}</ItemArrow>)}
        {itemType === "radio" &&
          list.map((item, index) => <ItemRadio key={index}>{item}</ItemRadio>)}
        {itemType === "radio" &&
          list.map((item, index) => (
            <ItemImage key={index} src={item}></ItemImage>
          ))}
      </ul>
    </>
  );
};
export default SideMenuItem;

const ItemArrow: FC = ({ children }) => {
  return (
    <li>
      <p>{children}</p>
      <span>&gt;</span>
    </li>
  );
};

type ItemImageProps = {
  src: string;
};
const ItemImage: FC<ItemImageProps> = ({ src }) => {
  return (
    <li>
      <img src={src} alt="" />
    </li>
  );
};

const ItemRadio: FC = ({ children }) => {
  return (
    <div className="public-setting-flex">
      <span className="active">○</span>
      <p>{children}</p>
    </div>
  );
};
