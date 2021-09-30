package com.example.androidapp.models.factories

import com.example.androidapp.models.*
import fragment.ColumnLayout

fun interface ColumnLayoutFactory {
    fun create(columnLayout: ColumnLayout): FeedElement.ColumnLayout?
}

val columnLayoutFactory = ColumnLayoutFactory {
    val columns = it.columns?.map { column ->
        val feedFavourite = column?.fragments?.feedFavourite
        val feedFavouriteCount = column?.fragments?.feedFavouriteCount
        val align = mapColumnAlignment(column?.align)

        return@map when {
            feedFavourite != null -> feedFavouriteFactory.create(feedFavourite, align)
            feedFavouriteCount != null -> FeedFavouriteCount(
                align,
                feedFavouriteCount.count,
                signalFactory.create(feedFavouriteCount.signal?.fragments?.signal)
            )
            else -> null
        }
    }?.filterNotNull() ?: return@ColumnLayoutFactory null

    return@ColumnLayoutFactory FeedElement.ColumnLayout(columns)
}

fun mapColumnAlignment(align: type.ColumnAlignment?): ColumnAlignment {
    return when (align?.name) {
        "CENTER" -> ColumnAlignment.CENTER
        "LEFT" -> ColumnAlignment.LEFT
        "RIGHT" -> ColumnAlignment.RIGHT
        else -> ColumnAlignment.LEFT
    }
}