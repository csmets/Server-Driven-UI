import { Card, CardMedia, CardContent, Typography, CardActions, Box } from '@mui/material';
import * as React from 'react';
import { LikeButton } from './like-button';
import { FeedItem } from './types';

export const FeedCard = (props: { data: FeedItem }) => {
  const { data } = props;
  const { title, likes, image, id } = data;
  const [numOfLikes, setNumOfLikes] = React.useState(likes);

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        {image && <CardMedia
            component="img"
            height="220"
            image={image}
            alt={title}
          />}
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
            <Typography color="text.secondary">
              {numOfLikes} likes
            </Typography>
        </CardContent>
        <CardActions>
          <LikeButton id={id} likes={likes} setNumOfLikes={setNumOfLikes} />
        </CardActions>
      </Card>
      <Box sx={{mb: 2}} />
    </>
  )
}