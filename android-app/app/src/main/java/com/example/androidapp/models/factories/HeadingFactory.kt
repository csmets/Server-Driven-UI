package com.example.androidapp.models.factories

import com.example.androidapp.models.ContainerElement
import com.example.androidapp.models.HeadingType
import org.json.JSONObject
import javax.inject.Inject

fun interface HeadingFactory {
    fun create(heading: JSONObject): ContainerElement.Heading
}

class HeadingFactoryImpl @Inject constructor(): HeadingFactory {
    override fun create(heading: JSONObject): ContainerElement.Heading {
        val text = heading.getString("value")
        val type = adaptHeadingType(heading.getString("type"))

        return ContainerElement.Heading(
            value = text,
            headingType = type
        )
    }

    private fun adaptHeadingType(type: String): HeadingType {
        return when(type) {
            "H1" -> HeadingType.H1
            "H2" -> HeadingType.H2
            "H3" -> HeadingType.H3
            else -> HeadingType.H1
        }
    }
}