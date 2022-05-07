package com.example.androidapp.models

import kotlinx.serialization.Serializable

enum class ColumnAlignment {
    LEFT,
    RIGHT,
    CENTER
}

fun type.ColumnAlignment?.map(): ColumnAlignment {
    return when (this?.name) {
        "CENTER" -> ColumnAlignment.CENTER
        "LEFT" -> ColumnAlignment.LEFT
        "RIGHT" -> ColumnAlignment.RIGHT
        else -> ColumnAlignment.LEFT
    }
}

@Serializable
sealed class Column {

    @Serializable
    data class FeedFavouriteCount(
        val align: ColumnAlignment,
        val count: String,
        val signal: Signal?
    ): Column()

    @Serializable
    data class FeedFavourite(
        val align: ColumnAlignment,
        val icon: String,
        val action: FavouriteAction,
        val signal: Signal?
    ): Column()
}