package com.example.androidapp.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
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
                }
            }
        }
    }
}