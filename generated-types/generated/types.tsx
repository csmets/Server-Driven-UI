import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type EmitSignal = {
  __typename?: 'EmitSignal';
  id?: Maybe<Scalars['String']>;
  key?: Maybe<StateKey>;
};

export type FavouriteAction = {
  __typename?: 'FavouriteAction';
  id: Scalars['String'];
  signal?: Maybe<Signal>;
};

export type FeedItem = {
  __typename?: 'FeedItem';
  action?: Maybe<FavouriteAction>;
  caption?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Image>;
};

export type Image = {
  __typename?: 'Image';
  alt?: Maybe<Scalars['String']>;
  src: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  save?: Maybe<SaveResponse>;
};


export type MutationSaveArgs = {
  id?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  feed?: Maybe<Array<FeedItem>>;
};

export type SaveResponse = {
  __typename?: 'SaveResponse';
  signals?: Maybe<Array<EmitSignal>>;
};

export type Signal = {
  __typename?: 'Signal';
  id?: Maybe<Scalars['String']>;
  states?: Maybe<Array<State>>;
};

export type State = {
  __typename?: 'State';
  key: StateKey;
  value?: Maybe<Scalars['String']>;
};

export enum StateKey {
  Error = 'ERROR',
  Ok = 'OK'
}

export type FeedItemFragment = { __typename?: 'FeedItem', id: string, caption?: Maybe<string>, image?: Maybe<{ __typename?: 'Image', src: string, alt?: Maybe<string> }>, action?: Maybe<{ __typename?: 'FavouriteAction', id: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }> };

export type ImageFragment = { __typename?: 'Image', src: string, alt?: Maybe<string> };

export type FavouriteActionFragment = { __typename?: 'FavouriteAction', id: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> };

export type SignalFragment = { __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> };

export type StateFragment = { __typename?: 'State', key: StateKey, value?: Maybe<string> };

export type GetFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeedQuery = { __typename?: 'Query', feed?: Maybe<Array<{ __typename?: 'FeedItem', id: string, caption?: Maybe<string>, image?: Maybe<{ __typename?: 'Image', src: string, alt?: Maybe<string> }>, action?: Maybe<{ __typename?: 'FavouriteAction', id: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }> }>> };

export const ImageFragmentDoc = gql`
    fragment image on Image {
  src
  alt
}
    `;
export const StateFragmentDoc = gql`
    fragment state on State {
  key
  value
}
    `;
export const SignalFragmentDoc = gql`
    fragment signal on Signal {
  id
  states {
    ...state
  }
}
    ${StateFragmentDoc}`;
export const FavouriteActionFragmentDoc = gql`
    fragment favouriteAction on FavouriteAction {
  id
  signal {
    ...signal
  }
}
    ${SignalFragmentDoc}`;
export const FeedItemFragmentDoc = gql`
    fragment feedItem on FeedItem {
  id
  image {
    ...image
  }
  caption
  action {
    ...favouriteAction
  }
}
    ${ImageFragmentDoc}
${FavouriteActionFragmentDoc}`;
export const GetFeedDocument = gql`
    query getFeed {
  feed {
    ...feedItem
  }
}
    ${FeedItemFragmentDoc}`;

/**
 * __useGetFeedQuery__
 *
 * To run a query within a React component, call `useGetFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFeedQuery(baseOptions?: Apollo.QueryHookOptions<GetFeedQuery, GetFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, options);
      }
export function useGetFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeedQuery, GetFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, options);
        }
export type GetFeedQueryHookResult = ReturnType<typeof useGetFeedQuery>;
export type GetFeedLazyQueryHookResult = ReturnType<typeof useGetFeedLazyQuery>;
export type GetFeedQueryResult = Apollo.QueryResult<GetFeedQuery, GetFeedQueryVariables>;