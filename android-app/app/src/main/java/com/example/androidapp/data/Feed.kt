package com.example.androidapp.data

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.TypeConverters
import com.example.androidapp.models.FeedResponse

@Entity(tableName = "feed_table")
@TypeConverters(FeedTypeConverter::class)
data class Feed(
    @PrimaryKey(autoGenerate = true)
    val id: Int,
    val feedView: FeedResponse
)
