package com.example.androidapp.models.factories

import com.example.androidapp.models.Action
import org.json.JSONObject
import javax.inject.Inject

fun interface ActionFactory {
    fun create(action: JSONObject): Action?
}

class ActionFactoryImpl @Inject constructor(): ActionFactory {
    override fun create(action: JSONObject): Action? {
        val type = action.getString("__typename")

        return when(type) {
            "URLAction" -> {
                Action.URLAction(
                    url = action.getString("url"),
                    description = action.getString("description")
                )
            }
            else -> null
        }
    }
}