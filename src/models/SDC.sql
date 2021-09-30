/* Table 'reviews' */
CREATE TABLE reviews(
  id serial NOT NULL,
  rating integer,
  reccomend bool,
  response varchar,
  body varchar,
  date timestamptz NOT NULL,
  helpfulness integer,
  reviewer_name varchar NOT NULL,
  product_id integer NOT NULL,
  reviewer_email varchar NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'photos' */
CREATE TABLE photos(
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
  "value" character varying NOT NULL,
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


ALTER TABLE reviews
ALTER COLUMN date SET DATA TYPE timestamp with time zone
USING
timestamp with time zone 'epoch' + date * interval '1 millisecond';