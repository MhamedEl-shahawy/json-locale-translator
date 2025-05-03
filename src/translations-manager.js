import translate from "google-translate-api-x";
import chalk from "chalk";

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

export {translateObject}
