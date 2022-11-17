package com.example.androidapp.models.factories

import com.example.androidapp.models.ContainerElement
import com.example.androidapp.models.ViewElement
import org.json.JSONObject
import javax.inject.Inject

fun interface ContainerFactory {
    fun create(container: JSONObject): ViewElement.Container
}

class ContainerFactoryImpl @Inject constructor(
    private val cardFactory: CardFactory,
    private val typographyFactory: TypographyFactory,
    private val boxFactory: BoxFactory,
    private val buttonFactory: ButtonFactory
): ContainerFactory {
    override fun create(container: JSONObject): ViewElement.Container {
        val elements = container.getJSONArray("elements")
        val containerElements: MutableList<ContainerElement> = mutableListOf()

        var index = 0
        while (index < elements.length()) {
            val el = elements.getJSONObject(index)

            when(el.getString("__typename")) {
                "Card" -> cardFactory.create(el)?.let {
                    containerElements.add(it)
                }
                "Typography" -> containerElements.add(typographyFactory.create(el))
                "Box" -> containerElements.add(boxFactory.create(el))
                "Button" -> buttonFactory.create(el).toContainerButton()
                    ?.let { containerElements.add(it) }
            }

            index++
        }

        return ViewElement.Container(elements = containerElements)
    }
}