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

fun Image.toContainerImage(): ContainerElement.ContainerImage {
    return ContainerElement.ContainerImage(
        url = this.url,
        alt = this.alt,
        width = this.width,
        height = this.height,
        valueType = this.valueType
    )
}

fun ContainerElement.ContainerImage.toImage(): Image {
    return Image(
        url = this.url,
        alt = this.alt,
        width = this.width,
        height = this.height,
        valueType = this.valueType
    )
}