# Guma

// screenshots

## What is Guma ?

If you are a League of legends fan you already know [Gumayusi](https://en.wikipedia.org/wiki/Gumayusi) but if you don't He is a League of Legends esports player, currently bot laner for T1 and 2023 LOL world champion. My fav player.

### In this context

Guma is a Lightweight and Self Hosted project management app that allows to manage multiple projects.

## Overall architecture

### Services

Name	| Path	| Stack	|  Description  |
------------- | -------------------- | ------------- | ----------- |
Gateway	| [/gateway](/gateway)	| [Nestjs](https://nestjs.com/)  |  Gateway built with GraphQL Federeration	|  | 	
Identity	| [/backend-services/users](/backend-services/users)	| [Spring Boot](https://spring.io/projects/spring-boot) |  Register new account	|
Project	| /accounts/current	| [Spring Boot](https://spring.io/projects/spring-boot) | Service responsible for project handling	|
Team	| /accounts/demo	| [NestJS](https://nestjs.com/) |  Service responsible for team, workflow and members     handling	|
Notification	| /accounts/current	| [Go](https://go.dev/)  | Save current account data	| 
Data-Access	| /accounts/	| [Go](https://go.dev/) |  Register new account	|
Issues	| /accounts/	| [NestJS](https://nestjs.com/) |  Register new account	|
Wiki	| /accounts/	| [NestJS](https://nestjs.com/) |  Register new account	|

## Deployment
