.. _tango-too-label:

Making Rango Tango! Code and Hints
==================================

Hopefully, you will have been able to complete the exercises given the workflows we provided, if not, or if you need a little help checkout snippets of code and use them within your version of Rango.


Track Page Click Throughs
-------------------------
Currently, Rango provides a direct link to external pages. This is not very good if you want to track the number of times each page is clicked and viewed. To count the number of times a page is viewed via Rango you will need to perform the following steps.

Creating a URL Tracking View
............................
Create a new view called ``track_url()`` in ``/rango/views.py`` which takes a parameterised HTTP ``GET`` request (i.e. ``rango/goto/?page_id=1``) and updates the number of views for the page. The view should then redirect to the actual URL.

.. code-block:: python	
	
	from django.shortcuts import redirect
	
	def track_url(request):
	    page_id = None
	    url = '/rango/'
	    if request.method == 'GET':
	        if 'page_id' in request.GET:
	            page_id = request.GET['page_id']
	            try:
	                page = Page.objects.get(id=page_id)
	                page.views = page.views + 1
	                page.save()
	                url = page.url
	            except:
	                pass
	
	    return redirect(url)

Be sure that you import the ``redirect()`` function to ``views.py`` if it isn't included already!

.. code-block:: python
	
	from django.shortcuts import redirect

Mapping URL
...........
In ``/rango/urls.py`` add the following code to the ``urlpatterns`` tuple.

.. code-block:: python
	
	url(r'^goto/$', views.track_url, name='goto'),


Updating the Category Template
...............................
Update the ``category.html`` template so that it uses ``rango/goto/?page_id=XXX`` instead of providing the direct URL for users to click.

.. code-block:: html
	
    {% for page in pages %}
		<li>
        	<a href="{% url 'goto' %}?page_id={{page.id}}">{{ page.title }}</a>
            {% if page.views > 1 %}
            	({{ page.views }} views)
           	{% elif page.views == 1 %}
            	({{ page.views }} view)
            {% endif %}
		</li>
    {% endfor %}

Here you can see that in the template we have added some control statements to display ``view``, ``views`` or nothing depending on the value of ``page.views``.

Updating Category View
......................
Since we are tracking the number of click throughs you can now update the ``category()`` view so that you order the pages by the number of views, i.e:

.. code-block:: python


	pages = Page.objects.filter(category=category).order_by('-views')


Now, confirm it all works, by clicking on links, and then going back to the category page. Don't forget to refresh or click to another category to see the updated page.


.. #######################################################



Searching Within a Category Page
--------------------------------
Rango aims to provide users with a helpful directory of page links. At the moment, the search functionality is essentially independent of the categories. It would be nicer however to have search integrated into category browsing. Let's assume that a user will first browse their category of interest first. If they can't find the page that they want, they can then search for it. If they find a page that is suitable, then they can add it to the category that they are in. Let's tackle the first part of this description here.

We first need to remove the global search functionality and only let users search within a category. This will mean that we essentially decommission the current search page and search view. After this, we'll need to perform the following.

Decommissioning Generic Search
..............................
Remove the generic *Search* link from the menu bar by editing the ``base.html`` template. You can also remove or comment out the URL mapping in ``rango/urls.py``.

Creating a Search Form Template
...............................
Take the search form from ``search.html`` and put it into the ``category.html``. Be sure to change the action to point to the ``category()`` view as shown below.

.. code-block:: html

    <form class="form-inline" id="user_form" method="post" action="{% url 'category'  category.slug %}">
    	{% csrf_token %}
        <!-- Display the search form elements here -->
        <input class="form-control" type="text" size="50" name="query" value="{{query}}" id="query" />
        <input class="btn btn-primary" type="submit" name="submit" value="Search" />
   </form>

Also include a ``<div>`` to house the results underneath.

.. code-block:: html

	<div class="panel">
		{% if result_list %}
	    	<div class="panel-heading">
	        	<h3 class="panel-title">Results</h3>
	        	<!-- Display search results in an ordered list -->
	        	<div class="panel-body">
	            	<div class="list-group">
	                	{% for result in result_list %}
	                    <div class="list-group-item">
	                    	<h4 class="list-group-item-heading"><a href="{{ result.link }}">{{ result.title }}</a></h4>
	                        <p class="list-group-item-text">{{ result.summary }}</p>
	                    </div>
	                {% endfor %}
	            </div>
	        </div>
	    {% endif %}
	</div>
	

Updating the Category View
..........................
Update the category view to handle a HTTP ``POST`` request (i.e. when the user submits a search) and inject the results list into the context. The following code demonstrates this new functionality.

.. code-block:: python

	def category(request, category_name_slug):
	    context_dict = {}
	    context_dict['result_list'] = None
	    context_dict['query'] = None
	    if request.method == 'POST':
	        query = request.POST['query'].strip()

	        if query:
	            # Run our Bing function to get the results list!
	            result_list = run_query(query)

	            context_dict['result_list'] = result_list
	            context_dict['query'] = query

	    try:
	        category = Category.objects.get(slug=category_name_slug)
	        context_dict['category_name'] = category.name
	        pages = Page.objects.filter(category=category).order_by('-views')
	        context_dict['pages'] = pages
	        context_dict['category'] = category
	    except Category.DoesNotExist:
	        pass

	    if not context_dict['query']:
	        context_dict['query'] = category.name

	    return render(request, 'rango/category.html', context_dict)

	
Notice that in the ``context_dict``	that we pass through, we will include the ``result_list`` and ``query``, and if there is no query, we provide a default query, i.e. the category name. The query box then displays this variable.


	.. #########################################################################

..	View Profile 
	------------
	To add the view profile functionality, undertake the following steps.

	Creating the Profile Template
	.............................
	First, create a new template called ``profile.html``. In this template, add the following code.

	.. code-block:: html
	
		{% extends "rango/base.html" %}

		{% block title %}Profile{% endblock %}

		{% block body_block %}
		<div class="hero-unit">
		    <h1> Profile <h1> <br/>
		    <h2>{{ user.username }}</h2>
		    <p>Email: {{ user.email }}</p>
        
		    {% if userprofile %}
		        <p>Website: <a href="{{ userprofile.website }}">{{ userprofile.website }}</a></p>
		        <br/>
		        {% if userprofile.picture %}
		            <img src="{{ userprofile.picture.url }}"  />
		        {% endif %}
		    {% endif %}
		</div>
		{% endblock %}


	Creating Profile View
	......................
	Create a view called ``profile`` and add the following code.

	.. code-block:: python
	
		from django.contrib.auth.models import User
	
		@login_required
		def profile(request):
		    context = RequestContext(request)
		    cat_list = get_category_list()
		    context_dict = {'cat_list': cat_list}
		    u = User.objects.get(username=request.user)
	
		    try:
		        up = UserProfile.objects.get(user=u)
		    except:
		        up = None
	
		    context_dict['user'] = u
		    context_dict['userprofile'] = up
		    return render_to_response('rango/profile.html', context_dict, context)

	Mapping the Profile View and URL
	................................
	Create a mapping between the URL ``/rango/profile`` and the ``profile()`` view. Do this by updating the ``urlpatterns`` tuple in ``rango/urls.py`` so that it includes the following entry.

	.. code-block:: python
	
		url(r'^profile/$', views.profile, name='profile'),

	Updating the Base Template
	..........................
	In the ``base.html`` template, update the code to put a link to the profile page in the menu bar.

	.. code-block:: html
	
		{% if user.is_authenticated %}
		    <li><a href="/rango/profile">Profile</a></li>
		{% endif %}	
	
	.. #########################################################################

	Track Page Click Throughs
	-------------------------
	Currently, Rango provides a direct link to external pages. This is not very good if you want to track the number of times each page is clicked and viewed. To count the number of times a page is viewed via Rango you will need to perform the following steps.

	Creating a URL Tracking View
	............................
	Create a new view called ``track_url()`` in ``/rango/views.py`` which takes a parameterised HTTP ``GET`` request (i.e. ``rango/goto/?page_id=1``) and updates the number of views for the page. The view should then redirect to the actual URL.

	.. code-block:: python	
	
		def track_url(request):
		    context = RequestContext(request)
		    page_id = None
		    url = '/rango/'
		    if request.method == 'GET':
		        if 'page_id' in request.GET:
		            page_id = request.GET['page_id']
		            try:
		                page = Page.objects.get(id=page_id)
		                page.views = page.views + 1
		                page.save()
		                url = page.url
		            except:
		                pass
	
		    return redirect(url)

	Be sure that you import the ``redirect()`` function to ``views.py`` if it isn't included already!

	.. code-block:: python
	
		from django.shortcuts import redirect

	Mapping URL
	...........
	In ``/rango/urls.py`` add the following code to the ``urlpatterns`` tuple.

	.. code-block:: python
	
		url(r'^goto/$', views.track_url, name='track_url'),


	Updating the Category Template
	...............................
	Update the ``category.html`` template so that it uses ``rango/goto/?page_id=XXX`` instead of providing the direct URL for users to click.

	.. code-block:: html
	
		{% if pages %}
		<ul>
		    {% for page in pages %}
		    <li>
		        <a href="/rango/goto/?page_id={{page.id}}">{{page.title}}</a>
		        {% if page.views > 1 %}
		            - ({{ page.views }} views)
		        {% elif page.views == 1 %}
		            - ({{ page.views }} view)
		        {% endif %}
		    </li>
		    {% endfor %}
		</ul>
		{% else %}
		<strong>No pages currently in category.</strong><br/>
		{% endif %}

	Here you can see that in the template we have added some control statements to display ``view``, ``views`` or nothing depending on the value of ``page.views``.

	Updating Category View
	......................
	Since we are tracking the number of click throughs you can now update the ``category()`` view so that you order the pages by the number of views. To confirm this works, click on a link and refresh the category view - the link you clicked should jump up the rankings.
