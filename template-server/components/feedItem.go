package components

import graphql "github.com/hasura/go-graphql-client"

type FeedItem struct {
	Items []struct {
		ColumnLayout struct {
			Columns []struct {
				Align         graphql.String `json:"align,omitempty"`
				FeedFavourite struct {
					ID     graphql.String `graphql:"id" json:"id,omitempty"`
					Icon   graphql.String `json:"icon,omitempty"`
					Signal *struct {
						Type      graphql.String `json:"type,omitempty"`
						Reference graphql.String `json:"reference,omitempty"`
					} `json:"signal,omitempty"`
					Action struct {
						FeedId graphql.String `json:"feedId,omitempty"`
						Save   []struct {
							Signal *struct {
								Type      graphql.String `json:"type,omitempty"`
								Reference graphql.String `json:"reference,omitempty"`
							} `json:"signal,omitempty"`
							Values *struct {
								Key   graphql.String `json:"key,omitempty"`
								Value graphql.String `json:"value,omitempty"`
							} `json:"values,omitempty"`
						} `json:"save,omitempty"`
						Unsave []struct {
							Signal *struct {
								Type      graphql.String `json:"type,omitempty"`
								Reference graphql.String `json:"reference,omitempty"`
							} `json:"signal,omitempty"`
							Values *struct {
								Key   graphql.String `json:"key,omitempty"`
								Value graphql.String `json:"value,omitempty"`
							} `json:"values,omitempty"`
						} `json:"unsave"`
					} `json:"action,omitempty"`
				} `graphql:"... on FeedFavourite" json:",omitempty"`

				FeedFavouriteCount struct {
					ID     graphql.String `graphql:"id" json:"id,omitempty"`
					Count  graphql.String `json:",omitempty"`
					Signal *struct {
						Type      graphql.String `json:"type,omitempty"`
						Reference graphql.String `json:"reference,omitempty"`
					} `json:"signal,omitempty"`
				} `graphql:"... on FeedFavouriteCount" json:",omitempty"`
			} `json:"columns,omitempty"`
		} `graphql:"... on ColumnLayout"`

		FeedCaption struct {
			Typename graphql.String `graphql:"__typename" json:",omitempty"`
			Text     graphql.String `json:"text,omitempty"`
		} `graphql:"... on FeedCaption"`

		FeedImage struct {
			Typename graphql.String `graphql:"__typename" json:",omitempty"`
			Src      graphql.String `json:"src,omitempty"`
			Alt      graphql.String `json:"alt,omitempty"`
		} `graphql:"... on FeedImage"`
	} `json:"items,omitempty"`
}
