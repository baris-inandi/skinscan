import React from "react";
import Analysis from "../../Loop/ResultOverlay/Resolver/Analysis/Analysis";

const Example = () => {
  const a = {
    probs: [
      ["eczema", 0.45934],
      ["gangrene", 0.2312],
      ["healthy", 0.1533],
    ],
    wiki: {
      type: "standard",
      title: "Dermatitis",
      displaytitle: "Dermatitis",
      namespace: { id: 0, text: "" },
      wikibase_item: "Q229256",
      titles: {
        canonical: "Dermatitis",
        normalized: "Dermatitis",
        display: "Dermatitis",
      },
      pageid: 57713,
      thumbnail: {
        source:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Dermatitis2015.jpg/320px-Dermatitis2015.jpg",
        width: 320,
        height: 265,
      },
      originalimage: {
        source:
          "https://upload.wikimedia.org/wikipedia/commons/d/de/Dermatitis2015.jpg",
        width: 1839,
        height: 1521,
      },
      lang: "en",
      dir: "ltr",
      revision: "1098896941",
      tid: "a59a55c0-0632-11ed-b94c-57ad75221200",
      timestamp: "2022-07-18T00:43:25Z",
      description: "Inflammation of the skin",
      description_source: "local",
      content_urls: {
        desktop: {
          page: "https://en.wikipedia.org/wiki/Dermatitis",
          revisions: "https://en.wikipedia.org/wiki/Dermatitis?action=history",
          edit: "https://en.wikipedia.org/wiki/Dermatitis?action=edit",
          talk: "https://en.wikipedia.org/wiki/Talk:Dermatitis",
        },
        mobile: {
          page: "https://en.m.wikipedia.org/wiki/Dermatitis",
          revisions:
            "https://en.m.wikipedia.org/wiki/Special:History/Dermatitis",
          edit: "https://en.m.wikipedia.org/wiki/Dermatitis?action=edit",
          talk: "https://en.m.wikipedia.org/wiki/Talk:Dermatitis",
        },
      },
      extract:
        "Dermatitis is inflammation of the skin, typically characterized by itchiness, redness and a rash. In cases of short duration, there may be small blisters, while in long-term cases the skin may become thickened. The area of skin involved can vary from small to covering the entire body. Dermatitis is often called eczema, and the difference between those terms is not standardized.",
      extract_html:
        "<p><b>Dermatitis</b> is inflammation of the skin, typically characterized by itchiness, redness and a rash. In cases of short duration, there may be small blisters, while in long-term cases the skin may become thickened. The area of skin involved can vary from small to covering the entire body. Dermatitis is often called <b>eczema</b>, and the difference between those terms is not standardized.</p>",
    },
  };
  return <Analysis analysis={a} />;
};

export default Example;
