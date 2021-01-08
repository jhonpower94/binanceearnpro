import LocalizedStrings from "localized-strings";

function GetCustomInterfaceLanguage() {
  return navigator.language;
}

export const Strings = new LocalizedStrings(
  {
    en: require("./languages/english.json"),
    ar: require("./languages/ar.json"),
    nl: require("./languages/simpleen-NL.json"),
    es: require("./languages/simpleen-ES.json"),
    fr: require("./languages/simpleen-FR.json"),
    it: require("./languages/simpleen-IT.json"),
    pt: require("./languages/simpleen-PT-BR.json"),
    ru: require("./languages/simpleen-RU.json"),
  },
  {
    customLanguageInterface: GetCustomInterfaceLanguage,
  }
);
