//Fetch busPositions data from API
async function busPositions(){
  const api_url = 'https://api.wmata.com/Bus.svc/json/jBusPositions?api_key=64a8cf6e11ab4c58a6e26b942419ff3a';
    const response = await fetch(api_url);
    const data = await response.json();
    return data;
}

// MapBox Key
mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGhhZ21vcmVubyIsImEiOiJja3VzbzF0bTY1aDU0MnZuemx0Z2I3YXB2In0.1UfhICPQfs3cYj2zhhZiag';

// Creating the map
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-77.036560, 38.897957],
  zoom: 10,
});

//Array to hold markers of the bus locations
const busMarkers =[];

//Main Function
async function mainFunction(){
  const coordinates = await busPositions();
  console.log(coordinates);
  //console.log(coordinates.BusPositions[0].Lon);
  //console.log(coordinates.BusPositions[0].Lat);
  
  //Adding Marker to the first location
  for (let i=0; i<coordinates.BusPositions.length; i++){
    let marker = new mapboxgl.Marker({color:"#922B21"})
    .setLngLat([coordinates.BusPositions[i].Lon,coordinates.BusPositions[i].Lat ])
    .addTo(map);
    busMarkers.push(marker);
  }
}
mainFunction();
setTimeout(mainFunction,15000)

 


