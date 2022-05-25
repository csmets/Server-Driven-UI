package main

import graphql "github.com/hasura/go-graphql-client"

type (
	/*
	   fragment feedContainerFragment on FeedContainer {
	       elements {
	           ...FeedHeadingFragment
	       }
	   }
	*/
	FeedContainerFragment struct {
		Elements []struct {
			FeedHeadingFragment       `graphql:"... on FeedHeading"`
			TypographyContentFragment `graphql:"... on TypographyContent"`
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
		} `json:",omitempty"`
	}

	/*
	   fragment paragraphFragment on Paragraph {
	       value
	   }
	*/
	ParagraphFragment struct {
		Value graphql.String `json:"value"`
	}
)
