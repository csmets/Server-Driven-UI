package com.example.androidapp.components.feed

import android.content.Context
import android.util.Log
import androidx.lifecycle.*
import com.example.androidapp.TEMPLATE_ENDPOINT
import com.example.androidapp.data.Feed
import com.example.androidapp.data.FeedDatabase
import com.example.androidapp.data.FeedRepo
import com.example.androidapp.models.factories.FeedResponseFactory
import com.example.androidapp.services.MessageListener
import com.example.androidapp.services.WebSocketManager
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.launch
import org.json.JSONArray
import javax.inject.Inject

@HiltViewModel
class FeedViewModel @Inject constructor(
    @ApplicationContext context: Context,
    private val feedResponseFactory: FeedResponseFactory
): ViewModel(), MessageListener {

    private val _feed = MutableLiveData<Feed>()
    val feed: LiveData<Feed> = _feed

    private val repo: FeedRepo

    init {
        val feedDao = FeedDatabase.getDatabase(context).feedDao()
        repo = FeedRepo(feedDao)
        _feed.value = repo.readAllData.value
        val ws = WebSocketManager
        ws.init(TEMPLATE_ENDPOINT, this)
        ws.connect()
    }

    override fun onConnectSuccess() {
        Log.d("INFO", "Connected to template service web socket")
    }

    override fun onConnectFailed() {
        Log.e("ERROR", "Failed to connect to template service web socket")
    }

    override fun onClose() {
        Log.d("INFO", "Connection to template service has closed")
    }

    override fun onMessage(text: String?) {
        if (text != null) {
            val json = JSONArray(text)
            if (json.length() > 0) {
                val feed = json.getJSONObject(0).getJSONObject("data").getJSONArray("elements")
                val feedResponse = Feed(0, feedResponseFactory.create(feed))
                _feed.postValue(feedResponse)

                viewModelScope.launch {
                    repo.deleteFeed()
                    repo.addFeed(feedResponse)
                }
            }
        }
    }
}