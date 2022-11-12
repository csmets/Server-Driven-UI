package com.example.androidapp.components.feed

import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.runtime.*
import androidx.compose.runtime.livedata.observeAsState
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import coil.annotation.ExperimentalCoilApi
import com.example.androidapp.BottomBarNavigation
import com.example.androidapp.components.View

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
        View(viewResponse = feedView)
    }
}