package main

import (
	appContext "context"

	"net/http"

	"github.com/gin-gonic/gin"

	graphql "github.com/hasura/go-graphql-client"
)

type queryTemplateElements struct {
	Type string `json:"type"`
}

type queryTemplate struct {
	Name     string                  `json:"name"`
	Elements []queryTemplateElements `json:"elements"`
}

type pageTemplate struct {
	Queries []queryTemplate `json:"queries"`
}

var feedTemplate = []pageTemplate{
	{Queries: []queryTemplate{
		{Name: "feed", Elements: []queryTemplateElements{
			{Type: "heading"},
			{Type: "typography"},
			{Type: "feed"},
		}},
	}},
}

func getFeedTemplate(context *gin.Context) {
	context.IndentedJSON(http.StatusOK, feedTemplate)
}

func makeServiceCall(context *gin.Context) {
	client := graphql.NewClient("http://localhost:4000/graphql", nil)

	client.Query(appContext.Background(), &feedQuery, nil)

	context.IndentedJSON(http.StatusOK, feedQuery)
}

func main() {
	router := gin.Default()
	router.GET("/feed", getFeedTemplate)
	router.GET("/getFeed", makeServiceCall)
	router.Run("localhost:9090")
}
