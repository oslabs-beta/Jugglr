--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3 (Ubuntu 11.3-1.pgdg18.04+1)
-- Dumped by pg_dump version 11.5

-- Started on 2019-09-11 16:56:10 PDT
--psql -U postgres -d postgres


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE public.people (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"mass" varchar,
	"hair_color" varchar,
	"skin_color" varchar,
	"eye_color" varchar,
	"birth_year" varchar,
	"gender" varchar,
	"species_id" bigint,
	"homeworld_id" bigint,
	"height" integer,
	CONSTRAINT "people_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.films (
	"_id" serial NOT NULL,
	"title" varchar NOT NULL,
	"episode_id" integer NOT NULL,
	"opening_crawl" varchar NOT NULL,
	"director" varchar NOT NULL,
	"producer" varchar NOT NULL,
	"release_date" DATE NOT NULL,
	CONSTRAINT "films_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.people_in_films (
	"_id" serial NOT NULL,
	"person_id" bigint NOT NULL,
	"film_id" bigint NOT NULL,
	CONSTRAINT "people_in_films_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.planets (
	"_id" serial NOT NULL,
	"name" varchar,
	"rotation_period" integer,
	"orbital_period" integer,
	"diameter" integer,
	"climate" varchar,
	"gravity" varchar,
	"terrain" varchar,
	"surface_water" varchar,
	"population" bigint,
	CONSTRAINT "planets_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.species (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"classification" varchar,
	"average_height" varchar,
	"average_lifespan" varchar,
	"hair_colors" varchar,
	"skin_colors" varchar,
	"eye_colors" varchar,
	"language" varchar,
	"homeworld_id" bigint,
	CONSTRAINT "species_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.vessels (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"manufacturer" varchar,
	"model" varchar,
	"vessel_type" varchar NOT NULL,
	"vessel_class" varchar NOT NULL,
	"cost_in_credits" bigint,
	"length" varchar,
	"max_atmosphering_speed" varchar,
	"crew" integer,
	"passengers" integer,
	"cargo_capacity" varchar,
	"consumables" varchar,
	CONSTRAINT "vessels_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.species_in_films (
	"_id" serial NOT NULL,
	"film_id" bigint NOT NULL,
	"species_id" bigint NOT NULL,
	CONSTRAINT "species_in_films_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.planets_in_films (
	"_id" serial NOT NULL,
	"film_id" bigint NOT NULL,
	"planet_id" bigint NOT NULL,
	CONSTRAINT "planets_in_films_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.pilots (
	"_id" serial NOT NULL,
	"person_id" bigint NOT NULL,
	"vessel_id" bigint NOT NULL,
	CONSTRAINT "pilots_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.vessels_in_films (
	"_id" serial NOT NULL,
	"vessel_id" bigint NOT NULL,
	"film_id" bigint NOT NULL,
	CONSTRAINT "vessels_in_films_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE  public.starship_specs (
	"_id" serial NOT NULL,
	"hyperdrive_rating" varchar,
	"MGLT" varchar,
	"vessel_id" bigint NOT NULL,
	CONSTRAINT "starship_specs_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);




--
-- TOC entry 4120 (class 0 OID 4163856)
-- Dependencies: 225
-- Data for Name: films; Type: TABLE DATA; Schema:  Owner: -
--


-- Completed on 2019-09-11 17:02:50 PDT

--
-- PostgreSQL database dump complete
--

