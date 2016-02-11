.. _jquery:

JQuery and Django
=================
JQuery rocks! JQuery is a library written in Javascript that seriously pimps its power and utility. A few lines of JQuery often encapsulates hundreds of lines of javascript. JQuery provides a suite of functionality that is mainly focused on manipulating HTML elements. In this chapter, we will describe:

* how to incorporate JQuery within your Django Application
* explain how to interpret JQuery code
* and provide a number of small examples


Including JQuery in your Django Project/Application
---------------------------------------------------

In your *base* template include a reference to:

.. code-block:: html

	{% load staticfiles %}
	
	<script src="{% static "js/jquery-1.11.1.js" %}"></script>
	<script src="{% static "js/rango-jquery.js" %}"></script>

Here we assume you have downloaded a version of the JQuery library, but you can also just directly refer to it:

.. code-block:: html

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	

Make sure you have your static files set up (see Chapter :ref:`setup-label`)

In the static folder create a *js* folder and plonk the JQuery javascript file (``jquery.js``) here along with an file called ``rango-jquery.js``, which will house our javascript code. In ``rango-jquery.js``, add the following javascript:

.. code-block:: javascript

	$(document).ready(function() {
	
		// JQuery code to be added in here.
	
	});


This piece of JQuery, first selects the document object (with ``$(document)``), and then makes a call to ``ready()``. Once the document is ready i.e. the complete page is loaded, then the anonymous function denoted by ``function(){ }`` will be executed. It is pretty typical, if not standard, to wait until the document has been finished loading before running the JQuery functions. Otherwise, the code my try to run, but the HTML elements may not have been downloaded (see http://api.jquery.com/ready/).

Stylistic Note
..............
JQuery requires you to think in a more ``functional`` programming style, as opposed to the typical Javascript style which is often written in a more ``procedural`` programming style. For all the JQuery commands they follow a similar pattern: Select and Act. Select an element, and then act on the element. So it is good to keep this in mind. There are different selection operators, and various actions that can then be performed/applied. In the next, subsections we will take a few JQuery functions that you can use to manipulate the HTML elements.
	
	
	
Example Popup Box on Click
--------------------------
In this example, we want to show you the difference between doing the same functionality in standard Javascript versus JQuery.

In your ``about.html`` template, add the following piece of code:


.. code-block:: html

	 <button onClick="alert('You clicked the button using Javascript.');"> 
	 	Click Me - I run Javascript 
	 </button>
	 
	
As you can see, we are assigning the function ``alert()`` to the ``onClick`` handler of the button. Load up the ``about`` page, and try it  out. 

Now lets do it using JQuery, by first adding another button:

.. code-block:: html

	<button id="about-btn"> Click Me - I'm Javascript on Speed</button>
	
	<p>This is a example</p>

	<p>This is another example</p>


Notice that there is not javascript code associated with the button currently. We will be doing that with the following code added to ``rango-jquery.js``:


.. code-block:: javascript
	 
	$(document).ready( function() {
	        
	    $("#about-btn").click( function(event) {
	    	alert("You clicked the button using JQuery!");
	    });
   	});


Reload the page, and try it out. Hopefully, you will see that both buttons pop up an alert. 

The JQuery/Javascript code here, first selects the document object, and when it is ready, it executes the functions within its body, i.e. ``$("#about-btn").click()``, which selects the element in the page with id equal to ``about-btn``, and then it programatically assigns to the on click event, the ``alert()`` function.

At first you might think that jQuery is rather cumbersome, as it requires us to include  a lot more code to do the same thing. This may be true for a simple function like ``alert()`` but for more complex functions it is much cleaner, as the JQuery/Javascript code is maintained in a separate file (completely!!). This is because we assign the event handler at run-time rather than statically within the code. We achieve separation of concerns between the jquery/javascript code and the html code.

.. note:: Remember when it comes to CSS, JAVASCRIPT and HTML, you gotta keep them separated!


Selectors
---------

There are different ways to select elements in JQuery. From the above example, shows how the ``#`` can be used to find ``id`` elements in your html document. To find classes, you can use ``.``, so, for example, if we added the following code:

.. code-block:: javascript

    $(".ouch").click( function(event) {
               alert("You clicked me! ouch!");
    });

Then all elements, that had a ``class="ouch"`` would be selected, and assigned to its on click handler, the ``alert()`` function. Note that all the elements would be assigned the same function.

Also, html tags can also be selected by referring to the tag in the selector:

.. code-block:: javascript

    $("p").hover( function() {
		$(this).css('color', 'red');
	}, 
	function() {
		$(this).css('color', 'blue');
	});
	

Here, we are selecting all the ``p`` html elements, and on hover we are associated two functions, one for on hover, and the other for hover off. You can see that we are using another selector called, ``this``, which selects the element in question, and then sets it color to red or blue, respectively.
Note, the JQuery ``hover()`` function takes two functions (see http://api.jquery.com/hover/), the JQuery ``click()`` requires the event to passed through (see http://api.jquery.com/click/).

Try adding the above code your ``rango-jquery.js`` file, make sure it is within the ``$(document).ready()`` function. What happens if you change the ``$(this)`` to ``$(p)``?

Hover, is an example of a mouse move event, for descriptions on other such events, see: http://api.jquery.com/category/events/mouse-events/



DOM Manipulation Example
------------------------
In the above example, we used the ``hover`` function to assign an event handler to the on hover event, and then used the ``css`` function to change the color of the element. The ``css`` is one example of DOM manipulation, however, the stand JQuery library provides many other ways to manipulate the DOM. For example,
we can add classes to elements, with the ``addClass`` function:

.. code-block:: javascript

    $("#about-btn").addClass('btn btn-primary')
	

This will select the element with id ``#about-btn``, and assign the classes ``btn`` and ``btn-primary`` to it. By adding these Bootstrap classes will mean the button will now appear in the bootstrap style (assuming you are using the Bootstrap toolkit).

It is also possible to access the html of a particular element. For example, lets put a ``div`` in the ``about.html``:


.. code-block:: html 

	<div id="msg">Hello</div>

Then add the following JQuery to ``rango-jquery.js``:


.. code-block:: javascript

		$("#about-btn").click( function(event) {
	    	msgstr = $("#msg").html()
			msgstr = msgstr + "o"
			$("#msg").html(msgstr)
		 });



On click of the element with id ``#about-btn``, we first get the html inside the element with id ``msg`` and appeand "o" to it. Then we change the html inside the element by calling the ``html`` function again, but this time passing through string ``msgstr`` to replace the html inside that element.

 

In this chapter we have provided a very rudimentry guide to using JQuery and incroporating it within your Django Application. From here you should be able to understand how JQuery operates and experiment with the different functions and libraries provided by JQuery and JQuery developers (see  http://jquery.com). In the next chapter we will be using the JQuery to help provide AJAX functionality within Rango.
 

