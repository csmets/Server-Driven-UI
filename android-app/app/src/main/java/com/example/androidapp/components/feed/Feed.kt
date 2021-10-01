package com.example.androidapp.components.feed

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import coil.annotation.ExperimentalCoilApi
import coil.compose.rememberImagePainter
import coil.size.Scale
import com.example.androidapp.models.Column
import com.example.androidapp.models.ColumnAlignment
import com.example.androidapp.models.FeedElement
import com.example.androidapp.models.FeedViewElement
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@ExperimentalCoilApi
@Composable
fun Feed(viewModel: FeedViewModel = FeedViewModel(LocalContext.current)) {
    val feed = viewModel.feed.observeAsState()
    val feedView = feed.value?.feedView

    println("response: " + Json.encodeToString(feed.value?.feedView))

    Row {
        Column(modifier = Modifier
            .fillMaxWidth()
            .fillMaxHeight()
            .verticalScroll(rememberScrollState())
        ) {
            feedView?.elements?.forEach {
                when(it) {
                    is FeedViewElement.FeedItem -> FeedItem(it)
                    is FeedViewElement.TypographyContent -> TypographyContent(it)
                }
            }
        }
    }
}

@ExperimentalCoilApi
@Composable
fun FeedItem(feedItem: FeedViewElement.FeedItem) {
    feedItem.items?.forEach {
        when(it) {
            is FeedElement.FeedImage -> FeedImage(it)
            is FeedElement.FeedCaption -> FeedCaption(it)
            is FeedElement.ColumnLayout -> ColumnLayout(it)
        }
    }
}

@Composable
fun TypographyContent(typographyContent: FeedViewElement.TypographyContent) {
    typographyContent.paragraphs.forEach {
        Text(text = it.text)
    }
}

@ExperimentalCoilApi
@Composable
fun FeedImage(feedImage: FeedElement.FeedImage) {
    Image(
        painter = rememberImagePainter(feedImage.src),
        contentDescription = feedImage.alt,
        modifier = Modifier.fillMaxSize().height(200.dp),
        alignment = Alignment.Center,
        contentScale = ContentScale.Crop
    )
}

@Composable
fun FeedCaption(feedCaption: FeedElement.FeedCaption) {
    if (feedCaption.text != null) {
        Text(text = feedCaption.text)
    }
}

@ExperimentalCoilApi
@Composable
fun ColumnLayout(columnLayout: FeedElement.ColumnLayout) {
    Row(horizontalArrangement = Arrangement.SpaceBetween) {
        columnLayout.columns.forEach {
            when(it) {
                is Column.FeedFavouriteCount -> FeedFavouriteCount(it)
                is Column.FeedFavourite -> FeedFavourite(it)
            }
        }
    }
}

fun getAlignment(alignment: ColumnAlignment): Alignment.Horizontal {
    return when(alignment.name) {
        "LEFT" -> Alignment.Start
        "RIGHT" -> Alignment.End
        "CENTER" ->Alignment.CenterHorizontally
        else -> Alignment.Start
    }
}

@Composable
fun FeedFavouriteCount(feedFavouriteCount: Column.FeedFavouriteCount) {
    Column(horizontalAlignment = getAlignment(feedFavouriteCount.align)) {
        Text(text = feedFavouriteCount.count)
    }
}

@ExperimentalCoilApi
@Composable
fun FeedFavourite(feedFavourite: Column.FeedFavourite) {
    Column(horizontalAlignment = getAlignment(feedFavourite.align)) {
        Image(
            painter = rememberImagePainter(feedFavourite.icon),
            contentDescription = "",
            modifier = Modifier.size(24.dp)
        )
    }
}