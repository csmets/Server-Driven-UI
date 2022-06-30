package com.example.androidapp.data.hackernews

import androidx.lifecycle.LiveData

class HackerNewsRepo(private val hackerNewsDao: HackerNewsDao) {

    val readAllData: LiveData<HackerNews> = hackerNewsDao.readData()

    suspend fun addHackerNews(hackerNews: HackerNews) {
        hackerNewsDao.addHackerNews(hackerNews)
    }

    suspend fun deleteHackerNews() {
        hackerNewsDao.deleteHackerNews()
    }
}