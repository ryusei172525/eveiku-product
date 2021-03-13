import React, { FC } from "react";

const Header: FC = () => {
  return (
    <header>
      <div className="header-logo">
        <div className="header-logo__icon">▲</div>
        <h1 className="header-logo__title">イベイク</h1>
      </div>

      <nav className="pc-nav">
        <ul>
          <li>ヘルプ</li>
          <li>利用規約</li>
          <li>プライバシーポリシー</li>
          <li>
            <img src="./img/人物アイコン-1@2x.png" alt="" width="50px" />
          </li>
          <li>akauntomei123</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
