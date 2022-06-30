package com.example.androidapp

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.width
import androidx.compose.material.BottomAppBar
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.example.androidapp.navigation.Screen

@Composable
fun BottomBarNavigation(
    navController: NavHostController
) {
    BottomAppBar {
        Row(
            modifier = Modifier.fillMaxSize()
        ) {
            Text(
                text = "Feed",
                modifier = Modifier.clickable {
                    navController.navigate(Screen.Feed.route)
                }
            )
            Spacer(modifier = Modifier.width(12.dp))
            Text(
                text = "HackerNews",
                modifier = Modifier.clickable {
                    navController.navigate(Screen.HackerNews.route)
                }
            )
        }
    }
}