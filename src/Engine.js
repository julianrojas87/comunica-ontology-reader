const newEngine = require('@comunica/actor-init-sparql').newEngine;

class Engine {
    constructor(source) {
        this._source = [{ type: 'file', value: source }];
    }

    getEntityDescription(subject) {
        return new Promise((resolve, reject) => {
            const sources = this._source;

            const query = `
                  SELECT ?p ?o WHERE {
                    <${subject}> ?p ?o.
                  }`;

            const engine = newEngine();
            let results = {};
            engine.query(query, { sources }).then(result => {
                result.bindingsStream.on('data', data => {
                    results[data.get('?p').value] = data.get('?o').value;
                }).on('end', () => {
                    resolve(results);
                });
            });
        });
    }

    getNamedIndividualsForProperty(property) {
        return new Promise((resolve, reject) => {
            const sources = this._source;

            const query = `
                  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                  
                  SELECT ?ni WHERE {
                    <${property}> rdfs:range ?range.
                    ?ni a ?range.
                  }`;

            const engine = newEngine();
            let results = [];
            engine.query(query, { sources }).then(result => {
                result.bindingsStream.on('data', data => {
                    results.push(data.get('?ni').value);
                }).on('end', () => {
                    resolve(results);
                });
            });
        });
    }
}

module.exports = Engine;

