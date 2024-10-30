-- Table: ItemType
CREATE TABLE ItemType (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Table: Category
CREATE TABLE Category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Mail
CREATE TABLE Mail (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    structure JSON,
    content TEXT,
    topic VARCHAR(255),
    type VARCHAR(50),
    status VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    authorId INT,
    FOREIGN KEY (authorId) REFERENCES ItemType(id)
);

-- Table: Article
CREATE TABLE Article (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    structure JSON,
    content TEXT,
    seoKeywords JSON,
    metaDescription TEXT,
    readTime INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    itemTypeId INT,
    FOREIGN KEY (itemTypeId) REFERENCES ItemType(id)
);

-- Table: SEOKeywords
CREATE TABLE SEOKeywords (
    id SERIAL PRIMARY KEY,
    keyword VARCHAR(255) NOT NULL,
    relevance DECIMAL(5, 2),
    articleId INT,
    isMainKeyword BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (articleId) REFERENCES Article(id)
);

-- Table: ExternalPosts
CREATE TABLE ExternalPosts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    metaDescription TEXT,
    storeUrl VARCHAR(255),
    categories VARCHAR(255)
);

-- Table: ExternalProducts
CREATE TABLE ExternalProducts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    imageLink VARCHAR(255),
    storeUrl VARCHAR(255),
    sku VARCHAR(255),
    categories VARCHAR(255)
);

-- Table intermédiaire pour la relation Mail - Category
CREATE TABLE MailCategory (
    mailId INT,
    categoryId INT,
    PRIMARY KEY (mailId, categoryId),
    FOREIGN KEY (mailId) REFERENCES Mail(id),
    FOREIGN KEY (categoryId) REFERENCES Category(id)
);

-- Table intermédiaire pour la relation Article - Category
CREATE TABLE ArticleCategory (
    articleId INT,
    categoryId INT,
    PRIMARY KEY (articleId, categoryId),
    FOREIGN KEY (articleId) REFERENCES Article(id),
    FOREIGN KEY (categoryId) REFERENCES Category(id)
);

CREATE TABLE Settings (
    id SERIAL PRIMARY KEY,
    logo VARCHAR(255),                 -- Chemin ou URL vers le logo, optionnel
    nom_marque VARCHAR(255) NOT NULL,  -- Nom de la marque
    email VARCHAR(255) NOT NULL,       -- Adresse email
    telephone VARCHAR(50),             -- Numéro de téléphone
    adresse TEXT,                      -- Adresse complète
    cle_api_openai VARCHAR(255),       -- Clé API OpenAI
    lien_api_produits VARCHAR(255),    -- Lien de l'API des produits
    lien_api_articles VARCHAR(255)     -- Lien de l'API des articles de blogs
);
