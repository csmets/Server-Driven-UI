package com.example.androidapp.navigation

sealed class Screen(val route: String) {
    object Feed: Screen(route = "feed")
    object HackerNews: Screen(route = "hacker_news")
}
