package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedViewElement
import org.json.JSONObject
import javax.inject.Inject

fun interface FeedContainerElementFactory {
    fun create(element: JSONObject?): FeedViewElement?
}

class FeedContainerElementFactoryImpl @Inject constructor(
    private val feedHeadingFactory: FeedHeadingFactory,
    private val typographyContentFactory: TypographyContentFactory,
    private val feedItemFactory: FeedItemFactory
): FeedContainerElementFactory {
    override fun create(element: JSONObject?): FeedViewElement? {
        return when(element?.get("__typename")) {
            "FeedItem" -> feedItemFactory.create(element)
            "FeedHeading" -> feedHeadingFactory.create(element)
            "TypographyContent" -> typographyContentFactory.create(element)
            else -> null
        }
    }
}