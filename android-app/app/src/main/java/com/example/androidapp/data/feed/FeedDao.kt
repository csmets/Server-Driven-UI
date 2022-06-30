package com.example.androidapp.data.feed

import androidx.lifecycle.LiveData
import androidx.room.*

@Dao
interface FeedDao {

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun addFeed(feed: Feed)

    @Query("SELECT * FROM feed_table")
    fun readData(): LiveData<Feed>

    @Query("DELETE FROM feed_table")
    suspend fun deleteFeed()
}