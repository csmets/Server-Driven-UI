package com.example.androidapp.data

import androidx.room.TypeConverter
import com.example.androidapp.models.ViewResponse
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

object ViewTypeConverter {

    @TypeConverter
    @JvmStatic
    fun fromJson(json: String): ViewResponse? {
        return try {
            Json.decodeFromString(json)
        } catch (e: Exception) {
            null
        }
    }

    @TypeConverter
    @JvmStatic
    fun toJson(viewResponse: ViewResponse): String {
        return Json.encodeToString(viewResponse)
    }
}