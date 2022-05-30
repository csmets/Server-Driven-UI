package com.example.androidapp.models

import kotlinx.serialization.Serializable

enum class FeedColumnAlignment {
    LEFT,
    RIGHT,
    CENTER
}

@Serializable
sealed class FeedColumn {

    @Serializable
    data class FeedFavouriteCount(
        val align: FeedColumnAlignment,
        val count: String,
        val signal: Signal?
    ): FeedColumn()

    @Serializable
    data class FeedFavourite(
        val align: FeedColumnAlignment,
        val icon: String,
        val action: FavouriteAction,
        val signal: Signal?
    ): FeedColumn()
}