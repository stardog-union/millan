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
  csvMapping: {
    brace: `
      prefix rdfs:    <http://www.w3.org/2000/01/rdf-schema#>
      prefix xsd:     <http://www.w3.org/2001/XMLSchema#>
      prefix gr:      <http://purl.org/goodrelations/v1#>
      prefix foaf:    <http://xmlns.com/foaf/0.1/>
      prefix dbpedia: <http://dbpedia.org/resource/>
      prefix vso:     <http://purl.org/vso/ns#>
      prefix : <http://example.org/cars#>

      mapping <urn:mapping>
      from csv {
      }
      to {
        ?manufacturer a gr:BusinessEntity ;
        rdfs:label ?Make .

        ?model_iri a gr:ProductOrServiceModel ;
        rdfs:label ?model_string ;
        gr:hasManufacturer ?make_iri .

        ?car_iri a vso:Automobile, gr:ActualProductOrServiceInstance ;
        rdfs:label ?car_label ;
            gr:hasManufacturer ?make_hash_iri ;
            gr:hasMakeAndModel ?model_iri ;
            vso:modelDate ?model_date .

        ?offer_iri a gr:Offering ;
            rdfs:comment ?Description ;
            gr:includes ?car_iri ;
            gr:hasBusinessFunction gr:Sell ;
            gr:hasPriceSpecification ?price_bnode .

        ?price_bnode a gr:UnitPriceSpecification ;
            gr:hasCurrency "USD"^^xsd:string ;
            gr:hasCurrencyValue ?price_float .
      }
      where {
        bind(template("http://example.org/cars#Manufacturer-{Make}") as ?manufacturer)
        bind(sha1(?Model) as ?model_hash)
        bind(template("http://example.org/cars#Model-{model_hash}") as ?model_iri)
        bind(concat(?Make, " ", ?Model) as ?model_string)
        bind(template("http://example.org/cars#Manufacturer-{Make}") as ?make_iri)
        bind(template("http://example.org/cars#Car-{_ROW_NUMBER_}") as ?car_iri)
        bind(concat(?Make, " ", ?Model, " (", ?Year, ")") as ?car_label)
        bind(sha1(?Make) as ?make_hash)
        bind(template("http://example.org/cars#Manufacturer-{make_hash}") as ?make_hash_iri)
        bind(xsd:date(concat(?Year, "-01-01")) as ?model_date)
        bind(template("http://example.org/cars#Offer-{_ROW_NUMBER_}") as ?offer_iri)
        bind(bnode() as ?price_bnode)
        bind(xsd:float(?Price) AS ?price_float)
      }`,
    no_brace: `
      # x,y,name,unused
      mapping
      from csv
      to {
        ?subj a :Thing ;
        :name ?name ;
        :expr2 ?expr2 ;
        .
      }
      where {
        bind(coalesce(?x, ?y) as ?id)
        bind(if(bound(?x), concat("x + 1 = ", str(integer(?x) + 1)), "x is not bound") as ?expr2)
        bind(template("http://example.com/{id}") as ?subj)
      }`,
  },
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
  bind: `
  # stardog.java misc.sms
  PREFIX : <http://example.com/>
  MAPPING <urn:misc>
  FROM JSON {
    {
      "datasets" : {
        "?datasetName" : { "?datasetKey" : "?datasetVal" },
        "dataset1" : { "x" : "?dataset1x" }
      },
      "bind_chain" : "?bindChainRoot",
      "bind_chain_str" : "?bindChainStr"
    }
  }
  TO {
    ?datasetIri a :Dataset ;
      :formalName ?formalName ;
      ?datasetProp ?datasetVal .
    # Constant in the subject position
    <urn:root> :bindChain ?bindChainFinal ;
      # shouldn't show up
      :missing ?missing ;
      :templateExprArg ?templateExprArg ;
      :dataset1x ?dataset1x .
  }
  WHERE {
    # chain of binds with multiple variable dependencies
    bind(xsd:integer(?bindChainRoot) as ?bindChainInt)
    bind(?bindChainInt + 1 as ?bindChainAdded)
    bind(str(?bindChainAdded) as ?bindChainAddedStr)
    bind(concat(?bindChainStr, ?bindChainAddedStr) as ?bindChainFinal)
    # template with expr args
    bind(template("http://example.com/something/{bindChainAddedStr}") as ?templateExprArg)
    bind(template("http://example.com/dataset/{datasetName}") as ?datasetIri)
    bind(template("http://example.com/dataset/{datasetKey}") as ?datasetProp)
    # Regex with escaped chars
    bind(replace(?datasetName, "dataset(\\\\d)", "This is #$1") as ?formalName)
  }

  ;

  # issue 49
  MAPPING
  FROM SQL {
    SELECT *
    FROM \`cardb\`.\`car\`
  }
  TO {
    ?subject <http://api.stardog.com/car#brand> ?brand .
    ?subject <http://api.stardog.com/car#color> ?color .
    ?subject <http://api.stardog.com/car#id> ?id_integer .
    ?subject <http://api.stardog.com/car#model> ?model .
    ?subject <http://api.stardog.com/car#owner> ?owner_integer .
    ?subject <http://api.stardog.com/car#price> ?price_integer .
    ?subject <http://api.stardog.com/car#ref-owner> ?ref_owner .
    ?subject <http://api.stardog.com/car#register_number> ?register_number .
    ?subject <http://api.stardog.com/car#year> ?year_integer .
    ?subject rdf:type :car
  } WHERE {
    BIND(StrDt(?id, xsd:integer) AS ?id_integer)
    BIND(StrDt(?owner, xsd:integer) AS ?owner_integer)
    BIND(StrDt(?price, xsd:integer) AS ?price_integer)
    BIND(StrDt(?year, xsd:integer) AS ?year_integer)
    BIND(template("http://api.stardog.com/car/id={id}") AS ?subject)
    BIND(template("http://api.stardog.com/owner/owner_id={owner}") AS ?ref_owner)
  }

  ;

  # valid matchings
  MAPPING
  FROM SQL {
    SELECT *
    FROM sms_bind
  }
  TO {
    ?subject <http://api.stardog.com/sms_bind#strdt> ?strdt .
    ?subject <http://api.stardog.com/sms_bind#strlang> ?strlang .
    ?subject <http://api.stardog.com/sms_bind#template> ?template .
    ?subject <http://api.stardog.com/sms_bind#iri_func> ?iri_func .
    ?subject <http://api.stardog.com/sms_bind#iri> ?iri .
    ?subject rdf:type :sms_bind
  } WHERE {
    BIND(StrDt(?id, xsd:integer) AS ?strdt)
    BIND(StrLang("Hello", "en") AS ?strlang)
    BIND(iri(?url) AS ?iri_func)
    BIND(<http://example.com> as ?iri)
    BIND(template("http://api.stardog.com/sms_bind/template={id}") AS ?template)
  }
  `,
};
