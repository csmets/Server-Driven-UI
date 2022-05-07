package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedViewElement
import fragment.TypographyContent
import javax.inject.Inject

fun interface TypographyContentFactory {
    fun create(typographyContent: TypographyContent): FeedViewElement.TypographyContent?
}

class TypographyContentFactoryImpl @Inject constructor(
    private val paragraphFactory: ParagraphFactory
): TypographyContentFactory {
    override fun create(typographyContent: TypographyContent): FeedViewElement.TypographyContent? {
        val paragraphs = typographyContent.paragraph?.mapNotNull { paragraphs ->
            paragraphFactory.create(paragraphs)
        }

        if (paragraphs != null) {
            return FeedViewElement.TypographyContent(paragraphs)
        }

        return null
    }
}