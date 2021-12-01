package com.example.androidapp.models

import kotlinx.serialization.Serializable

enum class ColumnAlignment {
    LEFT,
    RIGHT,
    CENTER
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
        val signal: Signal?,
        val save: FavouriteAction,
        val unsave: FavouriteAction
    ): Column()
}