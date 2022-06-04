package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedResponse
import com.example.androidapp.models.FeedViewElement
import org.json.JSONArray
import javax.inject.Inject

fun interface FeedResponseFactory {
    fun create(elements: JSONArray): FeedResponse
}

class FeedResponseFactoryImpl @Inject constructor(
    private val feedContainerElementFactory: FeedContainerElementFactory
): FeedResponseFactory {
    override fun create(elements: JSONArray): FeedResponse {
        var index = 0
        val containerElements: MutableList<FeedViewElement> = mutableListOf()

        while (index < elements.length()) {
            val containerElement = feedContainerElementFactory.create(elements.getJSONObject(index))
            if (containerElement != null) {
                containerElements.add(containerElement)
            }
            index++
        }

        return FeedResponse(containerElements)
    }
}