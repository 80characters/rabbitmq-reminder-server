'use strict';

exports.name = 'http.app';

exports.requires = [
	'@express',
	'@path',
	'@cookie-parser',
	'@morgan',
	'@body-parser',
	'@cors',
	'@helmet',
	'middlewares.auth0',
	'middlewares.unauthorized-error',
	'routes.index',
	'routes.api'
];

exports.factory = function (
	express,
	path,
	cookieParser,
	logger,
	bodyParser,
	cors,
	helmet,
	midAuth0,
	midUnauthorizedError,
	indexRouter,
	apiRouter) {

	const app = express();

	app.use(logger('combined'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static('./public'));

	// Using bodyParser to parse JSON bodies into JS objects
	app.use(bodyParser.urlencoded({ extended: true }));

	// Adding Helmet to enhance your API's security
	app.use(helmet());

	// CORS.	
	app.use(cors());

	// Auth0
	app.use(midAuth0);

	// Handle errors "UnauthorizedError"
	app.use(midUnauthorizedError);

	// Register routers.
	app.use('/', indexRouter);
	app.use('/api/', apiRouter);
	
	return app;
};
