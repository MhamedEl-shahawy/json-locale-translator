#!/usr/bin/env node

const { program } = require("commander");
const translate = require("google-translate-api-x");
const fs = require("fs-extra");
const chalk = require("chalk");
const path = require("path");

async function translateObject(obj, targetLang) {
  const translated = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      translated[key] = await translateObject(value, targetLang);
    } else if (typeof value === "string") {
      try {
        const result = await translate(value, { to: targetLang });
        translated[key] = result.text;
        console.log(chalk.green(`✓ Translated: ${value} → ${result.text}`));
      } catch (error) {
        console.error(chalk.red(`✗ Failed to translate: ${value}`));
        translated[key] = value;
      }
    } else {
      translated[key] = value;
    }
  }

  return translated;
}

async function main() {
  program
    .name("translate-locale")
    .description("Translate JSON locale files to different languages")
    .requiredOption("-s, --source <path>", "Source JSON file path")
    .requiredOption(
      "-t, --target <lang>",
      "Target language code (e.g., es, fr, de)"
    )
    .option("-o, --output <path>", "Output file path")
    .parse(process.argv);

  const options = program.opts();

  try {
    // Read source file
    const sourceData = await fs.readJson(options.source);

    // Translate the content
    console.log(chalk.blue("Starting translation..."));
    const translatedData = await translateObject(sourceData, options.target);

    // Determine output path
    const outputPath =
      options.output ||
      path.join(
        path.dirname(options.source),
        `${path.basename(options.source, ".json")}.${options.target}.json`
      );

    // Write translated file
    await fs.writeJson(outputPath, translatedData, { spaces: 2 });
    console.log(
      chalk.green(`\n✓ Translation completed! Output saved to: ${outputPath}`)
    );
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    process.exit(1);
  }
}

main();
