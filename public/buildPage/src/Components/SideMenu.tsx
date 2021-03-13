import React, { FC } from "react";
import SideMenuItem from "./SideMenuItem";

type SidebarProps = { name: string };

const Sidebar: FC = () => {
  const appearanceItem: string[] = ["テーマ選択", "テーマカラー選択"];
  const insertItem: string[] = [
    "/img/イメージ画像のアイコン素材 (1)@2x.png",
    "/img/動画の再生マークのアイコン素材@2x.png",
    "/img/リンクのフリーアイコン1@2x.png",
    "/img/15215 [更新済み]@2x.png",
  ];
  const lookItem: string[] = [
    "/img/スマートフォンの無料アイコン@2x.png",
    "/img/無料のタブレットアイコン素材@2x.png",
    "/img/PCディスプレイのアイコン素材 2@2x.png",
  ];
  const publishConfigItem: string[] = ["公開", "限定公開", "非公開"];
  const dashboard: string[] = ["使い方", "マイページ"];
  return (
    <div className="side-menu">
      <div className="side-menu__inner">
        <SideMenuItem itemType="arrow" list={appearanceItem}>
          外観
        </SideMenuItem>
        <SideMenuItem itemType="image" list={insertItem}>
          挿入
        </SideMenuItem>
        <SideMenuItem itemType="image" list={lookItem}>
          見てみる
        </SideMenuItem>
        <SideMenuItem itemType="radio" list={publishConfigItem}>
          公開設定
        </SideMenuItem>
        <SideMenuItem itemType="arrow" list={dashboard}>
          ダッシュボード
        </SideMenuItem>
      </div>
    </div>
  );
};
export default Sidebar;
