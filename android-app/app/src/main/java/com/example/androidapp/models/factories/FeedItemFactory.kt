package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedElement
import com.example.androidapp.models.FeedViewElement
import fragment.FeedItem
import javax.inject.Inject

fun interface FeedItemFactory {
    fun create(feedItem: FeedItem): FeedViewElement.FeedItem
}

class FeedItemFactoryImpl @Inject constructor(
    private val columnLayoutFactory: ColumnLayoutFactory
): FeedItemFactory {
    override fun create(feedItem: FeedItem): FeedViewElement.FeedItem {
        val items = feedItem.items?.map { item ->
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

        return FeedViewElement.FeedItem(items = items)
    }
}