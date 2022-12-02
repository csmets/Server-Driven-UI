package com.example.androidapp.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.Card as MaterialCard
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import coil.annotation.ExperimentalCoilApi
import com.example.androidapp.components.feed.FeedFavouriteViewModel
import com.example.androidapp.models.Action
import com.example.androidapp.models.ContainerElement
import com.example.androidapp.models.SignalValue
import com.example.androidapp.models.SignalValuePairKey

@ExperimentalCoilApi
@Composable
fun Card(card: ContainerElement.Card, viewModel: FeedFavouriteViewModel = hiltViewModel()) {
    val uriHandler = LocalUriHandler.current

    var content by remember {
        mutableStateOf(card.content)
    }

    card.signal?.let {
        viewModel.listenTo(it).subscribe { event ->
            event.values?.forEach { value ->
                if (value.key == SignalValuePairKey.CONTENT) {
                    if (value.value is SignalValue.SignalArrayValue) {
                        val updatedContent = mutableListOf<String>()
                        value.value.prefix?.let { pre -> updatedContent.addAll(pre) }
                        value.value.array?.let { arr -> updatedContent.addAll(arr) }
                        value.value.suffix?.let { suf -> updatedContent.addAll(suf) }
                        content = updatedContent
                    }
                }
            }
        }
    }

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
        Column {
            if (card.media != null) {
                ImageComponent(image = card.media)
            }
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Text(text = card.primary, fontSize = 24.sp, fontWeight = FontWeight.W400)
                card.secondaries?.forEach {
                    Row {
                        Text(text = it, color = Color.LightGray)
                    }
                }
                content?.forEach {
                    Text(text = it, fontSize = 16.sp, fontWeight = FontWeight.W400)
                }
                if (card.links != null) {
                    Row(modifier = Modifier.padding(top = 20.dp)) {
                        card.links.forEach {
                            Column(modifier = Modifier.padding(end = 6.dp)) {
                                Button(data = it)
                            }
                        }
                    }
                }
            }
        }
    }
}