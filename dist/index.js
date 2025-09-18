"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class; var _class2;// src/DataOutput.ts
var _buffer = require('buffer');
var DataOutput = (_class = class {constructor() { _class.prototype.__init.call(this);_class.prototype.__init2.call(this); }
  __init() {this.chunks = []}
  __init2() {this.length = 0}
  writeByte(value) {
    const buf = _buffer.Buffer.alloc(1);
    buf.writeUInt8(value);
    this.pushBuffer(buf);
  }
  writeBoolean(value) {
    this.writeByte(value ? 1 : 0);
  }
  writeLong(value) {
    const buf = _buffer.Buffer.alloc(8);
    const bigValue = typeof value === "bigint" ? value : BigInt(value);
    buf.writeInt32BE(Number(bigValue >> 32n), 0);
    buf.writeInt32BE(Number(bigValue & 0xFFFFFFFFn), 4);
    this.pushBuffer(buf);
  }
  writeUTF(str) {
    const strBuf = _buffer.Buffer.from(str, "utf8");
    if (strBuf.length > 65535) {
      throw new Error("String exceeds maximum allowed length (65535 bytes).");
    }
    const lenBuf = _buffer.Buffer.alloc(2);
    lenBuf.writeUInt16BE(strBuf.length);
    this.pushBuffer(lenBuf);
    this.pushBuffer(strBuf);
  }
  writeNullableText(str) {
    if (str == null) {
      this.writeBoolean(false);
    } else {
      this.writeBoolean(true);
      this.writeUTF(str);
    }
  }
  pushBuffer(buf) {
    this.chunks.push(buf);
    this.length += buf.length;
  }
  toBuffer() {
    return _buffer.Buffer.concat(this.chunks, this.length);
  }
}, _class);

// src/encoder.ts
var TRACK_INFO_VERSIONED = 1;
var TRACK_INFO_VERSION = 3;
function createTrackBuffer(track) {
  const {
    title = "Unknown Song",
    author = "Unknown Artist",
    length = 0,
    identifier = "",
    isStream = false,
    uri = null,
    artworkUrl = null,
    isrc = null,
    sourceName,
    position = 0
  } = track;
  if (!sourceName) {
    throw new Error("Missing required property: sourceName");
  }
  const output = new DataOutput();
  output.writeByte(TRACK_INFO_VERSION);
  output.writeUTF(title);
  output.writeUTF(author);
  output.writeLong(BigInt(length));
  output.writeUTF(identifier);
  output.writeBoolean(isStream);
  output.writeNullableText(uri);
  output.writeNullableText(artworkUrl);
  output.writeNullableText(isrc);
  output.writeUTF(sourceName);
  output.writeLong(position);
  return output.toBuffer();
}
function wrapWithMessageHeader(buffer, messageFlags = TRACK_INFO_VERSIONED) {
  const header = Buffer.alloc(4);
  const length = buffer.length;
  if (length > 1073741823) {
    throw new Error("Encoded message exceeds maximum allowed length.");
  }
  header.writeInt32BE(messageFlags << 30 | length);
  return Buffer.concat([header, buffer], 4 + length);
}
function encodeTrack(track) {
  try {
    const trackBuffer = createTrackBuffer(track);
    const wrapped = wrapWithMessageHeader(trackBuffer);
    return wrapped.toString("base64");
  } catch (error) {
    throw new Error(`Failed to encode track: ${error.message}`);
  }
}

// src/decoder.ts


// src/DataInput.ts
var DataInput = (_class2 = class {
  constructor(buffer) {;_class2.prototype.__init3.call(this);
    this.buffer = buffer;
  }
  __init3() {this.offset = 0}
  readByte() {
    return this.buffer.readUInt8(this.offset++);
  }
  readBoolean() {
    return this.readByte() !== 0;
  }
  readLong() {
    const high = this.buffer.readInt32BE(this.offset);
    const low = this.buffer.readInt32BE(this.offset + 4);
    this.offset += 8;
    return BigInt(high) << 32n | BigInt(low >>> 0);
  }
  readUTF() {
    const length = this.buffer.readUInt16BE(this.offset);
    this.offset += 2;
    const strBuf = this.buffer.slice(this.offset, this.offset + length);
    this.offset += length;
    return strBuf.toString("utf8");
  }
  readNullableText() {
    const isPresent = this.readBoolean();
    if (!isPresent) return null;
    return this.readUTF();
  }
}, _class2);

// src/decoder.ts
var TRACK_INFO_VERSION2 = 3;
function decodeTrack(base64) {
  try {
    if (!base64 || typeof base64 !== "string") {
      throw new Error("Invalid input: base64 string is required.");
    }
    const buffer = _buffer.Buffer.from(base64, "base64");
    const dataBuffer = buffer.slice(4);
    const input = new DataInput(dataBuffer);
    const version = input.readByte();
    if (version !== TRACK_INFO_VERSION2) {
      throw new Error(`Unsupported track version: ${version}`);
    }
    const title = input.readUTF();
    const author = input.readUTF();
    const length = Number(input.readLong());
    const identifier = input.readUTF();
    const isStream = input.readBoolean();
    const uri = input.readNullableText();
    const artworkUrl = input.readNullableText();
    const isrc = input.readNullableText();
    const sourceName = input.readUTF();
    const position = Number(input.readLong());
    return {
      title,
      author,
      length,
      identifier,
      isStream,
      uri,
      artworkUrl,
      isrc,
      sourceName,
      position
    };
  } catch (error) {
    throw new Error(`Failed to decode track: ${error.message}`);
  }
}





exports.DataInput = DataInput; exports.DataOutput = DataOutput; exports.decodeTrack = decodeTrack; exports.encodeTrack = encodeTrack;
//# sourceMappingURL=index.js.map