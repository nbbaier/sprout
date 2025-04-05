import fse from "fs-extra";
import yaml from "yaml";
import mustache from "mustache";
import path from "node:path";
import exec from "node:child_process";

const name = process.argv[2] || "project";

const { structure, commands } = yaml.parse(
	fse.readFileSync("./src/file.yaml", "utf8"),
);
function createDirectory(obj, parentDir = ".") {
	const varPattern = /{{.*?}}/;

	const dirname =
		obj.dir && varPattern.test(obj.dir)
			? mustache.render(obj.dir, { name })
			: obj.dir;

	const dirPath = path.join(parentDir, dirname);

	// Check if the root directory already exists
	if (parentDir === "." && fse.existsSync(dirPath)) {
		console.error(
			`Error: A directory '${dirname}' already exists at '${path.resolve(
				dirPath,
			)}'`,
		);
	}

	fse.mkdirp(dirPath, (err) => {
		if (err) {
			console.error("Error creating directory:", err);
			return;
		}

		if (obj.children && obj.children.length > 0) {
			for (const child of obj.children) {
				if (child.dir) {
					createDirectory(child, dirPath);
				}

				if (child.file) {
					const filename =
						child.file && varPattern.test(child.file.replace(/\.[^/.]+$/, ""))
							? mustache.render(child.file, { name })
							: child.file;

					const filePath = path.join(dirPath, filename);

					if (child.copy) {
						fse
							.copy(path.join(child.sourcePath, filename), filePath)
							.catch((err) => {
								fse.writeFile(filePath, "", (err) => {
									if (err) {
										console.error("Error creating file:", err);
									}
								});
								console.error("Error copying file:", err);
							});
					} else {
						fse.writeFile(filePath, "", (err) => {
							if (err) {
								console.error("Error creating file:", err);
							}
						});
					}
				}
			}
		}
	});
}

createDirectory(structure);
