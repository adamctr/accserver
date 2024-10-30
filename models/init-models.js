var DataTypes = require("sequelize").DataTypes;
var _articlecategories = require("./articlecategories");
var _articlekeywords = require("./articlekeywords");
var _articles = require("./articles");
var _brands = require("./brands");
var _categories = require("./categories");
var _categorybrands = require("./categorybrands");
var _categorymails = require("./categorymails");
var _externalposts = require("./externalposts");
var _externalproducts = require("./externalproducts");
var _itemtypes = require("./itemtypes");
var _mails = require("./mails");
var _seokeywords = require("./seokeywords");
var _users = require("./users");

function initModels(sequelize) {
  var articlecategories = _articlecategories(sequelize, DataTypes);
  var articlekeywords = _articlekeywords(sequelize, DataTypes);
  var articles = _articles(sequelize, DataTypes);
  var brands = _brands(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var categorybrands = _categorybrands(sequelize, DataTypes);
  var categorymails = _categorymails(sequelize, DataTypes);
  var externalposts = _externalposts(sequelize, DataTypes);
  var externalproducts = _externalproducts(sequelize, DataTypes);
  var itemtypes = _itemtypes(sequelize, DataTypes);
  var mails = _mails(sequelize, DataTypes);
  var seokeywords = _seokeywords(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  articles.belongsToMany(categories, { as: 'categoryid_categories', through: articlecategories, foreignKey: "articleid", otherKey: "categoryid" });
  articles.belongsToMany(seokeywords, { as: 'keywordid_seokeywords', through: articlekeywords, foreignKey: "articleid", otherKey: "keywordid" });
  brands.belongsToMany(categories, { as: 'categoryid_categories_categorybrands', through: categorybrands, foreignKey: "brandid", otherKey: "categoryid" });
  categories.belongsToMany(articles, { as: 'articleid_articles', through: articlecategories, foreignKey: "categoryid", otherKey: "articleid" });
  categories.belongsToMany(brands, { as: 'brandid_brands', through: categorybrands, foreignKey: "categoryid", otherKey: "brandid" });
  categories.belongsToMany(mails, { as: 'mailid_mails', through: categorymails, foreignKey: "categoryid", otherKey: "mailid" });
  mails.belongsToMany(categories, { as: 'categoryid_categories_categorymails', through: categorymails, foreignKey: "mailid", otherKey: "categoryid" });
  seokeywords.belongsToMany(articles, { as: 'articleid_articles_articlekeywords', through: articlekeywords, foreignKey: "keywordid", otherKey: "articleid" });
  articlecategories.belongsTo(articles, { as: "article", foreignKey: "articleid"});
  articles.hasMany(articlecategories, { as: "articlecategories", foreignKey: "articleid"});
  articlekeywords.belongsTo(articles, { as: "article", foreignKey: "articleid"});
  articles.hasMany(articlekeywords, { as: "articlekeywords", foreignKey: "articleid"});
  articles.belongsTo(brands, { as: "brand", foreignKey: "brandid"});
  brands.hasMany(articles, { as: "articles", foreignKey: "brandid"});
  categorybrands.belongsTo(brands, { as: "brand", foreignKey: "brandid"});
  brands.hasMany(categorybrands, { as: "categorybrands", foreignKey: "brandid"});
  externalposts.belongsTo(brands, { as: "brand", foreignKey: "brandid"});
  brands.hasMany(externalposts, { as: "externalposts", foreignKey: "brandid"});
  externalproducts.belongsTo(brands, { as: "brand", foreignKey: "brandid"});
  brands.hasMany(externalproducts, { as: "externalproducts", foreignKey: "brandid"});
  mails.belongsTo(brands, { as: "brand", foreignKey: "brandid"});
  brands.hasMany(mails, { as: "mails", foreignKey: "brandid"});
  articlecategories.belongsTo(categories, { as: "category", foreignKey: "categoryid"});
  categories.hasMany(articlecategories, { as: "articlecategories", foreignKey: "categoryid"});
  categorybrands.belongsTo(categories, { as: "category", foreignKey: "categoryid"});
  categories.hasMany(categorybrands, { as: "categorybrands", foreignKey: "categoryid"});
  categorymails.belongsTo(categories, { as: "category", foreignKey: "categoryid"});
  categories.hasMany(categorymails, { as: "categorymails", foreignKey: "categoryid"});
  articles.belongsTo(itemtypes, { as: "itemtype", foreignKey: "itemtypeid"});
  itemtypes.hasMany(articles, { as: "articles", foreignKey: "itemtypeid"});
  mails.belongsTo(itemtypes, { as: "itemtype", foreignKey: "itemtypeid"});
  itemtypes.hasMany(mails, { as: "mails", foreignKey: "itemtypeid"});
  categorymails.belongsTo(mails, { as: "mail", foreignKey: "mailid"});
  mails.hasMany(categorymails, { as: "categorymails", foreignKey: "mailid"});
  articlekeywords.belongsTo(seokeywords, { as: "keyword", foreignKey: "keywordid"});
  seokeywords.hasMany(articlekeywords, { as: "articlekeywords", foreignKey: "keywordid"});
  brands.belongsTo(users, { as: "user", foreignKey: "userid"});
  users.hasMany(brands, { as: "brands", foreignKey: "userid"});

  return {
    articlecategories,
    articlekeywords,
    articles,
    brands,
    categories,
    categorybrands,
    categorymails,
    externalposts,
    externalproducts,
    itemtypes,
    mails,
    seokeywords,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
