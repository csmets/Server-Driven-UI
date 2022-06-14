# Benefits for clients to not call GraphQL in SDUI

This article will outline the advantages for clients (Android, iOS and Web) to
not make direct calls to the compositor (GraphQL Server).

## GraphQL creates large queries

For SDUI to work with GraphQL, the client application must supply the server
with all possible cases. This means the client doesn't exactly know what it
wants because the server determines it's presentation. Due to this, the queries
end up being quite large. For complex views, the query may become so large that
performance is heavily impacted.

Due to queries becoming unexpectedly large in SDUI, it makes me want to revisit
the idea behind using GraphQL. There are also other pain points with GraphQL,
one being the generated types. Whilst it has it's advantages in helping you
handle the response returned, it can become a pain when major changes are made
and your generated types are vastly changed. Your unit tests will fail and the
build will no longer work. When multiple teams are working in the same codebase
and the affected generated type is shared across teams, it may end up breaking
code that you're not a maintainer of. It may also contribute to blocking other
teams from releasing their work.

## What if you remove the client calling GraphQL and have it return a REST response?

You would recieve the following benefits:

- Client won't have to be concerned on ensuring it's asking for all required
  fields/types for the view.
- Reduction in complexities when not using GraphQL
  - queries
  - mutations
  - subscriptions
  - cache handling
  - handling generated types
- Improved performance
- REST gets cached on Web for free due to GET requests

Disadvantages when not using GraphQL include:

- Clients can't easily tailor what it wants to show
- Clear contracts and documentations on response types


