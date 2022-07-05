import * as React from 'react';
import Image from 'next/image';
import { FeedImageData } from '../../models/feed-item-vm';

const FeedImage = (props: { data: FeedImageData }) => {
  const { data } = props
  return (
    <Image src={data.src} alt={data.alt || ""} width="250" height="200" />
  )
}

export {
  FeedImage
}