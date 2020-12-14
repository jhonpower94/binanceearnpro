import LocalizedStrings from "localized-strings";
import { italy } from "./italy";
import { english } from "./english";

function GetCustomInterfaceLanguage() {
  return navigator.language;
}

export const Strings = new LocalizedStrings(
  {
    en: require("./languages/english.json"),
    ar: require("./languages/ar.json"),
  },
  {
    customLanguageInterface: GetCustomInterfaceLanguage,
  }
);
