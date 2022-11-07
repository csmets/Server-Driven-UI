package com.example.androidapp.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.Card as MaterialCard
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.annotation.ExperimentalCoilApi
import coil.compose.rememberImagePainter
import com.example.androidapp.models.Action
import com.example.androidapp.models.ContainerElement

@OptIn(ExperimentalCoilApi::class)
@Composable
fun Card(card: ContainerElement.Card) {
    val uriHandler = LocalUriHandler.current
    MaterialCard(
        modifier = Modifier
            .fillMaxWidth()
            .clickable {
                card.action?.let {
                    when (it) {
                        is Action.URLAction -> {
                            uriHandler.openUri(it.url)
                        }
                    }
                }
            },
        elevation = 10.dp
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            if (card.media != null) {
                Image(
                    painter = rememberImagePainter(card.media.url),
                    contentDescription = card.media.alt,
                    modifier = Modifier
                        .fillMaxSize()
                        .height(card.media.height?.dp ?: 200.dp),
                    alignment = Alignment.Center,
                    contentScale = ContentScale.Crop
                )
            }
            Text(text = card.primary, fontSize = 24.sp, fontWeight = FontWeight.W400)
            card.secondaries?.forEach {
                Row {
                    Text(text = it, color = Color.LightGray)
                }
            }
            if (card.links != null) {
                Row {
                    card.links.forEach {
                        Button(data = it)
                    }
                }
            }
        }
    }
}