package com.example.androidapp.components

import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.androidapp.components.typography.Typography
import com.example.androidapp.models.ContainerElement
import com.example.androidapp.models.ViewElement

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
                    )
                }
            }
        }
    }
}