package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
data class Image(
    val url: String,
    val alt: String,
    val width: Int?,
    val height: Int?,
    val valueType: ImageValueType?
)

@Serializable
enum class ImageValueType {
    PIXEL,
    PERCENTAGE
}