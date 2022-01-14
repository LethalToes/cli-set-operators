import { readLines } from "https://deno.land/std@0.121.0/io/buffer.ts";

let lines = new Set<string>();

const args = Deno.args.slice()

if (args.length > 1) {
  const filename = args.pop() as string;

  for await (const line of readLines(await Deno.open(filename, { read: true }))) {
    lines.add(line);
  }

  for (const filename of args) {
    const set = new Set<string>();
    const descriptor = await Deno.open(filename, { read: true });

    for await (const line of readLines(descriptor)) {
      if (lines.has(line)) {
        set.add(line);
      }
    }

    lines = set;
  }

  for (const line of lines) {
    console.log(line);
  }
} else {
  console.log('Not enough arguments')
}