import * as React from 'react';
import { Container } from './elements/container';
import { ContainerData, ContainerVM } from './models/container-vm';

const HackerNewsFeed = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hnData, setHNData] = React.useState<ContainerData>();

  React.useEffect(() => {
    const socket = new WebSocket('ws://localhost:9090/hacker-news');

    socket.onmessage = (ev) => {
      const response = JSON.parse(ev.data);
      if (Array.isArray(response) && response.length > 0) {
        setIsLoaded(true)
        response.forEach((el: any) => {
          if (el.section === 'hackerNews') {
            setHNData(new ContainerVM(el.data.hackerNewsTopStories));
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
    <>
      {hnData && <Container data={hnData} />}
    </>
  );
}

export {
    HackerNewsFeed
}
