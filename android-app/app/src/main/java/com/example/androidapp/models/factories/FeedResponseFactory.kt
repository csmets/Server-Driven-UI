package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedResponse
import fragment.FeedView

fun interface FeedResponseFactory {
    fun create(elements: FeedView): FeedResponse?
}

val feedResponseFactory = FeedResponseFactory {
    val elements = it.elements?.map { item ->
        feedViewElementFactory.create(item)
    }
    return@FeedResponseFactory if (elements != null) {
        FeedResponse(elements)
    } else {
        null
    }
}