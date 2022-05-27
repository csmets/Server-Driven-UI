package components

import graphql "github.com/hasura/go-graphql-client"

type (
	FeedHeading struct {
		Typename graphql.String `graphql:"__typename" json:"__typename,omitempty"`
		ID       graphql.String `graphql:"id" json:"id,omitempty"`
		Primary  graphql.String `json:"primary,omitempty"`
		Signal   *struct {
			Typename  graphql.String `graphql:"__typename" json:"__typename,omitempty"`
			Type      graphql.String `json:"type,omitempty"`
			Reference graphql.String `json:"reference,omitempty"`
		} `json:"signal,omitempty"`
	}
)
