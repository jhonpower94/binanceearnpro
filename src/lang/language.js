import LocalizedStrings from "localized-strings";
import { italy } from "./italy";
import { english } from "./english";

function GetCustomInterfaceLanguage() {
  return navigator.language;
}

export const Strings = new LocalizedStrings(
  {
    en: english,
    IT: italy,
  },
  {
    customLanguageInterface: GetCustomInterfaceLanguage,
  }
);
