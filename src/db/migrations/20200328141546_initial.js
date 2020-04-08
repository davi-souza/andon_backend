module.exports = `
create type user_type as enum ('ADMIN', 'ANDON_CENTRAL', 'ANDON_WARNING_RESOLVER', 'ANDON_WARNING_SENDER');
create type warning_type as enum ('WARN', 'ALERT');
create type warning_reason as enum ('MATERIAL', 'PESSOAL', 'PROJETO');

create table if not exists "client" (
	id serial primary key,
	name text not null unique,
	created_at timestamp not null default now(),
	deleted_at timestamp default null
);

create table if not exists "location" (
	id serial primary key,
	client_id integer references client(id) not null,
	name text not null,
	created_at timestamp not null default now(),
	deleted_at timestamp default null
);

create table if not exists "task" (
	id serial primary key,
	client_id integer references client(id) not null,
	name text not null,
	created_at timestamp not null default now(),
	deleted_at timestamp default null
);

create table if not exists "location_task" (
	location_id integer references location(id) not null,
	task_id integer references task(id) not null,
	created_at timestamp not null default now(),
	deleted_at timestamp default null,
	primary key (location_id, task_id)
);

create table if not exists "user" (
	id serial primary key,
	client_id integer references client(id) not null,
	name text not null,
	type user_type not null,
	username text not null unique,
	password text not null,
	created_at timestamp not null default now(),
	deleted_at timestamp default null
);

create table if not exists "warning" (
	id serial primary key,
	user_id integer references "user"(id) not null,
	task_id integer references task(id) not null,
	type warning_type not null,
	reason warning_reason not null,
	created_at timestamp not null default now(),
	resolved_at timestamp default null,
	resolved_by integer references "user"(id) null,
	deleted_at timestamp default null
);

insert into "client" (name) values ('Fellowship of the Ring');
inser into "task" (client_id, name)
	values (1, 'Bilbo\'s birthday party'),
		(1, 'Helms Deep Battle'),
		(1, 'Answer Gondor call'),
		(1, 'Call Rohan aid'),
		(1, 'Great battle');
insert into "location" (client_id, name)
	values (1, 'The Shire'),
		(1, 'Rohan'),
		(1, 'Gondor');
insert into "user" (client_id, name, type, username, password)
	values (1, 'Gandalf the Gray', 'ADMIN', 'gandalf', '123'),
		(1, 'Aragorn', 'ANDON_CENTRAL', 'aragorn', '123'),
		(1, 'Frodo Baggins', 'ANDON_WARNING_RESOLVER', 'frodo', '123'),
		(1, 'Samwise Gamgee', 'ANDON_WARNING_SENDER', 'sam', '123');
`;