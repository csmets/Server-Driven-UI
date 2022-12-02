package com.example.androidapp.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.androidapp.components.typography.Typography
import com.example.androidapp.models.*

@Composable
fun Container(container: ViewElement.Container) {
    Row {
        Column(
            modifier = Modifier.padding(12.dp),
            verticalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            container.elements.forEach {
                when(it) {
                    is ContainerElement.Card -> Card(it)
                    is ContainerElement.Typography -> Typography(it)
                    is ContainerElement.Box -> Box(
                        modifier = Modifier
                            .height(it.height.dp)
                            .width(it.width.dp)
                            .background(adaptColor(it._debugColor))
                    )
                    is ContainerElement.Button -> Button(it.toButton())
                    is ContainerElement.ContainerImage -> ImageComponent(image = it.toImage())
                }
            }
        }
    }
}

@Composable
private fun adaptColor(color: BoxColor?): Color {
    return when(color) {
        BoxColor.PRIMARY -> MaterialTheme.colors.primary
        BoxColor.SUCCESS -> Color(Colors.Success)
        BoxColor.INFO -> Color(Colors.Info)
        BoxColor.WARNING -> Color(Colors.Warning)
        BoxColor.ERROR -> MaterialTheme.colors.error
        else -> MaterialTheme.colors.background
    }
}