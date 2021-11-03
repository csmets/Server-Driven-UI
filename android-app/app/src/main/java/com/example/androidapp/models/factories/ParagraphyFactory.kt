package com.example.androidapp.models.factories

import com.example.androidapp.models.Paragraph
import fragment.TypographyContent

fun interface ParagraphyFactory {
    fun create(paragraph: TypographyContent.Paragraph?): Paragraph?
}

val paragraphFactory = ParagraphyFactory {
    val paragraph = it?.fragments?.paragraph?.value

    when {
        paragraph != null -> return@ParagraphyFactory Paragraph(paragraph)
    }

    return@ParagraphyFactory null
}