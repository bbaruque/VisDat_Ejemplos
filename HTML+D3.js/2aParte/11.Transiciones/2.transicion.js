svg = d3.select('body').append( 'svg' ),
dots = svg.append( 'g' );
    
// create loop to append some circle
for ( var i = 1; i <= 5; ++i ) {
    // append circle
    dots.append( 'circle' )
        // set radius to '0' because we want
        // animate it later on
        .attr( 'r', 0 )
        // kind of center it horizontally - I know it is not exactly in the middle ;)
        .attr( 'cx',  150 )
        // give different y position
        .attr( 'cy', i * 25 )
        // add event handler
        .on( 'mouseenter', function() {
          // select element in current context
          d3.select( this )
            // add transition
            .transition()
            // change attribute
            .attr( 'r', 10 );
        } )
        // add event handler
        .on( 'mouseleave', function() {
          // select element in current context
          d3.select( this )
            // add transition
            .transition()
            // change attribute
            .attr( 'r', 6 );
        } )
        // add transition for kick off
        .transition()
        // add delay so that it looks nice
        .delay( 200 * i )
        // set radius to wished size
        .attr( 'r', 6 );
}
