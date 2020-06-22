import LocalizedStrings from "localized-strings";

function getCustomInterfaceLanguage() {
  return navigator.language;
}


export const HomePageStrings = new LocalizedStrings(
  {
    en: {
      how: "How do you want your egg today?",
      boiledEgg: "Boiled egg",
      softBoiledEgg: "Soft-boiled egg",
      choice: "How to choose the egg",
      list: {
        label: "label is done",
      },
    },
    it: {
      how: "Come vuoi il tuo uovo oggi?",
      boiledEgg: "Uovo sodo",
      softBoiledEgg: "Uovo alla coque",
      choice: "Come scegliere l'uovo",
      list: {
        label: "l'etichetta è terminata",
      },
    },
  },
  {
    customLanguageInterface: getCustomInterfaceLanguage,
  }
);
