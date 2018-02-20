dbPromise.then(function(db) {
  var tx = db.transaction('people');
  var peopleStore = tx.objectStore('people');
  var ageIndex = peopleStore.index('age');

  // return ageIndex.getAll();
  // to access individual object
  return ageIndex.openCursor();
}).then(function(cursor) {
  if (!cursor) return;
  // to skip items (in this case, skip two items)
  return cursor.advance(2);
}).then(function logPerson(cursor) {
  // if no object is present return
  if (!cursor) return;
  // can access a cursor value by doing the following
  console.log('Cursored at:', cursor.value.name);

  // returns a cursor representing the next item,
  // then calls logPerson once .continue() resolves
  // thus creating a recursive call (asynchronous loop)
  // until cursor is undefined
  return cursor.continue().then(logPerson);
}).then(function() {
  console.log("Done cursoring!");
});

// CURSORS become really useful when you want to modify items as I loop through
// it just like .map()

// cursor.update(newValue) | to update the value
// cursor.delete() | to remove an item
// cursor.advance(2) | to skip two items
