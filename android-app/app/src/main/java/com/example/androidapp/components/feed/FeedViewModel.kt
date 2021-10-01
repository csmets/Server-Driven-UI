package com.example.androidapp.components.feed

import android.content.Context
import androidx.lifecycle.*
import com.example.androidapp.data.Feed
import com.example.androidapp.data.FeedDatabase
import com.example.androidapp.data.FeedRepo
import com.example.androidapp.services.RemoteDataSource
import kotlinx.coroutines.launch

class FeedViewModel(context: Context): ViewModel() {

    private val _feed = MutableLiveData<Feed>()
    val feed: LiveData<Feed> = _feed

    private val repo: FeedRepo

    init {
        val feedDao = FeedDatabase.getDatabase(context).feedDao()
        repo = FeedRepo(feedDao)
        _feed.value = repo.readAllData.value
        getResponse()
    }

    private fun getResponse() {
        viewModelScope.launch {
            val response = RemoteDataSource().getFeed()
            if (response != null) {
                val feedResponse = Feed(0, response)
                _feed.value = feedResponse
                repo.deleteFeed()
                repo.addFeed(feedResponse)
            }
        }
    }
}