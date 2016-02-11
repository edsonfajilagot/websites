Working with Templates
======================
So far we've created several Django HTML templates for different pages in the application. You've probably already noticed that there is a lot of repeated HTML code in these templates.

While most sites will have lots of repeated structure (i.e. headers, sidebars, footers, etc) repeating the HTML in each template is a not good way to handle this. So instead of doing the same cut and paste hack job, we can minimize the amount of repetition in our code base by employing *template inheritance* provided by Django's Template Language.

The basic approach to using inheritance in templates is as follows.

#. Identify the re-occurring parts of each page that are repeated across your application (i.e. header bar, sidebar, footer, content pane)
#. In a *base template*, provide the skeleton structure of a standard page along with any common content (i.e. the copyright notice that goes in the footer, the logo and title that appears in the section), and then define a number of *blocks* which are subject to change depending on which page the user is viewing.
#. Create specific templates - all of which inherit from the base template - and specify the contents of each block.

Reoccurring HTML and The Base Template
--------------------------------------
Given the templates that we have created so far it should be pretty obvious that we have been repeating a fair bit of HTML code. Below we have abstracted away any page specific details to show the skeleton structure that we have been repeating within each template.

.. code-block:: html
	
	<!DOCTYPE html>
	
	<html>
	    <head>
	        <title>Rango</title>
	    </head>
	
	    <body>
	        <!-- Page specific content goes here -->
	    </body>
	</html>

Let's make this our base template, for the time being, and save it as ``base.html`` in the ``templates`` directory (e.g. ``templates/base.html``). 

.. note:: You should always aim to extract as much reoccurring content for your base templates. While it may be a bit more of a challenge for you to do initially, the time you will save in maintenance of your templates in the future far outweighs the initial overhead. Think about it: would you rather maintain one copy of your markup or multiple copies?

.. warning:: Remember that your page ``<!DOCTYPE html>`` declaration absolutely must be placed on the first line for your page! Not doing so will mean your markup will not comply with the W3C HTML5 guidelines.

Template Blocks
---------------
Now that we've identified our base template, we can prepare it for our inheriting templates. To do this, we need to include a Template Tag to indicate what can be overridden in the base template - this is done through the use of *blocks*.

Add a ``body_block`` to the base template as follows:

.. code-block:: html
	
	<!DOCTYPE html>
	
	<html>
	    <head lang="en">
		<meta charset="UTF-8">
	        <title>Rango</title>
	    </head>
	
	    <body>
	        {% block body_block %}{% endblock %}
	    </body>
	</html>

Recall that standard Django template commands are denoted by ``{%`` and ``%}`` tags. To start a block, the command is ``block <NAME>``, where ``<NAME>`` is the name of the block you wish to create. You must also ensure that you close the block with the ``endblock`` command, again enclosed within Django template tags.

You can also specify 'default content' for your blocks, for example:

.. code-block:: html
	
	{% block body_block %}This is body_block's default content.{% endblock %}


When we create templates for each page we will inherit from ``base.html`` and override the contents of the ``body_block``. However, you can place as many blocks in your templates as you so desire. For example, you could create a block for the page title, a footer, a sidebar, etc. Blocks are a really powerful feature of Django's template system to learn more about them check out the `official Django documentation on templates <https://docs.djangoproject.com/en/1.7/topics/templates/#id1>`_.

Abstracting Further
...................
Now that you have an understanding of Django blocks, let's take the opportunity to abstract our base template a little bit further. Reopen the ``base.html`` template and modify it to look like the following.

.. code-block:: html
	
	<!DOCTYPE html>
	
	<html>
	    <head>
	        <title>Rango - {% block title %}How to Tango with Django!{% endblock %}</title>
	    </head>

	    <body>
	        <div>
	            {% block body_block %}{% endblock %}
	        </div>
	        
	        <hr />
	        
	        <div>
	            <ul>
	            {% if user.is_authenticated %}
	                <li><a href="/rango/restricted/">Restricted Page</a></li>
	                <li><a href="/rango/logout/">Logout</a></li>
	                <li><a href="/rango/add_category/">Add a New Category</a></li>
	            {% else %}
	                <li><a href="/rango/register/">Register Here</a></li>
	                <li><a href="/rango/login/">Login</a></li>
	            {% endif %}
	                
	                <li><a href="/rango/about/">About</a></li>
	            </ul>
	        </div>
	    </body>
	</html>

We have introduced two new features into the template.

* The first is a new Django template block, ``title``. This will allow us to specify a custom page title for each page inheriting from our base template. If an inheriting page does not make use of this feature, the title is defaulted to ``Rango - How to Tango with Django!``
* We also bring across the list of links from our current ``index.html`` template and place them into a HTML ``<div>`` tag underneath our ``body_block`` block. This will ensure the links are present across all pages inheriting from the base template. The links are preceded by a *horizontal rule* (``<hr />``) which provides a visual separation between the ``body_block`` content and the links. 

Also note that we enclose the ``body_block`` within a HTML ``<div>`` tag - we'll be explaining the meaning of the ``<div>`` tag in Chapter :ref:`css-course-label`. Our links are also converted to an unordered HTML list through use of the ``<ul>`` and ``<li>`` tags.


Template Inheritance
--------------------
Now that we've created a base template with a block, we can now update the templates we have created to inherit from the base template. For example, let's refactor the template ``rango/category.html``.

To do this, first remove all the repeated HTML code leaving only the HTML and Template Tags/Commands specific to the page. Then at the beginning of the template add the following line of code:

.. code-block:: html
	
	{% extends 'base.html' %}

The ``extends`` command takes one parameter, the template which is to be extended/inherited from (i.e. ``rango/base.html``). We can then modify the ``category.html`` template so it looks like the following complete example.

.. note:: The parameter you supply to the ``extends`` command should be relative from your project's ``templates`` directory. For example, all templates we use for Rango should extend from ``rango/base.html``, not ``base.html``.

.. code-block:: html
	
	{% extends 'base.html' %}
	
	{% load staticfiles %}
	
	{% block title %}{{ category_name }}{% endblock %}
	
	{% block body_block %}
	    <h1>{{ category_name }}</h1>
	    {% if category %}
	    	{% if pages %}
	    	<ul>
	        	{% for page in pages %}
	        	<li><a href="{{ page.url }}">{{ page.title }}</a></li>
	        	{% endfor %}
	    		</ul>
	    	{% else %}
	        	<strong>No pages currently in category.</strong>
	    		{% endif %}
	    
	    	{% if user.is_authenticated %}
	       		<a href="/rango/category/{{category.slug}}/add_page/">Add a Page</a>
			{% endif %}
		{% else %}
			 The specified category {{ category_name }} does not exist!
	    {% endif %}
		
	{% endblock %}

Now that we inherit from ``base.html``, all that exists within the ``category.html`` template is the ``extends`` command, the ``title`` block and the ``body_block`` block. You don't need a well-formatted HTML document because ``base.html`` provides all the groundwork for you. All you're doing is plugging in additional content to the base template to create the complete HTML document which is sent to the client's browser.

.. note:: 

 	Templates are very powerful and you can even create your own template tags. Here we have shown how we can minimise the repetition of structure HTML in our templates.

	However, templates can also be used to minimise code within your application's views. For example, if you wanted to include the same database-driven content on each page of your application, you could construct a template that calls a specific view to handle the repeating portion of your webpages. This then saves you from having to call the Django ORM functions which gather the required data for the template in every view that renders it.
	
	To learn more about the extensive functionality offered by Django's template language, check out the official `Django documentation on templates <https://docs.djangoproject.com/en/1.7/topics/templates/>`_. 
	
	
	
Referring to URLs in Templates
------------------------------
So far we have been directly coding the URL of the page/view we want to show within the template, i.e. ``<a href="/rango/about/"> About  </a>``. However, the preferred way is to use the template tag ``url`` to look up the url in the ``urls.py`` files. To do this we can change the way we reference the URL as follows:

.. code-block:: html

	<li><a href="{% url 'about' %}">About</a></li>
	
The Django template engine will look up the ``urls.py`` files for a url with the ``name='about'`` (and then reverse match the actual url). This means if we change the url mappings in ``urls.py`` then we do not have to go through all the templates and update them. If we had not given our urlpattern a name, we could directly reference it as follows:

.. code-block:: html

	<li><a href="{% url 'rango.views.about' %}">About</a></li>
	
Here we need to specify the application, and the view about.

You can now update the base template with the ``url`` template tag so that links in base template are rendered using the following code:

.. code-block:: html
	
	
	<div>
		<ul>
	    {% if user.is_authenticated %}
	    	<li><a href="{% url 'restricted' %}">Restricted Page</a></li>
	        <li><a href="{% url 'logout' %}">Logout</a></li>
	        <li><a href="{% url 'add_category' %}">Add a New Category</a></li>
	    {% else %}
	    	<li><a href="{% url 'register' %}">Register Here</a></li>
	        <li><a href="{% url 'login' %}">Login</a></li>
	    {% endif %}

	    <li><a href="{% url 'about' %}">About</a></li>
	    </ul>
	</div>


In your ``index.html`` template you will notice that you have a parameterized url pattern, i.e. the ``category`` url/view takes the ``category.slug`` as a parameter. To handle this you can pass the url template tag the name of the url/view and the slug, i.e. {% url 'category'  category.slug %} within the template, as follows:

.. code-block:: html


	{% for category in categories %}
	    <li><a href="{% url 'category'  category.slug %}">{{ category.name }}</a></li>
	{% endfor %}


#TODO(leifos): The official tutorial provides an overview of how to use the url template tag, http://django.readthedocs.org/en/latest/intro/tutorial03.html and the answer at stackoverflow was helpful too: http://stackoverflow.com/questions/4599423/using-url-in-django-templates

#TODO(leifos): Also point out how the urls can be placed in a namespace and referenced accordingly, see http://django.readthedocs.org/en/latest/intro/tutorial03.html 


Exercises
---------
Now that you've worked through this chapter, we've got several exercises for you to work through. After completing them, you'll be a Django templating pro.

* Update all other existing templates within Rango's repertoire to extend from the ``base.html`` template. Follow the same process as we demonstrated above. Once completed, your templates should all inherit from ``base.html``, as demonstrated in Figure :num:`fig-rango-template-inheritance`. While you're at it, make sure you remove the links from our ``index.html`` template. We don't need them anymore! You can also remove the link to Rango's homepage within the ``about.html`` template.
* Convert the restricted page to use a template. Call the template ``restricted.html``, and ensure that it too extends from our ``base.html`` template.
* Change all the references to rango urls to use the url template tag.
* Add another link to our growing link collection that allows users to navigate back to Rango's homepage from anywhere on the website.


.. warning:: Remember to add ``{% load static %}`` to the top of each template that makes use of static media. If you don't, you'll get an error! Django template modules must be imported individually for each template that requires them - *you can't make use of modules included in templates you extend from!*

.. _fig-rango-template-inheritance:

.. figure:: ../images/rango-template-inheritance.svg
	:figclass: align-center
	
	A class diagram demonstrating how your templates should inherit from ``base.html``.

.. note:: Upon completion of these exercises, all of Rango's templates should inherit from ``base.html``. Looking back at the contents of ``base.html``, the ``user`` object - found within the context of a given Django request - is used to determine if the current user of Rango is logged in (through use of ``user.is_authenticated``). As all of Rango's templates should inherit from this base template, we can say that *all of Rango's templates now depend on having access to the context of a given request.*
	
	Due to this new dependency, you must check each of Rango's Django views. For each view, ensure that the context for each request is made available to the Django template engine. Throughout this tutorial, we've been using ``render()`` to achieve this, passing the request as a parameter. If you don't ensure this happens, your views may be rendered incorrectly - users may appear to be not logged in, even though Django thinks that they are!
	
	As a quick example of the checks you must carry out, have a look at the ``about`` view. Initially, this was implemented with a hard-coded string response, as shown below. Note that we only send the string - we don't make use of the request passed as the ``request`` parameter.
	
	.. code-block:: python
		
		def about(request):
		    return HttpResponse('Rango says: Here is the about page. <a href="/rango/">Index</a>')
	
	To employ the use of a template, we call the ``render()`` function and pass through the ``request`` object. This will allow the template engine access to objects such as ``user``, which will allow the template engine to determine if the user is logged in (ie. authenticated).
	
	.. code-block:: python
		
		def about(request):
		    
		    return render(request, 'rango/about.html', {})
	
	Remember, the last parameter of ``render()`` is a dictionary with which you can use to pass additional data to the Django template engine. As we have no additional data to pass through we pass through an empty dictionary. Have a look at Section :ref:`adding-a-template-label` to refresh your memory on ``render()``.
	
	
	
	
