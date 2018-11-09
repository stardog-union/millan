export const fixtures = {
  plainStringInTemplate: `
    mapping <spooky>
    from json {}
    to { ?s a :Thing }
    where { template('spooky') }
  `,
  emptyWhere: `
    mapping <spooky>
    from json {}
    to { ?s a :Thing }
    where {}
  `,
  var2: `
    mapping <spooky>
    from json {}
    to { $s a :Thing }
    where {}
  `,
  sqlMapping: `
    mapping <spooky>
    from sql {
      select * from tableName
    }
    to { $s a :Thing }
    where {}
  `,
  jsonMapping: `
    mapping <spooky>
    from json {
      "spooker": {
        "ghoul": "?ghastly",
        "goblin": "?macabre"
      }
    }
    to { $s a :Thing }
    where {}
  `,
  graphQlMapping: `
    mapping <spooky>
    from graphql {
      spooker {
        movieId: _id
        title
        plot
        ratingString: rating
        rt: rottenTomatoes
        date: release_date
        cast @array {
          actorId: id
          actorName: name
          characterName: role
        }
        directors @array {
          directorId: id
          directorName: name
          age
        }
        genre: genres @array
      }
    }
    to { $s a :Thing }
    where {}
  `,
  comments: `
    # some comment
    mapping <spooky>
    # some comment
    from json {
      sd
    }
    to { ?s a :Thing }
    # some comment
    where {}
  `,
  prefixDecls: `
    PREFIX tt: <http://www.imdb.com/title/>
    PREFIX nm: <http://www.imdb.com/name/>
    PREFIX : <http://example.com/>
    mapping <spooky>
    from json {
      sd
    }
    to { ?s a :Thing }
    where {}
  `,
  multipleJsonWithComments: `
    # SMS2 file with multiple mappings
    # first, movies only
    PREFIX tt: <http://www.imdb.com/title/>
    PREFIX nm: <http://www.imdb.com/name/>
    PREFIX : <http://example.com/>
    MAPPING <urn:moviesOnly>
    FROM JSON {
      "movies":{
        "_id": "?movieId",
        "title": "?title"
      }
    }
    TO {
      ?movie a :Movie ;
        rdfs:label ?title ;
    }
    WHERE {
      BIND (template("http://www.imdb.com/title/{movieId}") AS ?movie)
    }
    ;
    # directors
    MAPPING <urn:directors>
    FROM JSON {
      "movies":{
        "_id": "?movieId",
        "directors": [
          { "id": "?directorId", "name": "?directorName" , "age": "?age" }
        ]
      }
    }
    TO {
      ?director a :Director ;
        :directed ?movie ;
        rdfs:label ?directorName ;
    }
    WHERE {
      BIND (template("http://www.imdb.com/title/{movieId}") AS ?movie)
      BIND (template("http://www.imdb.com/name/{directorId}") AS ?director)
    }
    ;
    # actors, no mapping name
    MAPPING <someIri>
    FROM JSON {
      "movies":{
        "_id": "?movieId",
        "cast": [
          { "id": "?actorId", "name": "?actorName", "role": "?characterName" }
        ]
      }
    }
    TO {
      ?actor a :Actor ;
        :starredIn ?movie ;
        :actorName ?actorName ;
    }
    WHERE {
      BIND (template("http://www.imdb.com/title/{movieId}") AS ?movie)
      BIND (template("http://www.imdb.com/name/{actorId}") AS ?actor)
    }
`,
  nonTerminatedSqlBlock: `MAPPING 
  FROM SQL { SELECT *
  FROM review
  TO {
    ?subject <http://api.stardog.com/review#language> ?language .
    ?subject <http://api.stardog.com/review#nr> ?nr .
    ?subject <http://api.stardog.com/review#person> ?person .
    ?subject <http://api.stardog.com/review#producer> ?producer .
    ?subject <http://api.stardog.com/review#product> ?product .
    ?subject <http://api.stardog.com/review#publishDate> ?publishDate .
    ?subject <http://api.stardog.com/review#publisher> ?publisher .
    ?subject <http://api.stardog.com/review#rating1> ?rating1 .
    ?subject <http://api.stardog.com/review#rating2> ?rating2 .
    ?subject <http://api.stardog.com/review#rating3> ?rating3 .
    ?subject <http://api.stardog.com/review#rating4> ?rating4 .
    ?subject <http://api.stardog.com/review#reviewDate> ?reviewDate .
    ?subject <http://api.stardog.com/review#text> ?text .
    ?subject <http://api.stardog.com/review#title> ?title .
    ?subject rdf:type :review
  } WHERE {
    BIND(template("http://api.stardog.com/review/nr={nr}") AS ?subject)
    BIND(xsd:date(?publishDate) AS ?publishDate)
    BIND(xsd:dateTime(?reviewDate) AS ?reviewDate)
    BIND(xsd:integer(?nr) AS ?nr)
    BIND(xsd:integer(?person) AS ?person)
    BIND(xsd:integer(?producer) AS ?producer)
    BIND(xsd:integer(?product) AS ?product)
    BIND(xsd:integer(?publisher) AS ?publisher)
    BIND(xsd:integer(?rating1) AS ?rating1)
    BIND(xsd:integer(?rating2) AS ?rating2)
    BIND(xsd:integer(?rating3) AS ?rating3)
    BIND(xsd:integer(?rating4) AS ?rating4)
  }
  `,
};
