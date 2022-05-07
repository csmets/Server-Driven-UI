package com.example.androidapp.models.factories

import com.example.androidapp.models.Column
import com.example.androidapp.models.FeedElement
import com.example.androidapp.models.map
import fragment.ColumnLayout
import javax.inject.Inject

fun interface ColumnLayoutFactory {
    fun create(columnLayout: ColumnLayout): FeedElement.ColumnLayout?
}

class ColumnLayoutFactoryImpl @Inject constructor(
    private val feedFavouriteFactory: FeedFavouriteFactory,
    private val signalFactory: SignalFactory
): ColumnLayoutFactory {

    override fun create(columnLayout: ColumnLayout): FeedElement.ColumnLayout? {
        val columns = columnLayout.columns?.map { column ->
            val feedFavourite = column?.fragments?.feedFavourite
            val feedFavouriteCount = column?.fragments?.feedFavouriteCount
            val align = column?.align.map()

            return@map when {
                feedFavourite != null -> feedFavouriteFactory.create(feedFavourite, align)
                feedFavouriteCount != null -> Column.FeedFavouriteCount(
                    align,
                    feedFavouriteCount.count,
                    signalFactory.create(feedFavouriteCount.signal?.fragments?.signal)
                )
                else -> null
            }
        }?.filterNotNull() ?: return null

        return FeedElement.ColumnLayout(columns)
    }
}