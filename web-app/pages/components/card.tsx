import { CardData } from "../models/card-vm";
import { Card as CardComponent, Typography, CardContent, CardActionArea, CardMedia, CardActions } from "@mui/material";
import { URLActionData } from "../models/action-vm";
import { Button } from "./button";

export const Card = (props: { data: CardData }): JSX.Element => {
  const { data } = props;
  const { action } = data;

  return (
    <CardComponent sx={{ minWidth: 275 }}>
      { action ?
        <CardActionArea href={(action as URLActionData)?.url || ""}>
          <CardContentArea data={data} />
        </CardActionArea>
      :
        <CardContentArea data={data} />
      }
    </CardComponent>
  );
}

const CardContentArea = (props: { data: CardData }): JSX.Element => {
  const { data } = props;
  const { primary, secondaries, action, media, links } = data;

  return (
    <>
      {media && <CardMedia
          component="img"
          height="140"
          image={media.url}
          alt={media.alt}
        />}
      <CardContent>
        <Typography variant="h5" component="div">
          {primary}
        </Typography>
        {secondaries.map((s, index) => {
          return <Typography key={`card-content-secondaries-${index}`} sx={{ mb: 1.5 }} color="text.secondary">
            {s}
          </Typography>
        })}
      </CardContent>
      <CardActions>
        {links && links.map((link) => <Button data={link} />)}
      </CardActions>
    </>
  )
}
