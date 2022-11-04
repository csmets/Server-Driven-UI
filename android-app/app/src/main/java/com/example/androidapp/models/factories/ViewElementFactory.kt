package com.example.androidapp.models.factories

import com.example.androidapp.models.ViewResponse
import com.example.androidapp.models.ViewElement
import org.json.JSONObject
import javax.inject.Inject

fun interface ViewElementFactory {
    fun create(response: JSONObject): ViewResponse
}

class ViewElementFactoryImpl @Inject constructor(
    private val containerFactory: ContainerFactory
): ViewElementFactory {
    override fun create(response: JSONObject): ViewResponse {
        val elements = response.getJSONArray("elements")
        val viewElements: MutableList<ViewElement> = mutableListOf()

        var index = 0
        while (index < elements.length()) {
            val el = elements.getJSONObject(index)
            if (el.getString("__typename") == "Container") {
                viewElements.add(containerFactory.create(el))
            }
            index++
        }

        return ViewResponse(elements = viewElements)
    }
}