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
    data class ColumnLayout(val columns: List<Column>): FeedElement()
}

@Serializable
data class FeedFavouriteCount(
    override val align: ColumnAlignment,
    val count: String,
    val signal: Signal?
): Column

@Serializable
data class FeedFavourite(
    override val align: ColumnAlignment,
    val icon: String,
    val action: FavouriteAction
): Column

@Serializable
data class FavouriteAction(
    val feedId: String,
    val signal: Signal?
)
