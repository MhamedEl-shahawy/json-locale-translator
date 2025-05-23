#!/usr/bin/env node

import { program } from "commander";
import translate from "google-translate-api-x";
import fs from "fs-extra";
import chalk from "chalk";
import path from "path";
import inquirer from "inquirer";

// Define available languages
const LANGUAGES = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  ar: "Arabic",
  hi: "Hindi",
  nl: "Dutch",
  pl: "Polish",
  tr: "Turkish",
  vi: "Vietnamese",
  th: "Thai",
  sv: "Swedish",
  da: "Danish",
  fi: "Finnish",
};

async function selectLanguages() {
  const questions = [
    {
      type: "list",
      name: "from",
      message: "Select source language:",
      choices: Object.entries(LANGUAGES).map(([code, name]) => ({
        name: `${name} (${code})`,
        value: code,
      })),
    },
    {
      type: "list",
      name: "to",
      message: "Select target language:",
      choices: Object.entries(LANGUAGES).map(([code, name]) => ({
        name: `${name} (${code})`,
        value: code,
      })),
    },
  ];

  return inquirer.prompt(questions);
}

async function translateObject({obj, translated={}, fromLang, toLang, replace=false}) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      translated[key] = await translateObject({obj: value, translated: translated[key] || {}, fromLang, toLang, replace});
    } else if (typeof value === "string") {
      if (!translated[key] || replace) {
        try {
          const result = await translate(value, {
            from: fromLang,
            to: toLang,
          });
          translated[key] = result.text;
          console.log(
              chalk.green(`✓ [${fromLang} → ${toLang}] ${value} → ${result.text}`)
          );
        } catch (error) {
          console.error(chalk.red(`✗ Failed to translate: ${value}`));
          translated[key] = value;
        }
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
    .description("Translate JSON locale files between any languages")
    .option("-s, --source <path>", "Source JSON file path")
    .option("-f, --from <lang>", "Source language code")
    .option("-t, --to <lang>", "Target language code")
    .option("-o, --output <path>", "Output file path")
    .option("-i, --interactive", "Use interactive mode")
    .option("--force-replace", "Force replace existing translations", false)
    .parse(process.argv);

  const options = program.opts();

  try {
    // If no source file specified, prompt for it
    if (!options.source) {
      const { sourceFile } = await inquirer.prompt([
        {
          type: "input",
          name: "sourceFile",
          message: "Enter the path to your source JSON file:",
          validate: (input) => fs.existsSync(input) || "File does not exist",
        },
      ]);
      options.source = sourceFile;
    }

    // Interactive mode or missing language options
    if (options.interactive || !options.from || !options.to) {
      const languages = await selectLanguages();
      options.from = languages.from;
      options.to = languages.to;
    }

    // Read source file
    const sourceData = await fs.readJson(options.source);

    // Check if target file exists, if yes, parse it
    let targetData = {};
    if (options.output && fs.existsSync(options.output)) {
      targetData = await fs.readJson(options.output);
    }

    // Show translation info
    console.log(chalk.blue("\nTranslation Details:"));
    console.log(
      chalk.blue(`From: ${LANGUAGES[options.from]} (${options.from})`)
    );
    console.log(chalk.blue(`To: ${LANGUAGES[options.to]} (${options.to})`));
    console.log(chalk.blue(`Replace existing content ${options.forceReplace}`));
    console.log(chalk.blue("Starting translation...\n"));

    // Translate the content
    const translatedData = await translateObject({
      obj: sourceData,
      translated: targetData,
      fromLang: options.from,
      toLang: options.to,
      replace: options.forceReplace
    })

    // Determine output path
    const outputPath =
      options.output ||
      path.join(path.dirname(options.source), `${options.to}.json`);

    // Create directory if it doesn't exist
    await fs.ensureDir(path.dirname(outputPath));

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
