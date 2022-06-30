package com.example.androidapp.models.factories

import com.example.androidapp.models.ContainerElement
import org.json.JSONArray
import org.json.JSONObject
import javax.inject.Inject

fun interface CardFactory {
    fun create(card: JSONObject): ContainerElement.Card?
}

class CardFactoryImpl @Inject constructor(
    private val actionFactory: ActionFactory
): CardFactory {
    override fun create(card: JSONObject): ContainerElement.Card {
        val hasAction = !card.isNull("action")
        return ContainerElement.Card(
            primary = card.getString("primary"),
            secondaries = getSecondaries(card.getJSONArray("secondaries")),
            action = if (hasAction) actionFactory.create(card.getJSONObject("action")) else null
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