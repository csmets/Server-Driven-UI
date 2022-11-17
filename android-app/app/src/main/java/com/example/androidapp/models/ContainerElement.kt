package com.example.androidapp.models

import com.example.androidapp.models.factories.toContainerButton
import kotlinx.serialization.Serializable

@Serializable
sealed class ContainerElement {

    @Serializable
    data class Card(
        val primary: String,
        val secondaries: List<String>?,
        val action: Action?,
        val links: List<Buttons>?,
        val media: Image?,
        val content: List<String>?,
        val signal: Signal?
    ) : ContainerElement()

    @Serializable
    data class Typography(
        val value: String,
        val variant: TypographyVariant,
        val theme: TypographyTheme
    ) : ContainerElement()

    @Serializable
    data class Box(
        val width: Int,
        val height: Int,
        val _debugColor: BoxColor?
    ) : ContainerElement()

    @Serializable
    data class Button(
        val label: String,
        val action: Action?,
        val disabled: Boolean,
        val disableElevation: Boolean,
        val variant: ButtonVariant,
        val theme: ButtonTheme,
        val size: ButtonSize,
        val icon: String?
    ) : ContainerElement()
}

fun ContainerElement.Button.toButton(): Buttons.Button {
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

@Serializable
enum class TypographyVariant {
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    BODY1,
    BODY2,
    SUBTITLE1,
    SUBTITLE2,
    CAPTION,
    OVERLINE
}

@Serializable
enum class TypographyTheme {
    PRIMARY,
    SECONDARY
}

@Serializable
enum class ButtonVariant {
    TEXT,
    CONTAINED,
    OUTLINED
}

@Serializable
enum class ButtonTheme {
    PRIMARY,
    SECONDARY,
    SUCCESS,
    ERROR
}

@Serializable
enum class ButtonSize {
    SMALL,
    MEDIUM,
    LARGE
}

@Serializable
enum class BoxColor {
    PRIMARY,
    SECONDARY,
    ERROR,
    WARNING,
    INFO,
    SUCCESS
}