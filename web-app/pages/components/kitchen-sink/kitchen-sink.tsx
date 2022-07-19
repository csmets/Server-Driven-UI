import * as React from 'react';
import {ContainerVM} from '../../models/container-vm';
import {KitchenSinkViewData, KitchenSinkViewVM} from '../../models/kitchen-sink-vm';
import {Container} from '../container';

export const KitchenSinkView = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [ksData, setKSData] = React.useState<KitchenSinkViewData>();

  React.useEffect(() => {
    fetch('http://localhost:9090/kitchen-sink')
    .then(response => response.json())
    .then(data => {
      setKSData(new KitchenSinkViewVM(data[0].data));
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) return <p>Loading...</p>;

  if (!ksData) {
    return <></>;
  }

  const viewElements = ksData?.elements?.map((el, index) => {
    if (el instanceof ContainerVM) {
      return <Container key={`view-container-${index}`} data={el} />
    }
    return <></>
  })

  return (
    <div>
      {viewElements}
    </div>
  );
};
