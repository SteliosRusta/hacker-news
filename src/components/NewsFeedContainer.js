import React, { useState, useEffect } from "react";

const url = "http://hn.algolia.com/api/v1/search?tags=front_page";

function NewsFeedContainer() {
  const [newsFeed, setNewsFeed] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((news) => setNewsFeed(news.hits))
      .catch((err) => console.log(err));
  }, []);

  if (!newsFeed) return <p>Loading...</p>;
  return (
    <ol>
      {newsFeed.map((element) => {
        return (
          <li key={element.objectID}>
            <a href={element.url}>
              <div>{element.title}</div>
            </a>
            <p style={{ fontSize: 12 }}>
              {element.created_at} || comments: {element.num_comments}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export default NewsFeedContainer;
