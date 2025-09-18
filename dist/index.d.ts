import { Buffer } from 'buffer';

interface Track {
    title: string;
    author: string;
    length: number;
    identifier: string;
    isStream: boolean;
    uri?: string | null;
    artworkUrl?: string | null;
    isrc?: string | null;
    sourceName: string;
    position?: number;
}

/**
 * Encodes a track object into a base64-encoded message buffer.
 * @param track Track metadata to encode.
 * @returns base64 encoded string.
 */
declare function encodeTrack(track: Track): string;

/**
 * Decodes a base64-encoded track buffer string back into a track object.
 * @param base64 Base64 encoded track string.
 * @returns Decoded track object.
 */
declare function decodeTrack(base64: string): Track;

/**
 * Class to read binary data with helper methods.
 */
declare class DataInput {
    private readonly buffer;
    private offset;
    constructor(buffer: Buffer);
    readByte(): number;
    readBoolean(): boolean;
    readLong(): bigint;
    readUTF(): string;
    readNullableText(): string | null;
}

/**
 * Class to write binary data with helper methods.
 */
declare class DataOutput {
    private chunks;
    private length;
    writeByte(value: number): void;
    writeBoolean(value: boolean): void;
    writeLong(value: bigint | number): void;
    writeUTF(str: string): void;
    writeNullableText(str: string | null | undefined): void;
    private pushBuffer;
    toBuffer(): Buffer;
}

export { DataInput, DataOutput, type Track, decodeTrack, encodeTrack };
