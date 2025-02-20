SET client_encoding TO 'UTF8';

DROP TABLE IF EXISTS "user_session";

CREATE TABLE user_session(
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(64) NOT NULL,
  "password" VARCHAR(64) NOT NULL,
  "admin" BOOLEAN DEFAULT false
);

INSERT INTO user_session("username", "password", "admin") 
VALUES ('admin', '$2a$10$4QheOZAlu7Vi1Pw.lXmOu.LV8hiKpBs1mUQZpsbvcgU4IAUd1zO3.', true);

DROP TABLE IF EXISTS "product";

CREATE TABLE product(
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(64) NOT NULL,
  "category" VARCHAR(64) NOT NULL,
  "price" NUMERIC NOT NULL,
  "origin" VARCHAR(64) NOT NULL,
  "available" BOOLEAN DEFAULT true,
  "description" TEXT NOT NULL,
  "reference_number" INT NOT NULL
);

INSERT INTO product("name", "category", "price", "origin", "available", "description", "reference_number") VALUES 
('Espresso', 'Corsé', 20.99, 'Italie', true, 'Café fort et concentré préparé en faisant passer de l''eau chaude à travers du café finement moulu.', 100955890 ),
('Columbian', 'Acide', 18.75, 'Colombie', true, 'Café moyennement corsé avec une acidité vive et une saveur riche.', 100955894),
('Ethiopian Yirgacheffe', 'Fruité', 22.50, 'Éthiopie', true, 'Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.', 105589090),
('Brazilian Santos', 'Doux', 17.80, 'Brésil', true, 'Café doux et lisse avec un profil de saveur de noisette.', 134009550),
('Guatemalan Antigua', 'Corsé', 21.25, 'Guatemala', true, 'Café corsé avec des nuances chocolatées et une pointe d''épice.', 256505890),
('Kenyan AA', 'Acide', 23.70, 'Kenya', true, 'Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.', 295432730),
('Sumatra Mandheling', 'Corsé', 19.95, 'Indonésie', true, 'Café profond et terreux avec un corps lourd et une faible acidité.', 302932754),
('Costa Rican Tarrazu', 'Acide', 24.50, 'Costa Rica', true, 'Café vif et net avec une finition propre et une acidité vive.', 327302954),
('Vietnamese Robusta', 'Épicé', 16.75, 'Vietnam', true, 'Café audacieux et fort avec une saveur robuste distinctive.', 549549090),
('Tanzanian Peaberry', 'Fruité', 26.80, 'Tanzanie', true, 'Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.', 582954954),
('Jamaican Blue Mountain', 'Doux', 39.25, 'Jamaïque', true, 'Reconnu pour sa saveur douce, son acidité vive et son absence d''amertume.', 589100954),
('Rwandan Bourbon', 'Fruité', 21.90, 'Rwanda', true, 'Café avec des notes florales prononcées, une acidité vive et un corps moyen.', 650753915),
('Panamanian Geisha', 'Fruité', 42.00, 'Panama', true, 'Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.', 795501340),
('Peruvian Arabica', 'Chocolaté', 19.40, 'Pérou', false, 'Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.', 954589100),
('Hawaiian Kona', 'Doux', 55.75, 'Hawaï', false, 'Café rare au goût riche, une acidité douce et des nuances subtiles.', 958090105),
('Nicaraguan Maragogipe', 'Fruité', 28.60, 'Nicaragua', false, 'Café avec des notes de fruits, une acidité vive et un corps plein.', 691550753);