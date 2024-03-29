package com.example.androidapp.models.factories

import com.example.androidapp.models.Action
import com.example.androidapp.models.EmitSignal
import org.json.JSONObject
import javax.inject.Inject

fun interface ActionFactory {
    fun create(action: JSONObject): Action?
}

class ActionFactoryImpl @Inject constructor(
    val emitSignalFactory: EmitSignalFactory
): ActionFactory {
    override fun create(action: JSONObject): Action? {
        val type = action.getString("__typename")

        return when(type) {
            "URLAction" -> {
                Action.URLAction(
                    url = action.getString("url"),
                    description = action.optString("description")
                )
            }
            "FavouriteAction" -> {
                val save = action.optJSONArray("save")?.let {
                    val saveSignals = mutableListOf<EmitSignal>()
                    var saveIndex = 0
                    while (saveIndex < it.length()) {
                        emitSignalFactory.create(it.getJSONObject(saveIndex))?.let(saveSignals::add)
                        saveIndex++
                    }
                    saveSignals
                }

                val unsave = action.optJSONArray("unsave")?.let {
                    val unsaveSignals = mutableListOf<EmitSignal>()
                    var unsaveIndex = 0
                    while (unsaveIndex < it.length()) {
                        emitSignalFactory.create(it.getJSONObject(unsaveIndex))?.let(unsaveSignals::add)
                        unsaveIndex++
                    }
                    unsaveSignals
                }

                Action.FavouriteAction(
                    feedId = action.getString("feedId"),
                    save = save,
                    unsave = unsave
                )
            }
            else -> null
        }
    }
}