package com.example.androidapp.services

import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.exception.ApolloException
import com.example.androidapp.GRAPHQL_ENDPOINT
import com.example.androidapp.models.FeedResponse
import com.example.androidapp.models.factories.FeedResponseFactory
import com.example.sduigeneratetypes.graphql.GetFeedQuery
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flowOn
import javax.inject.Inject

interface RemoteDataSource {
    suspend fun getFeed(): FeedResponse?
}

class RemoteDataSourceImpl @Inject constructor(
    private val feedResponseFactory: FeedResponseFactory
): RemoteDataSource {

    override suspend fun getFeed(): FeedResponse? {
        val apolloClient = ApolloClient.builder()
            .serverUrl(GRAPHQL_ENDPOINT)
            .build()

        val response = try {
            apolloClient.query(GetFeedQuery()).toFlow().flowOn(Dispatchers.IO).first()
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