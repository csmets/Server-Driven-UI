package com.example.androidapp.data.hackernews

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.TypeConverters
import com.example.androidapp.data.ViewTypeConverter
import com.example.androidapp.models.ViewResponse

@Entity(tableName = "hacker_news")
@TypeConverters(ViewTypeConverter::class)
data class HackerNews(
    @PrimaryKey(autoGenerate = true)
    val id: Int,
    val view: ViewResponse
)