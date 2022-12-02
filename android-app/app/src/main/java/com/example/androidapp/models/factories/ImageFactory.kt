package com.example.androidapp.models.factories

import com.example.androidapp.models.Image
import com.example.androidapp.models.ImageValueType
import org.json.JSONObject
import javax.inject.Inject

fun interface ImageFactory {
    fun create(image: JSONObject): Image
}

class ImageFactoryImpl @Inject constructor(): ImageFactory {
    override fun create(image: JSONObject): Image {
        val hasValueType = !image.isNull("valueType")
        val hasHeight = image.has("height")
        val hasWidth = image.has("width")
        return Image(
            url = image.getString("url"),
            alt = image.getString("alt"),
            width = if (hasWidth) image.getInt("width") else null,
            height = if (hasHeight) image.getInt("height") else null,
            valueType = if (hasValueType) adaptImageValueType(image.getString("valueType")) else null
        )
    }

    private fun adaptImageValueType(type: String): ImageValueType {
        return when (type) {
            "PIXEL" -> ImageValueType.PIXEL
            "PERCENTAGE" -> ImageValueType.PERCENTAGE
            else -> ImageValueType.PIXEL
        }
    }
}