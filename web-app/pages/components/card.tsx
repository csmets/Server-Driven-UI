import { CardData } from "../models/card-vm";
import { Card as CardComponent, Typography, CardContent, CardActionArea } from "@mui/material";

export const Card = (props: { data: CardData }): JSX.Element => {
  const { data } = props;
  const { primary, secondaries, action } = data;

  return (
    <CardComponent sx={{ minWidth: 275 }}>
      <CardActionArea href={action?.url || ""}>
        <CardContent>
          <Typography variant="h5" component="div">
            {primary}
          </Typography>
          { secondaries.map((s, index) => {
            return <Typography key={`card-content-secondaries-${index}`} sx={{ mb: 1.5 }} color="text.secondary">
            {s}
            </Typography>
          }) }
        </CardContent>
      </CardActionArea>
    </CardComponent>
  );
}
