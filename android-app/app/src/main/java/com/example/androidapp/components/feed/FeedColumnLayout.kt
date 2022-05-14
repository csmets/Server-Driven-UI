package com.example.androidapp.components.feed

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import coil.annotation.ExperimentalCoilApi
import com.example.androidapp.models.FeedColumn
import com.example.androidapp.models.FeedColumnAlignment
import com.example.androidapp.models.FeedElement

@ExperimentalCoilApi
@Composable
fun FeedColumnLayout(feedColumnLayout: FeedElement.FeedColumnLayout) {
    Row(horizontalArrangement = Arrangement.SpaceEvenly) {
        feedColumnLayout.feedColumns.forEach {
            when(it) {
                is FeedColumn.FeedFavouriteCount -> FeedFavouriteCount(it)
                is FeedColumn.FeedFavourite -> FeedFavourite(it)
            }
        }
    }
}

fun getAlignment(alignment: FeedColumnAlignment): Alignment.Horizontal {
    return when(alignment.name) {
        "LEFT" -> Alignment.Start
        "RIGHT" -> Alignment.End
        "CENTER" -> Alignment.CenterHorizontally
        else -> Alignment.Start
    }
}

