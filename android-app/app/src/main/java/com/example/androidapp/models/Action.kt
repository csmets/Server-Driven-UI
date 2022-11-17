package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
sealed class Action {

    @Serializable
    data class URLAction(
        val url: String,
        val description: String?
    ) : Action()

    @Serializable
    data class FavouriteAction(
        val feedId: String,
        val save: List<EmitSignal>?,
        val unsave: List<EmitSignal>?
    ) : Action()
}
