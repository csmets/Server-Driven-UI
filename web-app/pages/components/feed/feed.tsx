import * as React from 'react';
import { FeedContainer } from './elements/feed-container';
import { FeedContainerVM, FeedContainerData  } from './models/feed-container-vm';

const Feed = (): JSX.Element => {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [data, setData] = React.useState<FeedContainerData>()

  React.useEffect(() => {
    fetch("http://localhost:9090/feed")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(new FeedContainerVM(result[0].data));
        },
        (error) => {
          setIsLoaded(true);
          setError(error)
        }
      )
  }, [])

  if (!isLoaded) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data) {
    return <></>;
  }

  return <FeedContainer data={data} />
}

export {
    Feed
}