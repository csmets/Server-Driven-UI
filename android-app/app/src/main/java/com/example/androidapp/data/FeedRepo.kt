package com.example.androidapp.data

import androidx.lifecycle.LiveData

class FeedRepo(private val feedDao: FeedDao) {

    val readAllData: LiveData<Feed> = feedDao.readAllData()

    suspend fun addFeed(feed: Feed) {
        feedDao.addGFeed(feed)
    }

    suspend fun deleteFeed(feed: Feed) {
        feedDao.deleteFeed(feed)
    }
}