# Typenames, interfaces and unions

GraphQL being the main driver for our SDUI architecture, it is important to understand how we can leverage it to our benefit.

Note: GraphQL isn't a technology that's designed for SDUI. GraphQL is design to help us get data we require by requesting certain fields of data. In our case, the template service is requesting every single possible scenario to the GraphQL server which may result in a very large query.

## __typename

GraphQL, by default, returns a hidden field called `__typename`. The hidden field returns the name of the graphQL type. For example, if I have `type ContentBody` in my graphQL schema, when I make a query requesting for that type, the returned response will return `__typename: 'ContentBody'` in the object's response. This can be used to match a graphQL type to a UI type. We can focus on naming our graphQL types to be close to the UI and not rely on a field to determine what type of UI component this is.

Example of `__typename`
```graphql
type ContentBody {
  paragraphs: [Typography!]
}
```

```json
// response object
{
  "__typename": "ContentBody",
  "paragraphs": [
    {
      "__typename: "Body",
      "value": "This is content body text."
    }
  ]
}
```

Example of using type
```graphql
type ContentBody {
  type: TypographyEnum
  paragraphs: [Typography!]
}
```

```json
// response object
{
  "type": "PARAGRAPH_CONTAINER",
  "paragraphs": [
    {
      "type": "PARAGRAPH",
      "value": "This is content body text."
    }
  ]
}
```

## Union

If you're familiar with graphQL, then you might already be aware of Unions. Union provides us with a lot of flexibility, but can also become a problem to work with. When it's left out of control, it may cause issues such as cyclical dependencies. Using Unions in SDUI are essential, we can group objects together to help build the UI. This is commonly used when you want to combine a bunch of components into a list of elements that have no relationships.

Important note: unions can only hold concrete types. They cannot contain interfaces.

```graphql
union ContainerElement = ImageCard | ContentCard | Typography
```

## Interface

Interfaces are extremely useful to create manageable graphQL queries. You're able to create a fragment that share the same attributes for multiple types. Then there's a reduction in having to create fragments for concrete types that share the same values.

```graphql
interface Button {
  label: String
  action: Action
  icon: Icon
}

type PrimaryButton implements Button {
  label: String
  action: Action
  icon: Icon
}

type SecondaryButton implements Button {
  label: String
  action: Action
  icon: Icon
}
```

```graphql
# Query fragment on an interface rather than the concrete type
fragment ButtonFragment on Button {
  __typename
  label
  action {
    ...actionFragment
  }
  icon {
    ...IconFragment
  }
}
```

```json
// response
{
  "__typename": "PrimaryButton",
  "label": "Submit",
  "action": null,
  "icon": null
}
```