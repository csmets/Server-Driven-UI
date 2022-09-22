export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Action = EditNameSubmitAction | UrlAction;

export type Box = {
  __typename?: 'Box';
  _debugColor?: Maybe<Color>;
  height?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type Button = {
  __typename?: 'Button';
  action?: Maybe<Action>;
  buttonSize: ButtonSize;
  buttonTheme: ButtonTheme;
  buttonVariant: ButtonVariant;
  disableElevation: Scalars['Boolean'];
  disabled: Scalars['Boolean'];
  label: Scalars['String'];
};

export enum ButtonSize {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL'
}

export enum ButtonTheme {
  Error = 'ERROR',
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY',
  Success = 'SUCCESS'
}

export enum ButtonVariant {
  Contained = 'CONTAINED',
  Outlined = 'OUTLINED',
  Text = 'TEXT'
}

export type Card = {
  __typename?: 'Card';
  action?: Maybe<Action>;
  content?: Maybe<Array<Scalars['String']>>;
  links?: Maybe<Array<Button>>;
  media?: Maybe<Image>;
  primary: Scalars['String'];
  secondaries?: Maybe<Array<Scalars['String']>>;
};

export enum Color {
  Error = 'ERROR',
  Info = 'INFO',
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY',
  Success = 'SUCCESS',
  Warning = 'WARNING'
}

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

/**
 * Container is used for holding many different elements.
 * It can hold typography items like headings, and body text, but
 * also can hold UI elements like a card or a carousel.
 */
export type Container = {
  __typename?: 'Container';
  containerType: ContainerType;
  elements?: Maybe<Array<ContainerElement>>;
};

/** Place all composable elements into this union for the container. */
export type ContainerElement = Box | Button | Card | Typography;

export enum ContainerType {
  Column = 'COLUMN',
  Fill = 'FILL',
  Row = 'ROW'
}

export type EditNameContainer = {
  __typename?: 'EditNameContainer';
  elements?: Maybe<Array<FormElement>>;
};

export type EditNameSubmitAction = {
  __typename?: 'EditNameSubmitAction';
  emitSignal: EmitSignal;
  inputIds: Array<Scalars['String']>;
};

export type EmitSignal = {
  __typename?: 'EmitSignal';
  signal?: Maybe<Signal>;
  values: Array<SignalValuePair>;
};

export type EmitSignals = {
  emitSignals?: Maybe<Array<EmitSignal>>;
};

export type Error = {
  __typename?: 'Error';
  message?: Maybe<Scalars['String']>;
};

export type FavouriteAction = {
  __typename?: 'FavouriteAction';
  feedId: Scalars['String'];
  save?: Maybe<Array<EmitSignal>>;
  unsave?: Maybe<Array<EmitSignal>>;
};

export type FeedCaption = {
  __typename?: 'FeedCaption';
  text?: Maybe<Scalars['String']>;
};

export type FeedContainer = {
  __typename?: 'FeedContainer';
  elements?: Maybe<Array<Maybe<FeedViewElement>>>;
};

export type FeedElement = ColumnLayout | FeedCaption | FeedImage;

export type FeedFavourite = Column & {
  __typename?: 'FeedFavourite';
  action: FavouriteAction;
  align: ColumnAlignment;
  icon: Scalars['String'];
  id: Scalars['String'];
  signal?: Maybe<Signal>;
};

export type FeedFavouriteCount = Column & {
  __typename?: 'FeedFavouriteCount';
  align: ColumnAlignment;
  count: Scalars['String'];
  id: Scalars['String'];
  signal?: Maybe<Signal>;
};

export type FeedHeading = {
  __typename?: 'FeedHeading';
  id: Scalars['String'];
  primary?: Maybe<Scalars['String']>;
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

export type FeedViewElement = FeedHeading | FeedItem | TypographyContent;

export type FormElement = Button | TextInput;

export type FormInput = {
  key: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type HackerNewsView = {
  __typename?: 'HackerNewsView';
  elements: Array<ViewElement>;
};

export type Image = {
  __typename?: 'Image';
  alt: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  url: Scalars['String'];
  valueType?: Maybe<ImageValueType>;
  width?: Maybe<Scalars['Int']>;
};

export enum ImageValueType {
  Percentage = 'PERCENTAGE',
  Pixel = 'PIXEL'
}

export type KitchenSinkView = {
  __typename?: 'KitchenSinkView';
  elements: Array<ViewElement>;
};

export type Mutation = {
  __typename?: 'Mutation';
  save?: Maybe<MutationResponse>;
  updateHeading?: Maybe<MutationResponse>;
};


export type MutationSaveArgs = {
  feedId: Scalars['String'];
};


export type MutationUpdateHeadingArgs = {
  formInputs?: InputMaybe<Array<FormInput>>;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Error>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Paragraph = {
  __typename?: 'Paragraph';
  value?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  editName?: Maybe<EditNameContainer>;
  feed?: Maybe<FeedContainer>;
  hackerNewsTopStories?: Maybe<HackerNewsView>;
  kitchenSink?: Maybe<KitchenSinkView>;
};

export type Signal = {
  __typename?: 'Signal';
  reference?: Maybe<Scalars['String']>;
  type: SignalType;
};

export type SignalInput = {
  reference?: InputMaybe<Scalars['String']>;
  type: SignalType;
};

export enum SignalType {
  Error = 'ERROR',
  Favourite = 'FAVOURITE',
  FavouriteCount = 'FAVOURITE_COUNT',
  Title = 'TITLE',
  Toggle = 'TOGGLE'
}

export type SignalValuePair = {
  __typename?: 'SignalValuePair';
  key: SignalValuePairKey;
  value: Scalars['String'];
};

export enum SignalValuePairKey {
  Count = 'COUNT',
  Icon = 'ICON',
  Primary = 'PRIMARY'
}

export type TextInput = {
  __typename?: 'TextInput';
  formId: Scalars['String'];
  placeholder?: Maybe<Scalars['String']>;
};

export type Typography = {
  __typename?: 'Typography';
  typographyTheme: TypographyTheme;
  typographyVariant: TypographyVariant;
  value: Scalars['String'];
};

export type TypographyContent = {
  __typename?: 'TypographyContent';
  paragraph?: Maybe<Array<Maybe<Paragraph>>>;
};

export enum TypographyTheme {
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY'
}

export enum TypographyVariant {
  Body1 = 'BODY1',
  Body2 = 'BODY2',
  Caption = 'CAPTION',
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  H5 = 'H5',
  H6 = 'H6',
  Overline = 'OVERLINE',
  Subtitle1 = 'SUBTITLE1',
  Subtitle2 = 'SUBTITLE2'
}

export type UrlAction = {
  __typename?: 'URLAction';
  description?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type ViewElement = Container;
