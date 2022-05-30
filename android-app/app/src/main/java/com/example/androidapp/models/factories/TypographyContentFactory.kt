package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedViewElement
import com.example.androidapp.models.Paragraph
import org.json.JSONObject
import javax.inject.Inject

fun interface TypographyContentFactory {
    fun create(typographyContent: JSONObject?): FeedViewElement.TypographyContent?
}

class TypographyContentFactoryImpl @Inject constructor(
    private val paragraphFactory: ParagraphFactory
): TypographyContentFactory {
    override fun create(typographyContent: JSONObject?): FeedViewElement.TypographyContent? {
        val paragraphs = typographyContent?.getJSONArray("paragraph") ?: return null
        val paragraphItems = mutableListOf<Paragraph>()

        val numOfParagraphs = paragraphs.length()
        var index = 0

        while (index < numOfParagraphs) {
            paragraphFactory.create(paragraphs.getJSONObject(index))?.let { paragraphItems.add(it) }
            index++
        }

        if (paragraphItems.isNotEmpty()) {
            return FeedViewElement.TypographyContent(paragraphItems)
        }

        return null
    }
}