import { readLines } from "https://deno.land/std@0.121.0/io/buffer.ts";

const args = Deno.args.slice()
const lines = new Set<string>();

if (args.length > 1) {
  const filename = args[0] as string;

  for await (const line of readLines(await Deno.open(filename, { read: true }))) {
    lines.add(line);
  }

  for (let i = 1; i < args.length; i++) {
    const filename = args[i];
    const fd = await Deno.open(filename, { read: true });

    for await (const line of readLines(fd)) {
      lines.delete(line);
    }
  }

  for (const line of lines) {
    console.log(line);
  }
} else {
  console.log('Not enough arguments')
}
