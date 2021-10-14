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
  signal?: Maybe<Signal>;
  value?: Maybe<SignalValue>;
};

export type FavouriteAction = {
  __typename?: 'FavouriteAction';
  emitSignal?: Maybe<EmitSignal>;
  feedId: Scalars['String'];
};

export type FeedCaption = {
  __typename?: 'FeedCaption';
  text?: Maybe<Scalars['String']>;
};

export type FeedElement = ColumnLayout | FeedCaption | FeedImage;

export type FeedFavourite = Column & {
  __typename?: 'FeedFavourite';
  align: ColumnAlignment;
  icon: Scalars['String'];
  saveAction: FavouriteAction;
  signal?: Maybe<Signal>;
  unsaveAction: UnfavouriteAction;
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
  heading?: Maybe<TypographyHeading>;
};

export type FeedViewElement = FeedItem | TypographyContent;

export type Mutation = {
  __typename?: 'Mutation';
  save?: Maybe<MutationResponse>;
  unsave?: Maybe<MutationResponse>;
  updateHeading?: Maybe<MutationResponse>;
};


export type MutationSaveArgs = {
  feedId?: Maybe<Scalars['String']>;
};


export type MutationUnsaveArgs = {
  feedId?: Maybe<Scalars['String']>;
};


export type MutationUpdateHeadingArgs = {
  heading?: Maybe<Scalars['String']>;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  signals?: Maybe<Array<EmitSignal>>;
};

export type Paragraph = {
  __typename?: 'Paragraph';
  text?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  feed?: Maybe<FeedView>;
};

export enum Signal {
  Error = 'ERROR',
  Favourite = 'FAVOURITE',
  Title = 'TITLE'
}

export type SignalStringValue = {
  __typename?: 'SignalStringValue';
  text?: Maybe<Scalars['String']>;
};

export type SignalValue = SignalStringValue;

export type TypographyContent = {
  __typename?: 'TypographyContent';
  paragraph?: Maybe<Array<Maybe<Paragraph>>>;
};

export type TypographyHeading = {
  __typename?: 'TypographyHeading';
  signal?: Maybe<Signal>;
  text?: Maybe<Scalars['String']>;
};

export type UnfavouriteAction = {
  __typename?: 'UnfavouriteAction';
  emitSignal?: Maybe<EmitSignal>;
  feedId: Scalars['String'];
};

export type FeedViewFragment = { __typename?: 'FeedView', heading?: Maybe<{ __typename?: 'TypographyHeading', text?: Maybe<string>, signal?: Maybe<Signal> }>, elements?: Maybe<Array<Maybe<{ __typename?: 'FeedItem', items?: Maybe<Array<Maybe<{ __typename?: 'ColumnLayout', columns?: Maybe<Array<Maybe<{ __typename?: 'FeedFavourite', align: ColumnAlignment, icon: string, signal?: Maybe<Signal>, saveAction: { __typename?: 'FavouriteAction', feedId: string, emitSignal?: Maybe<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }> }, unsaveAction: { __typename?: 'UnfavouriteAction', feedId: string, emitSignal?: Maybe<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }> } } | { __typename?: 'FeedFavouriteCount', align: ColumnAlignment, count: string, signal?: Maybe<Signal> }>>> } | { __typename?: 'FeedCaption', text?: Maybe<string> } | { __typename?: 'FeedImage', src: string, alt?: Maybe<string> }>>> } | { __typename?: 'TypographyContent', paragraph?: Maybe<Array<Maybe<{ __typename?: 'Paragraph', text?: Maybe<string> }>>> }>>> };

export type FeedItemFragment = { __typename?: 'FeedItem', items?: Maybe<Array<Maybe<{ __typename?: 'ColumnLayout', columns?: Maybe<Array<Maybe<{ __typename?: 'FeedFavourite', align: ColumnAlignment, icon: string, signal?: Maybe<Signal>, saveAction: { __typename?: 'FavouriteAction', feedId: string, emitSignal?: Maybe<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }> }, unsaveAction: { __typename?: 'UnfavouriteAction', feedId: string, emitSignal?: Maybe<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }> } } | { __typename?: 'FeedFavouriteCount', align: ColumnAlignment, count: string, signal?: Maybe<Signal> }>>> } | { __typename?: 'FeedCaption', text?: Maybe<string> } | { __typename?: 'FeedImage', src: string, alt?: Maybe<string> }>>> };

export type ColumnLayoutFragment = { __typename?: 'ColumnLayout', columns?: Maybe<Array<Maybe<{ __typename?: 'FeedFavourite', align: ColumnAlignment, icon: string, signal?: Maybe<Signal>, saveAction: { __typename?: 'FavouriteAction', feedId: string, emitSignal?: Maybe<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }> }, unsaveAction: { __typename?: 'UnfavouriteAction', feedId: string, emitSignal?: Maybe<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }> } } | { __typename?: 'FeedFavouriteCount', align: ColumnAlignment, count: string, signal?: Maybe<Signal> }>>> };

export type FeedFavouriteFragment = { __typename?: 'FeedFavourite', icon: string, signal?: Maybe<Signal>, saveAction: { __typename?: 'FavouriteAction', feedId: string, emitSignal?: Maybe<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }> }, unsaveAction: { __typename?: 'UnfavouriteAction', feedId: string, emitSignal?: Maybe<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }> } };

export type FeedFavouriteCountFragment = { __typename?: 'FeedFavouriteCount', count: string, signal?: Maybe<Signal> };

export type FavouriteActionFragment = { __typename?: 'FavouriteAction', feedId: string, emitSignal?: Maybe<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }> };

export type UnfavouriteActionFragment = { __typename?: 'UnfavouriteAction', feedId: string, emitSignal?: Maybe<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }> };

export type EmitSignalFragment = { __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> };

export type SignalStringValueFragment = { __typename?: 'SignalStringValue', text?: Maybe<string> };

export type FeedCaptionFragment = { __typename?: 'FeedCaption', text?: Maybe<string> };

export type FeedImageFragment = { __typename?: 'FeedImage', src: string, alt?: Maybe<string> };

export type TypographyContentFragment = { __typename?: 'TypographyContent', paragraph?: Maybe<Array<Maybe<{ __typename?: 'Paragraph', text?: Maybe<string> }>>> };

export type ParagraphFragment = { __typename?: 'Paragraph', text?: Maybe<string> };

export type SaveItemMutationVariables = Exact<{
  feedId?: Maybe<Scalars['String']>;
}>;


export type SaveItemMutation = { __typename?: 'Mutation', save?: Maybe<{ __typename?: 'MutationResponse', signals?: Maybe<Array<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }>> }> };

export type UnsaveItemMutationVariables = Exact<{
  feedId?: Maybe<Scalars['String']>;
}>;


export type UnsaveItemMutation = { __typename?: 'Mutation', unsave?: Maybe<{ __typename?: 'MutationResponse', signals?: Maybe<Array<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }>> }> };

export type UpdateHeadingMutationVariables = Exact<{
  heading?: Maybe<Scalars['String']>;
}>;


export type UpdateHeadingMutation = { __typename?: 'Mutation', updateHeading?: Maybe<{ __typename?: 'MutationResponse', signals?: Maybe<Array<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }>> }> };

export type GetFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeedQuery = { __typename?: 'Query', feed?: Maybe<{ __typename?: 'FeedView', heading?: Maybe<{ __typename?: 'TypographyHeading', text?: Maybe<string>, signal?: Maybe<Signal> }>, elements?: Maybe<Array<Maybe<{ __typename?: 'FeedItem', items?: Maybe<Array<Maybe<{ __typename?: 'ColumnLayout', columns?: Maybe<Array<Maybe<{ __typename?: 'FeedFavourite', align: ColumnAlignment, icon: string, signal?: Maybe<Signal>, saveAction: { __typename?: 'FavouriteAction', feedId: string, emitSignal?: Maybe<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }> }, unsaveAction: { __typename?: 'UnfavouriteAction', feedId: string, emitSignal?: Maybe<{ __typename?: 'EmitSignal', signal?: Maybe<Signal>, value?: Maybe<{ __typename?: 'SignalStringValue', text?: Maybe<string> }> }> } } | { __typename?: 'FeedFavouriteCount', align: ColumnAlignment, count: string, signal?: Maybe<Signal> }>>> } | { __typename?: 'FeedCaption', text?: Maybe<string> } | { __typename?: 'FeedImage', src: string, alt?: Maybe<string> }>>> } | { __typename?: 'TypographyContent', paragraph?: Maybe<Array<Maybe<{ __typename?: 'Paragraph', text?: Maybe<string> }>>> }>>> }> };

export const SignalStringValueFragmentDoc = gql`
    fragment signalStringValue on SignalStringValue {
  text
}
    `;
export const EmitSignalFragmentDoc = gql`
    fragment emitSignal on EmitSignal {
  signal
  value {
    ...signalStringValue
  }
}
    ${SignalStringValueFragmentDoc}`;
export const FavouriteActionFragmentDoc = gql`
    fragment favouriteAction on FavouriteAction {
  feedId
  emitSignal {
    ...emitSignal
  }
}
    ${EmitSignalFragmentDoc}`;
export const UnfavouriteActionFragmentDoc = gql`
    fragment unfavouriteAction on UnfavouriteAction {
  feedId
  emitSignal {
    ...emitSignal
  }
}
    ${EmitSignalFragmentDoc}`;
export const FeedFavouriteFragmentDoc = gql`
    fragment feedFavourite on FeedFavourite {
  icon
  signal
  saveAction {
    ...favouriteAction
  }
  unsaveAction {
    ...unfavouriteAction
  }
}
    ${FavouriteActionFragmentDoc}
${UnfavouriteActionFragmentDoc}`;
export const FeedFavouriteCountFragmentDoc = gql`
    fragment feedFavouriteCount on FeedFavouriteCount {
  count
  signal
}
    `;
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
  heading {
    text
    signal
  }
  elements {
    ...feedItem
    ...typographyContent
  }
}
    ${FeedItemFragmentDoc}
${TypographyContentFragmentDoc}`;
export const SaveItemDocument = gql`
    mutation saveItem($feedId: String) {
  save(feedId: $feedId) {
    signals {
      ...emitSignal
    }
  }
}
    ${EmitSignalFragmentDoc}`;
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
 *      feedId: // value for 'feedId'
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
export const UnsaveItemDocument = gql`
    mutation unsaveItem($feedId: String) {
  unsave(feedId: $feedId) {
    signals {
      ...emitSignal
    }
  }
}
    ${EmitSignalFragmentDoc}`;
export type UnsaveItemMutationFn = Apollo.MutationFunction<UnsaveItemMutation, UnsaveItemMutationVariables>;

/**
 * __useUnsaveItemMutation__
 *
 * To run a mutation, you first call `useUnsaveItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsaveItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsaveItemMutation, { data, loading, error }] = useUnsaveItemMutation({
 *   variables: {
 *      feedId: // value for 'feedId'
 *   },
 * });
 */
export function useUnsaveItemMutation(baseOptions?: Apollo.MutationHookOptions<UnsaveItemMutation, UnsaveItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsaveItemMutation, UnsaveItemMutationVariables>(UnsaveItemDocument, options);
      }
export type UnsaveItemMutationHookResult = ReturnType<typeof useUnsaveItemMutation>;
export type UnsaveItemMutationResult = Apollo.MutationResult<UnsaveItemMutation>;
export type UnsaveItemMutationOptions = Apollo.BaseMutationOptions<UnsaveItemMutation, UnsaveItemMutationVariables>;
export const UpdateHeadingDocument = gql`
    mutation updateHeading($heading: String) {
  updateHeading(heading: $heading) {
    signals {
      ...emitSignal
    }
  }
}
    ${EmitSignalFragmentDoc}`;
export type UpdateHeadingMutationFn = Apollo.MutationFunction<UpdateHeadingMutation, UpdateHeadingMutationVariables>;

/**
 * __useUpdateHeadingMutation__
 *
 * To run a mutation, you first call `useUpdateHeadingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHeadingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHeadingMutation, { data, loading, error }] = useUpdateHeadingMutation({
 *   variables: {
 *      heading: // value for 'heading'
 *   },
 * });
 */
export function useUpdateHeadingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHeadingMutation, UpdateHeadingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHeadingMutation, UpdateHeadingMutationVariables>(UpdateHeadingDocument, options);
      }
export type UpdateHeadingMutationHookResult = ReturnType<typeof useUpdateHeadingMutation>;
export type UpdateHeadingMutationResult = Apollo.MutationResult<UpdateHeadingMutation>;
export type UpdateHeadingMutationOptions = Apollo.BaseMutationOptions<UpdateHeadingMutation, UpdateHeadingMutationVariables>;
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