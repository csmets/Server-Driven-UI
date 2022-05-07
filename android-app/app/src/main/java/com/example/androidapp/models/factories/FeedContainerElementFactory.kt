package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedViewElement
import fragment.FeedContainer
import fragment.FeedHeading
import javax.inject.Inject

fun interface FeedContainerElementFactory {
    fun create(element: FeedContainer.Element?): FeedViewElement?
}

class FeedContainerElementFactoryImpl @Inject constructor(
    private val feedHeadingFactory: FeedHeadingFactory,
    private val typographyContentFactory: TypographyContentFactory,
    private val feedItemFactory: FeedItemFactory
): FeedContainerElementFactory {
    override fun create(element: FeedContainer.Element?): FeedViewElement? {
        val feedItem = element?.fragments?.feedItem
        val typographyContent = element?.fragments?.typographyContent
        val feedHeading = element?.fragments?.feedHeading

        return when {
            feedHeading != null -> feedHeadingFactory.create(feedHeading)
            typographyContent != null -> typographyContentFactory.create(typographyContent)
            feedItem != null -> feedItemFactory.create(feedItem)
            else -> null
        }
    }
}