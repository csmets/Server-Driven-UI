package com.example.androidapp.data.hackernews

import androidx.room.TypeConverter
import com.example.androidapp.models.HackerNewsResponse
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

object HackerNewsTypeConverter {

    @TypeConverter
    @JvmStatic
    fun fromJson(json: String): HackerNewsResponse? {
        return try {
            Json.decodeFromString(json)
        } catch (e: Exception) {
            null
        }
    }

    @TypeConverter
    @JvmStatic
    fun toJson(viewResponse: HackerNewsResponse): String {
        return Json.encodeToString(viewResponse)
    }
}