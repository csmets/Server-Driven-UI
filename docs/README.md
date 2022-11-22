# SDUI Documentation

This documentation is to house the standards that should be in placed when working in a SDUI paradigm.

## Table of contents
1. [Architecture fundamentals](./architecture-fundamentals.md)
2. [Typenames, interfaces and unions](./graphql-types.md)
3. [Writing a schema](./schema.md)
4. [Composable design system](./composable-design.md)
5. [Actions](./actions.md)
6. [Writing queries & mutations](./queries-and-mutations.md)
7. [Forms](./forms.md)
8. [Signals](./signals.md)
9. [Cache](./cache.md)
10. [Knowledge: All business logic should only live in the server-side](./server-side-business-logic.md)
11. [Knowledge: Benefits for clients to not call GraphQL in SDUI](./decouple-graphql-client.md)
12. [Appendix: Sending Signals in SDUI](https://medium.com/expedia-group-tech/sending-signals-in-server-driven-ui-a8a580059ed1)

## Preface

SDUI can be defined in various different ways. It can be as simple a providing copy/localized text from the server, or be completely driven by the server by providing the styles/templates to build the UI.

All of which the client **should** be 'dumb', and should **NOT** drive business logic from the response given by the server.

This project is opinionated to how SDUI should be done in a specific way following the [guiding principle](#guiding-principle). Ideally, this project will help provide a path to solve SDUI problems at a large scale.

Examples and opinions are driven from using GraphQL. If you are using a technology other than GraphQL, it may not work for you but it still may provide useful concepts on your own approach.

## Pro and Cons of SDUI

Before taking on SDUI, I think it's a good idea to look into the pros and cons first to decide whether or not this is the right decision for you.

### Advantages

- Native clients can provide users with composable content.
- Reduce the number of app updates to users as you can leverage the composable components given with SDUI.
- Adding experiments (A/B tests) to users becomes faster, no need to create a new client releases to deploy new experiments.
- Provide consistent data across multiple platforms.
- **No longer have to make changes in each client app for business logic as it's done on the server's response.**
- **Client becomes dumb and is only UI making it lightweight and reduces client specific bugs.**

### Disadvantages

- Taking advantage of unique platform features becomes challenging.
- Enterprise level application is difficult to coordinate.
- Client heavy operations are difficult to bring over to the server to handle.
- Un-mature design idea that isn't standardized, means that developers/designers/product have to learn and teach this paradigm.
- Performance and cost. Responses can become taxing on the server if there is a lot of complex business logic. The server has to do all the heavy lifting which will result in higher cost to keep your servers running.
- Creating composable components that allow many possible types to be displayed, will create very large requests from clients quickly. This also impacts performance.

## Guiding Principle

> The server should always dictate the presentation, but should never control the design.

Avoid any styling values within the server's response at all times. The design should have a data contract required to render the component. This is to create a separation of concern, you won't end up having to think about what styling options you should provide to the client when working on creating the server's response. It is up to the client (front-end) to decide how it should visual look.
