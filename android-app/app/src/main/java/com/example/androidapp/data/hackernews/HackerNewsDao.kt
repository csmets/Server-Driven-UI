package com.example.androidapp.data.hackernews

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query

@Dao
interface HackerNewsDao {

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun addHackerNews(hackerNews: HackerNews)

    @Query("SELECT * FROM hacker_news")
    fun readData(): LiveData<HackerNews>

    @Query("DELETE FROM hacker_news")
    suspend fun deleteHackerNews()
}