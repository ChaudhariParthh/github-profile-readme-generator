// Lightweight, zero-dependency browser-compatible ZIP file generator (STORE mode)

function makeCrcTable(): Uint32Array {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
}

const CRC_TABLE = makeCrcTable();

export function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ bytes[i]!) & 0xff]!;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export type ZipEntry = {
  name: string;
  data: Uint8Array | string;
};

/** Converts a base64 Data URL to a Uint8Array */
export function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const commaIdx = dataUrl.indexOf(",");
  const base64 = commaIdx >= 0 ? dataUrl.slice(commaIdx + 1) : dataUrl;
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/** Creates a valid ZIP file archive as a Blob */
export function createZipBlob(entries: ZipEntry[]): Blob {
  const encoder = new TextEncoder();
  const fileRecords: Array<{
    nameBytes: Uint8Array;
    crc: number;
    size: number;
    offset: number;
  }> = [];

  let offset = 0;
  const parts: Uint8Array[] = [];

  for (const entry of entries) {
    const nameBytes = encoder.encode(entry.name);
    const dataBytes = typeof entry.data === "string" ? encoder.encode(entry.data) : entry.data;
    const crc = crc32(dataBytes);
    const size = dataBytes.length;

    // Local file header (30 bytes + name length)
    const local = new Uint8Array(30 + nameBytes.length);
    const view = new DataView(local.buffer);

    view.setUint32(0, 0x04034b50, true); // Local file header signature
    view.setUint16(4, 10, true); // Version needed to extract
    view.setUint16(6, 0, true); // General purpose bit flag
    view.setUint16(8, 0, true); // Compression method (0 = STORE)
    view.setUint16(10, 0, true); // File last modification time
    view.setUint16(12, 0, true); // File last modification date
    view.setUint32(14, crc, true); // CRC-32
    view.setUint32(18, size, true); // Compressed size
    view.setUint32(22, size, true); // Uncompressed size
    view.setUint16(26, nameBytes.length, true); // File name length
    view.setUint16(28, 0, true); // Extra field length
    local.set(nameBytes, 30);

    parts.push(local, dataBytes);
    fileRecords.push({ nameBytes, crc, size, offset });
    offset += local.length + dataBytes.length;
  }

  const cdOffset = offset;
  let cdSize = 0;

  // Central directory records
  for (const r of fileRecords) {
    const cd = new Uint8Array(46 + r.nameBytes.length);
    const view = new DataView(cd.buffer);

    view.setUint32(0, 0x02014b50, true); // Central directory header signature
    view.setUint16(4, 20, true); // Version made by
    view.setUint16(6, 10, true); // Version needed to extract
    view.setUint16(8, 0, true); // General purpose bit flag
    view.setUint16(10, 0, true); // Compression method
    view.setUint16(12, 0, true); // File last modification time
    view.setUint16(14, 0, true); // File last modification date
    view.setUint32(16, r.crc, true); // CRC-32
    view.setUint32(20, r.size, true); // Compressed size
    view.setUint32(24, r.size, true); // Uncompressed size
    view.setUint16(28, r.nameBytes.length, true); // File name length
    view.setUint16(30, 0, true); // Extra field length
    view.setUint16(32, 0, true); // File comment length
    view.setUint16(34, 0, true); // Disk number start
    view.setUint16(36, 0, true); // Internal file attributes
    view.setUint32(38, 0, true); // External file attributes
    view.setUint32(42, r.offset, true); // Relative offset of local header
    cd.set(r.nameBytes, 46);

    parts.push(cd);
    cdSize += cd.length;
  }

  // End of central directory record (22 bytes)
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);

  eocdView.setUint32(0, 0x06054b50, true); // EOCD signature
  eocdView.setUint16(4, 0, true); // Number of this disk
  eocdView.setUint16(6, 0, true); // Disk with start of central directory
  eocdView.setUint16(8, fileRecords.length, true); // Total entries on this disk
  eocdView.setUint16(10, fileRecords.length, true); // Total entries in central directory
  eocdView.setUint32(12, cdSize, true); // Size of central directory
  eocdView.setUint32(16, cdOffset, true); // Offset of central directory
  eocdView.setUint16(20, 0, true); // Comment length

  parts.push(eocd);

  return new Blob(parts as unknown as BlobPart[], { type: "application/zip" });
}
