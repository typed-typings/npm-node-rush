import Rush = require('node-rush');

var mysql;

// Create a new cache
var cache = Rush();

var fetchRow = function(id, cb) {
  var fetch = function(done) {
    /**
     * This is our function to fetch data from a resource.
     * The results of this function are cached by rush.
     *
     * It is wise to set a timeout on your fetch, so that
     * it calls `done` with an error if it takes too long
     * to complete. This is useful in case your external
     * resource is overloaded and being slow. If configured,
     * rush will cache this error and prevent overloading the
     * resource with more fetches.
     */
    // Example: querying a mysql db
    mysql.query({
      sql: 'SELECT thing FROM things WHERE id = ? LIMIT 1',
      timeout: 5000
    }, [id], done);
  };

  var key = 'appName:component:'+id;
  cache.get(key, fetch, cb);
};

// get a row
fetchRow(1, function(err, row) {
  // called async with cached or
  // freshly fetched data
});
