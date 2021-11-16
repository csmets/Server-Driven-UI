# Cache in SDUI

## React web

For cache handling in React web client applications, it would be to leverage what comes bundled within Apollo GraphQL client. Whilst you might choose to decide you're own client for GraphQL requests, it's highly recommended to leverage [Apollo GraphQL](https://www.apollographql.com/docs/react/) as it's library has a number of useful tools built within it. In-memory caching comes bundled within it for free.

## Native

Native clients will be handling the cache by passing it through to it's application's preferred data store. In the case of Android, it can be Room. Whilst, like React web, if using Apollo client you can leverage it's own caching, however, it's not as full featured and it tends to be better to lean towards more mature libraries that's favoured by Native clients.

## Cache IDs

Cache IDs may provide use when you're wanting to make changes to the stored cache data.

Apollo client for React web provides cache IDs by default to all type objects and is placed within a field called `id`.

```
// Taken from Apollo React documentation
{
  "data": {
    "person": {
      "__typename": "Person",
      "id": "cGVvcGxlOjE=",
      "name": "Luke Skywalker",
      "homeworld": {
        "__typename": "Planet",
        "id": "cGxhbmV0czox",
        "name": "Tatooine"
      }
    }
  }
}
```

When working in native clients, when using apollo client it doesn't provide an ID by default. So you're looking at something like:

```
{
  "data": {
    "person": {
      "__typename": "Person",
      "name": "Luke Skywalker",
      "homeworld": {
        "__typename": "Planet",
        "name": "Tatooine"
      }
    }
  }
}
```

## Cache handling mutation responses

An issue that becomes pronounced when working in SDUI revolves around graphQL mutation responses. How do you update the current view with new data after a mutation call has been triggered? One way is to refetch the view after the mutation has been completed, however that can be slow and costly depending on how big the current view is. Another way is to use [Signals](./signals.md) and update the cache.

If you've read through the [Signals](./signals.md) documentation, you'd be familiar with emitting an optimistic result. However, as stated within the documentation, the cache won't get updated. Thus, when navigating to different views the state is lost. The next step would be to update the cache when a mutation response is given.

We can update the cache by leveraging the cache ids that gets returned. In Apollo React, if a cache ID is supplied within the mutation response, it will automatically update the cache. On native, this would have to be manually done.

For the mutation to understand what areas of the response body's cache to update, you'll need to feed through the ids. The GraphQL server would supply the cache IDs to specific objects that need to get updated, those cache IDs should be supplied to the action. When making the mutation call it will ingest the values supplied within the action, including cache ids. The GraphQL server will receive these cache IDs and handle them appropriately for it to return back to the client via the mutation response.

With the mutation response having these cache IDs, Apollo React client will automatically update the cache, and for Native, the client will read the response and update the database with the new values by searching for the cache ID within the database.

This allows you to keep mutations small in size and enables you to update the current view without having to entirely refetch it!

![mutation cache updating](./images/mutation-cache-update.jpg)