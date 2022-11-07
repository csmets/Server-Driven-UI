package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
sealed class ContainerElement {

    @Serializable
    data class Card(
        val primary: String,
        val secondaries: List<String>?,
        val action: Action?,
        val links: List<Button>?,
        val media: Image?
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
        val size: ButtonSize
    ) : ContainerElement()
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