# Guma

// screenshots

## What is Guma ?

If you are a League of legends fan you already know [Gumayusi](https://en.wikipedia.org/wiki/Gumayusi) if you don't He is a League of Legends esports player, currently bot laner for T1 and 2023 LOL world champion. My fav player.

### In this context

Guma is a Lightweight and Self Hosted project management app that allows to manage multiple projetcs.

## Overall architecture

### Services

Name	| Path	| Stack	|  Description  |
------------- | -------------------- | ------------- | ----------- |
Gateway	| /accounts/{account}	| Nestjs  |  Gateway built with GraphQL Federeration	|  | 	
Identity	| /accounts/	| Spring Boot |  Register new account	|
Project	| /accounts/current	| Spring Boot | Service responsible for project handling	|
Team	| /accounts/demo	| NestJS|  Service responsible for team, workflow and members     handling	|
Notification	| /accounts/current	| Go  | Save current account data	| 
Data-Access	| /accounts/	| Go |  Register new account	|
Issues	| /accounts/	| NestJS |  Register new account	|
Wiki	| /accounts/	| NestJS |  Register new account	|
