import * as React from 'react';
import Image from 'next/image';
import { FeedImageFragment } from '@csmets/typescript-apollo-sdui-types/types';

const FeedImage = (props: { data: FeedImageFragment }) => {
  const { data } = props
  return (
    <Image src={data.src} alt={data.alt || ""} width="250" height="200" />
  )
}

export {
  FeedImage
}