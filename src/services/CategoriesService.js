import HttpClient from './helpers/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient(import.meta.env.VITE_API);
  }

  listCategories() {
    return this.httpClient.get('/categories');
  }
}

export default new CategoriesService();
