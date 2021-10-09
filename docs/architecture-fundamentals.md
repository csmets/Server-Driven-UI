# Architecture fundamentals

The core principle of this project and in SDUI is to only write once; DRY (don't repeat yourself).

## GraphQL client queries/mutations/fragments

It's important to home all client queries, mutations, and fragments in one place. It's easy for clients to have their own place where developers will write their graphql queries. The issue with this, is that all clients will have to update their fragments and queries rather than doing it in one place for all. It may also lead to inconsistencies and issues where a particular client might be missing a field that will result on missing information that could be important to your user.

Other inconsistencies may include how the fragments may be written. It will lead into having each client having conversations with each other to resolve the same issue. It will reduce unwanted time figuring out how each client has worked on building the fragments when all of these graphql files are kept in one place.

## Style tokens

When working with multiple clients (Android, iOS, Web) to share the same styling to provide a unified visual experience to your users. This can be achieved through the use of style tokens.