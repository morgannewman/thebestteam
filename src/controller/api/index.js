import auth from './routes/auth.route';
import topics from './routes/topics.route';
import folders from './routes/folders.route';
import resources from './routes/resources.route';

/**
 * This is an interface that provides access to the backend endpoints.
 */
const api = {
	auth,
	topics,
	resources,
	folders
};

export default api;
