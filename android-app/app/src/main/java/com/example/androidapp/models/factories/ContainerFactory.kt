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
    private val paragraphFactory: ParagraphFactory,
    private val headingFactory: HeadingFactory
): ContainerFactory {
    override fun create(container: JSONObject): ViewElement.Container {
        val elements = container.getJSONArray("elements")
        val containerElements: MutableList<ContainerElement> = mutableListOf()

        var index = 0
        while (index < elements.length()) {
            val el = elements.getJSONObject(index)
            val typename = el.getString("__typename")

            when(typename) {
                "Card" -> cardFactory.create(el)?.let {
                    containerElements.add(it)
                }
                "Paragraph" -> paragraphFactory.create(el)?.let { containerElements.add(it) }
                "Heading" -> containerElements.add(headingFactory.create(el))
            }

            index++
        }

        return ViewElement.Container(elements = containerElements)
    }
}