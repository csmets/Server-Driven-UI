package com.example.androidapp.components.feed

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.*
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import coil.annotation.ExperimentalCoilApi
import com.example.androidapp.components.typography.TypographyContent
import com.example.androidapp.models.FeedViewElement
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@ExperimentalCoilApi
@Composable
fun Feed(viewModel: FeedViewModel = viewModel()) {
    val feed = viewModel.feed.observeAsState()
    val feedView = feed.value?.feedView

    println("response: " + Json.encodeToString(feed.value?.feedView))

    Row {
        Column(modifier = Modifier
            .fillMaxWidth()
            .fillMaxHeight()
            .verticalScroll(rememberScrollState())
            .padding(12.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            feedView?.elements?.forEach {
                when(it) {
                    is FeedViewElement.FeedItem -> FeedItem(it)
                    is FeedViewElement.TypographyContent -> TypographyContent(it)
                    is FeedViewElement.FeedHeading -> FeedHeading(it)
                }
            }
        }
    }
}