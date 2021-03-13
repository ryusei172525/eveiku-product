# buildPage

## コマンド

```
npm run test
```

test を実行します。

```
npm run prettier
```

prettier でフォーマットします。

```
npm run build
```

webpack でビルドします。

```
npm run watch
```

## webpack を watch モードで起動します。

## フォルダ構成

```
├─action
├─Blocks
│  └─helper
├─Components
├─helper
├─reducer
├─store
├─types
└─__test__
```

---

## action

### redux におけるアクションクリエイターでアクションを生成しています。

```
registerBlockType
```

使用できるブロックを登録します。基本読み込み時に実行します。

```
 updateBlock
```

store の editScreen を参照してブロックのテキストを更新します。

```
addBlock
```

block を追加します。

```
removeBlock
```

ブロックを削除します。

```
addBlockByName
```

ブロック名からブロックを追加します。

```
setEditScreen
```

editScreen を open にします。

```
editScreenChange
```

editScreen の値を更新します。

```
setAllState
```

store の値を全更新します。

```
openSelectBlockScreen
```

selectBlockScreen を open にします。

```
closeSelectBlockScreen
```

selectBlockScreen を close にします。

```
loadDataAsync
```

非同期でサーバーからデータを読み込みます。ReduxThunk を使用してます。

---

## Blocks

ブロックの jsx を定義してます。

---

## Components

ビルドページを組み立てるための jsx を定義してます。

---

## helper

```
createHtml
```

store のデータから html を生成します。

```
getJsx
```

block 名からそれに紐づく jsx を取得します。

```
htmlDiagnostic
```

html から store に保存するためのデータを生成します。

## reducer

redux における reducer を定義してます。

## store

redux における store を定義してます。

## types

汎用的に使う type を定義してます。
