package com.example.androidapp.components.hackernews

import android.content.Context
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.androidapp.config.HACKER_NEWS_TEMPLATE_ENDPOINT
import com.example.androidapp.data.hackernews.HackerNews
import com.example.androidapp.data.hackernews.HackerNewsDatabase
import com.example.androidapp.data.hackernews.HackerNewsRepo
import com.example.androidapp.models.factories.ViewElementFactory
import com.example.androidapp.services.MessageListener
import com.example.androidapp.services.WebSocketManager
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.launch
import org.json.JSONArray
import javax.inject.Inject

@HiltViewModel
class HackerNewsViewModel @Inject constructor(
    @ApplicationContext context: Context,
    private val viewElementFactory: ViewElementFactory
): ViewModel(), MessageListener {

    private val _hackerNews = MutableLiveData<HackerNews>()
    val hackerNews: LiveData<HackerNews> = _hackerNews

    private val repo: HackerNewsRepo

    init {
        val hnDao = HackerNewsDatabase.getDatabase(context).hackerNewsDao()
        repo = HackerNewsRepo(hnDao)
        _hackerNews.value = repo.readAllData.value
        val ws = WebSocketManager
        ws.init(HACKER_NEWS_TEMPLATE_ENDPOINT, this)
        ws.connect()
    }

    override fun onMessage(text: String?) {
        text?.let {
            val json = JSONArray(it)
            if (json.length() > 0) {
                val hnData = json
                    .getJSONObject(0)
                    .getJSONObject("data")
                    .getJSONObject("hackerNewsTopStories")
                val hnResponse = HackerNews(0, viewElementFactory.create(hnData))
                _hackerNews.postValue(hnResponse)

                viewModelScope.launch {
                    repo.deleteHackerNews()
                    repo.addHackerNews(hnResponse)
                }
            }
        }
    }

    override fun onConnectSuccess() {
        Log.d("INFO", "Connected to hacker news template service web socket")
    }

    override fun onConnectFailed() {
        Log.e("ERROR", "Failed to connect to hacker news template service web socket")
    }

    override fun onClose() {
        Log.d("INFO", "Connection to hacker news template service has closed")
    }
}