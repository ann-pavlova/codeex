import axios from "axios";

export default {
  async getMatchItems(option, query) {
    let resp = await axios.post(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/${option}`, {"query": query}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token 4e19e8f5d2e96cb95ae75cc7a59c801fb9017cc1'
      }
    });

    if(resp.status !== 200) {
      return [];
    }
    let suggestions = resp.data['suggestions'];
    let autocompleteItems = [];
    for (let i = 0; i < suggestions.length; i++) {
      autocompleteItems.push(suggestions[i].value);
    }
    return autocompleteItems;
  },
  getCompanyNameMatchItems(query) {
    return this.getMatchItems('party', query);
  },
  getManagerNameMatchItems(query) {
    return this.getMatchItems('fio', query);
  }
}
