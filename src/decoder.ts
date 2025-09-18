import { Buffer } from "buffer";
import { DataInput } from "./DataInput";
import { Track } from "./types";

const TRACK_INFO_VERSION = 3;

/**
 * Decodes a base64-encoded track buffer string back into a track object.
 * @param base64 Base64 encoded track string.
 * @returns Decoded track object.
 */
export function decodeTrack(base64: string): Track {
  try {
    if (!base64 || typeof base64 !== "string") {
      throw new Error("Invalid input: base64 string is required.");
    }

    const buffer = Buffer.from(base64, "base64");

    // Skip 4-byte header (message flags and length)
    const dataBuffer = buffer.slice(4);
    const input = new DataInput(dataBuffer);

    const version = input.readByte();
    if (version !== TRACK_INFO_VERSION) {
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
      position,
    };
  } catch (error) {
    throw new Error(`Failed to decode track: ${(error as Error).message}`);
  }
}
