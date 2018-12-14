/*
 * Leaflet year Slider.
 *
 * This is merely a specific configuration of Leaflet of L.TimeDimension.
 * See here: https://github.com/socib/Leaflet.TimeDimension
 */
(function () {
  "use strict";

  var defaultOptions = {
    // YearSlider options.
    yearChangeCallback: null,
    yearStart: 2000,
    yearEnd: 2018,
    // TimeDimensionControl options.
    timeSliderDragUpdate: true,
    speedSlider: false,
    position: 'bottomleft',
    // Player options.
    playerOptions: {
      transitionTime: 1000,
      loop: false,
      startOver: true
    },
  };

  L.Control.YearSlider = L.Control.TimeDimension.extend({

    // Hijack the displayed date format.
    _getDisplayDateFormat: function(date){
      return date.getFullYear();
    }

  });

  // Helper function to compose the full widget.
  L.Control.yearSlider = function(options) {
    // Extend the defaults.
    options = L.Util.extend(defaultOptions, options);
    // Hardcode the timeDimension to year intervals.
    options.timeDimension = new L.TimeDimension({
      period: 'P1Y',
      timeInterval: options.yearStart + '-01-02/' + options.yearEnd + '-01-02',
      currentTime: new Date(options.yearStart + '-01-02').getTime(),
    });
    // Create the player.
    options.player = new L.TimeDimension.Player(options.playerOptions, options.timeDimension);
    // Listen for time changes.
    if (typeof options.yearChangeCallback === 'function') {
      options.timeDimension.on('timeload', options.yearChangeCallback);
    };
    // Return the control.
    return new L.Control.YearSlider(options);
  };
}());
