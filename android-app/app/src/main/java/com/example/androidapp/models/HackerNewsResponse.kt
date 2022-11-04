package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
data class HackerNewsResponse(
    val elements: List<ViewElement>
)
