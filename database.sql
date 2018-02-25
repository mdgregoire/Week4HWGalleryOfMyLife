
-- Use these 2 creates to make the needed tables.
-- DATABASE NAME:  gallery_images

========================================================================

create table images (
	id serial primary key,
	url varchar,
	note varchar (240),
	view_comments boolean default false,
	add_comment boolean default false,
	is_clicked boolean default false,
	is_clicked_count integer default 0,
	title varchar (240),
	votecount integer default 0
);

create table comment (
	id serial primary key,
	images_id integer REFERENCES images,
	comment varchar(240)
);



=========================================================================

-- If you want to populate the app with some of my pictures use the insert below.


INSERT INTO images (url, note, title)
VALUES ('https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/10402653_242062455990570_2378029888314616608_n.jpg?oh=17621670e769b6bf8a9f0d93f349ce60&oe=5B196D32', '11111', 'Young Mike'),
('https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/227338_200119796692295_4952406_n.jpg?oh=4f1ccf97464afcc7d33e7819a4857041&oe=5B4DA811', '22222', 'Tending the Burn'),
('https://www.ely.org/_site_components/uploads/fall/fall%20lake.jpg', '33333', 'Our Lake'),
('https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/556851_10200162722699612_1548759812_n.jpg?oh=2f442a431448d06e9f3831eb3fbb242d&oe=5B452B58', '44444', 'Nappa Valley'),
('https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/60156_1625610888975_4196436_n.jpg?oh=40fc92a37522696d61044fc7af9c11d0&oe=5B04B0B3', '55555', 'Walking Away'),
('https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/61339_527643456761_7745328_n.jpg?oh=167badd96330fd88ff1ab3d35f4a5c11&oe=5B1BB27E', '66666', 'Catering & Camping');
