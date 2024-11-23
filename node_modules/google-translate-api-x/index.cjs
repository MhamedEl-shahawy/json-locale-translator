'use strict';
const translate = require('./lib/translate.cjs');
const Translator = require('./lib/Translator.cjs');
const singleTranslate = require('./lib/translation/singleTranslate.cjs');
const batchTranslate = require('./lib/translation/batchTranslate.cjs');
const { langs, isSupported, getCode } = require('./lib/languages.cjs');
const speak = require('./lib/speak.cjs');

module.exports = translate;
module.exports.translate = translate;
module.exports.Translator = Translator;
module.exports.singleTranslate = singleTranslate;
module.exports.batchTranslate = batchTranslate;
module.exports.languages = langs;
module.exports.isSupported = isSupported;
module.exports.getCode = getCode;
module.exports.speak = speak;