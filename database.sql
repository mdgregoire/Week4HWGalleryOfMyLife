create table images (
	id serial primary key,
	url varchar (240),
	note varchar (240),
	view_comments boolean default false,
	add_comment boolean default false,
	is_clicked boolean default false,
	is_clicked_count integer default 0,
	votecount integer default 0
);

create table comment (
	id serial primary key,
	images_id integer REFERENCES images,
	comment varchar(240)
);
