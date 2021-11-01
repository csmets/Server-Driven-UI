# Typenames, interfaces and unions

GraphQL being the main driver for our SDUI architecture, it is important to understand how we can leverage it to our benefit.

Note: GraphQL isn't a technology that's designed for SDUI. GraphQL is design to help us get data we require by requesting certain fields of data. In our case, client SDUI queries are requesting every single possible scenario to the GraphQL server which may result in a very large query.

## __typename

GraphQL, by default, returns a hidden field called `__typename`. The hidden field returns the name of the graphQL type. For example, if I have `type ContentBody` in my graphQL schema, when I make a query requesting for that type, the returned response will return `__typename: 'ContentBody'` in the object's response. This can be used to match a graphQL type to a UI type. We can focus on naming our graphQL types to be close to the UI and not rely on a field to determine what type of UI component this is.

Example of `__typename`
```
type ContentBody {
  paragraphs: [Typography!]
}

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
```
type ContentBody {
  type: TypographyEnum
  paragraphs: [Typography!]
}

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

If you're familiar with graphQL, then you might already be aware of Unions. Union provides us with a lot of flexibility, but can also become a problem to work with, when it's left out of control, such as cyclical dependency issues. Using Unions in SDUI are essential, we can group objects together to help build the UI. Inheritance through Interfaces, can do the same, but Unions makes sense in SDUI as these objects can be unrelated in data relationships, but in UI they need to be together.

```graphql
union Typography = Heading | Body | Link
union ContainerElement = ImageCard | ContentCard | Button
```