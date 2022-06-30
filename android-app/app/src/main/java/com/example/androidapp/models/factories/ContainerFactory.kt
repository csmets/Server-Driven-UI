package com.example.androidapp.models.factories

import com.example.androidapp.models.ContainerElement
import com.example.androidapp.models.ViewElement
import org.json.JSONObject
import javax.inject.Inject

fun interface ContainerFactory {
    fun create(container: JSONObject): ViewElement.Container
}

class ContainerFactoryImpl @Inject constructor(
    private val cardFactory: CardFactory
): ContainerFactory {
    override fun create(container: JSONObject): ViewElement.Container {
        val elements = container.getJSONArray("elements")
        val containerElements: MutableList<ContainerElement> = mutableListOf()

        var index = 0
        while (index < elements.length()) {
            val el = elements.getJSONObject(index)

            if (el.getString("__typename") == "Card") {
                cardFactory.create(el)?.let {
                    containerElements.add(it)
                }
            }

            index++
        }

        return ViewElement.Container(elements = containerElements)
    }
}