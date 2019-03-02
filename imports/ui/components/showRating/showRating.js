import "./showRating.html";

Template.showStarRating.helpers({
    list: rating => {
      const list = [];
      for (let index = 1; index <= 5; index += 1) {
        if (index <= parseInt(rating, 10)) {
          list.push({
            class: 'fas fa-star colorOrange',
            id: `start${index}`
          });
        } else {
          list.push({
            class: 'fas fa-star',
            id: `start${index}`
          });
        }
      }
      return list;
    }
  });