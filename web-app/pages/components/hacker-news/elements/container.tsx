import { CardVM } from "../models/card-vm";
import { ContainerData } from "../models/container-vm";
import { Card } from "./card";

export const Container = (props: { data: ContainerData }): JSX.Element => {
  const { data } = props;
  const { elements } = data;

  if (!data || !elements) {
    return <></>
  }

  const containerElements = elements?.map((el, index) => {
    if (el instanceof CardVM) {
      return <Card key={`container-card-${index}`} data={el} />
    }
    return <></>
  })

  return (
    <div>
      {containerElements}
    </div>
  );
};
