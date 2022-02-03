# SDUI Forms

Forms follow the same design principles as mentioned in [Composable Design System](./composable-design.md). A form would look something like this:

```graphql
type FormContainer {
  primary: String
  elements: [FormElement]
}

union FormElement = InputField | FormButton

type InputField {
  id: String!
  value: String
}

type FormButton {
  primary: String!
  action: FormAction!
}

interface FormAction {
  inputIds: [String!]
}

type AddContactAction implements FormAction {
  inputIds: [String!]
}
```

When designing forms there are a couple rules to follow:

- Form containers should only contain form elements.
- Actionable elements should be their own form type to not inherit all actions.

The first point is a standard rule, however the second point is important. Whilst you may have existing button type that visually looks the same as the form one, it's important to separate them as they have different concerns. The last thing you'd want to is allow a form to include a button that has a bunch of actions that do not relate to it. E.g. `FormButton` has an action type `FormAction`.

## Handling form mutations

Forms are driven by the server, the server provides the ids, but the client wouldn't be able to understand what/where the field should be placed within the mutations. Let's look by example.

```graphql
type AddContactAction implements FormAction {
  inputIds: [String!]
}

input ContactDetails {
  name: String!
  address: String
  phone: String!
}

mutation {
  addContact(person: ContactDetails!): MutationResponse!
}
```

Looking at the above example, how would we pass the form data to the mutation? One solution would be to grab the values from the fields using the input IDs supplied by the action and key them using the input ID. A problem you would face is having to be able to know what key relates to what mutation field, and that require some effort. This is not the ideal solution.

Another way would be to do:

```graphql
type AddContactAction implements FormAction {
  inputIds: [String!]
}

input PairKeyValue {
  key: String!,
  value: String!
}

mutation {
  addContact(person: [PairKeyValue]!): MutationResponse!
}
```

In the above example you would do the same, grab the form field values using the IDs given by the action and key them with the input ID. However, you send that to the server instead and let the server handle it. Since the server provides the IDs, it's already aware of it, this method is returning those IDs back with a value now attached to it. This way, if the server decides to add in another input field, no client work is required, the server can easily compose a new one.