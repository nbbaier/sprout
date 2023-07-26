import { Command, Argument } from "commander";
import fse from "fs-extra";
import { exec } from "child_process";
import yaml from "yaml";

const { structure, commands } = yaml.parse(
  fse.readFileSync("./src/file.yaml", "utf8")
);

const program = new Command();

if (commands) {
  program.action(
    commands.map((command) => {
      exec(command, (error, _stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Command execution error: ${stderr}`);
          return;
        }
        // Process the command output
        console.log("-", command);
      });
    })
  );
}
