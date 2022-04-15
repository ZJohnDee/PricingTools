import {useParams} from "react-router-dom";
import {DocsProvider, getDocLinks} from "../../libs/docs";
import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "../../libs/context";
import ReactMarkdown from "react-markdown";
import {ListItemText, MenuItem, MenuList} from "@mui/material";
import {LanguageProvider} from "../../libs/language";

import "./pageDocs.css"

import DocMap from "../../assets/docmap.json";

export default (props: any) => {

  const path = useParams().path as string;

  return (
    <div className={"docs"}>
      <DocsNav/>
      <DocsContent path={path}/>
    </div>
  );
}

const DocsNav = (props: any) => {

  const map = DocMap;

  const {language} = useContext(LanguageContext);
  const langProvider = new LanguageProvider(language);

  let items = [];
  //@ts-ignore
  for (const doc of map.docs) {
    const onClick = () => {window.location.assign("/docs/" + doc.link);};

    items.push(
      <MenuItem onClick={onClick}>
        <ListItemText>
          {doc[language]}
        </ListItemText>
      </MenuItem>
    );
  }

  return (
    <div className={"docs-nav"}>
      <MenuList>
        {items}
      </MenuList>
    </div>

  );
}


const DocsContent = (props: { path: string }) => {

  const path = props.path;

  const {language} = useContext(LanguageContext)

  const [provider, setProvider] = useState(new DocsProvider(path + "_" + language));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      provider.load().then(() => {
        setLoaded(true);
      })
    }
  });

  if (loaded) {
    // @ts-ignore
    return <div className={"docs-content"}><ReactMarkdown children={provider.getRawText()}/></div>
  } else {
    return <h2>Loading...</h2>;
  }

}
