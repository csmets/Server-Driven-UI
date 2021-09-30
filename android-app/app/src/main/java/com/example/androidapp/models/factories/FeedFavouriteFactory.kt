package com.example.androidapp.models.factories

import com.example.androidapp.models.ColumnAlignment
import com.example.androidapp.models.FavouriteAction
import com.example.androidapp.models.FeedFavourite


fun interface FeedFavouriteFactory {
    fun create(feedFavourite: fragment.FeedFavourite, alignment: ColumnAlignment): FeedFavourite
}

val feedFavouriteFactory = FeedFavouriteFactory { feedFavourite, alignment ->
    return@FeedFavouriteFactory FeedFavourite(
        align = alignment,
        icon = feedFavourite.icon,
        action = FavouriteAction(
            feedFavourite.action.fragments.favouriteAction.feedId,
            signalFactory.create(
                feedFavourite.action.fragments.favouriteAction.signal?.fragments?.signal
            )
        )
    )
}