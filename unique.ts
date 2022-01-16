import { readLines } from "https://deno.land/std@0.121.0/io/buffer.ts";

const args = Deno.args.slice()
const lines = new Set<string>();

if (args.length === 1) {
  const filename = args[0] as string;

  for await (const line of readLines(await Deno.open(filename, { read: true }))) {
    lines.add(line);
  }
} else {
  for await (const line of readLines(await Deno.stdin)) {
    lines.add(line);
  }
}

for (const line of lines) {
  console.log(line);
}
