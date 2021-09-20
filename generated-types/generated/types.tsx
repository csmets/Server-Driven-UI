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

export enum ElementType {
  Icon = 'icon',
  Image = 'image',
  Typography = 'typography'
}

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

export type FeedCaption = FeedElement & {
  __typename?: 'FeedCaption';
  text?: Maybe<Scalars['String']>;
  type?: Maybe<ElementType>;
};

export type FeedElement = {
  type?: Maybe<ElementType>;
};

export type FeedFavourite = FeedElement & {
  __typename?: 'FeedFavourite';
  action?: Maybe<FavouriteAction>;
  icon?: Maybe<Scalars['String']>;
  type?: Maybe<ElementType>;
};

export type FeedImage = FeedElement & {
  __typename?: 'FeedImage';
  alt?: Maybe<Scalars['String']>;
  src: Scalars['String'];
  type?: Maybe<ElementType>;
};

export type FeedItem = {
  __typename?: 'FeedItem';
  items?: Maybe<Array<Maybe<FeedElement>>>;
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

export type FeedItemFragment = { __typename?: 'FeedItem', items?: Maybe<Array<Maybe<{ __typename?: 'FeedCaption', type?: Maybe<ElementType>, text?: Maybe<string> } | { __typename?: 'FeedFavourite', type?: Maybe<ElementType>, icon?: Maybe<string>, action?: Maybe<{ __typename?: 'FavouriteAction', id: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }> } | { __typename?: 'FeedImage', type?: Maybe<ElementType>, src: string, alt?: Maybe<string> }>>> };

export type FeedFavouriteFragment = { __typename?: 'FeedFavourite', type?: Maybe<ElementType>, icon?: Maybe<string>, action?: Maybe<{ __typename?: 'FavouriteAction', id: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }> };

export type FavouriteActionFragment = { __typename?: 'FavouriteAction', id: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> };

export type SignalFragment = { __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> };

export type StateFragment = { __typename?: 'State', key: StateKey, value?: Maybe<string> };

export type FeedCaptionFragment = { __typename?: 'FeedCaption', type?: Maybe<ElementType>, text?: Maybe<string> };

export type FeedImageFragment = { __typename?: 'FeedImage', type?: Maybe<ElementType>, src: string, alt?: Maybe<string> };

export type GetFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeedQuery = { __typename?: 'Query', feed?: Maybe<Array<{ __typename?: 'FeedItem', items?: Maybe<Array<Maybe<{ __typename?: 'FeedCaption', type?: Maybe<ElementType>, text?: Maybe<string> } | { __typename?: 'FeedFavourite', type?: Maybe<ElementType>, icon?: Maybe<string>, action?: Maybe<{ __typename?: 'FavouriteAction', id: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }> } | { __typename?: 'FeedImage', type?: Maybe<ElementType>, src: string, alt?: Maybe<string> }>>> }>> };

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
export const FeedFavouriteFragmentDoc = gql`
    fragment feedFavourite on FeedFavourite {
  type
  icon
  action {
    ...favouriteAction
  }
}
    ${FavouriteActionFragmentDoc}`;
export const FeedCaptionFragmentDoc = gql`
    fragment feedCaption on FeedCaption {
  type
  text
}
    `;
export const FeedImageFragmentDoc = gql`
    fragment feedImage on FeedImage {
  type
  src
  alt
}
    `;
export const FeedItemFragmentDoc = gql`
    fragment feedItem on FeedItem {
  items {
    ...feedFavourite
    ...feedCaption
    ...feedImage
  }
}
    ${FeedFavouriteFragmentDoc}
${FeedCaptionFragmentDoc}
${FeedImageFragmentDoc}`;
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