import { BoxVM } from "../models/box-vm";
import { CardVM } from "../models/card-vm";
import { ContainerData, ContainerType } from "../models/container-vm";
import { Card } from "./card";
import { Box, Stack } from "@mui/material";
import { TypographyVM } from "../models/typography-vm";
import { Typography } from "./typography/typography";
import { Button } from "./button";
import { ButtonVM } from "../models/buttons/button-vm";
import { ImageVM } from "../models/image-vm";

export const Container = (props: { data: ContainerData }): JSX.Element => {
  const { data } = props;
  const { containerType, elements } = data;

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
      return <Box key={`container-spacing-${index}`} sx={{ width: el.width, height: el.height, backgroundColor: el._debugColor }} />
    }
    if (el instanceof ButtonVM) {
      return <Button key={`container-button-${index}`} data={el} />
    }
    if (el instanceof ImageVM) {
      return <img src={el.url} alt={el.alt} width={el.width ?? 'auto'} height={el.height ?? 'auto'}/>
    }
    return <></>
  })

  switch (containerType) {
    case ContainerType.COLUMN:
      return (
        <Stack
          direction="column"
        >
          {containerElements}
        </Stack>
      );
    case ContainerType.ROW:
      return (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
        >
          {containerElements}
        </Stack>
      );
    default:
      return (
        <Stack>
          {containerElements}
        </Stack>
      );
  }
};
