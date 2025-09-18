import { DataOutput } from "./DataOutput";
import { Track } from "./types";

const TRACK_INFO_VERSIONED = 1;
const TRACK_INFO_VERSION = 3;

function createTrackBuffer(track: Track): Buffer {
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
    position = 0,
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

function wrapWithMessageHeader(buffer: Buffer, messageFlags = TRACK_INFO_VERSIONED): Buffer {
  const header = Buffer.alloc(4);
  const length = buffer.length;
  if (length > 0x3fffffff) {
    throw new Error("Encoded message exceeds maximum allowed length.");
  }
  header.writeInt32BE((messageFlags << 30) | length);
  return Buffer.concat([header, buffer], 4 + length);
}

/**
 * Encodes a track object into a base64-encoded message buffer.
 * @param track Track metadata to encode.
 * @returns base64 encoded string.
 */
export function encodeTrack(track: Track): string {
  try {
    const trackBuffer = createTrackBuffer(track);
    const wrapped = wrapWithMessageHeader(trackBuffer);
    return wrapped.toString("base64");
  } catch (error) {
    throw new Error(`Failed to encode track: ${(error as Error).message}`);
  }
}
