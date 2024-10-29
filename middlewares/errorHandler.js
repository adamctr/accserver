// Middleware de gestion des erreurs

const errorHandler = (err, req, res, next) => {
  // Définir un code d'erreur par défaut (500 pour une erreur serveur interne)
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "An unexpected error occurred";

  // Log de l'erreur pour le débogage (optionnel)
  console.error(`[${new Date().toISOString()}] Error:`, err);

  // Envoyer la réponse d'erreur JSON
  res.status(statusCode).json({
    success: false,
    error: {
      message: errorMessage,
      // Optionnel : afficher le détail de l'erreur en mode développement
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;
