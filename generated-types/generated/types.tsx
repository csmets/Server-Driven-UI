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

export type Column = {
  align: ColumnAlignment;
};

export enum ColumnAlignment {
  Center = 'CENTER',
  Left = 'LEFT',
  Right = 'RIGHT'
}

export type ColumnLayout = {
  __typename?: 'ColumnLayout';
  columns?: Maybe<Array<Maybe<Column>>>;
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

export type FeedCaption = {
  __typename?: 'FeedCaption';
  text?: Maybe<Scalars['String']>;
};

export type FeedElement = ColumnLayout | FeedCaption | FeedImage;

export type FeedFavourite = Column & {
  __typename?: 'FeedFavourite';
  action?: Maybe<FavouriteAction>;
  align: ColumnAlignment;
  icon?: Maybe<Scalars['String']>;
};

export type FeedFavouriteCount = Column & {
  __typename?: 'FeedFavouriteCount';
  align: ColumnAlignment;
  count: Scalars['String'];
  signal?: Maybe<Signal>;
};

export type FeedImage = {
  __typename?: 'FeedImage';
  alt?: Maybe<Scalars['String']>;
  src: Scalars['String'];
};

export type FeedItem = {
  __typename?: 'FeedItem';
  items?: Maybe<Array<Maybe<FeedElement>>>;
};

export type FeedView = {
  __typename?: 'FeedView';
  elements?: Maybe<Array<Maybe<FeedViewElement>>>;
};

export type FeedViewElement = FeedItem | TypographyContent;

export type Mutation = {
  __typename?: 'Mutation';
  save?: Maybe<SaveResponse>;
};


export type MutationSaveArgs = {
  id?: Maybe<Scalars['String']>;
};

export type Paragraph = {
  __typename?: 'Paragraph';
  text?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  feed?: Maybe<FeedView>;
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

export type TypographyContent = {
  __typename?: 'TypographyContent';
  paragraph?: Maybe<Array<Maybe<Paragraph>>>;
};

export type FeedViewFragment = { __typename?: 'FeedView', elements?: Maybe<Array<Maybe<{ __typename?: 'FeedItem', items?: Maybe<Array<Maybe<{ __typename?: 'ColumnLayout', columns?: Maybe<Array<Maybe<{ __typename?: 'FeedFavourite', align: ColumnAlignment, icon?: Maybe<string>, action?: Maybe<{ __typename?: 'FavouriteAction', id: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }> } | { __typename?: 'FeedFavouriteCount', align: ColumnAlignment, count: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }>>> } | { __typename?: 'FeedCaption', text?: Maybe<string> } | { __typename?: 'FeedImage', src: string, alt?: Maybe<string> }>>> } | { __typename?: 'TypographyContent', paragraph?: Maybe<Array<Maybe<{ __typename?: 'Paragraph', text?: Maybe<string> }>>> }>>> };

export type FeedItemFragment = { __typename?: 'FeedItem', items?: Maybe<Array<Maybe<{ __typename?: 'ColumnLayout', columns?: Maybe<Array<Maybe<{ __typename?: 'FeedFavourite', align: ColumnAlignment, icon?: Maybe<string>, action?: Maybe<{ __typename?: 'FavouriteAction', id: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }> } | { __typename?: 'FeedFavouriteCount', align: ColumnAlignment, count: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }>>> } | { __typename?: 'FeedCaption', text?: Maybe<string> } | { __typename?: 'FeedImage', src: string, alt?: Maybe<string> }>>> };

export type ColumnLayoutFragment = { __typename?: 'ColumnLayout', columns?: Maybe<Array<Maybe<{ __typename?: 'FeedFavourite', align: ColumnAlignment, icon?: Maybe<string>, action?: Maybe<{ __typename?: 'FavouriteAction', id: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }> } | { __typename?: 'FeedFavouriteCount', align: ColumnAlignment, count: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }>>> };

export type FeedFavouriteFragment = { __typename?: 'FeedFavourite', icon?: Maybe<string>, action?: Maybe<{ __typename?: 'FavouriteAction', id: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }> };

export type FeedFavouriteCountFragment = { __typename?: 'FeedFavouriteCount', count: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> };

export type FavouriteActionFragment = { __typename?: 'FavouriteAction', id: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> };

export type SignalFragment = { __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> };

export type StateFragment = { __typename?: 'State', key: StateKey, value?: Maybe<string> };

export type FeedCaptionFragment = { __typename?: 'FeedCaption', text?: Maybe<string> };

export type FeedImageFragment = { __typename?: 'FeedImage', src: string, alt?: Maybe<string> };

export type TypographyContentFragment = { __typename?: 'TypographyContent', paragraph?: Maybe<Array<Maybe<{ __typename?: 'Paragraph', text?: Maybe<string> }>>> };

export type ParagraphFragment = { __typename?: 'Paragraph', text?: Maybe<string> };

export type SaveItemMutationVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type SaveItemMutation = { __typename?: 'Mutation', save?: Maybe<{ __typename?: 'SaveResponse', signals?: Maybe<Array<{ __typename?: 'EmitSignal', id?: Maybe<string>, key?: Maybe<StateKey> }>> }> };

export type GetFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeedQuery = { __typename?: 'Query', feed?: Maybe<{ __typename?: 'FeedView', elements?: Maybe<Array<Maybe<{ __typename?: 'FeedItem', items?: Maybe<Array<Maybe<{ __typename?: 'ColumnLayout', columns?: Maybe<Array<Maybe<{ __typename?: 'FeedFavourite', align: ColumnAlignment, icon?: Maybe<string>, action?: Maybe<{ __typename?: 'FavouriteAction', id: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }> } | { __typename?: 'FeedFavouriteCount', align: ColumnAlignment, count: string, signal?: Maybe<{ __typename?: 'Signal', id?: Maybe<string>, states?: Maybe<Array<{ __typename?: 'State', key: StateKey, value?: Maybe<string> }>> }> }>>> } | { __typename?: 'FeedCaption', text?: Maybe<string> } | { __typename?: 'FeedImage', src: string, alt?: Maybe<string> }>>> } | { __typename?: 'TypographyContent', paragraph?: Maybe<Array<Maybe<{ __typename?: 'Paragraph', text?: Maybe<string> }>>> }>>> }> };

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
  icon
  action {
    ...favouriteAction
  }
}
    ${FavouriteActionFragmentDoc}`;
export const FeedFavouriteCountFragmentDoc = gql`
    fragment feedFavouriteCount on FeedFavouriteCount {
  count
  signal {
    ...signal
  }
}
    ${SignalFragmentDoc}`;
export const ColumnLayoutFragmentDoc = gql`
    fragment columnLayout on ColumnLayout {
  columns {
    align
    ...feedFavourite
    ...feedFavouriteCount
  }
}
    ${FeedFavouriteFragmentDoc}
${FeedFavouriteCountFragmentDoc}`;
export const FeedCaptionFragmentDoc = gql`
    fragment feedCaption on FeedCaption {
  text
}
    `;
export const FeedImageFragmentDoc = gql`
    fragment feedImage on FeedImage {
  src
  alt
}
    `;
export const FeedItemFragmentDoc = gql`
    fragment feedItem on FeedItem {
  items {
    ...columnLayout
    ...feedCaption
    ...feedImage
  }
}
    ${ColumnLayoutFragmentDoc}
${FeedCaptionFragmentDoc}
${FeedImageFragmentDoc}`;
export const ParagraphFragmentDoc = gql`
    fragment paragraph on Paragraph {
  text
}
    `;
export const TypographyContentFragmentDoc = gql`
    fragment typographyContent on TypographyContent {
  paragraph {
    ...paragraph
  }
}
    ${ParagraphFragmentDoc}`;
export const FeedViewFragmentDoc = gql`
    fragment feedView on FeedView {
  elements {
    ...feedItem
    ...typographyContent
  }
}
    ${FeedItemFragmentDoc}
${TypographyContentFragmentDoc}`;
export const SaveItemDocument = gql`
    mutation saveItem($id: String) {
  save(id: $id) {
    signals {
      id
      key
    }
  }
}
    `;
export type SaveItemMutationFn = Apollo.MutationFunction<SaveItemMutation, SaveItemMutationVariables>;

/**
 * __useSaveItemMutation__
 *
 * To run a mutation, you first call `useSaveItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveItemMutation, { data, loading, error }] = useSaveItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSaveItemMutation(baseOptions?: Apollo.MutationHookOptions<SaveItemMutation, SaveItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveItemMutation, SaveItemMutationVariables>(SaveItemDocument, options);
      }
export type SaveItemMutationHookResult = ReturnType<typeof useSaveItemMutation>;
export type SaveItemMutationResult = Apollo.MutationResult<SaveItemMutation>;
export type SaveItemMutationOptions = Apollo.BaseMutationOptions<SaveItemMutation, SaveItemMutationVariables>;
export const GetFeedDocument = gql`
    query getFeed {
  feed {
    ...feedView
  }
}
    ${FeedViewFragmentDoc}`;

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