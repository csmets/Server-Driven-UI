import { HeadingVM } from "../models/heading-vm";
import { ParagraphVM } from "../models/paragraph-vm";
import { Heading } from "./typography/heading";
import { Paragraph } from "./typography/paragraph";
import { CardVM } from "../models/card-vm";
import { ContainerData } from "../models/container-vm";
import { Card } from "./card";
import { Container as ContainerComponent } from "@mui/material";
import { Box } from "@mui/system";

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
    if (el instanceof ParagraphVM) {
      return <Paragraph key={`container-paragraph-${index}`} data={el} />
    }
    if (el instanceof HeadingVM) {
      return <Heading key={`container-heading-${index}`} data={el} />
    }
    return <></>
  })

  return (
    <ContainerComponent maxWidth="sm">
      {containerElements}
    </ContainerComponent>
  );
};
