[![npm version](https://img.shields.io/npm/v/lavalink-track-codec.svg)](https://www.npmjs.com/package/lavalink-track-codec)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## Overview

**lavalink-track-codec** is a lightweight TypeScript library to encode and decode Lavalink-compatible audio track metadata efficiently. Designed for music bots and streaming applications, it supports both CommonJS and ES Modules with fully typed interfaces for seamless TypeScript integration.

---

## Features

- ⚡ Fast encoding and decoding of track metadata  
- 🎵 Supports all essential track info: title, author, length, identifier, stream flags, URIs, and more  
- 🔄 Compatible with CommonJS and ES Module ecosystems  
- ✅ Written in TypeScript with full type definitions  
- 🔧 Simple and minimal API for easy integration  

---

## Installation

```bash
npm install lavalink-track-codec
# or
yarn add lavalink-track-codec
````

---

## Usage

```ts
import { encodeTrack, decodeTrack } from 'lavalink-track-codec';
import type { Track } from 'lavalink-track-codec';

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

const encoded = encodeTrack(track);
const decoded = decodeTrack(encoded);

console.log('Encoded Track:', encoded);
console.log('Decoded Track:', decoded);
```

---

## API

### `encodeTrack(track: Track): string`

Encodes a `Track` object into a string representation.

### `decodeTrack(encoded: string): Track`

Decodes an encoded track string back into a `Track` object.

---

## Track Type Definition

```ts
type Track = {
  title: string;
  author: string;
  length: number;
  identifier: string;
  isStream: boolean;
  uri: string;
  artworkUrl: string | null;
  isrc: string | null;
  sourceName: string;
  position: number;
};
```

---

## Development

Clone the repo, install dependencies, build, and run tests:

```bash
git clone <repo-url>
cd lavalink-track-codec
npm install
npm run build
npm run test
```

Contributions and issues are welcome!