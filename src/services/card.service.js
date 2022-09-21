import { Card } from '../database/models';

export default class CardService {
  async createCard(data) {
    return Card.create(data);
  }

  async updateCard(status, id) {
    return Card.update({ status }, { where: { id }, returning: true });
  }
}
