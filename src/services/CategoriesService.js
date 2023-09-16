import HttpClient from './helpers/HttpClient';
import CategoryMapper from './mappers/CategoryMapper';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient(import.meta.env.VITE_API);
  }

  async listCategories() {
    const categories = await this.httpClient.get('/categories');
    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoriesService();
