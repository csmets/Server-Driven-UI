import * as React from 'react';
import { Typography } from '@mui/material';
import { HeadingData, HeadingType } from '../../models/heading-vm';


export const Heading = (props: { data: HeadingData }) => {
  const { data } = props;

  if (!data || !data?.value) {
    return <></>;
  }


  switch(data.type) {
    case HeadingType.H1:
      return <Typography variant="h1">{ data.value }</Typography>;
    case HeadingType.H2:
      return <Typography variant="h2">{ data.value }</Typography>;
    case HeadingType.H3:
      return <Typography variant="h3">{ data.value }</Typography>;
  }
}
