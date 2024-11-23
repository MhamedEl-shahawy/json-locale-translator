# JSON Locale Translator

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
npm install json-locale-translator

# Using yarn
yarn add json-locale-translator
```

## Usage

### Basic Usage

```bash
translate-locale -s path/to/source.json -t targetLanguage
```

### Options

```bash
Options:
  -s, --source <path>    Source JSON file path (required)
  -t, --target <lang>    Target language code (e.g., es, fr, de) (required)
  -o, --output <path>    Output file path (optional)
  -h, --help            Display help information
```

### Examples

```bash
# Translate to Spanish
translate-locale -s locales/en.json -t es

# Translate to French with custom output path
translate-locale -s locales/en.json -t fr -o locales/french.json
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
