import { CardVM } from "../models/card-vm";
import { ContainerData } from "../models/container-vm";
import { Card } from "./card";
import { Container as ContainerComponent } from "@mui/material";
import { Box } from "@mui/system";
import { TypographyVM } from "../models/typography-vm";
import { Typography } from "./typography/typography";

export const Container = (props: { data: ContainerData }): JSX.Element => {
  const { data } = props;
  const { elements } = data;

  if (!data || !elements) {
    return <></>
  }

  const containerElements = elements?.map((el, index) => {
    if (el instanceof CardVM) {
      return <>
        <Card key={`container-card-${index}`} data={el} />
        <Box sx={{mb: 2}} />
      </>
    }
    if (el instanceof TypographyVM) {
      return <Typography key={`container-typography-${index}`} data={el} />
    }
    return <></>
  })

  return (
    <ContainerComponent maxWidth="sm">
      {containerElements}
    </ContainerComponent>
  );
};
