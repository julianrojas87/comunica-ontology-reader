const Engine = require('./src/Engine');

var engine = new Engine('http://hdelva.be/tiles/ns/ontology');

// Examples of getting the possible values a certain property can have

engine.getNamedIndividualsForProperty('https://w3id.org/openstreetmap/terms#highway').then(data => {
    console.log('------------osm:highway values-----------');
    console.log(data);
});

engine.getNamedIndividualsForProperty('https://w3id.org/openstreetmap/terms#smoothness').then(data => {
    console.log('------------osm:smoothnes values-----------');
    console.log(data);
});

// Examples of getting the description of a certain entity

engine.getEntityDescription('https://w3id.org/openstreetmap/terms#CycleHighway').then(data => {
    console.log('------------osm:CycleHighway description-----------');
    console.log(data);
});

engine.getEntityDescription('https://w3id.org/openstreetmap/terms#HorribleSmoothness').then(data => {
    console.log('------------osm:HorribleSmoothness description-----------');
    console.log(data);
});