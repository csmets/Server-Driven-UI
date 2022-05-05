package com.example.androidapp.services

import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.coroutines.await
import com.apollographql.apollo.exception.ApolloException
import com.example.androidapp.GRAPHQL_ENDPOINT
import com.example.androidapp.models.FeedResponse
import com.example.androidapp.models.factories.feedResponseFactory
import com.example.sduigeneratetypes.graphql.GetFeedQuery

class RemoteDataSource {

    suspend fun getFeed(): FeedResponse? {
        val apolloClient = ApolloClient.builder()
            .serverUrl(GRAPHQL_ENDPOINT)
            .build()

        val response = try {
            apolloClient.query(GetFeedQuery()).await()
        } catch (e: ApolloException) {
            // handle protocol errors
            return null
        }

        val feed = response.data?.feed
        if (feed == null || response.hasErrors()) {
            // handle application errors
            return null
        }

        return feedResponseFactory.create(feed.fragments.feedContainer)
    }
}