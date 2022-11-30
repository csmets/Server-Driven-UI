package com.example.androidapp.models.factories

import com.example.androidapp.models.*
import org.json.JSONObject
import javax.inject.Inject

fun interface ButtonFactory {
    fun create(button: JSONObject): FactoryButton
}

class ButtonFactoryImpl @Inject constructor(
    private val actionFactory: ActionFactory,
    private val signalFactory: SignalFactory
): ButtonFactory {
    override fun create(button: JSONObject): FactoryButton {
        val label = if (button.has("label")) button.getString("label") else null

        val action = button.optJSONObject("action")?.let { actionFactory.create(it) }

        val disabled = if (button.has("disabled")) button.getBoolean("disabled") else null
        val disableElevation = if (button.has("disableElevation")) button.getBoolean("disableElevation") else null
        val variant = if (button.has("buttonVariant")) adaptButtonVariant(button.getString("buttonVariant")) else null
        val theme = if (button.has("buttonTheme")) adaptButtonTheme(button.getString("buttonTheme")) else null
        val size = if (button.has("buttonSize")) adaptButtonSize(button.getString("buttonSize")) else null
        val icon = if (button.has("icon") && !button.isNull("icon")) button.getString("icon") else null
        val signal = button.optJSONObject("signal")?.let { signalFactory.create(it) }

        return FactoryButton(
            label = label,
            action = action,
            disabled = disabled,
            disableElevation = disableElevation,
            variant = variant,
            theme = theme,
            size = size,
            icon = icon,
            signal = signal
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

data class FactoryButton(
    val label: String?,
    val action: Action?,
    val disabled: Boolean?,
    val disableElevation: Boolean?,
    val variant: ButtonVariant?,
    val theme: ButtonTheme?,
    val size: ButtonSize?,
    val icon: String?,
    val signal: Signal?
)

fun FactoryButton.toContainerButton(): ContainerElement.Button? {
    if (
        this.label == null ||
        this.disabled == null ||
        this.disableElevation == null ||
        this.variant == null ||
        this.theme == null ||
        this.size == null
    ) {
       return null
    }
    return ContainerElement.Button(
        label = this.label,
        action = this.action,
        disabled = this.disabled,
        disableElevation = this.disableElevation,
        variant = this.variant,
        theme = this.theme,
        size = this.size,
        icon = this.icon
    )
}

fun FactoryButton.toFavourite(): Buttons.FavouriteButton? {
    if (
        this.disabled == null ||
        this.size == null
    ) {
        return null
    }
    return Buttons.FavouriteButton(
        action = this.action,
        disabled = this.disabled,
        size = this.size,
        icon = this.icon,
        signal = this.signal
    )
}

fun FactoryButton.toButton(): Buttons.Button? {
    if (
        this.label == null ||
        this.disabled == null ||
        this.disableElevation == null ||
        this.variant == null ||
        this.theme == null ||
        this.size == null
    ) {
        return null
    }
    return Buttons.Button(
        label = this.label,
        action = this.action,
        disabled = this.disabled,
        disableElevation = this.disableElevation,
        variant = this.variant,
        theme = this.theme,
        size = this.size,
        icon = this.icon
    )
}