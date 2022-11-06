package com.example.androidapp.models.factories

import com.example.androidapp.models.BoxColor
import com.example.androidapp.models.ContainerElement
import org.json.JSONObject
import javax.inject.Inject

fun interface BoxFactory {
    fun create(box: JSONObject): ContainerElement.Box
}

class BoxFactoryImpl @Inject constructor(): BoxFactory {
    override fun create(box: JSONObject): ContainerElement.Box {
        val isWidthNull = box.isNull("width")
        val isHeightNull = box.isNull("height")
        val hasDebugColor = box.isNull("_debugColor")

        return ContainerElement.Box(
            width = if (!isWidthNull) box.getInt("width") else 0,
            height = if (!isHeightNull) box.getInt("height") else 0,
            _debugColor = if (!hasDebugColor) adaptDebugColor(box.getString("_debugColor")) else null
        )
    }

    private fun adaptDebugColor(color: String): BoxColor {
        return when (color) {
            "PRIMARY" -> BoxColor.PRIMARY
            "SECONDARY" -> BoxColor.SECONDARY
            "ERROR" -> BoxColor.ERROR
            "WARNING" -> BoxColor.WARNING
            "INFO" -> BoxColor.INFO
            "SUCCESS" -> BoxColor.SUCCESS
            else -> BoxColor.PRIMARY
        }
    }
}