.. _model-using-label:

Models, Templates and Views
===========================
Now that we have the models set up and populated with some data, we can now start putting things together. We'll be figuring out how to access data from the models within the views, and how to present this data via the templates.

Basic Workflow: Data Driven Pages
---------------------------------
There are five main steps that you must undertake to create a data driven webpage in Django.

#. First, import the models you wish to use into your application's ``views.py`` file.
#. Within the view you wish to use, query the model to get the data you want to present.
#. Pass the results from your model into the template's context.
#. Setup your template to present the data to the user in whatever way you wish.
#. If you have not done so already, map a URL to your view.

These steps highlight how Django's framework separates the concerns between models, views and templates.

Showing Categories on Rango's Homepage
--------------------------------------
One of the requirements regarding the main pages was to show the top five rango'ed categories.

Importing Required Models
.........................
To fulfil this requirement, we will go through each of the above steps. First, open ``rango/views.py`` and import the ``Category`` model from Rango's ``models.py`` file.

.. code-block:: python
	
	# Import the Category model
	from rango.models import Category

Modifying the Index View
........................
With the first step out of the way, we then want to modify our ``index()`` function. If we cast our minds back, we should remember the ``index()`` function is responsible for the main page view. Modify the function to look like the example below.

.. code-block:: python
	
	def index(request):
	    # Query the database for a list of ALL categories currently stored.
	    # Order the categories by no. likes in descending order.
	    # Retrieve the top 5 only - or all if less than 5.
	    # Place the list in our context_dict dictionary which will be passed to the template engine.
	    category_list = Category.objects.order_by('-likes')[:5]
	    context_dict = {'categories': category_list}
	    
	    # Render the response and send it back!
	    return render(request, 'rango/index.html', context_dict)

Here we have performed steps two and three in one go. First, we queried the ``Category`` model to retrieve the top five categories. Here we used the ``order_by()`` method to sort by the number of likes in descending order - hence the inclusion of the ``-``. We then restricted this list to the first 5 ``Category`` objects in the list.

With the query complete, we passed a reference to the list (stored as variable ``category_list``) to the dictionary, ``context_dict``. This dictionary is then passed as part of the context for the template engine in the ``render()`` call.

.. warning:: Note that the Category Model contains the field ``likes``. So for this to work you need to have completed the exercises in the previous chapter, i.e. the Category Model needs to be updated to include the ``likes`` field. 


Modifying the Index Template
............................
With the view updated, all that is left for us to do is update the template ``rango/index.html``, located within your project's ``templates`` directory. Change the HTML code of the file so that it looks like the example shown below.

.. code-block:: html
	
	<!DOCTYPE html>
	<html>
	    <head>
	        <title>Rango</title>
	    </head>
	
	    <body>
	        <h1>Rango says...hello world!</h1>
	
	        {% if categories %}
	            <ul>
	                {% for category in categories %}
	                <li>{{ category.name }}</li>
	                {% endfor %}
	            </ul>
	        {% else %}
	            <strong>There are no categories present.</strong>
	        {% endif %}
	        
	        <a href="/rango/about/">About</a>
	    </body>
	</html>

Here, we make use of Django's template language to present the data using ``if`` and ``for`` control statements. Within the ``<body>`` of the page, we test to see if ``categories`` - the name of the context variable containing our list - actually contains any categories (i.e. ``{% if categories %}``).

If so, we proceed to construct an unordered HTML list (within the ``<ul>`` tags). The for loop (``{% for category in categories %}``) then iterates through the list of results, printing out each category's name (``{{ category.name }})`` within a pair of ``<li>`` tags to indicate a list element.

If no categories exist, a message is displayed instead indicating so.

As the example shows in Django's template language, all commands are enclosed within the tags ``{%`` and ``%}``, while variables are referenced within ``{{`` and ``}}`` brackets. 

If you now visit Rango's homepage at http://127.0.0.1:8000/rango/, you should see a list of three categories underneath the page title just like in Figure :num:`fig-rango-categories-simple`. 

.. _fig-rango-categories-simple:

.. figure:: ../images/rango-categories-simple.png
	:figclass: align-center

	The Rango homepage - now dynamically generated - showing a list of categories. How exciting!


Creating a Details Page
-----------------------
According to Rango's specification, we also need to show a list of pages that are associated with each category.
We have a number of challenges here to overcome. A new view must be created, which should be parameterised. We also need to create URL patterns and URL strings that encode category names.

URL Design and Mapping
......................
Let's start by considering the URL problem. One way we could handle this problem is to use the unique ID for each category within the URL. For example, we could create URLs like ``/rango/category/1/`` or ``/rango/category/2/``, where the numbers correspond to the categories with unique IDs 1 and 2 respectively. However, these URLs are not easily understood by humans. Although we could probably infer that the number relates to a category, how would a user know what category relates to unique IDs 1 or 2? The user wouldn't know without trying. 

Instead, we could just use the category name as part of the URL. ``/rango/category/Python/`` should give us a list of pages related to the Python category. This is a simple, readable and meaningful URL. If we go with this approach, we'll have to handle categories which have multiple words, like 'Other Frameworks', etc.

.. note:: Designing clean URLs is an important aspect of web design. See `Wikipedia's article on Clean URLs <http://en.wikipedia.org/wiki/Clean_URL>`_ for more details.

To handle this problem we are going to make use of the slugify function provided by Django, based on the answers provided at: http://stackoverflow.com/questions/837828/how-do-i-create-a-slug-in-django


Update Category Table with Slug Field
.....................................
To make clean urls we are going to include a slug field in the ``Category`` model. First we need to import the function ``slugify`` from django, which will replace whitespace with hyphens, i.e "how do i create a slug in django" turns into "how-do-i-create-a-slug-in-django".

.. warning:: While you can use spaces in URLs, it is considered to be unsafe to use them. Check out `IETF Memo on URLs <http://www.ietf.org/rfc/rfc1738.txt>`_ to read more.

Then we need to override the ``save`` method of the ``Category`` model, which we will call the ``slugify`` method and update the ``slug`` field with it. Note that every time the category name changes, the slug will also change, causing broken links. You can prevent this, by defining the slug only when creating the object. Update your model, as shown below, and add in the import.

.. code-block:: python
	
	from django.template.defaultfilters import slugify

	class Category(models.Model):
		name = models.CharField(max_length=128, unique=True)
		views = models.IntegerField(default=0)
		likes = models.IntegerField(default=0)
		slug = models.SlugField()
		
		def save(self, *args, **kwargs):
			# Uncomment if you don't want the slug to change every time the name changes
			#if self.id is None:
				#self.slug = slugify(self.name)				
			self.slug = slugify(self.name)
			super(Category, self).save(*args, **kwargs)

		def __unicode__(self):
			return self.name


Now that you have performed this update to the Model, you will need to perform the migration. 

.. code-block:: python

	$ python manage.py makemigrations rango
	$ python manage.py migrate
	
	
Since we did not provide a default value for the slug, and we already have existing data in the model, then the migrate command will give you two options. Select the option to provide a default, and enter ''. Dont worry this will get updated shortly. Now re-run your population script. Since the ``save`` method is called for each Category, the overrided ``save`` method will be executed, updating the slug field. Run the server, and inspect the data in the models via the admin interface.

In the admin interface you may want it to automatically pre-populate the slug field as your type in the category name. To do this you can update ``rango/admin.py`` with the following code:


.. code-block:: python

	
	from django.contrib import admin
	from rango.models import Category, Page

	# Add in this class to customized the Admin Interface
	class CategoryAdmin(admin.ModelAdmin):
	    prepopulated_fields = {'slug':('name',)}

	# Update the registeration to include this customised interface
	admin.site.register(Category, CategoryAdmin)
	admin.site.register(Page)


Try out the admin interface and add in a new category. Pretty cool, hey! Now that we have added in slug fields we can now use them as clean urls :-).


Category Page Workflow
......................
With our URLs design chosen, let's get started. We'll undertake the following steps.

#. Import the Page model into ``rango/views.py``.
#. Create a new view in ``rango/views.py`` - called ``category`` - The ``category`` view will take an additional parameter, ``category_name_url`` which will stored the encoded category name. 
	* We will need some help functions to encode and decode the ``category_name_url``.
#. Create a new template, ``templates/rango/category.html``.
#. Update Rango's ``urlpatterns`` to map the new ``category`` view to a URL pattern in ``rango/urls.py``.

We'll also need to update the ``index()`` view and ``index.html`` template to provide links to the category page view.

Category View
.............
In ``rango/views.py``, we first need to import the ``Page`` model. This means we must add the following import statement at the top of the file.

.. code-block:: python
	
	from rango.models import Page

Next, we can add our new view, ``category()``.

.. code-block:: python
	
	def category(request, category_name_slug):
	    
	    # Create a context dictionary which we can pass to the template rendering engine.
	    context_dict = {}
	    
	    try:
	        # Can we find a category name slug with the given name?
	        # If we can't, the .get() method raises a DoesNotExist exception.
	        # So the .get() method returns one model instance or raises an exception.
	        category = Category.objects.get(slug=category_name_slug)
	        context_dict['category_name'] = category.name
	        
	        # Retrieve all of the associated pages.
	        # Note that filter returns >= 1 model instance.
	        pages = Page.objects.filter(category=category)
	        
	        # Adds our results list to the template context under name pages.
	        context_dict['pages'] = pages
	        # We also add the category object from the database to the context dictionary.
	        # We'll use this in the template to verify that the category exists.
	        context_dict['category'] = category
	    except Category.DoesNotExist:
	        # We get here if we didn't find the specified category.
	        # Don't do anything - the template displays the "no category" message for us.
	        pass
	    
	    # Go render the response and return it to the client.
	    return render(request, 'rango/category.html', context_dict)

Our new view follows the same basic steps as our ``index()`` view. We first define a context dictionary, then we attempt to extract the data from the models, and add in the relevant data to the context dictionary. We determine which category by using the value passed as parameter ``category_name_slug`` to the ``category()`` view function. If the category is found in the Category model, we can then pull out the associated Pages, and add this to the context dictionary, ``context_dict``. 


Category Template
.................
Now let's create our template for the new view.  In ``<workspace>/tango_with_django_project/templates/rango/`` directory, create ``category.html``. In the new file, add the following code.

.. code-block:: html
	
	<!DOCTYPE html>
	<html>
	    <head>
	        <title>Rango</title>
	    </head>
	
	    <body>
	        {% if category %}
	        <h1>{{ category_name }}</h1>
	            {% if pages %}
	            <ul>
	                {% for page in pages %}
	                <li><a href="{{ page.url }}">{{ page.title }}</a></li>
	                {% endfor %}
	            </ul>
	            {% else %}
	                <strong>No pages currently in category.</strong>
	            {% endif %}
	        {% else %}
	            The specified category {{ category_name }} does not exist!
	        {% endif %}
	    </body>
	</html>

The HTML code example again demonstrates how we utilise the data passed to the template via its context. We make use of the ``category_name`` variable and our ``category`` and ``pages`` objects. If ``category`` is not defined within our template context, the category was not found within the database, and a friendly error message is displayed stating this fact. If the opposite is true, we then proceed to check for ``pages``. If ``pages`` is undefined or contains no elements, we display a message stating there are no pages present. Otherwise, the pages within the category are presented in a HTML list. For each page in the ``pages`` list, we present their ``title`` and ``url`` attributes.

.. note:: The Django template conditional tag - ``{% if %}`` - is a really neat way of determining the existence of an object within the template's context. Try getting into the habit of performing these checks to reduce the scope for potential exceptions that could be raised within your code.
	
	Placing conditional checks in your templates - like ``{% if category %}`` in the example above - also makes sense semantically. The outcome of the conditional check directly affects the way in which the rendered page is presented to the user - and presentational aspects of your Django applications should be encapsulated within templates.

Parameterised URL Mapping
.........................
Now let's have a look at how we actually pass the value of the ``category_name_url`` parameter to the ``category()`` function. To do so, we need to modify Rango's ``urls.py`` file and update the ``urlpatterns`` tuple as follows.

.. code-block:: python
	
	urlpatterns = patterns('',
	    url(r'^$', views.index, name='index'),
	    url(r'^about/$', views.about, name='about'),
	    url(r'^category/(?P<category_name_slug>[\w\-]+)/$', views.category, name='category'),)  # New!

As you can see, we have added in a rather complex entry that will invoke ``view.category()`` when the regular expression ``r'^(?P<category_name_slug>\w+)/$'`` is matched. We set up our regular expression to look for any sequence of alphanumeric characters (e.g. a-z, A-Z, or 0-9) and the hyphen(-) before the trailing URL slash. This value is then passed to the view ``views.category()`` as parameter ``category_name_slug``, the only argument after the mandatory ``request`` argument.

.. note:: When you wish to parameterise URLs, it's important to ensure that your URL pattern matches the parameters that the corresponding view takes in. To elaborate further, let's take the example we added above. The pattern added was as follows.
	
	.. code-block:: python
		
		url(r'^category/(?P<category_name_slug>[\w\-]+)/$', views.category, name='category')
	
	We can from here deduce that the characters (both alphanumeric and underscores) between ``category/`` and the trailing ``/`` at the end of a matching URL are to be passed to method ``views.category()`` as named parameter ``category_name_slug``. For example, the URL ``category/python-books/`` would yield a ``category_name_slug`` of ``python-books``.
	
	As you should remember, all view functions defined as part of a Django project *must* take at least one parameter. This is typically called ``request`` - and provides access to information related to the given HTTP request made by the user. When parameterising URLs, you supply additional named parameters to the signature for the given view. Using the same example, our ``category`` view signature is altered such that it now looks like the following.
	
	.. code-block:: python
		
		def category(request, category_name_slug):
		    # ... code here ...
	
	It's not the position of the additional parameters that matters, it's the *name* that must match anything defined within the URL pattern. Note how ``category_name_slug`` defined in the URL pattern matches the ``category_name_slug`` parameter defined for our view. Using ``category_name_slug`` in our view will give ``python-books``, or whatever value was supplied as that part of the URL.

.. note:: Regular expressions may seem horrible and confusing at first, but there are tons of resources online to help you. `This cheat sheet <http://cheatography.com/davechild/cheat-sheets/regular-expressions/>`_ is an excellent resource for fixing regular expression problems.

Modifying the Index Template
.....................................
Our new view is set up and ready to go - but we need to do one more thing. Our index page template needs to be updated to provide users with a means to view the category pages that are listed. We can update the ``index.html`` template to now include a link to the category page via the slug.

.. code-block:: html
	
	<!DOCTYPE html>
	<html>
	    <head>
	        <title>Rango</title>
	    </head>

	    <body>
	        <h1>Rango says..hello world!</h1>

	        {% if categories %}
	            <ul>
	                {% for category in categories %}
	                <!-- Following line changed to add an HTML hyperlink -->
	                <li><a href="/rango/category/{{ category.slug }}">{{ category.name }}</a></li>
	                {% endfor %}
	            </ul>
	       {% else %}
	            <strong>There are no categories present.</strong>
	       {% endif %}

	    </body>
	</html>

Here we have updated each list element (``<li>``) adding a HTML hyperlink (``<a>``). The hyperlink has an ``href`` attribute, which we use to specify the target URL defined by ``{{ category.slug }}``. 

Demo
....
Let's try everything out now by visiting the Rango's homepage. You should see your homepage listing all the categories. The categories should now be clickable links. Clicking on ``Python`` should then take you to the ``Python`` detailed category view, as demonstrated in Figure :num:`fig-rango-links`. If you see a list of links like ``Official Python Tutorial``, then you've successfully set up the new view. Try navigating a category which doesn't exist, like ``/rango/category/computers``. You should see a message telling you that no pages exist in the category.

.. _fig-rango-links:

.. figure:: ../images/rango-links.png
	:figclass: align-center

	What your link structure should now look like. Starting with the Rango homepage, you are then presented with the category detail page. Clicking on a page link takes you to the linked website.

Exercises
---------
Reinforce what you've learnt in this chapter by trying out the following exercises.

* Modify the index page to also include the top 5 most viewed pages.

* Undertake the `part three of official Django tutorial <https://docs.djangoproject.com/en/1.7/intro/tutorial03/>`_ if you have not done so already to further what you've learnt here.

Hints
.....
To help you with the exercises above, the following hints may be of some use to you. Good luck!

* Update the population script to add some value to the views count for each page.

