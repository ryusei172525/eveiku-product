type moveScreen = {
  blockIndex: number;
  len: number;
};

export default moveScreen;

// ブロック移動にて下に移動した時に「一番下のブロックだったら」これ以上動かないようにするために使う
