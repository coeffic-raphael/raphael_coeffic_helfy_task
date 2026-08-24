const notFound = (req, res) => {
    return res.status(404).json({
        error: `Route not found: ${req.method} ${req.originalUrl}`,
    
    });
};

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.type === "entity.parse.failed"){
        return res.status(400).json({
            error: "Invalid JSON body",
        });
    }

    return res.status(500).json({
        error: "Internal server error",
    });
};

module.exports = {
    notFound,
    errorHandler,

};
