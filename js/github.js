(function() {
  // http://aboutcode.net/2010/11/11/list-github-projects-using-javascript.html

  jQuery.githubUser = function(username, callback) {
    jQuery.getJSON("http://github.com/api/v1/json/" + username + "?callback=?", callback);
  };

  jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for repositories...</span>");

    var target = this;
    $.githubUser(username, function(data) {
      var repos = data.user.repositories;
      sortByNumberOfWatchers(repos);

      var list = $('<dl/>');
      target.empty().append(list);
      $(repos).each(function(_i, v) {
        if(v.fork === true){
          return;
        }
        list.append('<dt><a href="'+ this.url +'">' + this.name + '</a></dt>');
        list.append('<dd>' + this.description + '</dd>');
      });
    });

    function sortByNumberOfWatchers(repos) {
      repos.sort(function(a,b) {
        return Date.parse(b.pushed_at) - Date.parse(a.pushed_at);
      });
    }
  };
})();