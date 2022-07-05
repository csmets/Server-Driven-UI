import * as React from 'react';
import { Container } from '../container';
import {ContainerVM} from '../../models/container-vm';
import { HackerNewsViewVM, HackerNewsViewData } from '../../models/hacker-news-view-vm';

const HackerNewsFeed = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hnData, setHNData] = React.useState<HackerNewsViewData>();

  React.useEffect(() => {
    const socket = new WebSocket('ws://localhost:9090/hacker-news');

    socket.onmessage = (ev) => {
      const response = JSON.parse(ev.data);
      if (Array.isArray(response) && response.length > 0) {
        setIsLoaded(true)
        response.forEach((el: any) => {
          if (el.section === 'hackerNews') {
            setHNData(new HackerNewsViewVM(el.data.hackerNewsTopStories));
          }
        });
      }
    }
  }, [])

  if (!isLoaded) return <p>Loading...</p>;

  if (!hnData) {
    return <></>;
  }

  const viewElements = hnData?.elements?.map((el, index) => {
    if (el instanceof ContainerVM) {
      return <Container key={`view-container-${index}`} data={el} />
    }
    return <></>
  })

  return (
    <>
      {viewElements}
    </>
  );
}

export {
    HackerNewsFeed
}
