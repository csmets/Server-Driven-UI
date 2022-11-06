package com.example.androidapp.components.kitchensink

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import com.example.androidapp.BottomBarNavigation
import com.example.androidapp.components.Container
import com.example.androidapp.components.View
import com.example.androidapp.models.ViewElement

@Composable
fun KitchenSink(
    navController: NavHostController,
    viewModel: KitchenSinkViewModel = hiltViewModel()
) {
    val kitchenSink = viewModel.sink.observeAsState()
    val view = kitchenSink.value?.view

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(text = "Kitchen sink")
                }
            )
        },
        bottomBar = { BottomBarNavigation(navController = navController) }
    ) {
        View(viewResponse = view)
    }
}