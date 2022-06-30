package com.example.androidapp.models.factories

import com.example.androidapp.models.HackerNewsResponse
import com.example.androidapp.models.ViewElement
import org.json.JSONArray
import org.json.JSONObject
import javax.inject.Inject

fun interface HackerNewsResponseFactory {
    fun create(response: JSONObject): HackerNewsResponse
}

class HackerNewsResponseFactoryImpl @Inject constructor(
    private val containerFactory: ContainerFactory
): HackerNewsResponseFactory {
    override fun create(response: JSONObject): HackerNewsResponse {
        val elements = response.getJSONArray("elements")
        val viewElements: MutableList<ViewElement> = mutableListOf()

        var index = 0
        while (index < elements.length()) {
            val el = elements.getJSONObject(index)
            if (el.getString("__typename") == "Container") {
                viewElements.add(containerFactory.create(el))
            }
            index++
        }

        return HackerNewsResponse(elements = viewElements)
    }
}