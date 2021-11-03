package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedResponse
import fragment.FeedContainer

fun interface FeedResponseFactory {
    fun create(elements: FeedContainer): FeedResponse?
}

val feedResponseFactory = FeedResponseFactory {
    val elements = it.elements?.mapNotNull { item ->
        feedViewElementFactory.create(item)
    }

    return@FeedResponseFactory if (elements != null) {
        FeedResponse(elements)
    } else {
        null
    }
}