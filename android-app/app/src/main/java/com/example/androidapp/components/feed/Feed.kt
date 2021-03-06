package com.example.androidapp.components.feed

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.runtime.*
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import coil.annotation.ExperimentalCoilApi
import com.example.androidapp.BottomBarNavigation
import com.example.androidapp.components.typography.TypographyContent
import com.example.androidapp.models.FeedViewElement

@ExperimentalCoilApi
@Composable
fun Feed(
    navController: NavHostController,
    viewModel: FeedViewModel = hiltViewModel()
) {
    val feed = viewModel.feed.observeAsState()
    val feedView = feed.value?.feedView

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(text = "Feed demo")
                }
            )
        },
        bottomBar = { BottomBarNavigation(navController = navController) }
    ) {
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
}