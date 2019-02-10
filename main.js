var map = {
  containerId: 'map' ,
  container: null ,
  rows: 50 ,
  columns: 100 ,
  clickInterval: 1000 / 2, // Time interval for the main loop
  locs: {},
  clicks:0 ,

  init: function() {
    this.container = document.getElementById(this.containerId); // get the container
    this.container.innerHTML = ""; // clear the container
    this.clicks = 0;
    for (var y = 1; y <= this.rows; y++) { // create the rows
      let row = document.createElement("tr");
      this.container.appendChild(row);
      for (var x = 1; x <= this.columns; x++) {
        let loc = document.createElement('td');
        loc.innerHTML = "";
        loc.id = "loc-" + x + "-" + y;
        loc.className = "map-loc";
        row.appendChild(loc);
        this.locs[x+'-'+y] =  { // Record the locs
            x: x,
            y: y,
            el: loc,
            active: false,
          };
      }
    }
    // Generate some random agents
    for (var i = 1; i <= Math.floor(this.columns * this.rows * 0.10); i++) {
      let x = Math.floor(Math.random() * this.columns) + 1 ;
      let y =  Math.floor(Math.random() * this.rows) + 1 ;
      this.locs[x+'-'+y].active = true;
    }
  } ,

  loop: function(){
    // draw all the agents
    for (var i in this.locs) {
      let loc = this.locs[i];
      let count = 0;

      try { if(this.locs[(loc.x-1)+'-'+(loc.y-1)].active == true) { count++; } } catch(err){}
      try { if(this.locs[(loc.x-1)+'-'+(loc.y)].active == true) { count++; } } catch(err){}
      try { if(this.locs[(loc.x-1)+'-'+(loc.y+1)].active == true) { count++; } } catch(err){}

      try { if(this.locs[(loc.x+1)+'-'+(loc.y-1)].active == true) { count++; } } catch(err){}
      try { if(this.locs[(loc.x+1)+'-'+(loc.y)].active == true) { count++; } } catch(err){}
      try { if(this.locs[(loc.x+1)+'-'+(loc.y+1)].active == true) { count++; } } catch(err){}

      try { if(this.locs[(loc.x)+'-'+(loc.y+1)].active == true) { count++; } } catch(err){}
      try { if(this.locs[(loc.x)+'-'+(loc.y-1)].active == true) { count++; } } catch(err){}

      loc.count = count;

      if(count <= 1 ) { loc.active = false; }
      if(count >= 4) { loc.active = false; }
      if(count == 3) { loc.active = true; }

      if(loc.active == true) {
        loc.el.style.backgroundColor = 'green';
      } else {
        loc.el.style.backgroundColor = 'black';
      }
    }
    this.clicks++
    document.getElementById('status').innerHTML = "Clicks=" + this.clicks;
  } ,
};


map.init();
window.setInterval(function(){
  map.loop();
}, map.clickInterval);

console.log(document.getElementById('reset-btn'));
document.getElementById('reset-btn').onclick = function(){
  map.init();
};
