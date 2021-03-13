# eveikuローカルでの起動方法
①Node.jsをインストールする。
②gitでmasterをクローンする

```
git clone https://github.com/ryusei172525/eveiku.git
```

.envファイルを作成（加納に聞く）

③パッケージをインストールする

```
npm install
```

③サーバーを起動する

```
npm start
```

④サーバへ接続する
ブラウザを起動してlocalhost:3000にアクセス


# buildPageの編集
```
cd public/buildPage
npm install –save-dev jest
npm run test
npm run prettier
npm run build
npm run watch
```

# Gitのルール（超重要）
①初めて開発する方はcloneしてください
②開発をする際はパソコンを開いた時点で ```git pull origin master ``` をしてください。
これをしないと、既に最新版になっているリポジトリが自分のフォルダに保存されませんので注意してください。
③コードを編集して、addし、commitしてからmaster以外の任意のブランチにpushしてください
④プルリクエストをmasterに送ってください。

# Node.jsとSequelizeが分からない方へ
以下の記事で学習したら効果的かと思います
https://qiita.com/ryusei172525/private/962c1f008f35f1597db3

# 本番環境と同じDBにする
本番環境では、特例としてDBに直接データをいれているので、その部分について記述します。
mysqlを開いて、

```
select * from events;
```
を使って現状のeventsテーブルの中身を確認してください。eventのidの一番最後の数字が40だったとしましょう（eventが40個あるってことですよ）
だとすると、後ほど、40より一つ、二つ大きい「41」,「42」という数字を使うことになるので覚えておいてください。

確認したら、主催者画面の新規登録から、イベントを開催するユーザを作ります。

作ったら、

```
select * from users;
```
で新規で作ったuserのidを確認してください。このとき確認したid(例えば3)をUSER-IDとしますね。

そしたら、mysqlコマンドとして以下の物を入力します。以下は一例です。

```
INSERT INTO events values (41,3,'明日から実践できる人事キャリアの向き合い方','明日から実践出来るキャリアとの向き合い方',NULL,NULL,'jinjipro-online-20201216',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,current_timestamp,current_timestamp,NULL);

INSERT INTO events values (42,3,'明日から実践できる人事キャリアの向き合い方','明日から実践出来るキャリアとの向き合い方',NULL,30,'jinjipro-offline-20201216',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,current_timestamp,current_timestamp,NULL);
```




# ビルドページ
###HTML
views/organizer/build--page.ejs

###CSS
public/stylesheets/build-page.css

###router
routes/buil-page.js

# DBについて
DBはORMとしてSequelizeを使っています。
AWS上に既に配置してあるリモートにあるDBを使っています。
config.jsonにURLやpasswordなどが記述されています。

# DB
```
npx sequelize-cli init
config.jsonを編集
npx sequelize-cli db:create
npx sequelize-cli db:migrate //migrationsファイルをmigrate
npx sequelize-cli db:seed:all //seedersファイルのtemplatesをseed
```

#ビルドページ
```
cd public/buildPage
npm install –save-dev jest
npm run test
npm run prettier
npm run build
npm run watch
```
