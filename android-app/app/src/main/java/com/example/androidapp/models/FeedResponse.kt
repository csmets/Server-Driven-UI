package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
data class FeedResponse(val elements: List<FeedViewElement>)

@Serializable
sealed class FeedViewElement {

    @Serializable
    data class FeedItem(val items: List<FeedElement>?): FeedViewElement()

    @Serializable
    data class TypographyContent(val paragraphs: List<Paragraph>): FeedViewElement()

    @Serializable
    data class FeedHeading(val primary: String, val signal: Signal?): FeedViewElement()
}

@Serializable
data class Paragraph(val text: String)

@Serializable
sealed class FeedElement {

    @Serializable
    data class FeedImage(val src: String?, val alt: String?): FeedElement()

    @Serializable
    data class FeedCaption(val text: String?): FeedElement()

    @Serializable
    data class FeedColumnLayout(val feedColumns: List<FeedColumn>): FeedElement()
}

@Serializable
data class FavouriteAction(
    val feedId: String,
    val save: List<EmitSignal>?,
    val unsave: List<EmitSignal>?
)
