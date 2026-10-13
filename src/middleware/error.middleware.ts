import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	try {
		const error = { ...err };

		// the {...err} will not always copy the err.message, so we have to do it manually.
		error.message = err.message;
		console.error(err);

		res.status(error.statusCode || 500).json({
			success: false,
			message: error.message || "Server Error",
		});
	} catch (error) {
		next(error);
	}
};
