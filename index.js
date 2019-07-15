const sources = [
    //{ type: 'file', value: 'http://hdelva.be/tiles/ns/ontology' }
    { type: 'file', value: 'https://openplanner.ilabt.imec.be/shacl-spec/' }
  ];
  
  const query = `
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX sh: <http://www.w3.org/ns/shacl#>
      
      SELECT ?s ?path WHERE {
          ?s rdfs:type sh:Parameter.
          ?s sh:path ?path.
          
      }`;
  
  const newEngine = require('@comunica/actor-init-sparql').newEngine;
  const engine = newEngine();
  
  engine.query(query, { sources }).then(result => {
    result.bindingsStream.on('data', data => {
      console.log(data.get('?path'));
    });
  });