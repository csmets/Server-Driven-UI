import * as React from 'react';
import styles from '../../../styles/hacker-news/hacker-news.module.css';
import { ViewData, ViewVM } from '../../models/view-vm';
import { View } from '../view';

const HackerNewsFeed = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hnData, setHNData] = React.useState<ViewData>();

  React.useEffect(() => {
    const socket = new WebSocket('ws://localhost:9090/hacker-news');

    socket.onmessage = (ev) => {
      const response = JSON.parse(ev.data);
      if (Array.isArray(response) && response.length > 0) {
        setIsLoaded(true)
        response.forEach((el: any) => {
          if (el.section === 'hackerNews') {
            setHNData(new ViewVM(el.data.hackerNewsTopStories));
          }
        });
      }
    }
  }, [])

  if (!isLoaded) return <p>Loading...</p>;

  if (!hnData) {
    return <></>;
  }

  return (
    <div className={styles.view}>
      <div className={styles.view_container}>
        <View data={hnData} />
      </div>
    </div>
  );
}

export {
    HackerNewsFeed
}
