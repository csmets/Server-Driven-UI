package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
data class ViewResponse(
    val elements: List<ViewElement>
)
