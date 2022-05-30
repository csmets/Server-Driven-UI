package com.example.androidapp.services

import com.example.androidapp.TEMPLATE_ENDPOINT
import com.example.androidapp.models.FeedResponse
import com.example.androidapp.models.factories.FeedResponseFactory
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.ResponseBody
import org.json.JSONArray
import retrofit2.*
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.converter.scalars.ScalarsConverterFactory
import javax.inject.Inject

interface RemoteDataSource {
    suspend fun getFeed(callback: suspend (res: FeedResponse) -> Unit)
}

class RemoteDataSourceImpl @Inject constructor(
    private val feedResponseFactory: FeedResponseFactory
): RemoteDataSource {

    override suspend fun getFeed(callback: suspend (res: FeedResponse) -> Unit) {
        val templateService = Retrofit.Builder()
            .baseUrl(TEMPLATE_ENDPOINT)
            .addConverterFactory(ScalarsConverterFactory.create())
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(TemplateAPI::class.java)

        templateService.getFeed().enqueue((object: Callback<ResponseBody> {
            override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                //handle error here
            }

            override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
                val res = response.body()?.string()
                if (res != null) {
                    val json = JSONArray(res)
                    val feed = json.getJSONObject(0).getJSONObject("data").getJSONArray("elements")
                    val feedResponse = feedResponseFactory.create(feed)
                    CoroutineScope(Dispatchers.IO).launch {
                        if (feedResponse != null) {
                            callback(feedResponse)
                        }
                    }
                }
            }

        }))
    }
}