package main

import graphql "github.com/hasura/go-graphql-client"

type (
	/*
	   fragment feedContainerFragment on FeedContainer {
	       elements {
	           ...feedHeadingFragment
	           ...typographyFragment
	           ...feedItemFragment
	       }
	   }
	*/
	FeedContainerFragment struct {
		Elements []struct {
			FeedHeadingFragment       `graphql:"... on FeedHeading"`
			TypographyContentFragment `graphql:"... on TypographyContent"`
			FeedItemFragment          `graphql:"... on FeedItem"`
		} `json:"elements,omitempty"`
	}

	/*
	   fragment feedHeadingFragment on FeedHeading {
	       __typename
	       id
	       primary
	       signal {
	           ...signalFragment
	       }
	   }
	*/
	FeedHeadingFragment struct {
		Typename graphql.String `graphql:"__typename" json:"__typename,omitempty"`
		ID       graphql.String `graphql:"id" json:"id,omitempty"`
		Primary  graphql.String `json:"primary,omitempty"`
		Signal   *struct {
			SignalFragment `graphql:"... on Signal"`
		} `json:"signal,omitempty"`
	}

	/*
	   fragment signalFragment on Signal {
	       type
	       reference
	   }
	*/
	SignalFragment struct {
		Type      graphql.String `json:"type,omitempty"`
		Reference graphql.String `json:"reference,omitempty"`
	}

	/*
	   fragment typographyContentFragment on TypographyContent {
	       paragraph {
	           ...paragraphFragment
	       }
	   }
	*/
	TypographyContentFragment struct {
		Paragraph []struct {
			ParagraphFragment `graphql:"... on Paragraph" json:",omitempty"`
		} `json:"paragraph,omitempty"`
	}

	/*
	   fragment paragraphFragment on Paragraph {
	       value
	   }
	*/
	ParagraphFragment struct {
		Value graphql.String `json:"value"`
	}

	/*
	   fragment feedItemFragment on FeedItem {
	       items {
	           ...columnLayoutFragment
	           ...feedCaptionFragment
	           ...feedImageFragment
	       }
	   }
	*/
	FeedItemFragment struct {
		Items []struct {
			Typename             graphql.String `graphql:"__typename"`
			ColumnLayoutFragment `graphql:"... on ColumnLayout" json:",omitempty"`
			FeedCaptionFragment  `graphql:"... on FeedCaption"`
			FeedImageFragment    `graphql:"... on FeedImage"`
		} `json:"items,omitempty"`
	}

	/*
	   fragment columnLayoutFragment on ColumnLayout {
	       columns {
	           align
	           ...feedFavouriteFragment
	           ...feedFavouriteCount
	       }
	   }
	*/
	ColumnLayoutFragment struct {
		Columns []struct {
			Align                      graphql.String `json:"align,omitempty"`
			FeedFavouriteFragment      `graphql:"... on FeedFavourite" json:",omitempty"`
			FeedFavouriteCountFragment `graphql:"... on FeedFavouriteCount" json:",omitempty"`
		} `json:"columns,omitempty"`
	}

	/*
	   fragment feedfavouriteFragment on FeedFavourite {
	       id
	       icon
	       signal {
	           ...signalFragment
	       }
	       action {
	           ...favouriteActionFragment
	       }
	   }
	*/
	FeedFavouriteFragment struct {
		ID     graphql.String `graphql:"id" json:"id,omitempty"`
		Icon   graphql.String `json:"icon,omitempty"`
		Signal *struct {
			SignalFragment `graphql:"... on Signal"`
		} `json:"signal,omitempty"`
		Action *struct {
			FavouriteActionFragment `graphql:"... on FavouriteAction"`
		} `json:"action,omitempty"`
	}

	/*
	   fragment FavouriteActionFragment on FavouriteAction {
	       feedId
	       save {
	           ...emitSignalFragment
	       }
	       unsave {
	           ...emitSignalFragment
	       }
	   }
	*/
	FavouriteActionFragment struct {
		FeedId graphql.String `json:"feedId,omitempty"`
		Save   *struct {
			EmitSignalFragment `graphql:"... on EmitSignal"`
		} `json:"save,omitempty"`
		Unsave *struct {
			EmitSignalFragment `graphql:"... on EmitSignal"`
		} `json:"unsave,omitempty"`
	}

	/*
	   fragment emitSignalFragment on EmitSignal {
	       signal {
	           ...signalFragment
	       }
	       values {
	           ...signalValuePairFragment
	       }
	   }
	*/
	EmitSignalFragment struct {
		Signal *struct {
			SignalFragment `graphql:"... on Signal"`
		} `json:"signal,omitempty"`
		Values *struct {
			SignalValuePairFragment `graphql:"... on SignalValuePair"`
		} `json:"values,omitempty"`
	}

	/*
	   fragment signalValuePairFragment on SignalValuePair {
	       key
	       value
	   }
	*/
	SignalValuePairFragment struct {
		Key   graphql.String `json:"key,omitempty"`
		Value graphql.String `json:"value,omitempty"`
	}

	/*
	   fragment feedCaptionFragment on FeedCaption {
	       text
	   }
	*/
	FeedCaptionFragment struct {
		Text graphql.String `json:"text,omitempty"`
	}

	/*
	   fragment feedFavouriteCountFragment on FeedFavouriteCount {
	       id
	       count
	       signal {
	           ...signalFragment
	       }
	   }
	*/
	FeedFavouriteCountFragment struct {
		ID     graphql.String `graphql:"id" json:"id,omitempty"`
		Count  graphql.String `json:",omitempty"`
		Signal *struct {
			SignalFragment `graphql:"... on Signal"`
		} `json:"signal,omitempty"`
	}

	/*
	   fragment feedImageFragment on FeedImage {
	       src
	       alt
	   }
	*/
	FeedImageFragment struct {
		Src graphql.String `json:"src,omitempty"`
		Alt graphql.String `json:"alt,omitempty"`
	}
)
