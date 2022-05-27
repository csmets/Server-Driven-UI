package components

import graphql "github.com/hasura/go-graphql-client"

type FeedContainer struct {
	Typename graphql.String `graphql:"__typename" json:"__typename,omitempty"`
	Elements []struct {
		FeedHeading       `graphql:"... on FeedHeading" json:",omitempty"`
		FeedItem          `graphql:"... on FeedItem" json:",omitempty"`
		TypographyContent `graphql:"... on TypographyContent" json:",omitempty"`
	}
}
