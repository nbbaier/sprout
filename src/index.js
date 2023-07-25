import fse from "fs-extra";
import yaml from "yaml";

import mustache from "mustache";

const name = process.argv[2] || "project";

const parsed = yaml.parse(fse.readFileSync("./src/file.yaml", "utf8"));

function createDirectory(obj, parentDir = ".") {
  const dirname =
    obj.dir && obj.dir.includes("{")
      ? mustache.render(`${obj.dir}`, { name })
      : obj.dir;

  const dirPath = parentDir + "/" + dirname;
  fse.mkdirpSync(dirPath);

  if (obj.children && obj.children.length > 0) {
    for (const child of obj.children) {
      if (child.dir) {
        createDirectory(child, dirPath);
      }
      if (child.file) {
        const filename =
          child.file && child.file.includes("{")
            ? mustache.render(`${child.file}`, { name })
            : child.file;

        const filePath = dirPath + "/" + filename;
        fse.writeFileSync(filePath, "");
      }
    }
  }
}

createDirectory(parsed);
