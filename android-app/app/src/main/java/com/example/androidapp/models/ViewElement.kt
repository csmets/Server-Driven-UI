package com.example.androidapp.models

import kotlinx.serialization.Serializable

@Serializable
sealed class ViewElement {

    @Serializable
    data class Container(
        val elements: List<ContainerElement>
    ): ViewElement()
}
