package com.example.androidapp.services

import com.example.androidapp.models.FeedResponse
import com.example.androidapp.models.FeedTemplateResponse
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.GET

interface TemplateAPI {

    @GET("/feed")
    fun getFeed(): Call<ResponseBody>
}