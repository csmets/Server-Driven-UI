package com.example.androidapp.models.factories

import com.example.androidapp.models.Paragraph
import fragment.TypographyContent
import javax.inject.Inject

fun interface ParagraphFactory {
    fun create(paragraph: TypographyContent.Paragraph?): Paragraph?
}

class ParagraphFactoryImpl @Inject constructor(): ParagraphFactory {
    override fun create(paragraph: TypographyContent.Paragraph?): Paragraph? {
        val text = paragraph?.fragments?.paragraph?.value

        when {
            text != null -> return Paragraph(text)
        }

        return null
    }
}