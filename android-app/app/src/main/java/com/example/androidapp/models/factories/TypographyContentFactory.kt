package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedViewElement
import fragment.TypographyContent

fun interface TypographyContentFactory {
    fun create(typographyContent: TypographyContent): FeedViewElement.TypographyContent?
}

val typographyContentFactory = TypographyContentFactory {
    val paragraphs = it.paragraph?.mapNotNull { paragraphs ->
        paragraphFactory.create(paragraphs)
    }

    if (paragraphs != null) {
        return@TypographyContentFactory FeedViewElement.TypographyContent(paragraphs)
    }

    return@TypographyContentFactory null
}