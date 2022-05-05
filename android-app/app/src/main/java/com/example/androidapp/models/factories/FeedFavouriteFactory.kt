package com.example.androidapp.models.factories

import com.example.androidapp.models.Column
import com.example.androidapp.models.ColumnAlignment
import com.example.androidapp.models.FavouriteAction


fun interface FeedFavouriteFactory {
    fun create(feedFavourite: fragment.FeedFavourite, alignment: ColumnAlignment): Column.FeedFavourite
}

val feedFavouriteFactory = FeedFavouriteFactory { feedFavourite, alignment ->
    val save = feedFavourite.action.fragments.favouriteAction.save?.mapNotNull {
        emitSignalFactory.create(it.fragments.emitSignal)
    }
    val unsave = feedFavourite.action.fragments.favouriteAction.unsave?.mapNotNull {
        emitSignalFactory.create(it.fragments.emitSignal)
    }
    return@FeedFavouriteFactory Column.FeedFavourite(
        align = alignment,
        icon = feedFavourite.icon,
        action = FavouriteAction(
            feedId = feedFavourite.action.fragments.favouriteAction.feedId,
            save = save,
            unsave = unsave
        )
    )
}