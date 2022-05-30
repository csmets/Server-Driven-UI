package com.example.androidapp.models.factories

import com.example.androidapp.models.EmitSignal
import com.example.androidapp.models.FeedColumn
import com.example.androidapp.models.FeedColumnAlignment
import com.example.androidapp.models.FavouriteAction
import org.json.JSONObject
import javax.inject.Inject


fun interface FeedFavouriteFactory {
    fun create(feedFavourite: JSONObject, alignment: FeedColumnAlignment): FeedColumn.FeedFavourite
}

class FeedFavouriteFactoryImpl @Inject constructor(
    private val signalFactory: SignalFactory,
    private val emitSignalFactory: EmitSignalFactory
): FeedFavouriteFactory {

    override fun create(
        feedFavourite: JSONObject,
        alignment: FeedColumnAlignment
    ): FeedColumn.FeedFavourite {
        val actionData = feedFavourite.getJSONObject("action")

        val save: List<EmitSignal> = actionData.getJSONArray("save").let {
            val saveSignals = mutableListOf<EmitSignal>()
            var saveIndex = 0
            while (saveIndex < it.length()) {
                emitSignalFactory.create(it.getJSONObject(saveIndex))?.let { es -> saveSignals.add(es) }
                saveIndex++
            }
            saveSignals
        }

        val unsave = actionData.getJSONArray("unsave").let {
            val unsaveSignals = mutableListOf<EmitSignal>()
            var unsaveIndex = 0
            while (unsaveIndex < it.length()) {
                emitSignalFactory.create(it.getJSONObject(unsaveIndex))?.let { es -> unsaveSignals.add(es) }
                unsaveIndex++
            }
            unsaveSignals
        }

        return FeedColumn.FeedFavourite(
            align = alignment,
            icon = feedFavourite.getString("icon"),
            action = FavouriteAction(
                feedId = actionData.getString("feedId"),
                save = save,
                unsave = unsave
            ),
            signal = signalFactory.create(feedFavourite.getJSONObject("signal"))
        )
    }
}