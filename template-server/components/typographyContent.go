package components

import graphql "github.com/hasura/go-graphql-client"

type TypographyContent struct {
	Paragraph []struct {
		Typename graphql.String `graphql:"__typename" json:"__typename,omitempty"`
		Value    graphql.String `json:"value,omitempty"`
	} `json:"paragraph,omitempty"`
}
