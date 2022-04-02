import Texts from "../assets/Texts.json";

export type Language = "de" | "en";

export class LanguageProvider {
  language: Language;

  constructor(language: Language) {
    this.language = language;
  }

  getText(keyword: string) {
    const sections: string[] = keyword.split(".");

    // @ts-ignore
    let currentObj = Texts[sections[0]];

    for (let i = 1; i < sections.length; i++) {
      if (currentObj == null) return keyword + "." + this.language;

      const section: string = sections[i];

      // @ts-ignore
      currentObj = currentObj[section];
    }

    if (currentObj == null) return keyword + "." + this.language;

    return currentObj[this.language];

  }
}


