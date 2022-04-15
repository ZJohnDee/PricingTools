import ReactMarkdown from "react-markdown";

import DocMap from "../assets/docmap.json";


export class DocsProvider {
  path: string;
  data: string;

  constructor(path: string)
  {
    this.path = path;
    this.data = "";
  }

  async load() {
    let temp = await (await fetch(process.env.PUBLIC_URL + "/docfiles/" + this.path + ".md")).text();
    this.data = temp;

    console.log(this.data);
  }

  getDocsElement() : any{
    console.log("Drawing docs element...");

    return(
       <ReactMarkdown children={this.data}/>
    );
  }

  getRawText(): string {
    return this.data;
  }
}


export function getDocLinks()
{
  return DocMap;
}
