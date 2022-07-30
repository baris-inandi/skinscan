import React from "react";
import Analysis from "../../Loop/ResultOverlay/Resolver/Analysis/Analysis";

const Example = () => {
  const a = {
    probs: [
      ["gangrene", 0.7312],
      ["eczema", 0.1934],
      ["healthy", 0.1533],
    ],
    wiki: {
      type: "standard",
      title: "Gangrene",
      displaytitle: "Gangrene",
      namespace: { id: 0, text: "" },
      wikibase_item: "Q168805",
      titles: {
        canonical: "Gangrene",
        normalized: "Gangrene",
        display: "Gangrene",
      },
      pageid: 237977,
      thumbnail: {
        source:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/GangreneFoot.JPG/320px-GangreneFoot.JPG",
        width: 320,
        height: 293,
      },
      originalimage: {
        source:
          "https://upload.wikimedia.org/wikipedia/commons/8/8e/GangreneFoot.JPG",
        width: 2956,
        height: 2707,
      },
      lang: "en",
      dir: "ltr",
      revision: "1090198353",
      tid: "cf4c1210-fe84-11ec-8553-c585cab815ea",
      timestamp: "2022-05-28T01:47:13Z",
      description: "Type of tissue death by a lack of blood supply",
      description_source: "local",
      content_urls: {
        desktop: {
          page: "https://en.wikipedia.org/wiki/Gangrene",
          revisions: "https://en.wikipedia.org/wiki/Gangrene?action=history",
          edit: "https://en.wikipedia.org/wiki/Gangrene?action=edit",
          talk: "https://en.wikipedia.org/wiki/Talk:Gangrene",
        },
        mobile: {
          page: "https://en.m.wikipedia.org/wiki/Gangrene",
          revisions: "https://en.m.wikipedia.org/wiki/Special:History/Gangrene",
          edit: "https://en.m.wikipedia.org/wiki/Gangrene?action=edit",
          talk: "https://en.m.wikipedia.org/wiki/Talk:Gangrene",
        },
      },
      extract:
        "Gangrene is a type of tissue death caused by a lack of blood supply. Symptoms may include a change in skin color to red or black, numbness, swelling, pain, skin breakdown, and coolness. The feet and hands are most commonly affected. If the gangrene is caused by an infectious agent, it may present with a fever or sepsis.",
      extract_html:
        "<p><b>Gangrene</b> is a type of tissue death caused by a lack of blood supply. Symptoms may include a change in skin color to red or black, numbness, swelling, pain, skin breakdown, and coolness. The feet and hands are most commonly affected. If the gangrene is caused by an infectious agent, it may present with a fever or sepsis.</p>",
    },
  };
  return <Analysis analysis={a} />;
};

export default Example;
