import { Buffer } from "buffer";

/**
 * Class to write binary data with helper methods.
 */
export class DataOutput {
  private chunks: Buffer[] = [];
  private length = 0;

  writeByte(value: number): void {
    const buf = Buffer.alloc(1);
    buf.writeUInt8(value);
    this.pushBuffer(buf);
  }

  writeBoolean(value: boolean): void {
    this.writeByte(value ? 1 : 0);
  }

  writeLong(value: bigint | number): void {
    const buf = Buffer.alloc(8);
    const bigValue = typeof value === "bigint" ? value : BigInt(value);
    buf.writeInt32BE(Number(bigValue >> 32n), 0);
    buf.writeInt32BE(Number(bigValue & 0xFFFFFFFFn), 4);
    this.pushBuffer(buf);
  }

  writeUTF(str: string): void {
    const strBuf = Buffer.from(str, "utf8");
    if (strBuf.length > 0xffff) {
      throw new Error("String exceeds maximum allowed length (65535 bytes).");
    }
    const lenBuf = Buffer.alloc(2);
    lenBuf.writeUInt16BE(strBuf.length);
    this.pushBuffer(lenBuf);
    this.pushBuffer(strBuf);
  }

  writeNullableText(str: string | null | undefined): void {
    if (str == null) {
      this.writeBoolean(false);
    } else {
      this.writeBoolean(true);
      this.writeUTF(str);
    }
  }

  private pushBuffer(buf: Buffer): void {
    this.chunks.push(buf);
    this.length += buf.length;
  }

  toBuffer(): Buffer {
    return Buffer.concat(this.chunks, this.length);
  }
}
