package com.example.androidapp.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.androidapp.components.feed.Feed
import com.example.androidapp.components.hackernews.HackerNews

@Composable
fun SetupNavGraph(
    navHostController: NavHostController
) {
    NavHost(
        navController = navHostController,
        startDestination = Screen.Feed.route
    ) {
        composable(
            route = Screen.Feed.route
        ) {
            Feed(navController = navHostController)
        }
        composable(
            route = Screen.HackerNews.route
        ) {
            HackerNews(navController = navHostController)
        }
    }
}
