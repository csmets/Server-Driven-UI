package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedViewElement
import org.json.JSONObject
import javax.inject.Inject

fun interface FeedHeadingFactory {
    fun create(feedHeading: JSONObject?): FeedViewElement.FeedHeading?
}

class FeedHeadingFactoryImpl @Inject constructor(): FeedHeadingFactory {
    override fun create(feedHeading: JSONObject?): FeedViewElement.FeedHeading? {
        val primary = feedHeading?.getString("primary")

        if (feedHeading == null || primary == null) {
            return null
        }

        return FeedViewElement.FeedHeading(primary = primary!!, signal = null)
    }
}