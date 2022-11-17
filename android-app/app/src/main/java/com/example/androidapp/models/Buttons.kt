package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
sealed class Buttons {
    @Serializable
    data class FavouriteButton(
        val icon: String?,
        val action: Action?,
        val disabled: Boolean,
        val size: ButtonSize,
        val signal: Signal?
    ): Buttons()

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
    ): Buttons()
}
