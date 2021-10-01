package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedElement
import com.example.androidapp.models.FeedViewElement
import fragment.FeedItem

fun interface FeedItemFactory {
    fun create(feedItem: FeedItem): FeedViewElement.FeedItem
}

val feedItemFactory = FeedItemFactory {
    val items = it.items?.map { item ->
        val image = item?.fragments?.feedImage
        val caption = item?.fragments?.feedCaption
        val column = item?.fragments?.columnLayout

        return@map when {
            image != null -> FeedElement.FeedImage(image.src, image.alt)
            caption != null -> FeedElement.FeedCaption(caption.text)
            column != null -> columnLayoutFactory.create(column)
            else -> null
        }
    }?.filterNotNull()

    return@FeedItemFactory FeedViewElement.FeedItem(items = items)
}