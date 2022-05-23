package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
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

func main() {
	router := gin.Default()
	router.GET("/feed", getFeedTemplate)
	router.Run("localhost:9090")
}
