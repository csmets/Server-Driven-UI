package com.example.androidapp.models.factories

import com.example.androidapp.models.ContainerElement
import com.example.androidapp.models.TypographyVariant
import org.json.JSONObject
import javax.inject.Inject

fun interface TypographyFactory {
    fun create(heading: JSONObject): ContainerElement.Typography
}

class TypographyFactoryImpl @Inject constructor(): TypographyFactory {
    override fun create(heading: JSONObject): ContainerElement.Typography {
        val text = heading.getString("value")
        val type = adaptTypographyVariant(heading.getString("variant"))

        return ContainerElement.Typography(
            value = text,
            variant = type
        )
    }

    private fun adaptTypographyVariant(type: String): TypographyVariant {
        return when(type) {
            "H1" -> TypographyVariant.H1
            "H2" -> TypographyVariant.H2
            "H3" -> TypographyVariant.H3
            "H4" -> TypographyVariant.H4
            "H5" -> TypographyVariant.H5
            "H6" -> TypographyVariant.H6
            "BODY1" -> TypographyVariant.BODY1
            "BODY2" -> TypographyVariant.BODY2
            "SUBTITLE1" -> TypographyVariant.SUBTITLE1
            "SUBTITLE2" -> TypographyVariant.SUBTITLE2
            "CAPTION" -> TypographyVariant.CAPTION
            "OVERLINE" -> TypographyVariant.OVERLINE
            else -> TypographyVariant.BODY1
        }
    }
}