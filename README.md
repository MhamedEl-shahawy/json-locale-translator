# JSON Locale Translator

[![npm version](https://badge.fury.io/js/json-locale-translator.svg)](https://www.npmjs.com/package/json-locale-translator)

A command-line tool to translate JSON-based locale files using Google Translate.

## Features

- 🔄 Translates JSON locale files while preserving structure
- 🌐 Supports multiple languages
- 🎯 Handles nested JSON objects
- 💪 Preserves original keys
- 🎨 Colorful console output for better visibility

## Installation

```bash
# Using npm
npm install -g json-locale-translator

# Using yarn
yarn add -g json-locale-translator
```

## Usage

# Show help

```bash
json-locale-translator --help
```

# Translate a file

```bash
json-locale-translator -s example/en.json -f en -t es
```

# Interactive mode

```bash
json-locale-translator -i
```

### Basic Usage

1. **Create a Source File**

```bash
mkdir locales && echo {} > locales\en.json
```

2. **Interactive Translation (Recommended)**

```bash
json-locale-translator -s example/en.json -f en -t es
```

### Sample Input/Output

Input (`en.json`):

```json
{
  "welcome": "Welcome to our application",
  "navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  }
}
```

Output (`es.json`):

```json
{
  "welcome": "Bienvenido a nuestra aplicación",
  "navigation": {
    "home": "Inicio",
    "about": "Acerca de",
    "contact": "Contacto"
  }
}
```

## Supported Languages

The tool supports all languages available in Google Translate. Some common language codes:

- `en` - English
- `es` - Spanish
- `fr` - French
- `de` - German
- `it` - Italian
- `pt` - Portuguese
- `ru` - Russian
- `zh` - Chinese
- `ja` - Japanese
- `ko` - Korean

[Full list of language codes](https://cloud.google.com/translate/docs/languages)

## Development

```bash
# Clone the repository
git clone https://github.com/MhamedEl-shahawy/json-locale-translator.git

# Install dependencies
cd json-locale-translator
npm install

# Link for local development
npm link
```

## Project Structure

```
json-locale-translator/
├── src/
│   └── index.js          # Main CLI tool
├── example/
│   ├── en.json          # Source example
│   └── es.json          # Translated example
├── scripts/
│   └── batch-translate.js # Batch translation script
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [google-translate-api-x](https://www.npmjs.com/package/google-translate-api-x) for translation services
- [commander](https://www.npmjs.com/package/commander) for CLI argument parsing
- [chalk](https://www.npmjs.com/package/chalk) for colored console output

## Issues

If you find any bugs or have feature requests, please create an issue in the [GitHub repository](https://github.com/MhamedEl-shahawy/json-locale-translator/issues).

## Author

[@MhamedEl-shahawy](https://github.com/MhamedEl-shahawy)

## Support

⭐️ If you find this project useful, please consider giving it a star on GitHub!
