import spawn from "cross-spawn";

let cachedNpmClient = null;

if (spawn.sync("yarn", ["--version"]).status === 0) {
  cachedNpmClient = "yarn";
} else {
  cachedNpmClient = "npm";
}

console.log(cachedNpmClient);
