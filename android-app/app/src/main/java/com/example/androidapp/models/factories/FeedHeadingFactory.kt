package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedViewElement
import fragment.FeedHeading
import javax.inject.Inject

fun interface FeedHeadingFactory {
    fun create(feedHeading: FeedHeading?): FeedViewElement.FeedHeading?
}

class FeedHeadingFactoryImpl @Inject constructor(): FeedHeadingFactory {
    override fun create(feedHeading: FeedHeading?): FeedViewElement.FeedHeading? {
        if (feedHeading == null && feedHeading?.primary == null) {
            return null
        }

        return FeedViewElement.FeedHeading(primary = feedHeading.primary!!, signal = null)
    }
}