package main

/*
   query {
       feed {
           ...feedContainerFragment
       }
   }
*/
var feedQuery struct {
	Feed struct {
		FeedContainerFragment `graphql:"... on FeedContainer" json:",omitempty"`
	} `json:"feed"`
}
