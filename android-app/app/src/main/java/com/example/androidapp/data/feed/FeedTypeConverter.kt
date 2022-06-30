package com.example.androidapp.data.feed

import androidx.room.TypeConverter
import com.example.androidapp.models.FeedResponse
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

object FeedTypeConverter {

    @TypeConverter
    @JvmStatic
    fun fromJson(json: String): FeedResponse? {
        return try {
            Json.decodeFromString(json)
        } catch (e: Exception) {
            null
        }
    }

    @TypeConverter
    @JvmStatic
    fun toJson(feedResponse: FeedResponse): String {
        return Json.encodeToString(feedResponse)
    }
}
