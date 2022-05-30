package com.example.androidapp.models.factories

import com.example.androidapp.models.Paragraph
import org.json.JSONObject
import javax.inject.Inject

fun interface ParagraphFactory {
    fun create(paragraph: JSONObject?): Paragraph?
}

class ParagraphFactoryImpl @Inject constructor(): ParagraphFactory {
    override fun create(paragraph: JSONObject?): Paragraph? {
        val text = paragraph?.getString("value")

        when {
            text != null -> return Paragraph(text)
        }

        return null
    }
}