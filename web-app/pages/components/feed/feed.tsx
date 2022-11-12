import * as React from 'react';
import { EditNameContainer } from '../edit-heading-title/edit-name-container';
import { EditNameContainerData, EditNameContainerVM } from '../../models/edit-heading-container-vm';
import { ViewData, ViewVM } from '../../models/view-vm';
import { View } from '../view';

const Feed = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [feedData, setFeedData] = React.useState<ViewData>();
  const [editNameData, setEditNameData] = React.useState<EditNameContainerData>();

  React.useEffect(() => {
    const socket = new WebSocket('ws://localhost:9090/feed');

    socket.onmessage = (ev) => {
      const response = JSON.parse(ev.data);
      if (Array.isArray(response) && response.length > 0) {
        setIsLoaded(true)
        response.forEach((el: any) => {
          if (el.section === 'feed') {
            setFeedData(new ViewVM(el.data));
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
      {feedData && <View data={feedData} />}
      {editNameData && <EditNameContainer data={editNameData} />}
    </>
  );
}

export {
    Feed
}