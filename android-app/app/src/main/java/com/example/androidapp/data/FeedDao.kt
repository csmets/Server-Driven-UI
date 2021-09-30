package com.example.androidapp.data

import androidx.lifecycle.LiveData
import androidx.room.*

@Dao
interface FeedDao {

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun addGFeed(feed: Feed)

    @Query("SELECT * FROM feed_table")
    fun readAllData(): LiveData<Feed>

    @Delete
    suspend fun deleteFeed(feed: Feed)
}