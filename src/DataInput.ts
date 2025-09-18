import { Buffer } from "buffer";

/**
 * Class to read binary data with helper methods.
 */
export class DataInput {
  private offset = 0;

  constructor(private readonly buffer: Buffer) {}

  readByte(): number {
    return this.buffer.readUInt8(this.offset++);
  }

  readBoolean(): boolean {
    return this.readByte() !== 0;
  }

  readLong(): bigint {
    const high = this.buffer.readInt32BE(this.offset);
    const low = this.buffer.readInt32BE(this.offset + 4);
    this.offset += 8;
    return (BigInt(high) << 32n) | BigInt(low >>> 0);
  }

  readUTF(): string {
    const length = this.buffer.readUInt16BE(this.offset);
    this.offset += 2;
    const strBuf = this.buffer.slice(this.offset, this.offset + length);
    this.offset += length;
    return strBuf.toString("utf8");
  }

  readNullableText(): string | null {
    const isPresent = this.readBoolean();
    if (!isPresent) return null;
    return this.readUTF();
  }
}
