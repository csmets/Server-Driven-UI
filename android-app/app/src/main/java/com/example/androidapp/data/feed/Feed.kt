package com.example.androidapp.data.feed

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.TypeConverters
import com.example.androidapp.data.ViewTypeConverter
import com.example.androidapp.models.ViewResponse

@Entity(tableName = "feed_table")
@TypeConverters(ViewTypeConverter::class)
data class Feed(
    @PrimaryKey(autoGenerate = true)
    val id: Int,
    val feedView: ViewResponse
)
