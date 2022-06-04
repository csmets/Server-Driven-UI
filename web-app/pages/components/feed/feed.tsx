import * as React from 'react';
import { FeedContainer } from './elements/feed-container';
import { FeedContainerVM, FeedContainerData  } from './models/feed-container-vm';
import { EditNameContainer } from '../edit-heading-title/elements/edit-name-container';
import { EditNameContainerData, EditNameContainerVM } from '../edit-heading-title/models/edit-heading-container-vm';

const Feed = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [feedData, setFeedData] = React.useState<FeedContainerData>();
  const [editNameData, setEditNameData] = React.useState<EditNameContainerData>();

  React.useEffect(() => {
    const socket = new WebSocket('ws://localhost:9090/feed');

    socket.onmessage = (ev) => {
      const response = JSON.parse(ev.data);
      if (Array.isArray(response) && response.length > 0) {
        setIsLoaded(true)
        response.forEach((el: any) => {
          if (el.section === 'feed') {
            setFeedData(new FeedContainerVM(el.data));
          }
          if (el.section === 'editName') {
            setEditNameData(new EditNameContainerVM(el.data));
          }
        });
      }
    }
  }, [])

  if (!isLoaded) return <p>Loading...</p>;

  if (!feedData) {
    return <></>;
  }

  return (
    <>
      {feedData && <FeedContainer data={feedData} />}
      {editNameData && <EditNameContainer data={editNameData} />}
    </>
  );
}

export {
    Feed
}