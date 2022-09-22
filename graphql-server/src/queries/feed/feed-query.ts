import { elements } from './elements/elements';
import axios from 'axios';

export const feedQuery = {
  feed: async () => {

    let template = [];

    try {
      const templateResponse = await axios.get('http://localhost:9090/component/feed')
      templateResponse.data.elements.forEach(el => {
        const templateElement = elements[el.type];
        if (Array.isArray(templateElement)) {
          template = template.concat(templateElement);
        } else {
          template.push(templateElement);
        }
      });
    } catch (error) {
      console.error(error.response.body)
    }

    return {
      elements: template
    }
  }
};