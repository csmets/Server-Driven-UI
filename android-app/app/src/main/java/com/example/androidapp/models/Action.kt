package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
sealed class Action {

    @Serializable
    data class URLAction(
        val url: String,
        val description: String?
    ) : Action()
}
