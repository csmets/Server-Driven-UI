package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedResponse
import fragment.FeedContainer
import javax.inject.Inject

fun interface FeedResponseFactory {
    fun create(elements: FeedContainer): FeedResponse?
}

class FeedResponseFactoryImpl @Inject constructor(
    private val feedContainerElementFactory: FeedContainerElementFactory
): FeedResponseFactory {
    override fun create(elements: FeedContainer): FeedResponse? {
        val containerElements = elements.elements?.mapNotNull { item ->
            feedContainerElementFactory.create(item)
        }

        return if (containerElements != null) {
            FeedResponse(containerElements)
        } else {
            null
        }
    }
}