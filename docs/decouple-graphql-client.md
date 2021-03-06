# Benefits for clients to not call GraphQL in SDUI

In this article, it will outline the advantages for clients (Android, iOS and
Web) to not make direct calls to the compositor (GraphQL Server).

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
build will no longer work.

When multiple teams are working in the same codebase and the affected generated
type is shared across teams, it may end up breaking code that you're not a
maintainer of. It may also contribute to blocking other teams from releasing
their work.

## What if you remove the client calling GraphQL and have it return a REST response?

You would receive the following benefits:

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

Whilst there isn't many disadvantages, these may be enough to not proceed with
removing GraphQL from your client. Having clear contracts and documentation will
establish better patterns by developers. However, I like to challenge that.

## Don't use generated types

The idea of not having to write boilerplate code and focus on the core logic is
great. However, dealing with generated code in a codebase that has a large
number of hands on it can cause some problems. The issue with GraphQL's
generated code is that you can change the GraphQL type's shape quite easily.
Since you can change the shape it can cause implementations that use it to
break. The advantage of this is that you can easily identify what areas your
need to change, the disadvantage to that is if it's widely used, it will break
not your stuff but other people's stuff too. A single to a couple file changes
at initial thought can turn out to be hundreds of file changes when using
generated types throughout the codebase.

Alternatively, it's better to define your own types based off the response
yourself. The biggest advantage to this, is that you can curate your own logic
in handling changes. If the response changes, you will only have to handle it in
a single place. If you want it to break the code due to major changes, you can.
If it's a minor change you can define default values or update it to how it
should be mapped without having to break the code. It allows for a lot more
flexibility and can be more visible in codebase's pull requests.

It may seem like a lot of extra work to not use the generated types, but in most
cases you're often transforming the generated data to work with UI components.
Even if you're not having too, the addition of creating your own types doesn't
take as long, and might be faster to do so then having to create GraphQL queries
and run the code generation.

![generated code causing application to break](./images/generated-code-broken.png)

Taking a look at the example of the generated code breaking the application, we
can see that when deleting the `Alt` the generated code removes it. This is so
it meets the contract from GraphQL, however the UI is now broken because it's
asking for `Alt` but it doesn't exist.


![example showing generated code fixed](./images/generated-code-fixed.png)

To solve this issue, we will have to update the UI to not access the missing
`Alt` field but use the new `Desc` field.

![adapter handling nullable fields](./images/adapter-no-alt.png)

When removing the generated code and rather adapt the returned JSON response we
can prevent the application from breaking by not trusting the response. This
means when we access data it may possibly be null. If we treat it as nullable,
if it were not to appear it won't break the application. This is particularly
useful for mobile applications where you want you're previous to builds to work
even when the response has changed.

![adapter handling desc](./images/adapter-desc.png)

Rather than having to make changes to the UI to use the `Desc` field instead of
`Alt` you can update the adapter to use the returned `Desc` field data into the
`Alt` field.

Handling the response manually through an adapter allows for more flexibility to
prevent the application from breaking when changes occur. However it can come at
a cost where you will lose the contract that the server has made if the client
detours off the response model.

## GraphQL is still used

This article does not propose to not use GraphQL at all. Whilst it may not be
required or coupled from the client's perspective, it still is useful for
backend requests.

![diagram showing REST template middleman](./images/rest-template-middleman.png)

The above details a REST API implementation that puts a layer in-between the
client and the GraphQL server. The template service and be use to determine what
queries it should use and what to display on the page. This is particularly
useful for composing multiple modules together into a single response. The
client will only have to make a single request to build the page, rather than
sending multiple requests to load in different GraphQL UI modules.

The downside with a single REST API request is the wait time. If multiple
queries are being called within the template service to load UI modules it will
only load as fast as it's slowest query. If the slowest query takes 5 seconds to
respond, the template service will only be able to send back a response to the
client until the 5 seconds is over.

To retain both of best world; non-dependant calls and single request, is to use
WebSockets.

![diagram showcasing webSockets used to template service](./images/websocket-template-middleman.png)

Leveraging WebSockets, the client can receive immediate data without having to
wait for the full response to return back. However it does come at a cost in
that it does has some extra complexities, but they're mostly minor concerns.
You'll have to understand when to end the session and on web you'll have to
handle caching.

## Final thoughts

Moving away from GraphQL on the client has it's benefits and disadvantages. If
code quality can be maintained, the best option is to not use generated types
and steer away from the GraphQL ecosystem within the client. However, if code
quality is harder to maintain, leveraging the strict nature GraphQL provides
will ensure that other developers don't steer away from a defined standard.

In my own SDUI utopia, I favour to not use GraphQL on the client as you can
tailor better experiences to your users. To me, this is more important.
