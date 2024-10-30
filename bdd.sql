CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logoUrl VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    openaiApiKey VARCHAR(255),
    productApiLink VARCHAR(255),
    blogArticlesApiLink VARCHAR(255),
    userId INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ItemTypes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE Mails (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    structure JSON,
    content TEXT,
    topic VARCHAR(255),
    type VARCHAR(50),
    status VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    brandId INTEGER REFERENCES Brands(id) ON DELETE CASCADE,
    itemTypeId INTEGER REFERENCES ItemTypes(id) ON DELETE SET NULL
);

CREATE TABLE Articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    topic VARCHAR(255),
    type VARCHAR(50),
    structure JSON,
    content TEXT,
    seoKeywords JSON,
    metaDescription TEXT,
    readTime INTEGER,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    brandId INTEGER REFERENCES Brands(id) ON DELETE CASCADE,
    itemTypeId INTEGER REFERENCES ItemTypes(id) ON DELETE SET NULL
);

CREATE TABLE Categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE SEOKeywords (
    id SERIAL PRIMARY KEY,
    keyword VARCHAR(255) NOT NULL,
    relevance DECIMAL(5, 2),
    isMainKeyword BOOLEAN DEFAULT FALSE
);

CREATE TABLE ExternalPosts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    metaDescription TEXT,
    storeUrl VARCHAR(255),
    categories VARCHAR(255),
    brandId INTEGER REFERENCES Brands(id) ON DELETE CASCADE
);

CREATE TABLE ExternalProducts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    imageLink VARCHAR(255),
    storeUrl VARCHAR(255),
    sku VARCHAR(255),
    categories VARCHAR(255),
    brandId INTEGER REFERENCES Brands(id) ON DELETE CASCADE
);

CREATE TABLE ArticleKeywords (
    articleId INTEGER REFERENCES Articles(id) ON DELETE CASCADE,
    keywordId INTEGER REFERENCES SEOKeywords(id) ON DELETE CASCADE,
    PRIMARY KEY (articleId, keywordId)
);

CREATE TABLE ArticleCategories (
    articleId INTEGER REFERENCES Articles(id) ON DELETE CASCADE,
    categoryId INTEGER REFERENCES Categories(id) ON DELETE CASCADE,
    PRIMARY KEY (articleId, categoryId)
);

CREATE TABLE CategoryBrands (
    brandId INTEGER REFERENCES Brands(id) ON DELETE CASCADE,
    categoryId INTEGER REFERENCES Categories(id) ON DELETE CASCADE,
    PRIMARY KEY (brandId, categoryId)
);

CREATE TABLE CategoryMails (
    mailId INTEGER REFERENCES Mails(id) ON DELETE CASCADE,
    categoryId INTEGER REFERENCES Categories(id) ON DELETE CASCADE,
    PRIMARY KEY (mailId, categoryId)
);
