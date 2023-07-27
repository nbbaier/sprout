// examples/basic-usage.js

import { cac } from "cac";

const cli = cac("my-program");

cli.option("--type <type>", "Choose a project type", {
  default: "node",
});

const parsed = cli.parse();

console.log(JSON.stringify(parsed, null, 2));
