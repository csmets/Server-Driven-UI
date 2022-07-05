import * as React from 'react';
import { EditNameContainer } from './edit-name-container';
import { EditNameContainerData, EditNameContainerVM } from '../../models/edit-heading-container-vm';

const EditHeadingTitle = () => {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [data, setData] = React.useState<EditNameContainerData>()

  React.useEffect(() => {
    fetch("http://localhost:9090/feed")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(new EditNameContainerVM(result[1].data));
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

  return (
    <div>
      <EditNameContainer data={data} />
    </div>
  )
};

export {
  EditHeadingTitle
}