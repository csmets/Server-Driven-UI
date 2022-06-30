package com.example.androidapp.data.feed

import androidx.lifecycle.LiveData

class FeedRepo(private val feedDao: FeedDao) {

    val readAllData: LiveData<Feed> = feedDao.readData()

    suspend fun addFeed(feed: Feed) {
        feedDao.addFeed(feed)
    }

    suspend fun deleteFeed() {
        feedDao.deleteFeed()
    }
}