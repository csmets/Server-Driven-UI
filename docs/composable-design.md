# Composable design system

A composable design system is to allow any elements to be shown in any order you wish to have them. An example of a non-composable design system is when you've coupled the response to the UI. When the response changes, the data may change, but the design will still look the same. A composable design is allowing the server's response to be able to change the design, for example, having the heading of a card from the top to be moved down to the bottom.

Creating a composable design system will help you build new designs with pre-existing building blocks. This is the greatest advantage of SDUI. The reward of using SDUI is to provide users with new experiences without having to update the mobile app, so it's best to design towards that.

## How do we create a composable design system?

Depending on your use case, there's two different composable design systems, page level and component level. They both share the same rules, however, page level had an extra add level of complexity.

### Page level composable design

When starting on SDUI it is important to create a distinct separation of concerns. Separating the concerns allows you to build new schemas with higher confidence and less cognitive load. Schemas are not easy to design, so it's important to create a system that helps visualize and importantly scale.

These are the rules when building for page level composable designs:

- Create layout based types
- Create element based types
- Layouts SHOULD NOT be contained with elements.

What you should not do is:

1. Mix layout and elements together

A clear example of what you should **NOT** do is:

```graphql
union Element = Button | ImageCard | SectionContainer | ContentCard
```

In the above union, there's a `SectionContainer` within the union of possible types. A section container is a container that would hold elements. Why is this bad? It is unclear what is the separation of concern. We can not fall into a cyclical loop. If a section container is to hold elements but is contained with a list of elements, that would mean a section container can be held within a section container infinitely.

**Make it clear**, what is an element and what is a layout.

```graphql
union Layout = SectionContainer | ColumnContainer | HorizontalOverflowContainer

union Element = Button | ImageCard | ContentCard
```

The `element` union can quickly become quite large, and it's reasonable to say that it's a poor design that can't scale. Also a particular container shouldn't be allowed to have certain elements within it, and should have different styling to a `SectionContainer`. We can break it up and allow certain elements to it.

```graphql
union Layout = SectionContainer | ColumnContainer | NavigationContainer | HorizontalOverflowContainer

union SectionContainerElement = Button | ImageCard | ContentCard

union NavigationContainerElement = Button | Menu

type SectionContainer {
  elements: [SectionContainerElement!]
}

type NavigationContainer {
  elements: [NavigationContainerElement!]
}
```

In the above example, we can see that the `SectionContainer` and `NavigationContainer` have different elements allowed within it.

### Component composable design

Creating a component only query, that's composable, the design is very similar page level design. The trick is to not make dynamic fields static within the type, put elements into an array so the server can draw out it's design by placing them into a particular order.

```graphql
union ImageCardElement = Image | Heading | BodyTypography | Button

type ImageCard {
  elements: [ImageCardElement!]
}
```

With `elements` being able to be many different types, we can change the order of the presentation of how we want to view the image card. It allows of experimentation and flexibility having the component be purely driven by the server's response.

### Mixing it

It's not always straightforward when it comes to some designs. Let's take a look at an image carousel for example. We want the image carousel to have a heading, some text, and a bunch of images to be shown. We can't have it in a single array like this:

```graphql
union ImageCarouselElement = Image | Heading | BodyTypography

type ImageCarousel {
  elements: [ImageCarouselElement!]
}
```

A carousel slides horizontally, so if we did this, we would have everything stacked horizontally, we don't want that. So we would need to separate the images that would slide horizontally into it's own array so it can be handled differently.

```graphql
union ImageCarouselElement = Heading | BodyTypography

type ImageCarousel {
  elements: [ImageCarouselElement!]
  images: [Image!]
}
```

Great! Now we have a elements that can be composed in alternate manners and images can be styled and handled to scroll horizontally. However, this is still wrong! It's better, but what if you wanted to have some typography on the bottom of the images, rather than only having it up the top? You'd have to introduce a new field and creates more complexity.

You can adopt the page composable design mentioned earlier in this document. Let's take a look at how that would look.

```graphql
union ImageCarouselElement = Heading | BodyTypography | ImageCarousel

type ImageCarouselContainer {
  elements: [ImageCarouselElement!]
}

type ImageCarousel {
  images: [Image]
}
```

I created `ImageCarouselElement` to be a layout, then added a bunch of elements to be composed, one of them is `ImageCarousel`. This will be used to show images that can slide horizontally. I can now also change the layout to have the `Heading` to be either before or after the `ImageCarousel`.

When doing this avoid the temptation to throw `ImageCarouselContainer` into a union of other elements. This is a layout and not an element.

```graphql
// Don't do this
union elements = ImageCard | ImageCarouselContainer | ContentCard
```

Layouts should belong with other layouts, doing the above can lead into cyclic issues and also loses the role of responsibility. Will make it hard to deal with styling, such as spacing.