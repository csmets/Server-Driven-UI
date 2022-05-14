package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedColumn
import com.example.androidapp.models.FeedElement
import com.example.androidapp.models.map
import fragment.ColumnLayout
import javax.inject.Inject

fun interface ColumnLayoutFactory {
    fun create(columnLayout: ColumnLayout): FeedElement.FeedColumnLayout?
}

class ColumnLayoutFactoryImpl @Inject constructor(
    private val feedFavouriteFactory: FeedFavouriteFactory,
    private val signalFactory: SignalFactory
): ColumnLayoutFactory {

    override fun create(columnLayout: ColumnLayout): FeedElement.FeedColumnLayout? {
        val feedColumns = columnLayout.columns?.map { column ->
            val feedFavourite = column?.fragments?.feedFavourite
            val feedFavouriteCount = column?.fragments?.feedFavouriteCount
            val align = column?.align.map()

            return@map when {
                feedFavourite != null -> feedFavouriteFactory.create(feedFavourite, align)
                feedFavouriteCount != null -> FeedColumn.FeedFavouriteCount(
                    align,
                    feedFavouriteCount.count,
                    signalFactory.create(feedFavouriteCount.signal?.fragments?.signal)
                )
                else -> null
            }
        }?.filterNotNull() ?: return null

        return FeedElement.FeedColumnLayout(feedColumns)
    }
}