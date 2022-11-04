package com.example.androidapp.models.factories

import com.example.androidapp.models.ButtonSize
import com.example.androidapp.models.ButtonTheme
import com.example.androidapp.models.ButtonVariant
import com.example.androidapp.models.ContainerElement
import org.json.JSONObject
import javax.inject.Inject

fun interface ButtonFactory {
    fun create(button: JSONObject): ContainerElement.Button
}

class ButtonFactoryImpl @Inject constructor(
    private val actionFactory: ActionFactory
): ButtonFactory {
    override fun create(button: JSONObject): ContainerElement.Button {
        val label = button.getString("label")

        val action = if (!button.isNull("action")) {
            actionFactory.create(button.getJSONObject("action"))
        } else {
            null
        }

        val disabled = button.getBoolean("disabled")
        val disableElevation = button.getBoolean("disableElevation")
        val variant = adaptButtonVariant(button.getString("buttonVariant"))
        val theme = adaptButtonTheme(button.getString("buttonTheme"))
        val size = adaptButtonSize(button.getString("buttonSize"))

        return ContainerElement.Button(
            label = label,
            action = action,
            disabled = disabled,
            disableElevation = disableElevation,
            variant = variant,
            theme = theme,
            size = size
        )
    }

    private fun adaptButtonVariant(variant: String): ButtonVariant {
        return when (variant) {
            "TEXT" -> ButtonVariant.TEXT
            "CONTAINED" -> ButtonVariant.CONTAINED
            "OUTLINED" -> ButtonVariant.OUTLINED
            else -> ButtonVariant.CONTAINED
        }
    }

    private fun adaptButtonTheme(theme: String): ButtonTheme {
        return when (theme) {
            "PRIMARY" -> ButtonTheme.PRIMARY
            "SECONDARY" -> ButtonTheme.SECONDARY
            "SUCCESS" -> ButtonTheme.SUCCESS
            "ERROR" -> ButtonTheme.ERROR
            else -> ButtonTheme.PRIMARY
        }
    }

    private fun adaptButtonSize(size: String): ButtonSize {
        return when (size) {
            "SMALL" -> ButtonSize.SMALL
            "MEDIUM" -> ButtonSize.MEDIUM
            "LARGE" -> ButtonSize.LARGE
            else -> ButtonSize.MEDIUM
        }
    }
}