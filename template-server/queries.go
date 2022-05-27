package main

import "sdui/template-server/components"

var feedQuery struct {
	Feed struct {
		components.FeedContainer `graphql:"... on FeedContainer" json:",omitempty"`
	} `json:"feed"`
}
