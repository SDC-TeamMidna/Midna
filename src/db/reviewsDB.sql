/* Table 'reviews' */
CREATE TABLE reviews(
  id serial NOT NULL,
  rating integer,
  recommend integer,
  response varchar,
  reported bool,
  body varchar,
  date timestamptz NOT NULL,
  helpfulness integer,
  reviewer_name varchar NOT NULL,
  product_id integer NOT NULL,
  reviewer_email varchar NOT NULL,
  summary varchar NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'photos' */
CREATE TABLE reviews_photos(
  id serial NOT NULL,
  review_id integer NOT NULL,
  url varchar,
  PRIMARY KEY(id)
);

/* Table 'characteristics' */
CREATE TABLE "characteristics"(
  id serial NOT NULL,
  product_id integer NOT NULL,
  "name" varchar,
  PRIMARY KEY(id)
);

/* Table 'characteristic_reviews' */
CREATE TABLE characteristic_reviews(
  id serial NOT NULL,
  characteristic_id integer NOT NULL,
  review_id integer NOT NULL,
  "value" integer NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'product' */
CREATE TABLE product(
  id serial NOT NULL,
  "name" varchar NOT NULL,
  slogan varchar NOT NULL,
  description varchar NOT NULL,
  category varchar NOT NULL,
  default_price integer NOT NULL,
  PRIMARY KEY(id)
);

/* Relation 'reviews_photos' */
ALTER TABLE photos
  ADD CONSTRAINT reviews_photos FOREIGN KEY (review_id) REFERENCES reviews (id);

/* Relation 'products_characteristics' */
ALTER TABLE "characteristics"
  ADD CONSTRAINT products_characteristics
    FOREIGN KEY (product_id) REFERENCES product (id);

/* Relation 'product_reviews' */
ALTER TABLE reviews
  ADD CONSTRAINT product_reviews FOREIGN KEY (product_id) REFERENCES product (id)
  ;

/* Relation 'characteristics_characteristic_reviews' */
ALTER TABLE characteristic_reviews
  ADD CONSTRAINT characteristics_characteristic_reviews
    FOREIGN KEY (characteristic_id) REFERENCES "characteristics" (id);

/* Relation 'reviews_characteristic_reviews' */
ALTER TABLE characteristic_reviews
  ADD CONSTRAINT reviews_characteristic_reviews
    FOREIGN KEY (review_id) REFERENCES reviews (id);




/*copy over data from .csv files into tables */

copy product from '/Users/bishalgautam/Desktop/2021/Hack Reactor/SDC/product.csv' DELIMITER ',' CSV HEADER;
copy characteristics (id, product_id, name) from '/Users/bishalgautam/Desktop/2021/Hack Reactor/SDC/characteristics.csv' DELIMITER ',' CSV HEADER;
copy reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) from '/Users/bishalgautam/Desktop/2021/Hack Reactor/SDC/reviews.csv' DELIMITER ',' CSV HEADER;
copy characteristic_reviews (id, characteristic_id, review_id, value) from '/Users/bishalgautam/Desktop/2021/Hack Reactor/SDC/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
copy reviews_photos (id, review_id, url) from '/Users/bishalgautam/Desktop/2021/Hack Reactor/SDC/reviews_photos.csv' DELIMITER ',' CSV HEADER;


/* change date timestamp format */
ALTER TABLE reviews
ALTER COLUMN date SET DATA TYPE timestamp with time zone
USING
timestamp with time zone 'epoch' + date * interval '1 millisecond';

/* create appropriate indexes */
CREATE INDEX reviews_product_id_index ON reviews(product_id);
CREATE INDEX reviews_photos_review_id_index ON reviews_photos(review_id);
CREATE INDEX charReviews_char_id_index ON characteristic_reviews(characteristic_id);


/* fix asynchronized ids */
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('reviews', 'id')), (SELECT (MAX(id) + 1) FROM reviews), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('reviews_photos', 'id')), (SELECT (MAX(id) + 1) FROM reviews_photos), FALSE);
