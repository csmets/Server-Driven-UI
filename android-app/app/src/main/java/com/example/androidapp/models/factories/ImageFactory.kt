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
        return Image(
            url = image.getString("url"),
            alt = image.getString("alt"),
            width = image.optInt("width"),
            height = image.optInt("height"),
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