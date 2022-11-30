package com.example.androidapp.models.factories

import com.example.androidapp.models.Buttons
import com.example.androidapp.models.ContainerElement
import com.example.androidapp.util.JsonUtil.makeStringArray
import org.json.JSONArray
import org.json.JSONObject
import javax.inject.Inject

fun interface CardFactory {
    fun create(card: JSONObject): ContainerElement.Card?
}

class CardFactoryImpl @Inject constructor(
    private val actionFactory: ActionFactory,
    private val buttonFactory: ButtonFactory,
    private val imageFactory: ImageFactory,
    private val signalFactory: SignalFactory
): CardFactory {
    override fun create(card: JSONObject): ContainerElement.Card {
        return ContainerElement.Card(
            primary = card.getString("primary"),
            secondaries = card.optJSONArray("secondaries")?.let { getSecondaries(it) },
            action = card.optJSONObject("action")?.let { actionFactory.create(it) },
            links = card.optJSONArray("links")?.let { links ->
                val output: MutableList<Buttons> = emptyList<Buttons>().toMutableList()
                var index = 0
                while (index < links.length()) {
                    val link = links.getJSONObject(index)
                    val button = buttonFactory.create(links.optJSONObject(index))
                    val type = link.getString("__typename")
                    when(type) {
                        "FavouriteButton" -> button.toFavourite()?.let { output.add(it) }
                        "Button" -> button.toButton()?.let { output.add(it) }
                    }
                    index++
                }
                output
            },
            media = card.optJSONObject("media")?.let { imageFactory.create(it) },
            content = card.optJSONArray("content")?.let { makeStringArray(it) },
            signal = card.optJSONObject("signal")?.let { signalFactory.create(it) }
        )
    }

    private fun getSecondaries(secondaries: JSONArray): List<String> {
        val result: MutableList<String> = mutableListOf()
        var index = 0
        while (index < secondaries.length()) {
            result.add(secondaries.getString(index))
            index++
        }
        return result
    }
}