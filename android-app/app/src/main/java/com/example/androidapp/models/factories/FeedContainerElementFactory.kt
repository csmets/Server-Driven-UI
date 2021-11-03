package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedViewElement
import fragment.FeedContainer
import fragment.FeedHeading

fun interface FeedContainerElementFactory {
    fun create(element: FeedContainer.Element?): FeedViewElement?
}

val feedViewElementFactory = FeedContainerElementFactory {
    val feedItem = it?.fragments?.feedItem
    val typographyContent = it?.fragments?.typographyContent
    val feedHeading = it?.fragments?.feedHeading

    return@FeedContainerElementFactory when {
        feedHeading != null -> feedHeadingFactory.create(feedHeading)
        typographyContent != null -> typographyContentFactory.create(typographyContent)
        feedItem != null -> feedItemFactory.create(feedItem)
        else -> null
    }
}