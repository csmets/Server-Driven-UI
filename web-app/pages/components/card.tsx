import React from "react";
import { CardData } from "../models/card-vm";
import { Card as CardComponent, Typography, CardContent, CardActionArea, CardMedia, CardActions } from "@mui/material";
import { Button } from "./button";
import { signalPairKeyValue } from "../helper/signal-pair-key-value";
import { SignalArrayValueVM, SignalValuePairKey } from "../models/signal-vm";
import { SignalContext } from "../provider/signal";
import { URLActionData } from "../models/actions/url-action";
import { ButtonVM } from "../models/buttons/button-vm";
import { FavouriteButtonVM } from "../models/buttons/favourite-button-vm";
import { FavouriteButton } from "./favourite-button";

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
  const signalContext = React.useContext(SignalContext);
  const { useSignalEvent } = signalContext;
  const [content, setContent] = React.useState(data.content);

  const signalCallback = ({ result, cache }: any) => {
    const value = signalPairKeyValue(SignalValuePairKey.Content, result.values)

    if (value && value instanceof SignalArrayValueVM) {
      const result = [
        ...value?.prefix ?? [],
        ...value.array,
        ...value?.suffix ?? []
      ]
      if (cache) {
        cache?.modify({
          id: cache.identify(props.data),
          fields: {
            content() {
              return result
            }
          },
        })
      } else {
        setContent(result)
      }
    }
  };

  useSignalEvent(data?.signal, signalCallback);

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
        {content && content.map((s, index) => {
          return <Typography key={`card-content-${index}`} sx={{ mb: 1.5 }} color="text.primary">
            {s}
          </Typography>
        })}
      </CardContent>
      <CardActions>
        {links && links.map((link) => {
          if (link instanceof ButtonVM) {
            return <Button data={link} />
          }
          if (link instanceof FavouriteButtonVM) {
            return <FavouriteButton data={link} />
          }
        })}
      </CardActions>
    </>
  )
}
