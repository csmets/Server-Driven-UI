package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
data class HackerNewsResponse(
    val elements: List<ViewElement>
)

@Serializable
sealed class ViewElement {

    @Serializable
    data class Container(
        val elements: List<ContainerElement>
    ): ViewElement()
}

@Serializable
sealed class ContainerElement {

    @Serializable
    data class Card(
        val primary: String,
        val secondaries: List<String>?,
        val action: Action?
    ) : ContainerElement()

    @Serializable
    data class Heading(
        val value: String,
        val headingType: HeadingType
    ) : ContainerElement()
}

@Serializable
enum class HeadingType {
    H1,
    H2,
    H3
}

@Serializable
sealed class Action {

    @Serializable
    data class URLAction(
        val url: String,
        val description: String?
    ) : Action()
}