package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedViewElement
import fragment.FeedView

fun interface FeedViewElementFactory {
    fun create(element: FeedView.Element?): FeedViewElement?
}

val feedViewElementFactory = FeedViewElementFactory {
    val feedItem = it?.fragments?.feedItem
    val typographyContent = it?.fragments?.typographyContent

    return@FeedViewElementFactory when {
        typographyContent != null -> typographyContentFactory.create(typographyContent)
        feedItem != null -> feedItemFactory.create(feedItem)
        else -> null
    }
}