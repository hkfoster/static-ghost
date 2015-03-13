/**
 * Disable hover events on scroll
 * @see http://www.thecssninja.com/javascript/pointer-events-60fps
 */

var root = document.documentElement, timer;

window.addEventListener( 'scroll', function() {
  clearTimeout( timer );

  if ( !root.style.pointerEvents ) {
    root.style.pointerEvents = 'none';
  }

  timer = setTimeout(function() {
    root.style.pointerEvents = '';
  }, 150 );
}, false );;/*
 * isStyleSupported
 * Detect support for CSS styles and assignable values
 * @url http://ryanmorr.com/detecting-css-style-support/
 * @src https://github.com/ryanmorr/is-style-supported
 * @param {String} style
 * @param {String} value
 * @return {Boolean}
 */
( function( win ) {
  'use strict';

  // Define a test element
  var el = win.document.createElement( 'div' ),

  // Create an array of vendor prefixes
  prefixes = [ 'Webkit', 'Moz', 'O', 'ms' ],

  // Create a regular expression to make hypenated strings camel cased
  camelRe = /-([a-z]|[0-9])/ig,

  // Create the cache
  cache = {},

  // Define common variables
  key,
  length,
  support,
  camel,
  capitalized,
  prefixed;

  // Function to convert css notation (hypenated) to DOM notation (camel cased)
  function toCamelCase( style ) {
    return style.replace( camelRe, function( all, letter ) {
      return ( letter + '' ).toUpperCase();
    });
  }

  // Encapsulate the different native APIs in a function
  function supports(  style, value) {

    // Check for the standard native method first
    if ( 'CSS' in win && 'supports' in win.CSS ) {
      return win.CSS.supports( style, value );
    }

    // Check for Opera's native method
    if ( 'supportsCSS' in win ) {
      return win.supportsCSS( style, value );
    }
    return false;
  }

  // Define the function globally
  win.isStyleSupported = function( style, value ) {

    // If no value is supplied, use "inherit" as all styles support it
    value = arguments.length === 2 ? value : 'inherit';

    // Create a key for caching purposes
    key = style + ':' + value;

    // Check the cache
    if ( key in cache ) {

      // If the key is found in the cache, return the cached result
      return cache[ key ];
    }

    // Check native method first
    support = supports( style, value );

    // If the native method has determined positive support, skip the rest
    if ( !support ) {

      // Create a camel cased version of the style property for DOM interaction
      camel = toCamelCase( style );

      // Create a capitalized version of the style property to be combined with the vendor prefixes
      capitalized = camel.charAt( 0 ).toUpperCase() + camel.slice( 1 );

      // Add the style and value inline to the test element
      el.style.cssText = style + ':' + value;

      // Check to see if the style and value exists
      support = camel in el.style && el.style[ camel ] !== '';

      // Cache the length of prefixes for the while loop
      length = prefixes.length;

      // Loop the prefixes while support is yet to be determined
      while ( !support && length-- ) {

        // Create a vendor prefixed version of the style property in CSS notation (hypenated)
        prefixed = '-' + prefixes[ length ].toLowerCase() + '-' + style;

        // Check native method first
        support = supports( prefixed, value );

        // If the native method has determined positive support, skip the rest
        if ( !support ) {

          // Create a vendor prefixed version of the style property in camel case format
          camel = prefixes[ length ] + capitalized;

          // Add the vendor prefixed style and value inline
          el.style.cssText = prefixed + ':' + value;

          // Check to see if the style and value exists
          support = camel in el.style && el.style[ camel ] !== '';
        }
      }
    }

    // Cache and return the result
    return cache[ key ] = support;
  };

})( this );

// Detect support for `background-blend-mode` on hero banners
if ( !isStyleSupported( 'background-blend-mode' ) ) {
  classie.remove( document.body, 'blend-mode' );
}

document.querySelector( '.menu-trigger' ).addEventListener( 'click', function( event ) {
  event.preventDefault();
  classie.toggle( document.body, 'menu-open' );
}, false );;/**
 * Classie v1.0.1
 * Class helper functions
 * From bonzo https://github.com/ded/bonzo
 * MIT license
 */

( function( window ) {

'use strict';

// Class helper functions from bonzo https://github.com/ded/bonzo
function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// ClassList support for class management
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// Transport
if ( typeof define === 'function' && define.amd ) {
  define( classie );
} else if ( typeof exports === 'object' ) {
  module.exports = classie;
} else {
  window.classie = classie;
}

})( window );;/**
 * Lightbox.js 0.0.1
 * @author Kyle Foster (@hkfoster)
 * @license MIT
 */
var lightBoxInit = ( function() {

  var triggers = document.querySelectorAll( '[rel="modal"]' );

  if ( triggers ) {

    var init = function() {

      // Assignment
      var modals = document.querySelectorAll( '.modal' ),
          overlay;

      // And add an overlay to modal elements
      for ( var modalIndex = 0; modalIndex < modals.length; modalIndex++ ) {
        addOverlay( modals[ modalIndex ] );
      }

      // Attach event listeners to trigger elements
      for ( var triggerIndex = 0; triggerIndex < triggers.length; triggerIndex++ ) {
        triggers[ triggerIndex ].addEventListener( 'click', showModal, false );
      }

      // Add overlay function
      function addOverlay( parentNode ) {

        // Create overlay element
        overlay = document.createElement( 'span' );

        // Attribute assignment
        classie.add( overlay, 'overlay' );

        overlay.title = 'Close this modal';

        // Append to modal
        parentNode.appendChild( overlay );

      }

      // Show modal function
      function showModal( event ) {

        // Prevent default behavior/bubbling
        event.stopPropagation();
        event.preventDefault();

        // Assignment
        var targetModal = document.querySelector( '#' + this.href.split( '#' )[ 1 ] );
            overlay     = targetModal.querySelector( '.overlay' );

        // Add overlay click event listener
        overlay.addEventListener( 'click', hideModal, false );

        // Show the modal
        classie.add( targetModal, 'visible' );

        // Kill scrolling behind modal
        classie.add( document.body, 'no-scroll' );

      }

      // Hide modal function
      function hideModal() {

        // Assignment
        var visibleModal = document.querySelector( '.modal.visible' );

        // Hide the modal
        classie.remove( visibleModal, 'visible' );

        // Remove overlay click event listener
        overlay.removeEventListener( 'click', hideModal, false );

        // Empty variable to prevent bubbling
        overlay = null;

        // Turn scrolling back on
        classie.remove( document.body, 'no-scroll' );

      }

    };

    init();

  }

})();;// Instantiation
headliner( document.querySelectorAll( '.post-title' ) );

// Wrap ampersands and prevent widows function
function headliner( node ) {
  for ( var i = 0; i < node.length; i++ ) {
    var trueNode = bypassLinks( node[ i ] ),
        nodeText = trueNode.textContent,
        ampWrap  = nodeText
                     .replace( /&/gi, '<span class="amp">&amp;</span>' ) // Wrap ampersands
                     .replace( /\&nbsp;([^\s]+)$/, ' $1' )               // Prevent widows
                     .replace( /\s([^\s]+)\s*$/, '&nbsp;$1' );           // Prevent widows

    trueNode.innerHTML = ampWrap;
  }
}

// Prevent stripped hrefs
function bypassLinks( node ) {
  if ( node.firstChild.nodeType === 3 ) {
    return node;
  } else {
    return node.firstChild;
  }
}