package com.example.androidapp.components.hackernews

import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import com.example.androidapp.BottomBarNavigation
import com.example.androidapp.components.View

@Composable
fun HackerNews(
    navController: NavHostController,
    viewModel: HackerNewsViewModel = hiltViewModel()
) {
    val hackerNews = viewModel.hackerNews.observeAsState()
    val view = hackerNews.value?.view

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(text = "Hacker news demo")
                }
            )
        },
        bottomBar = { BottomBarNavigation(navController = navController) }
    ) {
        View(viewResponse = view)
    }
}