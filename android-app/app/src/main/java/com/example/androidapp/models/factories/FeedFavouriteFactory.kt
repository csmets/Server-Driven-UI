package com.example.androidapp.models.factories

import com.example.androidapp.models.FeedColumn
import com.example.androidapp.models.FeedColumnAlignment
import com.example.androidapp.models.FavouriteAction
import fragment.FeedFavourite
import javax.inject.Inject


fun interface FeedFavouriteFactory {
    fun create(feedFavourite: fragment.FeedFavourite, alignment: FeedColumnAlignment): FeedColumn.FeedFavourite
}

class FeedFavouriteFactoryImpl @Inject constructor(
    private val signalFactory: SignalFactory,
    private val emitSignalFactory: EmitSignalFactory
): FeedFavouriteFactory {

    override fun create(
        feedFavourite: FeedFavourite,
        alignment: FeedColumnAlignment
    ): FeedColumn.FeedFavourite {
        val save = feedFavourite.action.fragments.favouriteAction.save?.mapNotNull {
            emitSignalFactory.create(it.fragments.emitSignal)
        }
        val unsave = feedFavourite.action.fragments.favouriteAction.unsave?.mapNotNull {
            emitSignalFactory.create(it.fragments.emitSignal)
        }
        return FeedColumn.FeedFavourite(
            align = alignment,
            icon = feedFavourite.icon,
            action = FavouriteAction(
                feedId = feedFavourite.action.fragments.favouriteAction.feedId,
                save = save,
                unsave = unsave
            ),
            signal = signalFactory.create(feedFavourite.signal?.fragments?.signal)
        )
    }
}