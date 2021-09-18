import * as React from 'react';
import { useQuery } from "@apollo/client";
import Image from 'next/image';
import { GetFeedQuery, GetFeedDocument } from '@csmets/generated-types/generated/types';

const Feed = (): JSX.Element => {
  const { loading, error, data } = useQuery<GetFeedQuery>(GetFeedDocument);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data || !data.feed) {
    return <></>;
  }

  const feed = data.feed.map(({ id, image }) => (
    <div key={id}>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      <p>
        {id}
      </p>
    </div>
  ));

  if (feed.length) {
    return <>{feed}</>;
  } else {
    return <></>;
  }
}

export {
    Feed
}