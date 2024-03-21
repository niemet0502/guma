# Guma

// screenshots

## What is Guma ?

If you are a League of legends fan you already know [Gumayusi](https://en.wikipedia.org/wiki/Gumayusi) if you don't He is a League of Legends esports player, currently bot laner for T1 and 2023 LOL world champion. My fav player.

### In this context

Guma is a Lightweight and Self Hosted project management app that allows to manage multiple projetcs.

## Overall architecture

### Services

| Name     | Path                | Description                                                 |
| -------- | ------------------- | ----------------------------------------------------------- | --- |
| Gateway  | /accounts/{account} | Gateway built with GraphQL Federeration                     |     |
| Project  | /accounts/current   | Service responsible for project handling                    |
| Team     | /accounts/demo      | Service responsible for team, workflow and members handling |
| Identity | /accounts/current   | Save current account data                                   |
| Wiki     | /accounts/          | Register new account                                        |
