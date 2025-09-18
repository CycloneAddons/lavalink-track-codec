import { encodeTrack, decodeTrack } from '../dist/index.mjs';
import type { Track } from '../dist/index.d';

const track: Track = {
  title: 'Shayad - CYCLONE ADDDD',
  author: 'Sony Music India',
  length: 190000,
  identifier: 'MJyKN-8UncM',
  isStream: false,
  uri: 'https://www.youtube.com/watch?v=MJyKN-8UncM',
  artworkUrl: 'https://i.ytimg.com/vi/MJyKN-8UncM/mqdefault.jpg',
  isrc: null,
  sourceName: 'youtube',
  position: 0,
};

const en = encodeTrack(track);
const dec: Track = decodeTrack(en);

console.log(en);
console.log(dec);
