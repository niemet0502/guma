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
Frontend	| [/frontend](/frontend)	| [React](https://react.dev/)  |  The frontend app	|  |
Gateway	| [/gateway](/gateway)	| [Nestjs](https://nestjs.com/)  |  Gateway built with GraphQL Federeration	|  | 	
Identity	| [/backend-services/users](/backend-services/users)	| [Spring Boot](https://spring.io/projects/spring-boot) |  Service responsible of auth and users handling	|
Project	| [/backend-services/project](/backend-services/organization)	| [Spring Boot](https://spring.io/projects/spring-boot) | Service responsible for project handling	|
Team	| [/backend-services/team](/backend-services/team)	| [NestJS](https://nestjs.com/) |  Service responsible for team, workflow and members     handling	|
Issues	| [/backend-services/issues](/backend-services/issues)	| [NestJS](https://nestjs.com/) |  Service responsible for handling everything related to tasks, sprints, reminders etc.	|
Wiki	| [/backend-services/wiki](/backend-services/wiki/)	| [NestJS](https://nestjs.com/) |  Service responsible of the wiki part document handling	|
Notification	| [/backend-services/notifications](/backend-services)	| [Go](https://go.dev/)  | Service responsible for sending notifications (Push and email)	| 
Data-Access	| [/backend-services/data-access/](/backend-services/data-access)	| [Go](https://go.dev/) |  Service connected to the database and responsible of exposing a REST api	|

## Deployment
