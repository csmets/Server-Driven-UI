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
