package com.example.androidapp.services

import android.content.Context
import androidx.lifecycle.LiveData
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.coroutines.toDeferred
import com.apollographql.apollo.exception.ApolloException
import com.example.androidapp.GRAPHQL_ENDPOINT
import com.example.androidapp.data.Feed
import com.example.androidapp.data.FeedDatabase
import com.example.androidapp.data.FeedRepo
import com.example.androidapp.models.FeedResponse
import com.example.androidapp.models.factories.feedResponseFactory
import com.example.sduigeneratetypes.GetFeedQuery

class RemoteDataSource(context: Context) {

    val readAllData: LiveData<Feed>
    private val repo: FeedRepo

    init {
        val feedDao = FeedDatabase.getDatabase(context).feedDao()
        repo = FeedRepo(feedDao)
        readAllData = feedDao.readAllData()
    }

    suspend fun getFeed(): FeedResponse? {
        val apolloClient = ApolloClient.builder()
            .serverUrl(GRAPHQL_ENDPOINT)
            .build()

        val response = try {
            apolloClient.query(GetFeedQuery()).toDeferred().await()
        } catch (e: ApolloException) {
            // handle protocol errors
            return null
        }

        val feed = response.data?.feed
        if (feed == null || response.hasErrors()) {
            // handle application errors
            return null
        }



        return feedResponseFactory.create(feed.fragments.feedView)
    }
}