--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.17
-- Dumped by pg_dump version 9.6.17

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
-- Name: aliment; Type: TABLE; Schema: public; Owner: seb
--

CREATE TABLE public.aliment (
    id bigint NOT NULL,
    descriptif text,
    nom character varying(40),
    photo_id bigint
);


ALTER TABLE public.aliment OWNER TO seb;

--
-- Name: aliment_id_seq; Type: SEQUENCE; Schema: public; Owner: seb
--

CREATE SEQUENCE public.aliment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.aliment_id_seq OWNER TO seb;

--
-- Name: aliment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seb
--

ALTER SEQUENCE public.aliment_id_seq OWNED BY public.aliment.id;


--
-- Name: categorie; Type: TABLE; Schema: public; Owner: seb
--

CREATE TABLE public.categorie (
    id bigint NOT NULL,
    nom character varying(100)
);


ALTER TABLE public.categorie OWNER TO seb;

--
-- Name: commentaire; Type: TABLE; Schema: public; Owner: seb
--

CREATE TABLE public.commentaire (
    id bigint NOT NULL,
    body text,
    date timestamp without time zone,
    id_recette bigint,
    id_utilisateur bigint,
    title character varying(255) NOT NULL,
    valide boolean NOT NULL,
    redacteur_id bigint
);


ALTER TABLE public.commentaire OWNER TO seb;

--
-- Name: commentaire_id_seq; Type: SEQUENCE; Schema: public; Owner: seb
--

CREATE SEQUENCE public.commentaire_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.commentaire_id_seq OWNER TO seb;

--
-- Name: commentaire_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seb
--

ALTER SEQUENCE public.commentaire_id_seq OWNED BY public.commentaire.id;


--
-- Name: element_collections_recette; Type: TABLE; Schema: public; Owner: seb
--

CREATE TABLE public.element_collections_recette (
    id bigint NOT NULL,
    ordre integer NOT NULL
);


ALTER TABLE public.element_collections_recette OWNER TO seb;

--
-- Name: element_collections_recette_id_seq; Type: SEQUENCE; Schema: public; Owner: seb
--

CREATE SEQUENCE public.element_collections_recette_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.element_collections_recette_id_seq OWNER TO seb;

--
-- Name: element_collections_recette_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seb
--

ALTER SEQUENCE public.element_collections_recette_id_seq OWNED BY public.element_collections_recette.id;


--
-- Name: etape; Type: TABLE; Schema: public; Owner: seb
--

CREATE TABLE public.etape (
    descriptif text,
    titre character varying(255),
    id bigint NOT NULL,
    id_photo bigint,
    id_recette bigint
);


ALTER TABLE public.etape OWNER TO seb;

--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: seb
--

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO seb;

--
-- Name: ingredient; Type: TABLE; Schema: public; Owner: seb
--

CREATE TABLE public.ingredient (
    commentaire character varying(255),
    quantite real NOT NULL,
    id bigint NOT NULL,
    id_aliment bigint,
    id_recette bigint,
    id_unite bigint DEFAULT 0
);


ALTER TABLE public.ingredient OWNER TO seb;

--
-- Name: photo; Type: TABLE; Schema: public; Owner: seb
--

CREATE TABLE public.photo (
    id bigint NOT NULL,
    date timestamp without time zone,
    util character varying(255),
    valid boolean NOT NULL
);


ALTER TABLE public.photo OWNER TO seb;

--
-- Name: photo_id_seq; Type: SEQUENCE; Schema: public; Owner: seb
--

CREATE SEQUENCE public.photo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photo_id_seq OWNER TO seb;

--
-- Name: photo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seb
--

ALTER SEQUENCE public.photo_id_seq OWNED BY public.photo.id;


--
-- Name: recette; Type: TABLE; Schema: public; Owner: seb
--

CREATE TABLE public.recette (
    id bigint NOT NULL,
    date timestamp without time zone,
    descriptif text,
    publier boolean NOT NULL,
    titre character varying(255),
    photo_id bigint,
    utilisateur_id bigint,
    categorie_id bigint DEFAULT 1 NOT NULL
);


ALTER TABLE public.recette OWNER TO seb;

--
-- Name: recette_id_seq; Type: SEQUENCE; Schema: public; Owner: seb
--

CREATE SEQUENCE public.recette_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recette_id_seq OWNER TO seb;

--
-- Name: recette_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seb
--

ALTER SEQUENCE public.recette_id_seq OWNED BY public.recette.id;


--
-- Name: unite; Type: TABLE; Schema: public; Owner: seb
--

CREATE TABLE public.unite (
    id bigint NOT NULL,
    nom character varying(50),
    abreviation character varying(10)
);


ALTER TABLE public.unite OWNER TO seb;

--
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: seb
--

CREATE TABLE public.utilisateur (
    id bigint NOT NULL,
    birthday timestamp without time zone,
    descriptif text,
    email character varying(100) NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    password character varying(255) NOT NULL,
    pseudo character varying(100) NOT NULL,
    role character varying(255) NOT NULL,
    id_photo bigint,
    activate boolean DEFAULT false NOT NULL
);


ALTER TABLE public.utilisateur OWNER TO seb;

--
-- Name: utilisateur_favoris; Type: TABLE; Schema: public; Owner: seb
--

CREATE TABLE public.utilisateur_favoris (
    utilisateur_id bigint NOT NULL,
    favoris_id bigint NOT NULL
);


ALTER TABLE public.utilisateur_favoris OWNER TO seb;

--
-- Name: utilisateur_frigo; Type: TABLE; Schema: public; Owner: seb
--

CREATE TABLE public.utilisateur_frigo (
    utilisateur_id bigint NOT NULL,
    frigo_id bigint NOT NULL
);


ALTER TABLE public.utilisateur_frigo OWNER TO seb;

--
-- Name: utilisateur_id_seq; Type: SEQUENCE; Schema: public; Owner: seb
--

CREATE SEQUENCE public.utilisateur_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.utilisateur_id_seq OWNER TO seb;

--
-- Name: utilisateur_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: seb
--

ALTER SEQUENCE public.utilisateur_id_seq OWNED BY public.utilisateur.id;


--
-- Name: verification_token; Type: TABLE; Schema: public; Owner: seb
--

CREATE TABLE public.verification_token (
    id bigint NOT NULL,
    expiry_date timestamp without time zone,
    token character varying(255),
    utilisateur bigint NOT NULL
);


ALTER TABLE public.verification_token OWNER TO seb;

--
-- Name: aliment id; Type: DEFAULT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.aliment ALTER COLUMN id SET DEFAULT nextval('public.aliment_id_seq'::regclass);


--
-- Name: commentaire id; Type: DEFAULT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.commentaire ALTER COLUMN id SET DEFAULT nextval('public.commentaire_id_seq'::regclass);


--
-- Name: element_collections_recette id; Type: DEFAULT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.element_collections_recette ALTER COLUMN id SET DEFAULT nextval('public.element_collections_recette_id_seq'::regclass);


--
-- Name: photo id; Type: DEFAULT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.photo ALTER COLUMN id SET DEFAULT nextval('public.photo_id_seq'::regclass);


--
-- Name: recette id; Type: DEFAULT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.recette ALTER COLUMN id SET DEFAULT nextval('public.recette_id_seq'::regclass);


--
-- Name: utilisateur id; Type: DEFAULT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.utilisateur ALTER COLUMN id SET DEFAULT nextval('public.utilisateur_id_seq'::regclass);


--
-- Data for Name: aliment; Type: TABLE DATA; Schema: public; Owner: seb
--

INSERT INTO public.aliment VALUES (5, 'Minions ipsum belloo! Butt bananaaaa butt butt hahaha chasy me want bananaaa! Po kass me want bananaaa! ', 'Banane', 3);
INSERT INTO public.aliment VALUES (11, 'Le beurre est un produit laitier extrait, par barattage, de la crème issue du lait. Cet aliment est constitué par la matière grasse du lait seulement travaillée pour améliorer sa saveur, sa conservation et diversifier ses utilisations, que ce soit nature, notamment en tartine ou comme corps gras de cuisson des aliments, ou ingrédient de préparations culinaires et notamment pâtissières. Il est conditionné pour être utilisé sous la forme d''une pâte onctueuse, mais sa consistance, sensible à la température, passe rapidement de l''état solide, lorsque entreposé dans une ambiance fraîche, à l''état huileux dès le début de toute cuisson. Du sel y est ajouté parfois dans certaines régions pour accroître sa conservation.', 'Beurre', 4);
INSERT INTO public.aliment VALUES (7, 'La cannelle est une épice provenant de l''écorce intérieure d''une des espèces de cannelier. Les quatre principales sortes de cannelle sont la cannelle de Padang, la cannelle de Chine ou casse, la cannelle de Saïgon et la cannelle de Ceylan ou « vraie » cannelle. Elles peuvent toutes être vendues sous le nom de « cannelle ».', 'Cannelle', 5);
INSERT INTO public.aliment VALUES (13, 'La farine de blé est le résultat de la mouture de la graine du blé tendre ou froment. La mouture a pris diverses formes depuis les premiers usages de la meule à grains. Dans le commerce, l''appellation « farine de froment » ne désigne pas une autre catégorie de farine. Dans cet article, il est question de la farine de blé tendre, mais il existe aussi la farine de blé dur', 'Farine', 6);
INSERT INTO public.aliment VALUES (12, 'La levure chimique, poudre à lever, poudres levantes ou poudre à pâte est un mélange composé essentiellement d''un agent basique, un agent acide et un agent stabilisant, se présentant sous forme de poudre blanche et servant à faire gonfler pains et pâtisseries. D''après la directive 95/2/CE du parlement européen concernant les additifs alimentaires autres que les colorants et les édulcorants, les poudres levantes sont définies de la façon suivante: les substances ou combinaison de substances qui libèrent des gaz et de ce fait accroissent le volume d''une pâte.', 'Levure chimique', 7);
INSERT INTO public.aliment VALUES (8, 'La noix de pécan ou pacane est le fruit du pacanier, arbre de la famille des Juglandacées, originaire du sud-est des États-Unis et du nord du Mexique. C’est un fruit à coque ayant une amande oléagineuse, très énergétique, renfermant 73 % de lipides qui apporte 736 kcal/100g. Si par le goût, la noix de pécan rappelle la noix, par sa composition en acides gras, elle s’en distingue nettement. La noix de pécan se caractérise par une forte teneur en acides gras mono-insaturés, représentés par l’ acide oléique avec des taux allant de 53 % à 75 % des lipides, alors que dans la noix commune, ce sont les acides gras poly-insaturés qui dominent. Chez la noix de pécan les poly-insaturés sont représentés par l’acide linoléique allant de 15 % à 35 % des lipides. Sa richesse en tanins condensés et en composés phénoliques lui confère, la plus forte activité antioxydante parmi les fruits à coque. Sur ce point, elle est semblable à la noix commune.', 'Noix de Pécan', 8);
INSERT INTO public.aliment VALUES (10, 'L’œuf est un produit agricole issu d''élevages divers et utilisé comme aliment humain simple ou servant d''ingrédient dans la composition de nombreux plats dans la plupart des cultures du monde. Le plus utilisé est l’œuf de poule, mais les œufs d’autres oiseaux sont aussi consommés: caille, cane, oie, autruche, etc. Les œufs de poissons, comme le caviar, ou de certains reptiles, comme l''iguane vert, sont également consommés, toutefois leur utilisation est très différente de celle des œufs de volaille.', 'Oeuf', 9);
INSERT INTO public.aliment VALUES (9, 'Les raisins secs sont des raisins séchés. Ils peuvent être consommés crus tels quels ou être utilisés cuits dans certaines recettes. Les raisins secs sont très doux en raison d''une concentration élevée en sucre. S''ils sont stockés pendant une longue période, le sucre peut toutefois cristalliser et rendre le fruit granuleux, sans affecter sa valeur nutritionnelle. Pour faire disparaitre cette cristallisation, il suffit de tremper les fruits dans un liquide pendant une courte période.', 'Raisin sec', 10);
INSERT INTO public.aliment VALUES (14, 'Le sel de table, sel alimentaire ou sel de cuisine, est composé essentiellement de chlorure de sodium. Il se présente sous différentes formes: gros sel, sel fin, fleur de sel. Le sel est connu depuis la Préhistoire pour ses caractéristiques d''assaisonnement et de conservation des aliments. Il était extrait de mines généralement très enfouies dans le sol, ou plus facilement de sources salées ou de la mer. Les tessons de briquetages, céramiques utilitaires dans l''extraction de sel sont fréquemment retrouvés jusqu''à l''âge du fer, période qui voit l''apparition d''outillages plus robustes et de plus grande capacité dans lesquels on faisait légèrement chauffer la saumure filtrée et concentrée pour préserver le combustible, l''obtention de grandes quantités de sel par ébullition de saumure consommant trop de bois.', 'Sel', 11);
INSERT INTO public.aliment VALUES (6, 'Le sucre est une substance de saveur douce extraite principalement de la canne à sucre et de la betterave sucrière. Le sucre est une molécule de saccharose. Il est également possible d''obtenir du sucre à partir d''autres plantes.', 'Sucre', 12);
INSERT INTO public.aliment VALUES (16, 'L''eau est une substance chimique constituée de molécules H₂O. Ce composé est très stable et néanmoins très réactif, et l''eau liquide est aussi un excellent solvant.', 'Eau', 22);
INSERT INTO public.aliment VALUES (17, 'Le lait est un liquide biologique comestible généralement de couleur blanchâtre produit par les glandes mammaires des mammifères femelles. Aliment complet équilibré, il est la seule source de nutriments pour les jeunes mammifères au tout début de leur vie avant qu''ils puissent digérer d''autres types d''aliments.', 'Lait', 23);
INSERT INTO public.aliment VALUES (15, 'La levure de boulanger est un organisme vivant principalement utilisé en boulangerie. Elle est responsable d’une fermentation alcoolique, c’est-à-dire d’une réaction chimique ayant pour finalité la libération de gaz carbonique et d’alcool par fermentation des sucres présents dans la farine. L’organisme vivant responsable de cette réaction chimique est un champignon appartenant à la famille des Saccharomyces cerevisiae. Il existe deux principaux types de levure de boulanger : la levure de boulanger fraîche et la levure de boulanger sèche.', 'Levure de boulanger', 21);
INSERT INTO public.aliment VALUES (18, 'La Chicorée sauvage Rouge de Trévise est une une variété italienne réputée et cultivée pour ses feuilles entières rouges à côtes blanches, regroupées en belles pommes allongées et bien serrées. Croquante, elle sera parfaite dans vos salades d’automnes. Semis en juin-juillet pour une récolte d’automne et d’hiver', 'Chicorée de Trévise', 30);
INSERT INTO public.aliment VALUES (19, 'La crème fraîche est obtenue en introduisant du lait cru dans une écrémeuse. La transformation obtenue sera laissée crue2,3,4 ou pasteurisée. Elle est de couleur blanche à jaune, douce et fluide comme la crème fraîche fluide d''Alsace IGP5 ou devenant épaisse, onctueuse et acidulée après fermentation lactique si elle a été ensemencée de cultures de lactobacilles et en laissant ces dernières se développer durant une étape de maturation. ', 'Créme fraiche', 31);
INSERT INTO public.aliment VALUES (20, 'Selon le traitement et le stade de récolte, les grains pourront donner :
    - du poivre noir (baies entières séchées récoltées à maturité), le monde entier consomme du poivre noir, mais personne ne sait d''où il vient. Contrairement aux vins et aux fromages, rien n''oblige à mentionner son origine. « Les premiers plants cultivés au Brésil, à Madagascar ou ailleurs venaient tous du Kerala », précise le Dr Sanna, ancien directeur de l''institut indien de recherche sur les épices, qui étudie Piper nigrum depuis quarante ans[réf. nécessaire]. Dans l''Antiquité, les grains noirs servaient de monnaie d''échange au même titre que l''or ou le sel ;
    - du poivre blanc (baies séchées débarrassées de leurs enveloppes) ;
    - du poivre vert (baies fraîches conservées humides).
Le poivre est une épice quasi universellement consommée. Sa saveur piquante est due principalement à la pipérine. ', 'Poivre', 32);
INSERT INTO public.aliment VALUES (21, 'La coquille Saint-Jacques est un mollusque bivalve de la famille des Pectinidés. Parmi toutes les espèces de cette famille, qui sont légalement autorisées à bénéficier de l''appellation commerciale « Saint-Jacques », c''est la plus recherchée des gastronomes. Elle est reconnaissable à sa grande taille comparée aux autres espèces du genre Pecten et à sa coquille pourvue de côtes en éventail, dont la valve supérieure est totalement plate, contrairement aux pétoncles ou vanneaux dont les deux valves sont bombées.', 'Noix de Saint Jacques', 41);
INSERT INTO public.aliment VALUES (22, 'Un vin rouge est obtenu par la fermentation du moût de raisins noirs en présence de la pellicule, des pépins et éventuellement de la rafle. Le temps plus ou moins long de cette fermentation varie selon le genre de vin voulu, les caractéristiques de chaque vendange et les traditions liées au terroir viticole de production. C’est la cuvaison qui peut varier d’une semaine au maximum pour obtenir des vins légers et souples, jusqu’à trois ou quatre semaines pour des vins de garde. Ce sont des vins dits tranquilles mais il existe des vins rouges mousseux comme le lambrusco en Italie.', 'Vin rouge', 42);
INSERT INTO public.aliment VALUES (23, 'Le vin blanc est un vin produit par la fermentation alcoolique du moût des raisins à pulpe non colorée et à pellicule blanche ou noire. Il est traité de façon à conserver une couleur jaune transparente au produit final. La grande variété des vins blancs provient de la grande quantité de cépages, des modes de vinification, mais aussi du taux de sucre résiduel.', 'Vin blanc ', 43);
INSERT INTO public.aliment VALUES (24, 'Il existe de nombreuses sortes de jambon de pays. Mais qu''ils viennent de France, d''Italie ou d''Espagne, ils sont toujours élaborés par salaison puis fumés, avant d''être vieillis pendant plusieurs mois. Chaque jambon de pays a ses particularités et ses saveurs propres, mais chacun sera toujours à tomber sur un bon pain ou dans une salade.', 'Jambon de Pays', 44);
INSERT INTO public.aliment VALUES (25, 'L''échalote est une plante bulbeuse de la famille des Amaryllidacées, cultivée comme plante condimentaire et potagère. Le terme désigne aussi le bulbe lui-même, qui fait partie depuis longtemps de la gastronomie française. Au Québec et au Nouveau-Brunswick, elle est appelée « échalote française ».', 'Echalotes ', 46);
INSERT INTO public.aliment VALUES (26, 'Le vinaigre de riz blanc est celui dont on se sert au Japon, pour les sushis notamment. Il est plutôt utilisé pour les salades. Tanoshi: le vinaigre de riz blanc idéal pour des salades originales. C’est donc bien le vinaigre de riz noir que vous devrez utiliser pour vos viandes.', 'Vinaigre de riz blanc', 47);
INSERT INTO public.aliment VALUES (27, 'La crème fraîche liquide ou crème fraîche fluide est une crème fraîche n''ayant pas subi de maturation suite à un ensemencement naturel ou par adjonction de ferments. ', 'Crème fraiche liquide', 48);
INSERT INTO public.aliment VALUES (28, 'Une huile est un corps gras qui est à l''état liquide à température ambiante et qui ne se mélange pas à l''eau. Les huiles sont des liquides gras, visqueux, d''origine animale, végétale, minérale ou synthétique. Elles se différencient des graisses qui sont pâteuses dans les conditions normales d''utilisation. Le beurre n''est pas considéré comme une huile bien qu''il soit liquide dans certains pays chauds. Dans les pays tempérés, certaines huiles, normalement liquides, peuvent se figer par temps froid.', 'Huile', 50);
INSERT INTO public.aliment VALUES (29, 'La noix de muscade est l''albumen de la graine du fruit ovoïde du muscadier, un arbre tropical de la famille des myristicacées haut de dix à quinze mètres. La coque de la noix de muscade en est le tégument.', 'Noix de muscade', 51);


--
-- Name: aliment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seb
--

SELECT pg_catalog.setval('public.aliment_id_seq', 29, true);


--
-- Data for Name: categorie; Type: TABLE DATA; Schema: public; Owner: seb
--

INSERT INTO public.categorie VALUES (1, 'Plat');
INSERT INTO public.categorie VALUES (2, 'Dessert');
INSERT INTO public.categorie VALUES (3, 'Divers');
INSERT INTO public.categorie VALUES (4, 'Entrée');


--
-- Data for Name: commentaire; Type: TABLE DATA; Schema: public; Owner: seb
--



--
-- Name: commentaire_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seb
--

SELECT pg_catalog.setval('public.commentaire_id_seq', 1, false);


--
-- Data for Name: element_collections_recette; Type: TABLE DATA; Schema: public; Owner: seb
--

INSERT INTO public.element_collections_recette VALUES (168, 0);
INSERT INTO public.element_collections_recette VALUES (169, 1);
INSERT INTO public.element_collections_recette VALUES (170, 2);
INSERT INTO public.element_collections_recette VALUES (171, 3);
INSERT INTO public.element_collections_recette VALUES (172, 4);
INSERT INTO public.element_collections_recette VALUES (173, 5);
INSERT INTO public.element_collections_recette VALUES (174, 6);
INSERT INTO public.element_collections_recette VALUES (175, 7);
INSERT INTO public.element_collections_recette VALUES (176, 8);
INSERT INTO public.element_collections_recette VALUES (177, 9);
INSERT INTO public.element_collections_recette VALUES (250, 0);
INSERT INTO public.element_collections_recette VALUES (251, 1);
INSERT INTO public.element_collections_recette VALUES (252, 2);
INSERT INTO public.element_collections_recette VALUES (253, 3);
INSERT INTO public.element_collections_recette VALUES (254, 4);
INSERT INTO public.element_collections_recette VALUES (255, 5);
INSERT INTO public.element_collections_recette VALUES (256, 6);
INSERT INTO public.element_collections_recette VALUES (257, 7);
INSERT INTO public.element_collections_recette VALUES (178, 0);
INSERT INTO public.element_collections_recette VALUES (179, 1);
INSERT INTO public.element_collections_recette VALUES (258, 8);
INSERT INTO public.element_collections_recette VALUES (259, 9);
INSERT INTO public.element_collections_recette VALUES (260, 10);
INSERT INTO public.element_collections_recette VALUES (86, 2);
INSERT INTO public.element_collections_recette VALUES (83, 0);
INSERT INTO public.element_collections_recette VALUES (87, 1);
INSERT INTO public.element_collections_recette VALUES (261, 11);
INSERT INTO public.element_collections_recette VALUES (191, 0);
INSERT INTO public.element_collections_recette VALUES (192, 1);
INSERT INTO public.element_collections_recette VALUES (150, 3);
INSERT INTO public.element_collections_recette VALUES (151, 0);
INSERT INTO public.element_collections_recette VALUES (152, 1);
INSERT INTO public.element_collections_recette VALUES (153, 2);
INSERT INTO public.element_collections_recette VALUES (154, 3);
INSERT INTO public.element_collections_recette VALUES (155, 4);
INSERT INTO public.element_collections_recette VALUES (156, 5);
INSERT INTO public.element_collections_recette VALUES (157, 6);
INSERT INTO public.element_collections_recette VALUES (193, 2);
INSERT INTO public.element_collections_recette VALUES (194, 3);
INSERT INTO public.element_collections_recette VALUES (195, 4);
INSERT INTO public.element_collections_recette VALUES (32, 1);
INSERT INTO public.element_collections_recette VALUES (22, 0);
INSERT INTO public.element_collections_recette VALUES (220, 0);
INSERT INTO public.element_collections_recette VALUES (221, 1);
INSERT INTO public.element_collections_recette VALUES (222, 2);
INSERT INTO public.element_collections_recette VALUES (223, 3);
INSERT INTO public.element_collections_recette VALUES (224, 4);
INSERT INTO public.element_collections_recette VALUES (225, 5);


--
-- Name: element_collections_recette_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seb
--

SELECT pg_catalog.setval('public.element_collections_recette_id_seq', 261, true);


--
-- Data for Name: etape; Type: TABLE DATA; Schema: public; Owner: seb
--

INSERT INTO public.etape VALUES ('Dissoudre la levure dans le lait tiède. Bien mélanger à l''aide d''une cuillère.
Pendant ce temps, disposer la farine en fontaine dans la cuve du batteur. Verser au centre le sucre en poudre et le sel fin. Ajouter le mélange lait tiède + levure puis l''eau et le beurre fondu.
Commencer par mélanger à petite vitesse, avec le crochet puis pétrir la pâte au batteur électrique à vitesse moyenne afin d''obtenir une pâte homogène.
Elle doit se décoller des parois de la cuve au bout de quelques minutes.', 'Préparation', 83, 24, 4);
INSERT INTO public.etape VALUES ('A ce moment-là, retirer le crochet et laisser pousser à couvert dans un endroit tiède avoisinant une température ambiante de 30/35°C.
Lorsque la pâte aura doublé de volume (soit 45 min. à 1 heure plus tard, la rompre avec le poing.', 'Première poussé', 87, 25, 4);
INSERT INTO public.etape VALUES ('Graisser l''intérieur d''un moule à pain de mie ainsi que son couvercle. Ici nous utilisons un moule à pain de mie.
Disposer la pâte sur votre plan de travail fariné. La façonner en forme de pâton rectangulaire de la taille du moule et la mouler en l''aplatissant légèrement au fond du moule.
Refermer le couvercle au 3/4 afin de pouvoir contrôler la pousse.
Laisser pousser à nouveau la pâte dans un endroit tiède, jusqu''à ce qu''elle arrive aux 3/4 du moule.', 'Deuxième poussé', 86, 26, 4);
INSERT INTO public.etape VALUES ('Fermer le couvercle dans sa totalité et enfourner à four chaud à 220°C puis baisser à 180°C. Laisser cuire 40 à 45 minutes.
Au terme de la cuisson, retirer le couvercle en le faisant glisser avec force le long du moule.
Démouler le pain de mie et laisser refroidir sur grille.', 'Cuisson', 150, 27, 4);
INSERT INTO public.etape VALUES ('Dans une casserole sur feu fort, rassembler les ingrédients sauf le beurre et faire réduire à consistance sirupeuse.

Ajouter le beurre et mélanger.

Garder au chaud.', 'Préparer la sauce', 221, 53, 6);
INSERT INTO public.etape VALUES ('Faire dorer le jambon à feu moyen dans une casserole.

Ajouter au jambon le lait de trempage des St Jacques, la crème et la muscade râpée.
Porter à frémissement et cuire 10 minutes à couvert.

Filtrer à l''aide d''une passette ou d''un chinois tamisé.', 'Faire dorer le jambon', 222, 54, 6);
INSERT INTO public.etape VALUES ('Mélanger le sucre et les œufs, le sel, le beurre, la farine et la levure, les bananes, les raisins et les noix.', 'Facile', 22, 29, 3);
INSERT INTO public.etape VALUES ('Cuisson : 1heure, thermostat 6 (160°) multiniveaux', 'Mettre au four', 32, 28, 3);
INSERT INTO public.etape VALUES ('Éplucher les salades et retirer leurs feuilles dures extérieures. Laver à plusieurs eaux. Si les chicorées sont grosses, les couper en deux ou en quatre. Si elles sont petites, les laisser entières. Ficeler chaque salade afin qu’elles tiennent moins de place à la cuisson. ', 'Préparation ', 178, 38, 5);
INSERT INTO public.etape VALUES ('Dans un grand faitout, faire bouillir de l’eau salée. Jeter les chicorées et laisser cuire pendant 15 minutes. Lorsque les salades ont un peu refroidi, couper les ficelles et presser bien entre vos mains pour extraire toute l’eau.
Dans une cocotte, faire chauffer le beurre et la crème. Mettre les salades en une seule couche. Saler, poivrer et laisser cuire à couvert, doucement, pendant 45 minutes, en les retournant de temps en temps. Servir chaud. ', 'Cuisson', 179, 37, 5);
INSERT INTO public.etape VALUES ('Dans une poêle, faire chauffer un peu d''huile à l''ail des ours et ajouter les croutons, remuer jusqu''à coloration des croutons de pain.

Déposer sur un papier absordant.', 'Préparer les croutons', 223, 55, 6);
INSERT INTO public.etape VALUES ('À l''aide d''un bras plongeur ou d''une pompe munie d''un bulleur d''aquarium, émulsionner la crème au jambon.

Sortir les St Jacques du sac de cuisson, les éponger, les badigeonner d''huile neutre et les saisir au chalumeau Mapp ou dans une poêle très chaude sur une face.', 'Terminer la préparation', 224, 56, 6);
INSERT INTO public.etape VALUES ('Dans une assiette creuse, rassembler la sauce aux vins, le sarrasin, les noix de Saint Jacques, l''émulsion au jambon, les feuilles d''épinard et de chicorée, les croutons de pain, assaisonner avec un trait d''huile d''olive et saupoudrer de poivre Voatsiperifery rouge fraichement broyé.', 'Dressage', 225, 57, 6);
INSERT INTO public.etape VALUES ('Faire tremper les noix de Saint Jacques avec le lait pendant 30 minutes.
Égoutter les coquillages et réserver le lait.

Préparer un bain marie à 50 °C.
Mettre sous vide les noix de St Jacques. Faire le vide et sceller.

Plonger le sac sous vide dans le bain marie pour une durée de 15 minutes.
Choquer à l''eau glacée une fois la cuisson terminée.', 'Préparer les noix de St Jacques', 220, 52, 6);


--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: seb
--

SELECT pg_catalog.setval('public.hibernate_sequence', 2, true);


--
-- Data for Name: ingredient; Type: TABLE DATA; Schema: public; Owner: seb
--

INSERT INTO public.ingredient VALUES ('épluchées et bien mûres', 200, 168, 5, 3, 1);
INSERT INTO public.ingredient VALUES (NULL, 200, 169, 13, 3, 1);
INSERT INTO public.ingredient VALUES ('mou', 200, 170, 11, 3, 1);
INSERT INTO public.ingredient VALUES (NULL, 150, 171, 6, 3, 1);
INSERT INTO public.ingredient VALUES (NULL, 2, 172, 10, 3, 2);
INSERT INTO public.ingredient VALUES (NULL, 80, 173, 8, 3, 1);
INSERT INTO public.ingredient VALUES (NULL, 100, 174, 9, 3, 1);
INSERT INTO public.ingredient VALUES (NULL, 10, 175, 7, 3, 1);
INSERT INTO public.ingredient VALUES (NULL, 0.5, 176, 12, 3, 3);
INSERT INTO public.ingredient VALUES (NULL, 2, 177, 14, 3, 1);
INSERT INTO public.ingredient VALUES ('', 500, 151, 13, 4, 1);
INSERT INTO public.ingredient VALUES ('Fraîche de préférence', 20, 152, 15, 4, 1);
INSERT INTO public.ingredient VALUES ('Mou', 50, 153, 11, 4, 1);
INSERT INTO public.ingredient VALUES (NULL, 10, 154, 16, 4, 4);
INSERT INTO public.ingredient VALUES (NULL, 10, 155, 14, 4, 1);
INSERT INTO public.ingredient VALUES ('Sucre en poudre', 20, 156, 6, 4, 1);
INSERT INTO public.ingredient VALUES ('Tiède', 20, 157, 17, 4, 4);
INSERT INTO public.ingredient VALUES ('Entier', 20, 250, 17, 6, 4);
INSERT INTO public.ingredient VALUES ('', 6, 251, 21, 6, 2);
INSERT INTO public.ingredient VALUES ('Saint Joseph', 15, 252, 22, 6, 4);
INSERT INTO public.ingredient VALUES ('Chardonnay', 12, 253, 23, 6, 4);
INSERT INTO public.ingredient VALUES ('Serrano', 100, 254, 24, 6, 1);
INSERT INTO public.ingredient VALUES ('Jus d''échalotes lactofermentées', 7.5, 255, 25, 6, 4);
INSERT INTO public.ingredient VALUES ('', 5, 256, 26, 6, 4);
INSERT INTO public.ingredient VALUES ('', 5, 257, 27, 6, 4);
INSERT INTO public.ingredient VALUES ('', 25, 258, 11, 6, 1);
INSERT INTO public.ingredient VALUES ('Huile à l''ail des ours', 1, 259, 28, 6, 4);
INSERT INTO public.ingredient VALUES ('Sucre de canne', 4, 260, 6, 6, 1);
INSERT INTO public.ingredient VALUES ('Rapée', 0.200000003, 261, 29, 6, 1);
INSERT INTO public.ingredient VALUES ('', 5, 191, 18, 5, 2);
INSERT INTO public.ingredient VALUES ('', 150, 192, 19, 5, 1);
INSERT INTO public.ingredient VALUES ('', 50, 193, 11, 5, 1);
INSERT INTO public.ingredient VALUES ('', 0, 194, 14, 5, NULL);
INSERT INTO public.ingredient VALUES ('', 0, 195, 20, 5, NULL);


--
-- Data for Name: photo; Type: TABLE DATA; Schema: public; Owner: seb
--

INSERT INTO public.photo VALUES (22, '2020-03-02 20:15:56.523', 'Aliment', true);
INSERT INTO public.photo VALUES (3, '2019-10-12 17:12:39.498', 'Aliment', true);
INSERT INTO public.photo VALUES (4, '2019-10-12 17:12:56.91', 'Aliment', true);
INSERT INTO public.photo VALUES (5, '2019-10-12 17:13:13.175', 'Aliment', true);
INSERT INTO public.photo VALUES (6, '2019-10-12 17:13:39.783', 'Aliment', true);
INSERT INTO public.photo VALUES (7, '2019-10-12 17:13:53.542', 'Aliment', true);
INSERT INTO public.photo VALUES (8, '2019-10-12 17:14:15.314', 'Aliment', true);
INSERT INTO public.photo VALUES (9, '2019-10-12 17:14:29.113', 'Aliment', true);
INSERT INTO public.photo VALUES (10, '2019-10-12 17:14:45.536', 'Aliment', true);
INSERT INTO public.photo VALUES (11, '2019-10-12 17:15:44.984', 'Aliment', true);
INSERT INTO public.photo VALUES (12, '2019-10-12 17:16:02.837', 'Aliment', true);
INSERT INTO public.photo VALUES (23, '2020-03-02 20:17:27.83', 'Aliment', true);
INSERT INTO public.photo VALUES (30, '2020-03-08 08:51:58.29', 'Aliment', true);
INSERT INTO public.photo VALUES (31, '2020-03-08 08:54:21.184', 'Aliment', true);
INSERT INTO public.photo VALUES (32, '2020-03-08 08:58:33.331', 'Aliment', true);
INSERT INTO public.photo VALUES (38, '2020-03-11 18:36:24.228', 'Etape', true);
INSERT INTO public.photo VALUES (37, '2020-03-11 18:35:55.541', 'Etape', true);
INSERT INTO public.photo VALUES (39, '2020-03-11 18:36:52.608', 'Recette', true);
INSERT INTO public.photo VALUES (24, '2020-03-07 09:19:57.347', 'Etape', true);
INSERT INTO public.photo VALUES (25, '2020-03-07 09:27:02.917', 'Etape', true);
INSERT INTO public.photo VALUES (26, '2020-03-07 09:31:11.647', 'Etape', true);
INSERT INTO public.photo VALUES (27, '2020-03-07 09:34:52.472', 'Etape', true);
INSERT INTO public.photo VALUES (16, '2020-03-01 16:47:07.583', 'Recette', true);
INSERT INTO public.photo VALUES (41, '2020-03-11 18:54:21.694', 'Aliment', true);
INSERT INTO public.photo VALUES (42, '2020-03-11 18:57:31.552', 'Aliment', true);
INSERT INTO public.photo VALUES (13, '2019-10-12 17:33:05.819', 'Etape', true);
INSERT INTO public.photo VALUES (43, '2020-03-11 18:59:13.137', 'Aliment', true);
INSERT INTO public.photo VALUES (44, '2020-03-11 19:01:13.348', 'Aliment', true);
INSERT INTO public.photo VALUES (46, '2020-03-11 19:03:28.356', 'Aliment', true);
INSERT INTO public.photo VALUES (28, '2020-03-07 09:44:53.489', 'Etape', true);
INSERT INTO public.photo VALUES (29, '2020-03-07 09:46:17.849', 'Etape', true);
INSERT INTO public.photo VALUES (2, '2019-10-12 17:10:29.214', 'Recette', true);
INSERT INTO public.photo VALUES (52, '2020-03-11 19:18:12.559', 'Etape', true);
INSERT INTO public.photo VALUES (47, '2020-03-11 19:06:03.198', 'Aliment', true);
INSERT INTO public.photo VALUES (48, '2020-03-11 19:08:15.804', 'Aliment', true);
INSERT INTO public.photo VALUES (21, '2020-03-02 20:12:13.83', 'Aliment', true);
INSERT INTO public.photo VALUES (50, '2020-03-11 19:12:25.193', 'Aliment', true);
INSERT INTO public.photo VALUES (51, '2020-03-11 19:14:21.06', 'Aliment', true);
INSERT INTO public.photo VALUES (53, '2020-03-11 19:19:24.607', 'Etape', true);
INSERT INTO public.photo VALUES (54, '2020-03-11 19:20:51.099', 'Etape', true);
INSERT INTO public.photo VALUES (55, '2020-03-11 19:21:53.02', 'Etape', true);
INSERT INTO public.photo VALUES (56, '2020-03-11 19:23:35.686', 'Etape', true);
INSERT INTO public.photo VALUES (57, '2020-03-11 19:24:27.188', 'Etape', true);
INSERT INTO public.photo VALUES (40, '2020-03-11 18:51:13.399', 'Recette', true);
INSERT INTO public.photo VALUES (58, '2020-03-28 21:30:28.62', 'Profil', false);
INSERT INTO public.photo VALUES (59, '2020-03-29 16:30:12.97', 'Profil', true);


--
-- Name: photo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seb
--

SELECT pg_catalog.setval('public.photo_id_seq', 59, true);


--
-- Data for Name: recette; Type: TABLE DATA; Schema: public; Owner: seb
--

INSERT INTO public.recette VALUES (4, '2020-03-07 09:35:01.555', 'Le pain de mie est un type de pain, sucré ou non, qui se caractérise par son absence de croûte croustillante et le caractère moelleux de sa mie, qui apparaît très blanche. ', true, 'Pain de mie', 16, 1, 3);
INSERT INTO public.recette VALUES (3, '2020-03-07 09:48:57.887', 'Le cake aux bananes de Maman !! ', true, 'Cake aux bananes et noix de Pécan', 2, 1, 2);
INSERT INTO public.recette VALUES (5, '2020-03-11 18:46:41.764', 'Une bonne idée d''entrée avec cette recette de chicorée à la crème, douce et onctueuse. La crème adoucit l’amertume de cette salade riche en vitamines. Même les enfants en redemanderont.', true, 'Chicorée à la crème', 39, 1, 4);
INSERT INTO public.recette VALUES (6, '2020-03-11 19:25:47.064', 'Une entrée entre terre et mer.
https://www.61degres.com/recettes/salade-de-chicoree-et-noix-de-saint-jacques/', true, 'Salade de chicorée et noix de Saint Jacques', 40, 1, 4);
INSERT INTO public.recette VALUES (7, '2020-03-29 17:03:25.407', 'encore en brouillon', false, 'Nouvelle Recette', NULL, 1, 1);


--
-- Name: recette_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seb
--

SELECT pg_catalog.setval('public.recette_id_seq', 7, true);


--
-- Data for Name: unite; Type: TABLE DATA; Schema: public; Owner: seb
--

INSERT INTO public.unite VALUES (1, 'Gramme', 'Gr');
INSERT INTO public.unite VALUES (2, 'Unité', 'U');
INSERT INTO public.unite VALUES (3, 'Sachet', 'Sh');
INSERT INTO public.unite VALUES (4, 'Centilitre', 'Cl');
INSERT INTO public.unite VALUES (5, 'Kilogramme', 'Kg');
INSERT INTO public.unite VALUES (6, 'Litre', 'L');


--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: seb
--

INSERT INTO public.utilisateur VALUES (2, NULL, NULL, 'sebaurel@free.fr', '', '', '$2a$10$MjGON99LUlFg1hMdxHohQOOQDGwrhzSiMI909kqU61/J5gV1yFAqK', 'sebaurel', 'USER', NULL, true);
INSERT INTO public.utilisateur VALUES (1, NULL, NULL, 'seb@seb.fr', '', '', '$2a$10$bNYMaq.GKm7kP0ugr2kHs.uv/b6sJeJcAhWrwy8zm3PbaTvtQGemK', 'seb', 'ADMIN', 59, true);
INSERT INTO public.utilisateur VALUES (3, NULL, NULL, 'delphine.aurel@laposte.net', '', '', '$2a$10$Nm91mzpxdpQuoKAgBamVO.xdctVgS.ZKcMaox2531ST0lUEVPjcSq', 'Delfina ', 'USER', NULL, true);


--
-- Data for Name: utilisateur_favoris; Type: TABLE DATA; Schema: public; Owner: seb
--



--
-- Data for Name: utilisateur_frigo; Type: TABLE DATA; Schema: public; Owner: seb
--



--
-- Name: utilisateur_id_seq; Type: SEQUENCE SET; Schema: public; Owner: seb
--

SELECT pg_catalog.setval('public.utilisateur_id_seq', 3, true);


--
-- Data for Name: verification_token; Type: TABLE DATA; Schema: public; Owner: seb
--

INSERT INTO public.verification_token VALUES (1, '2020-03-30 16:01:23.183', '35d9cb70-0d7f-4277-9412-3f40f49c8c24', 2);
INSERT INTO public.verification_token VALUES (2, '2020-03-31 19:42:29.629', 'a4ef9cfb-dcf7-49ac-bd47-445e75f18736', 3);


--
-- Name: aliment aliment_nom_key; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.aliment
    ADD CONSTRAINT aliment_nom_key UNIQUE (nom);


--
-- Name: aliment aliment_pkey; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.aliment
    ADD CONSTRAINT aliment_pkey PRIMARY KEY (id);


--
-- Name: categorie categorie_nom_key; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.categorie
    ADD CONSTRAINT categorie_nom_key UNIQUE (nom);


--
-- Name: categorie categorie_pkey; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.categorie
    ADD CONSTRAINT categorie_pkey PRIMARY KEY (id);


--
-- Name: commentaire commentaire_pkey; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.commentaire
    ADD CONSTRAINT commentaire_pkey PRIMARY KEY (id);


--
-- Name: element_collections_recette element_collections_recette_pkey; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.element_collections_recette
    ADD CONSTRAINT element_collections_recette_pkey PRIMARY KEY (id);


--
-- Name: etape etape_pkey; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.etape
    ADD CONSTRAINT etape_pkey PRIMARY KEY (id);


--
-- Name: ingredient ingredient_pkey; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT ingredient_pkey PRIMARY KEY (id);


--
-- Name: photo photo_pkey; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.photo
    ADD CONSTRAINT photo_pkey PRIMARY KEY (id);


--
-- Name: recette recette_pkey; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.recette
    ADD CONSTRAINT recette_pkey PRIMARY KEY (id);


--
-- Name: unite unite_abreviation_key; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.unite
    ADD CONSTRAINT unite_abreviation_key UNIQUE (abreviation);


--
-- Name: unite unite_nom_key; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.unite
    ADD CONSTRAINT unite_nom_key UNIQUE (nom);


--
-- Name: unite unite_pkey; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.unite
    ADD CONSTRAINT unite_pkey PRIMARY KEY (id);


--
-- Name: utilisateur utilisateur_email_key; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_email_key UNIQUE (email);


--
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id);


--
-- Name: verification_token verification_token_pkey; Type: CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.verification_token
    ADD CONSTRAINT verification_token_pkey PRIMARY KEY (id);


--
-- Name: aliment aliment_photo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.aliment
    ADD CONSTRAINT aliment_photo_id_fkey FOREIGN KEY (photo_id) REFERENCES public.photo(id);


--
-- Name: commentaire commentaire_id_recette_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.commentaire
    ADD CONSTRAINT commentaire_id_recette_fkey FOREIGN KEY (id_recette) REFERENCES public.recette(id);


--
-- Name: commentaire commentaire_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.commentaire
    ADD CONSTRAINT commentaire_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateur(id);


--
-- Name: commentaire commentaire_redacteur_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.commentaire
    ADD CONSTRAINT commentaire_redacteur_id_fkey FOREIGN KEY (redacteur_id) REFERENCES public.utilisateur(id);


--
-- Name: etape etape_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.etape
    ADD CONSTRAINT etape_id_fkey FOREIGN KEY (id) REFERENCES public.element_collections_recette(id);


--
-- Name: etape etape_id_photo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.etape
    ADD CONSTRAINT etape_id_photo_fkey FOREIGN KEY (id_photo) REFERENCES public.photo(id);


--
-- Name: etape etape_id_recette_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.etape
    ADD CONSTRAINT etape_id_recette_fkey FOREIGN KEY (id_recette) REFERENCES public.recette(id);


--
-- Name: commentaire fk56ql0sk6f2dwf864ca0hsmwlh; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.commentaire
    ADD CONSTRAINT fk56ql0sk6f2dwf864ca0hsmwlh FOREIGN KEY (id) REFERENCES public.utilisateur(id);


--
-- Name: ingredient ingredient_id_aliment_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT ingredient_id_aliment_fkey FOREIGN KEY (id_aliment) REFERENCES public.aliment(id);


--
-- Name: ingredient ingredient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT ingredient_id_fkey FOREIGN KEY (id) REFERENCES public.element_collections_recette(id);


--
-- Name: ingredient ingredient_id_recette_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT ingredient_id_recette_fkey FOREIGN KEY (id_recette) REFERENCES public.recette(id);


--
-- Name: ingredient ingredient_id_unite_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT ingredient_id_unite_fkey FOREIGN KEY (id_unite) REFERENCES public.unite(id);


--
-- Name: recette recette_categorie-id-fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.recette
    ADD CONSTRAINT "recette_categorie-id-fkey" FOREIGN KEY (categorie_id) REFERENCES public.categorie(id);


--
-- Name: recette recette_photo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.recette
    ADD CONSTRAINT recette_photo_id_fkey FOREIGN KEY (photo_id) REFERENCES public.photo(id);


--
-- Name: recette recette_utilisateur_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.recette
    ADD CONSTRAINT recette_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES public.utilisateur(id);


--
-- Name: utilisateur_favoris utilisateur_favoris_favoris_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.utilisateur_favoris
    ADD CONSTRAINT utilisateur_favoris_favoris_id_fkey FOREIGN KEY (favoris_id) REFERENCES public.recette(id);


--
-- Name: utilisateur_favoris utilisateur_favoris_utilisateur_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.utilisateur_favoris
    ADD CONSTRAINT utilisateur_favoris_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES public.utilisateur(id);


--
-- Name: utilisateur_frigo utilisateur_frigo_frigo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.utilisateur_frigo
    ADD CONSTRAINT utilisateur_frigo_frigo_id_fkey FOREIGN KEY (frigo_id) REFERENCES public.aliment(id);


--
-- Name: utilisateur_frigo utilisateur_frigo_utilisateur_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.utilisateur_frigo
    ADD CONSTRAINT utilisateur_frigo_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES public.utilisateur(id);


--
-- Name: utilisateur utilisateur_id_photo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_id_photo_fkey FOREIGN KEY (id_photo) REFERENCES public.photo(id);


--
-- Name: verification_token verification_token_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: seb
--

ALTER TABLE ONLY public.verification_token
    ADD CONSTRAINT verification_token_user_id_fkey FOREIGN KEY (utilisateur) REFERENCES public.utilisateur(id);


--
-- PostgreSQL database dump complete
--

