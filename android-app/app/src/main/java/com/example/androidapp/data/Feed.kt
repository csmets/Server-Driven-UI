package com.example.androidapp.data

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.example.androidapp.models.FeedResponse

@Entity
data class Feed(
    @PrimaryKey(autoGenerate = true)
    val feedView: FeedResponse
)
