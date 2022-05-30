package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedElement
import com.example.androidapp.models.FeedViewElement
import org.json.JSONObject
import javax.inject.Inject

fun interface FeedItemFactory {
    fun create(feedItem: JSONObject): FeedViewElement.FeedItem
}

class FeedItemFactoryImpl @Inject constructor(
    private val columnLayoutFactory: ColumnLayoutFactory
): FeedItemFactory {
    override fun create(feedItem: JSONObject): FeedViewElement.FeedItem {
        val itemsData = feedItem.getJSONArray("items")
        var index = 0
        val items = mutableListOf<FeedElement>()

        while (index < itemsData.length()) {
            val item = itemsData.getJSONObject(index)

            when(item.getString("__typename")) {
                "FeedImage" -> items.add(
                    FeedElement.FeedImage(
                        item.getString("src"),
                        item.getString("alt")
                    )
                )
                "FeedCaption" -> items.add(FeedElement.FeedCaption(item.getString("text")))
                "ColumnLayout" -> columnLayoutFactory.create(item)?.let { items.add(it) }
            }
            index++
        }

        return FeedViewElement.FeedItem(items = items)
    }
}