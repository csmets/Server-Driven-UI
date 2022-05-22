const { elements } = require('./elements/elements');
const feedTemplate = require('../../template/feed-template.json');

const feedQuery = {
  feed: () => {

    let template = [];

    feedTemplate.elements.forEach(el => {
      const templateElement = elements[el.type];
      if (Array.isArray(templateElement)) {
        template = template.concat(templateElement);
      } else {
        template.push(templateElement);
      }
    });

    return {
      elements: template
    }
  }
};

module.exports = {
  feedQuery
}