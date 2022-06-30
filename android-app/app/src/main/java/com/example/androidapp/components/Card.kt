package com.example.androidapp.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalUriHandler
import com.example.androidapp.models.Action
import com.example.androidapp.models.ContainerElement

@Composable
fun Card(card: ContainerElement.Card) {
    val uriHandler = LocalUriHandler.current
    Box(modifier = Modifier.clickable {
        card.action?.let {
            when(it) {
                is Action.URLAction -> {
                    uriHandler.openUri(it.url)
                }
            }
        }
    }) {
        Column {
            Text(text = card.primary)
            card.secondaries?.forEach {
                Row {
                    Text(it)
                }
            }
        }
    }
}