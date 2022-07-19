import { BoxVM } from "../models/box-vm";
import { CardVM } from "../models/card-vm";
import { ContainerData } from "../models/container-vm";
import { Card } from "./card";
import { Container as ContainerComponent, Box } from "@mui/material";
import { TypographyVM } from "../models/typography-vm";
import { Typography } from "./typography/typography";
import { Button } from "./button";
import { ButtonVM } from "../models/button-vm";

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
    if (el instanceof BoxVM) {
      return <Box key={`container-spacing-${index}`} sx={{ width: el.width, height: el.height }}/>
    }
    if (el instanceof ButtonVM) {
      return <Button key={`container-button-${index}`} data={el} />
    }
    return <></>
  })

  return (
    <ContainerComponent maxWidth="sm">
      {containerElements}
    </ContainerComponent>
  );
};
