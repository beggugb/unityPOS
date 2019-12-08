--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10
-- Dumped by pg_dump version 10.10

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

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Articles" (
    id integer NOT NULL,
    name character varying(255),
    code character varying(255),
    variant character varying(255),
    vol numeric,
    brt numeric,
    net numeric,
    psale numeric,
    filename character varying(255),
    "typeId" integer,
    "markId" integer,
    "categoryId" integer,
    pdesc numeric,
    ofert boolean,
    "desc" numeric,
    description character varying(255),
    "inStock" boolean,
    stock integer,
    minim integer,
    "inCatalog" boolean,
    dest boolean,
    origin character varying(255),
    purchase numeric,
    reposic integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Articles" OWNER TO postgres;

--
-- Name: Articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Articles_id_seq"    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Articles_id_seq" OWNER TO postgres;

--
-- Name: Articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Articles_id_seq" OWNED BY public."Articles".id;


--
-- Name: BranchOffices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BranchOffices" (
    id integer NOT NULL,
    name character varying(255),
    address character varying(255),
    phone character varying(255),
    administrator character varying(255),
    "companyId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."BranchOffices" OWNER TO postgres;

--
-- Name: BranchOffices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BranchOffices_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."BranchOffices_id_seq" OWNER TO postgres;

--
-- Name: BranchOffices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BranchOffices_id_seq" OWNED BY public."BranchOffices".id;


--
-- Name: CajaItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CajaItems" (
    id integer NOT NULL,
    "cajaId" integer,
    monto numeric,
    tipo character varying(255),
    label character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    est boolean
);


ALTER TABLE public."CajaItems" OWNER TO postgres;

--
-- Name: CajaItems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CajaItems_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CajaItems_id_seq" OWNER TO postgres;

--
-- Name: CajaItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CajaItems_id_seq" OWNED BY public."CajaItems".id;


--
-- Name: Cajas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cajas" (
    id integer NOT NULL,
    "dateOpen" date,
    "dateClose" date,
    "montoInicial" numeric,
    "montoIngreso" numeric,
    "montoEgreso" numeric,
    "montoFinal" numeric,
    open boolean,
    "userId" integer,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL,
    num integer
);


ALTER TABLE public."Cajas" OWNER TO postgres;

--
-- Name: Cajas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cajas_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cajas_id_seq" OWNER TO postgres;

--
-- Name: Cajas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cajas_id_seq" OWNED BY public."Cajas".id;


--
-- Name: Categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Categories" (
    id integer NOT NULL,
    name character varying(255),
    code character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Categories" OWNER TO postgres;

--
-- Name: Categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Categories_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Categories_id_seq" OWNER TO postgres;

--
-- Name: Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Categories_id_seq" OWNED BY public."Categories".id;


--
-- Name: Clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Clients" (
    id integer NOT NULL,
    name character varying(255),
    address character varying(255),
    phone character varying(255),
    nit character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Clients" OWNER TO postgres;

--
-- Name: Clients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Clients_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Clients_id_seq" OWNER TO postgres;

--
-- Name: Clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Clients_id_seq" OWNED BY public."Clients".id;


--
-- Name: Companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Companies" (
    id integer NOT NULL,
    name character varying(255),
    nit character varying(255),
    address character varying(255),
    phone character varying(255),
    sure character varying(255),
    website character varying(255),
    email character varying(255),
    filename character varying(255),
    key character varying(255),
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Companies" OWNER TO postgres;

--
-- Name: Companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Companies_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Companies_id_seq" OWNER TO postgres;

--
-- Name: Companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Companies_id_seq" OWNED BY public."Companies".id;


--
-- Name: Marks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Marks" (
    id integer NOT NULL,
    name character varying(255),
    code character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Marks" OWNER TO postgres;

--
-- Name: Marks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Marks_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Marks_id_seq" OWNER TO postgres;

--
-- Name: Marks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Marks_id_seq" OWNED BY public."Marks".id;


--
-- Name: Mesas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Mesas" (
    id integer NOT NULL,
    nro integer,
    estate character varying(255),
    deudor boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Mesas" OWNER TO postgres;

--
-- Name: Mesas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Mesas_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Mesas_id_seq" OWNER TO postgres;

--
-- Name: Mesas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Mesas_id_seq" OWNED BY public."Mesas".id;


CREATE TABLE public."Modules" (
    id integer NOT NULL,
    path character varying(255),
    name character varying(255),
    icon character varying(255),
    component character varying(255),
    layout character varying(255),
    enabled boolean,
    "rolId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Modules" OWNER TO postgres;

--
-- Name: Modules_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Modules_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Modules_id_seq" OWNER TO postgres;

--
-- Name: Modules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Modules_id_seq" OWNED BY public."Modules".id;


--
-- Name: Processes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Processes" (
    id integer NOT NULL,
    description character varying(255),
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Processes" OWNER TO postgres;

--
-- Name: Processes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Processes_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Processes_id_seq" OWNER TO postgres;

--
-- Name: Processes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Processes_id_seq" OWNED BY public."Processes".id;


--
-- Name: Recipients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Recipients" (
    id integer NOT NULL,
    disabled boolean,
    "razonSocial" character varying(255),
    "numOrd" character varying(255),
    importe numeric,
    concept character varying(255),
    nit character varying(255),
    label character varying(255),
    "clientId" integer,
    "saleId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Recipients" OWNER TO postgres;

--
-- Name: Recipients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Recipients_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Recipients_id_seq" OWNER TO postgres;

--
-- Name: Recipients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Recipients_id_seq" OWNED BY public."Recipients".id;


--
-- Name: Rols; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Rols" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Rols" OWNER TO postgres;

--
-- Name: Rols_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Rols_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Rols_id_seq" OWNER TO postgres;

--
-- Name: Rols_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Rols_id_seq" OWNED BY public."Rols".id;


--
-- Name: SaleItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SaleItems" (
    id integer NOT NULL,
    cantidad integer,
    "precioUnitario" numeric,
    "precioTotal" numeric,
    "saleId" integer,
    "articleId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."SaleItems" OWNER TO postgres;

--
-- Name: SaleItems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SaleItems_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SaleItems_id_seq" OWNER TO postgres;

--
-- Name: SaleItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SaleItems_id_seq" OWNED BY public."SaleItems".id;


--
-- Name: Sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Sales" (
    id integer NOT NULL,
    orden character varying(255),
    type character varying(255),
    estate character varying(255),
    cant integer,
    total integer,
    "mesaId" integer,
    "userId" integer,
    "clientId" integer,
    "createdAt" date NOT NULL,
    "updatedAt" date NOT NULL
);


ALTER TABLE public."Sales" OWNER TO postgres;

--
-- Name: Sales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Sales_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Sales_id_seq" OWNER TO postgres;

--
-- Name: Sales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Sales_id_seq" OWNED BY public."Sales".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: Tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tasks" (
    id integer NOT NULL,
    title character varying(255),
    start date,
    "end" date,
    "classNames" character varying(255),
    "backgroundColor" character varying(255),
    selectable boolean,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Tasks" OWNER TO postgres;

--
-- Name: Tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tasks_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Tasks_id_seq" OWNER TO postgres;

--
-- Name: Tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tasks_id_seq" OWNED BY public."Tasks".id;


--
-- Name: Types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Types" (
    id integer NOT NULL,
    name character varying(255),
    code character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Types" OWNER TO postgres;

--
-- Name: Types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Types_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Types_id_seq" OWNER TO postgres;

--
-- Name: Types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Types_id_seq" OWNED BY public."Types".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    enabled boolean,
    "branchId" integer,
    "rolId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    password character varying
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Articles" ALTER COLUMN id SET DEFAULT nextval('public."Articles_id_seq"'::regclass);


--
-- Name: BranchOffices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BranchOffices" ALTER COLUMN id SET DEFAULT nextval('public."BranchOffices_id_seq"'::regclass);


--
-- Name: CajaItems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CajaItems" ALTER COLUMN id SET DEFAULT nextval('public."CajaItems_id_seq"'::regclass);


--
-- Name: Cajas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cajas" ALTER COLUMN id SET DEFAULT nextval('public."Cajas_id_seq"'::regclass);


--
-- Name: Categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories" ALTER COLUMN id SET DEFAULT nextval('public."Categories_id_seq"'::regclass);


--
-- Name: Clients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clients" ALTER COLUMN id SET DEFAULT nextval('public."Clients_id_seq"'::regclass);


--
-- Name: Companies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Companies" ALTER COLUMN id SET DEFAULT nextval('public."Companies_id_seq"'::regclass);


--
-- Name: Marks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Marks" ALTER COLUMN id SET DEFAULT nextval('public."Marks_id_seq"'::regclass);


--
-- Name: Mesas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Mesas" ALTER COLUMN id SET DEFAULT nextval('public."Mesas_id_seq"'::regclass);



--
-- Name: Modules id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modules" ALTER COLUMN id SET DEFAULT nextval('public."Modules_id_seq"'::regclass);


--
-- Name: Processes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Processes" ALTER COLUMN id SET DEFAULT nextval('public."Processes_id_seq"'::regclass);


--
-- Name: Recipients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Recipients" ALTER COLUMN id SET DEFAULT nextval('public."Recipients_id_seq"'::regclass);


--
-- Name: Rols id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rols" ALTER COLUMN id SET DEFAULT nextval('public."Rols_id_seq"'::regclass);


--
-- Name: SaleItems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SaleItems" ALTER COLUMN id SET DEFAULT nextval('public."SaleItems_id_seq"'::regclass);


--
-- Name: Sales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sales" ALTER COLUMN id SET DEFAULT nextval('public."Sales_id_seq"'::regclass);


--
-- Name: Tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tasks" ALTER COLUMN id SET DEFAULT nextval('public."Tasks_id_seq"'::regclass);


--
-- Name: Types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Types" ALTER COLUMN id SET DEFAULT nextval('public."Types_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Articles" VALUES (9, 'Impresora Termica', '2432', 'Unidad', 0, 0, 0, 450, '1575436888697-image6s.jpg', 1, 1, 5, 0, false, 0, '', false, 7, 4, false, false, 'Compra', 250, 9, '2019-12-04 01:19:40.576-04', '2019-12-04 01:21:29.586-04');
INSERT INTO public."Articles" VALUES (10, 'Imac', '9985', 'Unidad', 0, 0, 0, 2544, '1575436917970-indFex.jpg', 1, 1, 1, 0, true, 0, '', false, 8, 4, false, false, 'Compra', 652, 41, '2019-12-04 01:20:23.309-04', '2019-12-04 01:21:58.599-04');
INSERT INTO public."Articles" VALUES (5, 'Portatil ACER', '874', 'Unidad', 0, 0, 0, 3500, '1575436394244-images.jpg', 1, 1, 1, 0, false, 0, '', false, 7, 3, false, false, 'Compra', 2500, 10, '2019-12-04 01:10:22.616-04', '2019-12-05 04:11:52.46-04');
INSERT INTO public."Articles" VALUES (7, 'Servidor IBM', '9985', 'Unidad', 0, 0, 0, 12000, '1575436356333-indessssx.jpg', 1, 1, 4, 0, false, 0, '', false, 0, 5, false, false, 'Compra', 8500, 15, '2019-12-04 01:11:49.085-04', '2019-12-07 04:17:19.121-04');
INSERT INTO public."Articles" VALUES (4, 'Servidor DUAL', '6454', 'Unidad', 0, 0, 0, 2500, '1575436364838-imagekkks.jpg', 1, 1, 4, 0, false, 0, '', false, 3, 2, false, false, 'Compra', 1500, 2, '2019-12-04 01:09:42.824-04', '2019-12-08 00:33:25.834-04');
INSERT INTO public."Articles" VALUES (8, 'Mac Proo', '2323', 'Unidad', 0, 0, 0, 8000, '1575436739615-icndex.jpg', 1, 1, 1, 0, false, 0, '', false, 2, 3, false, false, 'Compra', 6000, 12, '2019-12-04 01:18:49.264-04', '2019-12-08 00:33:25.835-04');
INSERT INTO public."Articles" VALUES (11, 'Impresora TER 5241', '0099', 'Unidad', 0, 0, 0, 1200, '1575436878537-inde4x.jpg', 1, 1, 5, 0, false, 0, '', false, 0, 4, false, false, 'Compra', 750, 7, '2019-12-04 01:21:05.701-04', '2019-12-05 03:35:22.126-04');
INSERT INTO public."Articles" VALUES (6, 'Portatil Toshiba', '3654', 'Unidad', 0, 0, 0, 6500, '1575436375690-irrndex.jpg', 1, 1, 1, 0, false, 0, '', false, 5, 3, false, false, 'Compra', 4500, 10, '2019-12-04 01:11:11.035-04', '2019-12-04 01:12:56.187-04');
INSERT INTO public."Articles" VALUES (3, 'Impresora HP 352', '9857', 'Unidad', 0, 0, 0, 800, '1575436402852-imagehhhs.jpg', 1, 1, 5, 0, false, 0, '', false, 10, 6, false, false, 'Compra', 600, 4, '2019-12-04 01:09:03.128-04', '2019-12-04 01:13:23.443-04');
INSERT INTO public."Articles" VALUES (1, 'Portatil HP 350', '4745887', '1', 1, 1, 1, 1500, '1575436002898-ima000ges.jpg', 1, 1, 1, 0, true, 10, 'Color Azul', true, 0, 5, true, false, 'dd', 850, 12, '2019-11-26 14:27:28.096-04', '2019-12-05 03:42:32.539-04');
INSERT INTO public."Articles" VALUES (2, 'Servidor 352 DELL', '2086156', 'Unidad', 12, 12, 12, 8000, '1574922001861-ABA2.png', 1, 1, 4, 0, false, 0, 'Detalles', false, 7, 5, false, false, 'Compra', 6500, 3, '2019-11-27 04:32:10.363-04', '2019-12-05 04:02:41.433-04');


--
-- Data for Name: BranchOffices; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."BranchOffices" VALUES (1, 'Sucursal La Paz', 'Av. Camacho', '36366', 'Gabirle', 1, '2019-11-10 01:52:45.042-04', '2019-11-10 01:52:45.042-04');


--
-- Data for Name: CajaItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."CajaItems" VALUES (68, 12, 30, 'ingreso', '2', '2019-11-30 20:11:04.124-04', '2019-11-30 20:11:14.107-04', false);
INSERT INTO public."CajaItems" VALUES (67, 12, 50, 'ingreso', '1', '2019-11-30 20:10:58.031-04', '2019-11-30 22:31:41.967-04', false);
INSERT INTO public."CajaItems" VALUES (69, 12, 100, 'ingreso', '', '2019-11-30 22:40:43.329-04', '2019-11-30 22:40:43.329-04', true);
INSERT INTO public."CajaItems" VALUES (70, 12, 12, 'ingreso', '', '2019-11-30 22:42:25.671-04', '2019-11-30 22:42:25.671-04', true);
INSERT INTO public."CajaItems" VALUES (71, 12, 123, 'ingreso', '', '2019-11-30 22:42:28.47-04', '2019-11-30 22:42:28.47-04', true);
INSERT INTO public."CajaItems" VALUES (72, 12, 60, 'egreso', '', '2019-11-30 22:42:32.447-04', '2019-11-30 22:42:32.447-04', true);
INSERT INTO public."CajaItems" VALUES (73, 12, 80, 'ingreso', '', '2019-11-30 22:42:37.954-04', '2019-11-30 22:42:37.954-04', true);
INSERT INTO public."CajaItems" VALUES (74, 12, 250, 'ingreso', '', '2019-11-30 22:42:44.435-04', '2019-11-30 22:42:44.435-04', true);
INSERT INTO public."CajaItems" VALUES (75, 12, 60, 'egreso', '', '2019-11-30 22:42:48.906-04', '2019-11-30 22:42:57.929-04', false);
INSERT INTO public."CajaItems" VALUES (76, 12, 12, 'egreso', '', '2019-11-30 22:44:23.097-04', '2019-11-30 22:44:23.097-04', true);
INSERT INTO public."CajaItems" VALUES (77, 12, 23, 'ingreso', '', '2019-11-30 22:46:32.684-04', '2019-11-30 22:46:32.684-04', true);
INSERT INTO public."CajaItems" VALUES (78, 12, 20, 'ingreso', '', '2019-11-30 23:17:48.409-04', '2019-11-30 23:17:48.409-04', true);
INSERT INTO public."CajaItems" VALUES (79, 12, 90, 'ingreso', '', '2019-11-30 23:18:00.849-04', '2019-11-30 23:18:00.849-04', true);
INSERT INTO public."CajaItems" VALUES (80, 13, 25, 'ingreso', '', '2019-12-01 00:26:54.186-04', '2019-12-01 00:26:54.186-04', true);
INSERT INTO public."CajaItems" VALUES (81, 13, 50, 'ingreso', 'wqw', '2019-12-01 00:35:05.158-04', '2019-12-01 00:35:05.158-04', true);
INSERT INTO public."CajaItems" VALUES (82, 13, 5, 'egreso', 's', '2019-12-01 00:41:33.136-04', '2019-12-01 00:41:33.136-04', true);
INSERT INTO public."CajaItems" VALUES (83, 13, 10, 'egreso', 'wqw', '2019-12-01 00:42:15.442-04', '2019-12-01 00:42:15.442-04', true);
INSERT INTO public."CajaItems" VALUES (84, 17, 25500, 'ingreso', 'ingreso por TPDV', '2019-12-05 03:42:32.715-04', '2019-12-05 03:42:32.715-04', true);
INSERT INTO public."CajaItems" VALUES (85, 17, 14000, 'ingreso', 'ingreso por TPDV', '2019-12-05 04:02:40.755-04', '2019-12-05 04:02:40.755-04', true);
INSERT INTO public."CajaItems" VALUES (86, 17, 6000, 'ingreso', 'ingreso por TPDV', '2019-12-05 04:08:56.651-04', '2019-12-05 04:08:56.651-04', true);
INSERT INTO public."CajaItems" VALUES (87, 17, 18000, 'ingreso', 'ingreso por TPDV', '2019-12-05 04:11:52.394-04', '2019-12-05 04:11:52.394-04', true);
INSERT INTO public."CajaItems" VALUES (88, 18, 5000, 'ingreso', 'ingreso por TPDV', '2019-12-07 03:51:54.8-04', '2019-12-07 03:51:54.8-04', true);
INSERT INTO public."CajaItems" VALUES (89, 19, 2500, 'ingreso', 'ingreso por TPDV', '2019-12-07 03:56:30.86-04', '2019-12-07 03:56:30.86-04', true);
INSERT INTO public."CajaItems" VALUES (90, 20, 16000, 'ingreso', 'ingreso por TPDV', '2019-12-08 00:24:43.656-04', '2019-12-08 00:24:43.656-04', true);
INSERT INTO public."CajaItems" VALUES (91, 20, 10500, 'ingreso', 'ingreso por TPDV', '2019-12-08 00:33:26.039-04', '2019-12-08 00:33:26.039-04', true);


--
-- Data for Name: Cajas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Cajas" VALUES (12, '2019-01-01', NULL, 100, 698, 192, 606, false, 1, '2019-12-01', '2019-12-01', 13);
INSERT INTO public."Cajas" VALUES (13, '2019-01-01', NULL, 60, 75, 15, 120, false, 1, '2019-12-01', '2019-12-01', 4);
INSERT INTO public."Cajas" VALUES (14, '2019-01-01', NULL, 60, 0, 0, 0, false, 1, '2019-12-01', '2019-12-01', 0);
INSERT INTO public."Cajas" VALUES (15, '2019-01-01', NULL, 50, 0, 0, 0, false, 1, '2019-12-04', '2019-12-05', 0);
INSERT INTO public."Cajas" VALUES (16, '2019-01-01', NULL, 50, 0, 0, 0, false, 1, '2019-12-05', '2019-12-05', 0);
INSERT INTO public."Cajas" VALUES (17, '2019-01-01', NULL, 80, 63500, 0, 63580, false, 1, '2019-12-05', '2019-12-06', 4);
INSERT INTO public."Cajas" VALUES (18, '2019-01-01', NULL, 100, 5000, 0, 5100, false, 1, '2019-12-07', '2019-12-07', 1);
INSERT INTO public."Cajas" VALUES (19, '2019-01-01', NULL, 20, 2500, 0, 2520, false, 1, '2019-12-07', '2019-12-07', 1);
INSERT INTO public."Cajas" VALUES (20, '2019-01-01', NULL, 50, 26500, 0, 26550, true, 1, '2019-12-08', '2019-12-08', 2);


--
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Categories" VALUES (1, 'Portatiles', '25412', '2019-11-26 14:23:09.671-04', '2019-12-02 23:02:46.321-04');
INSERT INTO public."Categories" VALUES (3, 'Cables', '55241', '2019-12-02 08:43:12.998-04', '2019-12-02 23:02:56.655-04');
INSERT INTO public."Categories" VALUES (11, 'Monitores', 'cat 10', '2019-12-02 17:00:02.144-04', '2019-12-02 23:03:07.575-04');
INSERT INTO public."Categories" VALUES (12, 'Teclados', 'cat 11', '2019-12-02 17:00:09.548-04', '2019-12-02 23:03:22.034-04');
INSERT INTO public."Categories" VALUES (4, 'Servidores', '9635', '2019-12-02 16:59:16.382-04', '2019-12-04 01:07:15.477-04');
INSERT INTO public."Categories" VALUES (5, 'Impresoras', '963', '2019-12-02 16:59:24.893-04', '2019-12-04 01:07:26.232-04');


--
-- Data for Name: Clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Clients" VALUES (2, 'Gabriel', 'jdfhgld', '755847854', '4745887', '2019-12-02 02:40:41.016-04', '2019-12-02 03:02:48.22-04');
INSERT INTO public."Clients" VALUES (1, 'pepe', 'av algo', '78554476', '2086156', '2019-12-01 18:55:24.29806-04', '2019-12-01 18:55:24.29806-04');


--
-- Data for Name: Companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Companies" VALUES (1, 'administrador', '4745887013', 'Av. Cañoto Nro. 123', '78554476', '4744451', 'beggu.net', 'gabgpa@gmail.com', 'default.jpg', '2155487541', '2018-12-31 20:00:00-04', '2018-12-31 20:00:00-04', '2019-11-10 01:50:13.717-04', '2019-11-10 01:51:09.703-04');


--
-- Data for Name: Marks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Marks" VALUES (1, 'Marca 1pepe', '4745887', '2019-11-26 14:11:21.93-04', '2019-11-27 04:00:25.251-04');


--
-- Data for Name: Mesas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Mesas" VALUES (1, 1, 'uno', true, '2019-12-03 14:10:23.644752-04', '2019-12-03 14:11:55.833-04');


--
-- Data for Name: Modules; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Modules" VALUES (4, '/cajas', 'Cajas', 'fas fa-cash-register', 'Cajas', '/admin', true, 1, '2019-11-26 17:57:44.07165-04', '2019-11-26 17:57:44.07165-04');
INSERT INTO public."Modules" VALUES (7, '/reportes', 'Reportes', 'fas fa-file', 'Reportes', '/admin', true, 1, '2019-11-26 18:04:59.029386-04', '2019-11-26 18:04:59.029386-04');
INSERT INTO public."Modules" VALUES (3, '/dashboard', 'Dashboard', 'fas fa-tachometer-alt', 'Dashboard', '/admin', true, 1, '2019-11-14 22:54:18.137793-04', '2019-11-14 22:54:18.137793-04');
INSERT INTO public."Modules" VALUES (8, '/articulos', 'Articulos', 'fas fa-box', 'Articulos', '/admin', true, 1, '2019-11-26 18:11:20.120224-04', '2019-11-26 18:11:20.120224-04');
INSERT INTO public."Modules" VALUES (6, '/ventas', 'Ventas', 'fas fa-desktop', 'Ventas', '/admin', true, 1, '2019-11-26 18:04:07.922983-04', '2019-11-26 18:04:07.922983-04');
INSERT INTO public."Modules" VALUES (9, '/clientes', 'Clientes', 'fa fa-users', 'Clientes', '/admin', true, 1, '2019-12-01 08:54:15.886606-04', '2019-12-01 08:54:15.886606-04');


--
-- Data for Name: Processes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Recipients; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Recipients" VALUES (1, false, 'pepe', NULL, 200, 'VENTA TPDV', '2086156', 'Venta de productos al contado', 1, 9, '2019-12-03 09:11:04.381-04', '2019-12-03 09:11:04.381-04');
INSERT INTO public."Recipients" VALUES (2, false, 'pepe', NULL, 200, 'VENTA TPDV', '2086156', 'Venta de productos al contado', 1, 10, '2019-12-03 13:36:27.588-04', '2019-12-03 13:36:27.588-04');
INSERT INTO public."Recipients" VALUES (3, false, 'pepe', NULL, 200, 'VENTA TPDV', '2086156', 'Venta de productos al contado', 1, 11, '2019-12-03 13:37:40.201-04', '2019-12-03 13:37:40.201-04');
INSERT INTO public."Recipients" VALUES (4, false, 'Gabriel', NULL, NULL, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 17, '2019-12-05 03:24:19.82-04', '2019-12-05 03:24:19.82-04');
INSERT INTO public."Recipients" VALUES (5, false, 'Gabriel', NULL, 14700, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 15, '2019-12-05 03:27:26.062-04', '2019-12-05 03:27:26.062-04');
INSERT INTO public."Recipients" VALUES (6, false, 'Gabriel', NULL, 14700, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 16, '2019-12-05 03:30:55.609-04', '2019-12-05 03:30:55.609-04');
INSERT INTO public."Recipients" VALUES (7, false, 'Gabriel', NULL, 14700, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 18, '2019-12-05 03:32:11.151-04', '2019-12-05 03:32:11.151-04');
INSERT INTO public."Recipients" VALUES (8, false, 'Gabriel', NULL, 14700, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 19, '2019-12-05 03:32:27.537-04', '2019-12-05 03:32:27.537-04');
INSERT INTO public."Recipients" VALUES (9, false, 'Gabriel', NULL, 14700, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 20, '2019-12-05 03:35:10.794-04', '2019-12-05 03:35:10.794-04');
INSERT INTO public."Recipients" VALUES (10, false, 'Gabriel', NULL, 14700, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 21, '2019-12-05 03:35:22.208-04', '2019-12-05 03:35:22.208-04');
INSERT INTO public."Recipients" VALUES (11, false, 'Gabriel', NULL, 13500, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 22, '2019-12-05 03:41:56.035-04', '2019-12-05 03:41:56.035-04');
INSERT INTO public."Recipients" VALUES (12, false, 'Gabriel', NULL, 25500, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 23, '2019-12-05 03:42:32.606-04', '2019-12-05 03:42:32.606-04');
INSERT INTO public."Recipients" VALUES (13, false, 'Gabriel', NULL, 14000, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 24, '2019-12-05 04:02:41.447-04', '2019-12-05 04:02:41.447-04');
INSERT INTO public."Recipients" VALUES (14, false, 'Gabriel', NULL, 6000, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 25, '2019-12-05 04:08:56.54-04', '2019-12-05 04:08:56.54-04');
INSERT INTO public."Recipients" VALUES (15, false, 'Gabriel', NULL, 18000, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 26, '2019-12-05 04:11:52.51-04', '2019-12-05 04:11:52.51-04');
INSERT INTO public."Recipients" VALUES (16, false, 'Gabriel', NULL, 5000, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 27, '2019-12-07 03:51:54.96-04', '2019-12-07 03:51:54.96-04');
INSERT INTO public."Recipients" VALUES (17, false, 'Gabriel', NULL, 2500, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 28, '2019-12-07 03:56:31.127-04', '2019-12-07 03:56:31.127-04');
INSERT INTO public."Recipients" VALUES (18, false, 'Gabriel', NULL, 16000, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 29, '2019-12-08 00:24:43.763-04', '2019-12-08 00:24:43.763-04');
INSERT INTO public."Recipients" VALUES (19, false, 'Gabriel', NULL, 10500, 'VENTA TPDV', '4745887', 'Venta de productos al contado', 2, 30, '2019-12-08 00:33:25.882-04', '2019-12-08 00:33:25.882-04');


--
-- Data for Name: Rols; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Rols" VALUES (1, 'rr', '2019-11-09 07:05:17.817756-04', '2019-11-09 07:05:17.817756-04');
INSERT INTO public."Rols" VALUES (2, 'administradorsss', '2019-11-09 07:06:57.562-04', '2019-11-09 07:08:06.755-04');


--
-- Data for Name: SaleItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."SaleItems" VALUES (2, 2, 20, 30, 3, NULL, '2019-12-03 08:32:55.019-04', '2019-12-03 08:32:55.019-04');
INSERT INTO public."SaleItems" VALUES (3, 2, 10, 20, 4, 1, '2019-12-03 08:34:02.76-04', '2019-12-03 08:34:02.76-04');
INSERT INTO public."SaleItems" VALUES (45, 1, 12000, 12000, 22, 7, '2019-12-05 03:41:55.99-04', '2019-12-05 03:41:55.99-04');
INSERT INTO public."SaleItems" VALUES (4, 2, 20, 30, 4, 2, '2019-12-03 08:34:02.76-04', '2019-12-03 08:34:02.76-04');
INSERT INTO public."SaleItems" VALUES (46, 1, 1500, 1500, 23, 1, '2019-12-05 03:42:32.539-04', '2019-12-05 03:42:32.539-04');
INSERT INTO public."SaleItems" VALUES (5, 2, 10, 20, 5, 1, '2019-12-03 08:39:55.926-04', '2019-12-03 08:39:55.926-04');
INSERT INTO public."SaleItems" VALUES (23, 1, 1200, 1200, 17, 11, '2019-12-05 03:24:19.789-04', '2019-12-05 03:24:19.789-04');
INSERT INTO public."SaleItems" VALUES (47, 2, 12000, 24000, 23, 7, '2019-12-05 03:42:32.539-04', '2019-12-05 03:42:32.539-04');
INSERT INTO public."SaleItems" VALUES (56, 2, 2500, 5000, 27, 4, '2019-12-07 03:51:54.926-04', '2019-12-07 03:51:54.926-04');
INSERT INTO public."SaleItems" VALUES (58, 2, 8000, 16000, 29, 8, '2019-12-08 00:24:43.73-04', '2019-12-08 00:24:43.73-04');
INSERT INTO public."SaleItems" VALUES (6, 2, 20, 30, 5, 2, '2019-12-03 08:39:55.927-04', '2019-12-03 08:39:55.927-04');
INSERT INTO public."SaleItems" VALUES (24, 1, 1500, 1500, 17, 1, '2019-12-05 03:24:19.79-04', '2019-12-05 03:24:19.79-04');
INSERT INTO public."SaleItems" VALUES (48, 1, 8000, 8000, 24, 2, '2019-12-05 04:02:41.431-04', '2019-12-05 04:02:41.431-04');
INSERT INTO public."SaleItems" VALUES (57, 1, 2500, 2500, 28, 4, '2019-12-07 03:56:31.098-04', '2019-12-07 03:56:31.098-04');
INSERT INTO public."SaleItems" VALUES (59, 1, 2500, 2500, 30, 4, '2019-12-08 00:33:25.834-04', '2019-12-08 00:33:25.834-04');
INSERT INTO public."SaleItems" VALUES (7, 2, 10, 20, 6, 1, '2019-12-03 09:07:35.459-04', '2019-12-03 09:07:35.459-04');
INSERT INTO public."SaleItems" VALUES (25, 1, 12000, 12000, 17, 7, '2019-12-05 03:24:19.79-04', '2019-12-05 03:24:19.79-04');
INSERT INTO public."SaleItems" VALUES (49, 1, 2500, 2500, 24, 4, '2019-12-05 04:02:41.432-04', '2019-12-05 04:02:41.432-04');
INSERT INTO public."SaleItems" VALUES (60, 1, 8000, 8000, 30, 8, '2019-12-08 00:33:25.834-04', '2019-12-08 00:33:25.834-04');
INSERT INTO public."SaleItems" VALUES (8, 2, 20, 30, 6, 2, '2019-12-03 09:07:35.46-04', '2019-12-03 09:07:35.46-04');
INSERT INTO public."SaleItems" VALUES (26, 1, 12000, 12000, 15, 7, '2019-12-05 03:27:26-04', '2019-12-05 03:27:26-04');
INSERT INTO public."SaleItems" VALUES (50, 1, 3500, 3500, 24, 5, '2019-12-05 04:02:41.432-04', '2019-12-05 04:02:41.432-04');
INSERT INTO public."SaleItems" VALUES (9, 2, 10, 20, 7, 1, '2019-12-03 09:08:24.521-04', '2019-12-03 09:08:24.521-04');
INSERT INTO public."SaleItems" VALUES (27, 1, 1500, 1500, 15, 1, '2019-12-05 03:27:26-04', '2019-12-05 03:27:26-04');
INSERT INTO public."SaleItems" VALUES (51, 1, 3500, 3500, 25, 5, '2019-12-05 04:08:56.49-04', '2019-12-05 04:08:56.49-04');
INSERT INTO public."SaleItems" VALUES (10, 2, 20, 30, 7, 2, '2019-12-03 09:08:24.522-04', '2019-12-03 09:08:24.522-04');
INSERT INTO public."SaleItems" VALUES (28, 1, 1200, 1200, 15, 11, '2019-12-05 03:27:26-04', '2019-12-05 03:27:26-04');
INSERT INTO public."SaleItems" VALUES (52, 1, 2500, 2500, 25, 4, '2019-12-05 04:08:56.49-04', '2019-12-05 04:08:56.49-04');
INSERT INTO public."SaleItems" VALUES (11, 2, 10, 20, 8, 1, '2019-12-03 09:10:21.797-04', '2019-12-03 09:10:21.797-04');
INSERT INTO public."SaleItems" VALUES (29, 1, 1200, 1200, 16, 11, '2019-12-05 03:30:55.548-04', '2019-12-05 03:30:55.548-04');
INSERT INTO public."SaleItems" VALUES (53, 1, 12000, 12000, 26, 7, '2019-12-05 04:11:52.459-04', '2019-12-05 04:11:52.459-04');
INSERT INTO public."SaleItems" VALUES (12, 2, 20, 30, 8, 2, '2019-12-03 09:10:21.797-04', '2019-12-03 09:10:21.797-04');
INSERT INTO public."SaleItems" VALUES (30, 1, 1500, 1500, 16, 1, '2019-12-05 03:30:55.549-04', '2019-12-05 03:30:55.549-04');
INSERT INTO public."SaleItems" VALUES (54, 1, 2500, 2500, 26, 4, '2019-12-05 04:11:52.459-04', '2019-12-05 04:11:52.459-04');
INSERT INTO public."SaleItems" VALUES (13, 2, 10, 20, 9, 1, '2019-12-03 09:11:04.341-04', '2019-12-03 09:11:04.341-04');
INSERT INTO public."SaleItems" VALUES (31, 1, 12000, 12000, 16, 7, '2019-12-05 03:30:55.549-04', '2019-12-05 03:30:55.549-04');
INSERT INTO public."SaleItems" VALUES (55, 1, 3500, 3500, 26, 5, '2019-12-05 04:11:52.459-04', '2019-12-05 04:11:52.459-04');
INSERT INTO public."SaleItems" VALUES (14, 2, 20, 30, 9, 2, '2019-12-03 09:11:04.342-04', '2019-12-03 09:11:04.342-04');
INSERT INTO public."SaleItems" VALUES (32, 1, 1200, 1200, 18, 11, '2019-12-05 03:32:11.125-04', '2019-12-05 03:32:11.125-04');
INSERT INTO public."SaleItems" VALUES (35, 1, 1200, 1200, 19, 11, '2019-12-05 03:32:27.485-04', '2019-12-05 03:32:27.485-04');
INSERT INTO public."SaleItems" VALUES (15, 2, 10, 20, 10, 1, '2019-12-03 13:36:27.551-04', '2019-12-03 13:36:27.551-04');
INSERT INTO public."SaleItems" VALUES (33, 1, 1500, 1500, 18, 1, '2019-12-05 03:32:11.125-04', '2019-12-05 03:32:11.125-04');
INSERT INTO public."SaleItems" VALUES (16, 2, 20, 30, 10, 2, '2019-12-03 13:36:27.551-04', '2019-12-03 13:36:27.551-04');
INSERT INTO public."SaleItems" VALUES (34, 1, 12000, 12000, 18, 7, '2019-12-05 03:32:11.125-04', '2019-12-05 03:32:11.125-04');
INSERT INTO public."SaleItems" VALUES (17, 2, 10, 20, 11, 1, '2019-12-03 13:37:40.18-04', '2019-12-03 13:37:40.18-04');
INSERT INTO public."SaleItems" VALUES (36, 1, 1500, 1500, 19, 1, '2019-12-05 03:32:27.485-04', '2019-12-05 03:32:27.485-04');
INSERT INTO public."SaleItems" VALUES (18, 2, 20, 30, 11, 2, '2019-12-03 13:37:40.181-04', '2019-12-03 13:37:40.181-04');
INSERT INTO public."SaleItems" VALUES (37, 1, 12000, 12000, 19, 7, '2019-12-05 03:32:27.485-04', '2019-12-05 03:32:27.485-04');
INSERT INTO public."SaleItems" VALUES (19, 2, 10, 20, 12, 1, '2019-12-03 14:11:32.027-04', '2019-12-03 14:11:32.027-04');
INSERT INTO public."SaleItems" VALUES (38, 1, 1200, 1200, 20, 11, '2019-12-05 03:35:10.762-04', '2019-12-05 03:35:10.762-04');
INSERT INTO public."SaleItems" VALUES (41, 1, 1200, 1200, 21, 11, '2019-12-05 03:35:22.126-04', '2019-12-05 03:35:22.126-04');
INSERT INTO public."SaleItems" VALUES (20, 2, 20, 30, 12, 2, '2019-12-03 14:11:32.028-04', '2019-12-03 14:11:32.028-04');
INSERT INTO public."SaleItems" VALUES (39, 1, 1500, 1500, 20, 1, '2019-12-05 03:35:10.762-04', '2019-12-05 03:35:10.762-04');
INSERT INTO public."SaleItems" VALUES (21, 2, 10, 20, 13, 1, '2019-12-03 14:11:55.83-04', '2019-12-03 14:11:55.83-04');
INSERT INTO public."SaleItems" VALUES (40, 1, 12000, 12000, 20, 7, '2019-12-05 03:35:10.762-04', '2019-12-05 03:35:10.762-04');
INSERT INTO public."SaleItems" VALUES (22, 2, 20, 30, 13, 2, '2019-12-03 14:11:55.831-04', '2019-12-03 14:11:55.831-04');
INSERT INTO public."SaleItems" VALUES (43, 1, 1500, 1500, 21, 1, '2019-12-05 03:35:22.126-04', '2019-12-05 03:35:22.126-04');
INSERT INTO public."SaleItems" VALUES (42, 1, 12000, 12000, 21, 7, '2019-12-05 03:35:22.126-04', '2019-12-05 03:35:22.126-04');
INSERT INTO public."SaleItems" VALUES (44, 1, 1500, 1500, 22, 1, '2019-12-05 03:41:55.99-04', '2019-12-05 03:41:55.99-04');
INSERT INTO public."SaleItems" VALUES (1, 2, 10, 20, 3, NULL, '2019-12-03 08:32:55.019-04', '2019-12-03 08:32:55.019-04');


--
-- Data for Name: Sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Sales" VALUES (1, '1', 'terminal', NULL, 10, 200, NULL, 1, 1, '2019-12-03', '2019-12-03');
INSERT INTO public."Sales" VALUES (2, '2', 'terminal', 'pagado', 10, 200, NULL, 1, 1, '2019-12-03', '2019-12-03');
INSERT INTO public."Sales" VALUES (3, '80', 'terminal', 'pagado', 10, 200, NULL, 1, 1, '2019-12-03', '2019-12-03');
INSERT INTO public."Sales" VALUES (4, '80', 'terminal', 'pagado', 10, 200, NULL, 1, 1, '2019-12-03', '2019-12-03');
INSERT INTO public."Sales" VALUES (5, '100', 'terminal', 'pagado', 10, 200, NULL, 1, 1, '2019-12-03', '2019-12-03');
INSERT INTO public."Sales" VALUES (6, '200', 'terminal', 'pagado', 10, 200, NULL, 1, 1, '2019-12-03', '2019-12-03');
INSERT INTO public."Sales" VALUES (7, '200', 'terminal', 'pagado', 10, 200, NULL, 1, 1, '2019-12-03', '2019-12-03');
INSERT INTO public."Sales" VALUES (8, '300', 'terminal', 'pagado', 10, 200, NULL, 1, 1, '2019-12-03', '2019-12-03');
INSERT INTO public."Sales" VALUES (9, '300', 'terminal', 'pagado', 10, 200, NULL, 1, 1, '2019-12-03', '2019-12-03');
INSERT INTO public."Sales" VALUES (10, '300', 'terminal', 'pagado', 10, 200, NULL, 1, 1, '2019-12-03', '2019-12-03');
INSERT INTO public."Sales" VALUES (11, '300', 'terminal', 'pagado', 10, 200, NULL, 1, 1, '2019-12-03', '2019-12-03');
INSERT INTO public."Sales" VALUES (17, NULL, 'contado', NULL, NULL, NULL, NULL, 1, 2, '2019-12-04', '2019-12-05');
INSERT INTO public."Sales" VALUES (15, '0', 'contado', 'pendiente', 3, 14700, NULL, 1, 2, '2019-12-05', '2019-12-05');
INSERT INTO public."Sales" VALUES (16, '0', 'contado', 'pendiente', 3, 14700, NULL, 1, 2, '2019-12-05', '2019-12-05');
INSERT INTO public."Sales" VALUES (18, '0', 'contado', 'pendiente', 3, 14700, NULL, 1, 2, '2019-12-05', '2019-12-05');
INSERT INTO public."Sales" VALUES (19, '0', 'contado', 'pendiente', 3, 14700, NULL, 1, 2, '2019-12-05', '2019-12-05');
INSERT INTO public."Sales" VALUES (20, '0', 'contado', 'pendiente', 3, 14700, NULL, 1, 2, '2019-12-05', '2019-12-05');
INSERT INTO public."Sales" VALUES (21, '0', 'contado', 'pendiente', 3, 14700, NULL, 1, 2, '2019-12-05', '2019-12-05');
INSERT INTO public."Sales" VALUES (22, '0', 'contado', 'pendiente', 2, 13500, NULL, 1, 2, '2019-12-05', '2019-12-05');
INSERT INTO public."Sales" VALUES (23, '0', 'contado', 'pendiente', 3, 25500, NULL, 1, 2, '2019-12-05', '2019-12-05');
INSERT INTO public."Sales" VALUES (24, '0', 'contado', 'pendiente', 3, 14000, NULL, 1, 2, '2019-12-05', '2019-12-05');
INSERT INTO public."Sales" VALUES (25, '0', 'contado', 'pendiente', 2, 6000, NULL, 1, 2, '2019-12-05', '2019-12-05');
INSERT INTO public."Sales" VALUES (26, '0', 'contado', 'pendiente', 3, 18000, NULL, 1, 2, '2019-12-05', '2019-12-05');
INSERT INTO public."Sales" VALUES (12, '400', 'terminal', 'pagado', 10, 200, 1, 1, 1, '2019-12-03', '2019-12-03');
INSERT INTO public."Sales" VALUES (13, '400', 'terminal', 'pagado', 10, 200, 1, 1, 1, '2019-12-03', '2019-12-03');
INSERT INTO public."Sales" VALUES (27, '0', 'contado', 'pendiente', 2, 5000, NULL, 1, 2, '2019-12-07', '2019-12-07');
INSERT INTO public."Sales" VALUES (28, '0', 'contado', 'pendiente', 1, 2500, NULL, 1, 2, '2019-12-07', '2019-12-07');
INSERT INTO public."Sales" VALUES (29, '0', 'contado', 'pendiente', 2, 16000, NULL, 1, 2, '2019-12-08', '2019-12-08');
INSERT INTO public."Sales" VALUES (30, '0', 'contado', 'pendiente', 2, 10500, NULL, 1, 2, '2019-12-08', '2019-12-08');


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."SequelizeMeta" VALUES ('20191109094001-create-company.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191109094002-create-branch-office.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191109094008-create-rol.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191109094009-create-user.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191109094329-create-process.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191109094521-create-module.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191110114902-create-message.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191110114924-create-task.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191126173523-create-category.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191126173533-create-type.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191126173539-create-mark.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191126173553-create-article.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191129053043-create-caja.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191129053054-create-caja-item.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191201163745-create-client.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191201163751-create-mesa.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191201163759-create-sale.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191201163811-create-sale-items.js');
INSERT INTO public."SequelizeMeta" VALUES ('20191203110806-create-recipient.js');


--
-- Data for Name: Tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Tasks" VALUES (2, 'asas', '2019-11-13', '2019-11-13', NULL, '#fd5d93', NULL, 1, '2019-11-13 00:25:33.845-04', '2019-11-13 00:25:33.845-04');
INSERT INTO public."Tasks" VALUES (3, 'asas', '2019-11-13', '2019-11-13', NULL, '#fd5d93', NULL, 1, '2019-11-13 00:28:05.471-04', '2019-11-13 00:28:05.471-04');
INSERT INTO public."Tasks" VALUES (4, 'asasa', '2019-10-30', '2019-10-30', NULL, '#26e413', NULL, 1, '2019-11-13 00:28:52.572-04', '2019-11-13 00:28:52.572-04');
INSERT INTO public."Tasks" VALUES (5, 'asasa', '2019-11-13', '2019-11-13', NULL, '#26e413', NULL, 1, '2019-11-13 00:29:28.418-04', '2019-11-13 00:29:28.418-04');
INSERT INTO public."Tasks" VALUES (8, 'asas', '2019-11-01', '2019-11-01', NULL, '#26e413', NULL, 1, '2019-11-13 00:30:17.39-04', '2019-11-13 00:30:17.39-04');
INSERT INTO public."Tasks" VALUES (9, 'asas', '2019-11-02', '2019-11-02', NULL, '#fd5d93', NULL, 1, '2019-11-13 00:30:23.235-04', '2019-11-13 00:30:23.235-04');
INSERT INTO public."Tasks" VALUES (11, 'qwqw', '2019-11-14', '2019-11-14', NULL, '#26e413', NULL, 1, '2019-11-13 00:32:40.349-04', '2019-11-13 00:32:40.349-04');
INSERT INTO public."Tasks" VALUES (12, 'asas', '2019-11-15', '2019-11-15', NULL, '#26e413', true, 1, '2019-11-13 00:33:33.407-04', '2019-11-13 00:33:33.407-04');
INSERT INTO public."Tasks" VALUES (14, 'asas', '2019-11-20', '2019-11-20', NULL, '#1da1f2', NULL, 1, '2019-11-13 01:34:27.493-04', '2019-11-13 01:34:27.493-04');
INSERT INTO public."Tasks" VALUES (15, 'sadasd', '2019-11-23', '2019-11-23', NULL, '#26e413', NULL, 1, '2019-11-13 01:37:00.552-04', '2019-11-13 01:37:00.552-04');
INSERT INTO public."Tasks" VALUES (17, 'qwe', '2019-11-22', '2019-11-22', NULL, '#fd5d93', false, 1, '2019-11-13 02:16:26.466-04', '2019-11-13 02:16:26.466-04');
INSERT INTO public."Tasks" VALUES (18, 'Ejercicios planiicados de daros ', '2019-11-27', '2019-11-27', NULL, '#26e413', false, 1, '2019-11-13 02:16:40.396-04', '2019-11-13 02:16:40.396-04');
INSERT INTO public."Tasks" VALUES (16, 'asas', '2019-11-06', '2019-11-06', 'disabled', '#fd5d93', true, 1, '2019-11-13 01:37:33.592-04', '2019-11-13 01:37:33.592-04');
INSERT INTO public."Tasks" VALUES (19, 'sdf', '2019-11-13', '2019-11-13', NULL, '#26e413', false, 1, '2019-11-13 02:25:57.598-04', '2019-11-13 02:25:57.598-04');
INSERT INTO public."Tasks" VALUES (20, 'asdasd', '2019-11-13', '2019-11-13', NULL, '#fd5d93', false, 1, '2019-11-13 02:26:01.822-04', '2019-11-13 02:26:01.822-04');
INSERT INTO public."Tasks" VALUES (21, 'qwqw', '2019-11-07', '2019-11-07', NULL, '#fd5d93', false, 1, '2019-11-13 04:42:10.906-04', '2019-11-13 04:42:10.906-04');
INSERT INTO public."Tasks" VALUES (22, 'Segunda tares de asignacion', '2019-12-07', '2019-12-07', NULL, '#fd5d93', false, 1, '2019-11-13 04:57:13.808-04', '2019-11-13 04:57:13.808-04');
INSERT INTO public."Tasks" VALUES (23, 'qwqwqwqwq', '2019-11-18', '2019-11-18', NULL, '#1da1f2', false, 1, '2019-11-13 04:58:15.419-04', '2019-11-13 04:58:15.419-04');
INSERT INTO public."Tasks" VALUES (24, 'qwqwqw', '2019-12-05', '2019-12-05', NULL, '#1da1f2', false, 1, '2019-11-13 04:58:19.473-04', '2019-11-13 04:58:19.473-04');
INSERT INTO public."Tasks" VALUES (25, 'asas', '2019-11-12', '2019-11-12', NULL, '#26e413', false, 1, '2019-11-14 19:24:14.566-04', '2019-11-14 19:24:14.566-04');
INSERT INTO public."Tasks" VALUES (26, 'asdasd', '2019-11-05', '2019-11-05', NULL, '#26e413', false, 1, '2019-11-14 19:24:36.114-04', '2019-11-14 19:24:36.114-04');
INSERT INTO public."Tasks" VALUES (27, 'sdsd', '2019-11-16', '2019-11-16', NULL, '#1da1f2', false, 1, '2019-11-26 18:09:13.861-04', '2019-11-26 18:09:13.861-04');
INSERT INTO public."Tasks" VALUES (28, 'dfgd', '2019-12-06', '2019-12-06', NULL, '#fd5d93', false, 1, '2019-12-07 02:21:11.842-04', '2019-12-07 02:21:11.842-04');
INSERT INTO public."Tasks" VALUES (29, '2541', '2019-12-03', '2019-12-03', NULL, '#26e413', false, 1, '2019-12-08 02:19:12.521-04', '2019-12-08 02:19:12.521-04');
INSERT INTO public."Tasks" VALUES (30, 'fdsf', '2019-12-03', '2019-12-03', NULL, '#26e413', false, 1, '2019-12-08 02:19:21.229-04', '2019-12-08 02:19:21.229-04');


--
-- Data for Name: Types; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Types" VALUES (2, 'segundo', 'segundo', '2019-11-27 02:27:47.744-04', '2019-11-27 02:32:42.855-04');
INSERT INTO public."Types" VALUES (1, 'Tipo 1', '3214', '2019-11-26 14:22:47.583-04', '2019-11-27 04:00:15.651-04');


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Users" VALUES (1, 'adminu', 'adminu', true, 1, 1, '2019-11-10 01:57:35.62-04', '2019-11-10 08:30:00.397-04', '$2a$10$ZRkJ7QnDXfGvzGMjFbdBZOw5bAWKLwBfg3QxMOeFIUjhn7lHZUt9S');
INSERT INTO public."Users" VALUES (9, 'name99', 'usuario2', true, 1, 1, '2019-11-11 09:43:36.293-04', '2019-11-12 20:30:53.897-04', '$2a$10$Ed.rgRG.Rw7E.po3WKcVme7cOC4HIdOVbTQnsetgHiZWKSQ.nX2Ji');


--
-- Name: Articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Articles_id_seq"', 11, true);


--
-- Name: BranchOffices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."BranchOffices_id_seq"', 1, true);


--
-- Name: CajaItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CajaItems_id_seq"', 91, true);


--
-- Name: Cajas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cajas_id_seq"', 20, true);


--
-- Name: Categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Categories_id_seq"', 12, true);


--
-- Name: Clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Clients_id_seq"', 2, true);


--
-- Name: Companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Companies_id_seq"', 1, true);


--
-- Name: Marks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Marks_id_seq"', 3, true);


--
-- Name: Mesas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Mesas_id_seq"', 1, true);

--
-- Name: Modules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Modules_id_seq"', 9, true);


--
-- Name: Processes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Processes_id_seq"', 1, false);


--
-- Name: Recipients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Recipients_id_seq"', 19, true);


--
-- Name: Rols_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Rols_id_seq"', 2, true);


--
-- Name: SaleItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SaleItems_id_seq"', 60, true);


--
-- Name: Sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Sales_id_seq"', 30, true);


--
-- Name: Tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tasks_id_seq"', 30, true);


--
-- Name: Types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Types_id_seq"', 2, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 10, true);


--
-- Name: Articles Articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Articles"
    ADD CONSTRAINT "Articles_pkey" PRIMARY KEY (id);


--
-- Name: BranchOffices BranchOffices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BranchOffices"
    ADD CONSTRAINT "BranchOffices_pkey" PRIMARY KEY (id);


--
-- Name: CajaItems CajaItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CajaItems"
    ADD CONSTRAINT "CajaItems_pkey" PRIMARY KEY (id);


--
-- Name: Cajas Cajas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cajas"
    ADD CONSTRAINT "Cajas_pkey" PRIMARY KEY (id);


--
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);


--
-- Name: Clients Clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_pkey" PRIMARY KEY (id);


--
-- Name: Companies Companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Companies"
    ADD CONSTRAINT "Companies_pkey" PRIMARY KEY (id);


--
-- Name: Marks Marks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Marks"
    ADD CONSTRAINT "Marks_pkey" PRIMARY KEY (id);


--
-- Name: Mesas Mesas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Mesas"
    ADD CONSTRAINT "Mesas_pkey" PRIMARY KEY (id);


--
-- Name: Modules Modules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modules"
    ADD CONSTRAINT "Modules_pkey" PRIMARY KEY (id);


--
-- Name: Processes Processes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Processes"
    ADD CONSTRAINT "Processes_pkey" PRIMARY KEY (id);


--
-- Name: Recipients Recipients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Recipients"
    ADD CONSTRAINT "Recipients_pkey" PRIMARY KEY (id);


--
-- Name: Rols Rols_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rols"
    ADD CONSTRAINT "Rols_pkey" PRIMARY KEY (id);


--
-- Name: SaleItems SaleItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SaleItems"
    ADD CONSTRAINT "SaleItems_pkey" PRIMARY KEY (id);


--
-- Name: Sales Sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Tasks Tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tasks"
    ADD CONSTRAINT "Tasks_pkey" PRIMARY KEY (id);


--
-- Name: Types Types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Types"
    ADD CONSTRAINT "Types_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Articles Articles_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Articles"
    ADD CONSTRAINT "Articles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Categories"(id);


--
-- Name: Articles Articles_markId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Articles"
    ADD CONSTRAINT "Articles_markId_fkey" FOREIGN KEY ("markId") REFERENCES public."Marks"(id);


--
-- Name: Articles Articles_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Articles"
    ADD CONSTRAINT "Articles_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public."Types"(id);


--
-- Name: BranchOffices BranchOffices_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BranchOffices"
    ADD CONSTRAINT "BranchOffices_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Companies"(id);


--
-- Name: CajaItems CajaItems_cajaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CajaItems"
    ADD CONSTRAINT "CajaItems_cajaId_fkey" FOREIGN KEY ("cajaId") REFERENCES public."Cajas"(id);


--
-- Name: Cajas Cajas_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cajas"
    ADD CONSTRAINT "Cajas_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id);

--
-- Name: Modules Modules_rolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modules"
    ADD CONSTRAINT "Modules_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES public."Rols"(id);


--
-- Name: Processes Processes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Processes"
    ADD CONSTRAINT "Processes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id);


--
-- Name: Recipients Recipients_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Recipients"
    ADD CONSTRAINT "Recipients_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."Clients"(id);


--
-- Name: Recipients Recipients_saleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Recipients"
    ADD CONSTRAINT "Recipients_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES public."Sales"(id);


--
-- Name: SaleItems SaleItems_articleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SaleItems"
    ADD CONSTRAINT "SaleItems_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public."Articles"(id);


--
-- Name: SaleItems SaleItems_saleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SaleItems"
    ADD CONSTRAINT "SaleItems_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES public."Sales"(id);


--
-- Name: Sales Sales_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."Clients"(id);


--
-- Name: Sales Sales_mesaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_mesaId_fkey" FOREIGN KEY ("mesaId") REFERENCES public."Mesas"(id);


--
-- Name: Sales Sales_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id);


--
-- Name: Tasks Tasks_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tasks"
    ADD CONSTRAINT "Tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id);


--
-- Name: Users Users_branchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public."BranchOffices"(id);


--
-- Name: Users Users_rolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES public."Rols"(id);


--
-- PostgreSQL database dump complete
--

