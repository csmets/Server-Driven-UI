# Actions

What are actions? Actions are types that you'll create for elements that require some form of interaction. For example a text link item would have an action attached to it that will provide a URI. So, when it's clicked, an action has been made and that type will provide the required fields to enable that interaction. Other examples would be:

- Interacting with a menu
- Interacting with a button
- etc

Using a button as an example, it would look like:

```graphql
type Button {
  primary: String
  icon: Icon
  action: Action
}
```

## Rules to follow

**If your composable design structure is at page level please read these rules. For component based designs this can be ignored.**

Actions can quickly become a big problem when your application starts to scale. When done incorrectly it can cause your application to become very slow, and will continue to degrade as you start putting more actions in it. Why? Actions are generally attached to leaf elements. If we look at the structure of the data as a tree, the root/trunk of the tree would be the top of the response, as you go into the response the trunk will break down into branches. Once you've gone through all of the branches at the very end are leaves. Leaves would be elements that wouldn't contain any elements, for example, text, buttons, images, etc. If a leaf has an action that contains many possible types of actions, the leaf will be very heavy. And, if the action contained some nested view within it, the leaf would become a branch, due to the possibility of it having that action.

```graphql
# Root/Trunk
type View {
  primary: String
  layout: [Layout]
}

# Branches
union Layout = Container | ColumnLayout | HorizontalScroll

# Branch
type Container {
  primary: String
  elements: [Element]
}

# Leaves
union Element = Button | Text | Image | TextLink

# Leaf
type Button {
  primary: String
  icon: Icon
  action: Action
}

union Action = CopyToClipboard | URILink | GoToHomeScreen | OpenDialog | OpenMenu
```

What you want to avoid is having the following in your action:

```graphql
type OpenMenu {
  primary: String
  items: [MenuItem]
}

type MenuItem {
  primary: String
  action: Action
}

type TextLink {
  primary: String
  action: Action
}
```

The example above introduces a cyclical issue, but it also means that all actionable leaf objects that are using `Action` will have the possibility of having `OpenMenu` which has `MenuItem`. On the query it would explode your fragments to look like this:

```graphql
... on TextLink {
  primary
  action {
    ... on CopyToClipBoard {
      ...
    }
    ... on URILink {
      ...
    }
    ... on GoToHomeScreen {
      ...
    }
    ... on OpenDialog {
      ...
    }
    ... on OpenMenu {
      primary
      items {
        primary
        action {
          ... on CopyToClipBoard {
            ...
          }
          ... on URILink {
            ...
          }
          ... on GoToHomeScreen {
            ...
          }
          ... on OpenDialog {
            ...
          }
        }
      }
    }
  }
}
```

`TextLink` should be very light weight, and it's a common type that may get used in many elements, that would be the same for button. However, it holds too many possibilities and the query can start to become large in nature. **Be very careful with actions and be very selective to what the actionable element can do.**

### Being selective (limit scope)

For text link items, it's important to identify the design rule, if text links will only be URI links, then you can just make have `URILink`. This keeps the leaf lightweight.

```graphql
type TextLink {
  primary: String
  action: URILink
}
```

### Group actions by domain

Actions should have a limited scope and should be kept within a domain. For example, if you have a shopping application, search, listings, cart, checkout, purchases, are all separate domains. The actions do not need to be shared across those domains as there will be a lot of unused actions. Keeping the actions small and kept within the domain makes it easier for developers to understand what they do and where they belong. Small applications may not have to be concerned.

### Group action by motive

3 common action motives are:
- Query based actions
- Mutation based actions
- Component based actions

An extreme case would be to only have 3 actions that would provide all the application needs.

```graphql
interface Action

enum QueryActionType {
  VIEW_ITEM
  VIEW_ITEM_PRICING
  VIEW_ITEM_DETAILS
  OPEN_CART
}

type QueryAction implements Action {
  type: QueryActionType
  itemId: String
}

enum MutationActionType {
  EDIT_ITEM
  REMOVE_ITEM
  MOVE_ITEM
}

type MutationAction implements Action {
  type: MutationActionType
  itemId: String
}

enum ComponentActionType {
  COPY_TO_CLIPBOARD
  DISMISS
}

type ComponentAction implements Action {
  type: ComponentActionType
  value: String
}
```

The example shown is an extreme case, realistically there would be queries that require many different inputs and the same would be for mutations. Components would each have their own quirks and would be hard to all group them together. However, that does not mean you can't group some action together.

### Summary of Rules

- Do not group all your actions under one union.
- Group by domain for large applications.
- Group similar actions into a single type.
- Avoid nested actions within actions that are same type. `Action` in `Action`

**It's important to be strategic early on in the grouping of actions, as it can quickly become a large amount of work and effort to refactor in the future if done incorrectly.**