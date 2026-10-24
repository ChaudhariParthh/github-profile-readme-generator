import { mkdir, readFile, writeFile } from "node:fs/promises";
import { deflateSync } from "node:zlib";

const templates = [
  ["minimal", [24, 24, 27], [113, 113, 122]],
  ["professional", [15, 23, 42], [71, 85, 105]],
  ["animated-developer", [11, 18, 36], [14, 116, 144]],
  ["ai-engineer", [2, 6, 23], [8, 145, 178]],
  ["cybersecurity", [2, 2, 2], [20, 83, 45]],
  ["student-portfolio", [4, 47, 46], [6, 182, 212]],
  ["cosmic-builder", [15, 23, 42], [56, 189, 248]],
  ["sunset-creator", [76, 5, 25], [249, 115, 22]],
  ["glass-prism", [30, 27, 75], [34, 211, 238]],
  ["mountain-night", [15, 23, 42], [49, 46, 129]],
] as const;

function chunk(type: string, data: Buffer): Buffer {
  const size = Buffer.alloc(4);
  size.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([size, body, crc]);
}

function crc32(buffer: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function png(
  width: number,
  height: number,
  start: readonly number[],
  end: readonly number[],
): Buffer {
  const rows: Buffer[] = [];
  for (let y = 0; y < height; y += 1) {
    const row = Buffer.alloc(1 + width * 4);
    const t = y / (height - 1);
    row[0] = 0;
    for (let x = 0; x < width; x += 1) {
      const diagonal = Math.min(1, Math.max(0, t * 0.7 + (x / width) * 0.3));
      const offset = 1 + x * 4;
      row[offset] = Math.round(start[0] + (end[0] - start[0]) * diagonal);
      row[offset + 1] = Math.round(start[1] + (end[1] - start[1]) * diagonal);
      row[offset + 2] = Math.round(start[2] + (end[2] - start[2]) * diagonal);
      row[offset + 3] = 255;
    }
    rows.push(row);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from("\x89PNG\r\n\x1a\n", "binary"),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(Buffer.concat(rows))),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const manifest = await readFile(new URL("../src/lib/templates.ts", import.meta.url), "utf8");
for (const [id] of templates) {
  if (!manifest.includes(`/templates/${id}.png`))
    throw new Error(`Missing template manifest entry for ${id}`);
}
const output = new URL("../public/templates/", import.meta.url);
await mkdir(output, { recursive: true });
for (const [id, start, end] of templates)
  await writeFile(new URL(`${id}.png`, output), png(1280, 720, start, end));
console.log(`Rendered ${templates.length} template previews to public/templates/`);
