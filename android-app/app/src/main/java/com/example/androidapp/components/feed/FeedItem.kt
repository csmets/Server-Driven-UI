package com.example.androidapp.components.feed

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import coil.annotation.ExperimentalCoilApi
import com.example.androidapp.models.FeedElement
import com.example.androidapp.models.FeedViewElement

@ExperimentalCoilApi
@Composable
fun FeedItem(feedItem: FeedViewElement.FeedItem) {
    if (!feedItem.items.isNullOrEmpty()) {
        Column(
            modifier = Modifier.padding(bottom = 12.dp),
            verticalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            feedItem.items.forEach {
                when(it) {
                    is FeedElement.FeedImage -> FeedImage(it)
                    is FeedElement.FeedCaption -> FeedCaption(it)
                    is FeedElement.FeedColumnLayout -> FeedColumnLayout(it)
                }
            }
        }
    }
}
