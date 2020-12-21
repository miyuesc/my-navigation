export function getNavigation() {
  return JSON.parse(localStorage.getItem("bookmarksObject"));
}

export function getNavigationArray() {
  const bookmarksObject = getNavigation();
  let bookmarkArray;
  bookmarkArray = [];
  if (bookmarksObject) {
    for (let key in bookmarksObject) {
      bookmarkArray[bookmarksObject[key].index] = { ...bookmarksObject[key] };
    }
  }
  return bookmarkArray;
}

export function resetNavigation(bookmarks) {
  localStorage.setItem("bookmarksObject", JSON.stringify(bookmarks));
}

export function resetNavigationWithArray(bookmarks) {
  let bookmarksObject = {};
  bookmarks.forEach(b => {
    bookmarksObject[b.id] = { ...b };
  });
  resetNavigation(bookmarksObject);
}

export function resetNavigationType(newTypeForm, typeId) {
  const bookmarksObject = getNavigation();
  if (typeId) {
    bookmarksObject[typeId] = JSON.parse(JSON.stringify(newTypeForm));
  } else {
    let key = "type_" + new Date().getTime();
    bookmarksObject[key] = JSON.parse(JSON.stringify(newTypeForm));
  }
  resetNavigation(bookmarksObject);
}

export function resetNavigationItem(newItemForm, typeId, index) {
  const bookmarksObject = getNavigation();
  bookmarksObject[typeId].children[index] = JSON.parse(
    JSON.stringify(newItemForm)
  );
  resetNavigation(bookmarksObject);
}
