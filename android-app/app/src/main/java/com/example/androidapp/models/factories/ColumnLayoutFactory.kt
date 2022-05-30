package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedColumn
import com.example.androidapp.models.FeedColumnAlignment
import com.example.androidapp.models.FeedElement
import org.json.JSONObject
import javax.inject.Inject

fun interface ColumnLayoutFactory {
    fun create(columnLayout: JSONObject): FeedElement.FeedColumnLayout?
}

class ColumnLayoutFactoryImpl @Inject constructor(
    private val feedFavouriteFactory: FeedFavouriteFactory,
    private val signalFactory: SignalFactory
): ColumnLayoutFactory {

    override fun create(columnLayout: JSONObject): FeedElement.FeedColumnLayout? {
        val feedColumnsData = columnLayout.getJSONArray("columns") ?: return null
        val feedColumns = mutableListOf<FeedColumn>()
        var index = 0

        while (index < feedColumnsData.length()) {
            val columnItem = feedColumnsData.getJSONObject(index)
            val alignment = when (columnItem.getString("align")) {
                "LEFT" -> FeedColumnAlignment.LEFT
                "CENTER" -> FeedColumnAlignment.CENTER
                "RIGHT" -> FeedColumnAlignment.RIGHT
                else -> FeedColumnAlignment.LEFT
            }

            when (columnItem.getString("__typename")) {
                "FeedFavourite" -> {
                    feedColumns.add(feedFavouriteFactory.create(columnItem, alignment))
                }
                "FeedFavouriteCount" -> {
                    feedColumns.add(
                        FeedColumn.FeedFavouriteCount(
                            alignment,
                            columnItem.getString("count"),
                            signalFactory.create(columnItem.getJSONObject("signal"))
                        )
                    )
                }
            }
            index++
        }

        return FeedElement.FeedColumnLayout(feedColumns)
    }
}