// import path from "node:path";

// console.log(path.resolve(import.meta.dir, "path.ts"));

const proc = Bun.spawn(["bun", "init"]);
const text = await new Response(proc.stdout).text();
console.log(text); // => "hello"
