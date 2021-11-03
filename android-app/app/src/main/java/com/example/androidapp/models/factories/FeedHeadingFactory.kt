package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedViewElement
import fragment.FeedHeading

fun interface FeedHeadingFactory {
    fun create(feedHeading: FeedHeading?): FeedViewElement.FeedHeading?
}

val feedHeadingFactory = FeedHeadingFactory {
    if (it == null && it?.primary == null) {
        return@FeedHeadingFactory null
    }

    return@FeedHeadingFactory FeedViewElement.FeedHeading(primary = it.primary!!, signal = null)
}