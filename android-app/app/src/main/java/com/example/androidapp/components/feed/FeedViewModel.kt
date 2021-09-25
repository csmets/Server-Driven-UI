package com.example.androidapp.components.feed

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.coroutines.toDeferred
import com.apollographql.apollo.exception.ApolloException
import com.example.androidapp.GRAPHQL_ENDPOINT
import com.example.sduigeneratetypes.GetFeedQuery
import kotlinx.coroutines.launch

class FeedViewModel(): ViewModel() {

    fun getResponse() {
        val apolloClient = ApolloClient.builder()
            .serverUrl(GRAPHQL_ENDPOINT)
            .build()

        viewModelScope.launch {
            val response = try {
                apolloClient.query(GetFeedQuery()).toDeferred().await()
            } catch (e: ApolloException) {
                // handle protocol errors
                return@launch
            }

            val feed = response.data?.feed
            if (feed == null || response.hasErrors()) {
                // handle application errors
                return@launch
            }

            // launch now contains a typesafe model of your data
            println("Response data: ${feed}")
        }
    }
}