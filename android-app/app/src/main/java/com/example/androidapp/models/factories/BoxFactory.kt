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
        return ContainerElement.Box(
            width = box.optInt("width"),
            height = box.optInt("height"),
            _debugColor = adaptDebugColor(box.optString("_debugColor"))
        )
    }

    private fun adaptDebugColor(color: String): BoxColor? {
        return when (color) {
            "PRIMARY" -> BoxColor.PRIMARY
            "SECONDARY" -> BoxColor.SECONDARY
            "ERROR" -> BoxColor.ERROR
            "WARNING" -> BoxColor.WARNING
            "INFO" -> BoxColor.INFO
            "SUCCESS" -> BoxColor.SUCCESS
            else -> null
        }
    }
}