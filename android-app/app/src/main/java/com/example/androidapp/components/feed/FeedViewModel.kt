package com.example.androidapp.components.feed

import android.content.Context
import android.util.Log
import androidx.lifecycle.*
import com.example.androidapp.config.FEED_TEMPLATE_ENDPOINT
import com.example.androidapp.data.feed.Feed
import com.example.androidapp.data.feed.FeedDatabase
import com.example.androidapp.data.feed.FeedRepo
import com.example.androidapp.models.factories.ViewElementFactory
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
    private val viewElementFactory: ViewElementFactory
): ViewModel(), MessageListener {

    private val _feed = MutableLiveData<Feed>()
    val feed: LiveData<Feed> = _feed

    private val repo: FeedRepo

    init {
        val feedDao = FeedDatabase.getDatabase(context).feedDao()
        repo = FeedRepo(feedDao)
        _feed.value = repo.readAllData.value
        val ws = WebSocketManager
        ws.init(FEED_TEMPLATE_ENDPOINT, this)
        ws.connect()
    }

    override fun onConnectSuccess() {
        Log.d("INFO", "Connected to feed template service web socket")
    }

    override fun onConnectFailed() {
        Log.e("ERROR", "Failed to connect to feed template service web socket")
    }

    override fun onClose() {
        Log.d("INFO", "Connection to feed template service has closed")
    }

    override fun onMessage(text: String?) {
        if (text != null) {
            val json = JSONArray(text)
            if (json.length() > 0) {
                val feed = json.getJSONObject(0).getJSONObject("data")
                val feedResponse = Feed(0, viewElementFactory.create(feed))
                _feed.postValue(feedResponse)

                viewModelScope.launch {
                    repo.deleteFeed()
                    repo.addFeed(feedResponse)
                }
            }
        }
    }
}