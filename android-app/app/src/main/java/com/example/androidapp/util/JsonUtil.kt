package com.example.androidapp.util

import org.json.JSONArray

object JsonUtil {
    fun makeStringArray(strings: JSONArray): List<String> {
        var index = 0
        val result = mutableListOf<String>()
        while (index < strings.length()) {
            result.add(strings.getString(index))
            index++
        }
        return result
    }
}
