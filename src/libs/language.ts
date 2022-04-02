type Language = "de" | "en";

import Texts from "../assets/Texts.json";

export default class LanguageProvider
{
  language: Language;

  constructor(language: Language)
  {
    this.language = language; 
  }

  getText(keyword: string)
  {
    //@ts-ignore
    const text: any =  Texts[keyword][this.language];
  }
}