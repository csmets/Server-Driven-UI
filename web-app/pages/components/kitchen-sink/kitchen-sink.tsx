import * as React from 'react';
import { ViewData, ViewVM } from '../../models/view-vm';
import { View } from '../view';

export const KitchenSinkView = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [ksData, setKSData] = React.useState<ViewData>();

  React.useEffect(() => {
    fetch('http://localhost:9090/kitchen-sink')
    .then(response => response.json())
    .then(data => {
      setKSData(new ViewVM(data[0].data));
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) return <p>Loading...</p>;

  if (!ksData) {
    return <></>;
  }

  return <View data={ksData} />
};
