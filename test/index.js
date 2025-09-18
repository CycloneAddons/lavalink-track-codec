const { encodeTrack, decodeTrack } = require('../dist/index.js');

const track = {
  title: 'Shayad - CYCLONE ADDDD',
  author: 'Sony Music India',
  length: 190000,
  identifier: 'MJyKN-8UncM',
  isStream: false,
  uri: 'https://www.youtube.com/watch?v=MJyKN-8UncM',
  artworkUrl: 'https://i.ytimg.com/vi/MJyKN-8UncM/mqdefault.jpg',
  isrc: null,
  sourceName: 'youtube',
  position: 0
};


let en = encodeTrack(track); 
let dec = decodeTrack(en)

console.log(en, dec)