# Writing SDUI GraphQL queries and mutations

## Queries

A query should return all the necessary view elements for a page or component. Depending on your approach, Page level or Component level, read [composable design](./composable-design.md) to learn more.

Queries are generally straight forwarded in design. However there are some guidelines you can follow to help design better queries.

### Required inputs

Make your query inputs required and not optional, this helps clients understand what is required for this query. Having many optional inputs creates cognitive load onto the developer in trying to understand what the query needs.

```graphql
# DON'T DO
type Query {
  shoppingItemDetails(item: String, view: String, context: Context): ViewResponse!
}

# DO
input ShoppingItemInput {
  item: String!
  view: String
}

type Query {
  shoppingItemDetails(itemInput: ShoppingItemInput!, context: Context!): ViewResponse!
}
```

Having just required inputs allows the developer to understand what is important for this query.

### Context

Context plays an important role to help the GraphQL server understand where this request is coming from. Having understand where this is coming from, the server and curate a response catered for that device. Context may also be used for presentation layout, for example a tablet device or an extra large display may want to present differently to a mobile or small display.

```graphql
input Context {
  device: DeviceType!
  size: DisplaySize!
  ...
}
```

## Mutations

Mutations are used on actions that require some form of modification; add, update, delete. It follow the same principles as queries; having only required inputs. However, mutations should be able to take inputs directly driven by the server to be fully SDUI compliant, this mostly relates to forms.

To learn about how to deal with forms, read [SDUI Forms](./forms.md)

When dealing with mutations, they don't always have to return a rich response or even to wait for a response to be returned. You can handle the view optimistically through [Signals](./signals.md). This creates a fluid experience for users, and remove the wait for actions to complete.