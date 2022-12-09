import {elements, FeedElement} from './elements/elements';
import axios from 'axios';
import {ContainerType} from '../../types';

interface FeedTemplateElement {
  type: string;
}

interface FeedTemplateResponse {
  data: {
    elements: FeedTemplateElement[];
  }
}

type Error = {
  response: {
    body: string;
  }
}

const isError = (error: unknown): error is Error =>
  typeof error === 'object' &&
  error != null &&
  'response' in error

const hasBody = (error: unknown): error is Error =>
  typeof error === 'object' &&
  error != null &&
  'body' in error

export const feedQuery = {
  feed: async () => {
    let template: FeedElement[] = [];

    try {
      const templateResponse: FeedTemplateResponse = await axios.get(
        'http://localhost:9090/component/feed'
      );
      templateResponse.data.elements.forEach(el => {
        const templateElement = elements[el.type];
        if (Array.isArray(templateElement)) {
          template = template.concat(templateElement);
        } else {
          template.push(templateElement);
        }
      });
    } catch (error: unknown) {
      if (isError(error) && hasBody(error.response)) {
        console.error(error.response.body);
      }
    }

    return {
      // view
      elements: [
        {
          // container
          containerType: ContainerType.Column,
          elements: template,
        },
      ],
    };
  },
};
