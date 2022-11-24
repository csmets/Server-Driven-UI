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

The first point is a standard rule, however the second point is important. Whilst you may have existing button type that visually looks the same as the form one, it's important to separate them as they have different concerns. The last thing you'd want to is allow a form to include a button that has a bunch of actions that do not relate to it.

- **Do:**
  - `FormButton` has an action type `FormAction`.
- **Don't:**
  - `FormButton` has an action type `OpenImageModal`.

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

Looking at the above example, how would we populate the contact details based off the inputIds to supply the mutation? It wouldn't be possible to map the value from the input to the related contact details field without knowing/understanding the ID.

The correct solution would be this:

```graphql
type AddContactAction implements FormAction {
  inputKeys: [String!]
}

input PairKeyValue {
  key: String!,
  value: String!
}

mutation {
  addContact(person: [PairKeyValue]!): MutationResponse!
}
```

In the above example the action will supply a bunch of keys that have a direct relationship to the input fields to retrieve it's values. It also provides the identifier for the server to understand what this key field is mapping to. The key is generic, and is a way for the server to talk back to itself. It's providing the fields, and the user is providing the values. Then send it back. This way, if the server decides to add in another input field, no client work is required, the server can easily compose a new one.