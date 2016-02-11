.. _setup-label:

.. _django-basics:

Django Basics
=============
Let's get started with Django! In this chapter, we'll be giving you an overview of the how to get started with Django. You'll be setting up a new project and a new web application. By the end of this chapter, you will have a simple Django-power webpage up and running!

Testing your Setup
------------------
Let's start by checking that your Python and Django installations are installed correctly, and are at the correct version for this tutorial. To do this, open a new terminal instance and issue the following command.

::
	
	$ python --version
	2.7.5

This print the Python version number and exit. If the version displayed is anything but ``2.7.5``, you will need to go back to Section :ref:`installing-software` and verify you have completed all the relevant steps for your operating system.

After verifying your Python installation, check your Django installation by issuing the following command.

::
	
	$ python -c "import django; print(django.get_version())"
	1.7

The command again executes the code within the string provided as part of the ``-c`` switch. After importing Django, you should see ``1.7`` printed underneath. If you see a different set of numbers or are greeted with a Python ``ImportError``, go back to Section :ref:`installing-software` or consult the `Django Documentation on Installing Django <https://docs.djangoproject.com/en/1.7/topics/install/>`_ for more information. If you find that you have got a different version of Django, it is possible that you will come across problems at some point. It's definitely worth making sure you have Django 1.7 installed. 

Creating your Django Project
----------------------------
To create a new Django Project, go to your ``code`` directory (i.e. your ``<workspace>`` directory), and issue the following command:

``$ django-admin.py startproject tango_with_django_project``

.. note:: On Windows you may have to use the full path to the django-admin.py script. i.e. ``python c:\python27\scripts\django-admin.py startproject tango_with_django_project`` as suggested on `StackOverflow <http://stackoverflow.com/questions/8112630/cant-create-django-project-using-command-prompt>`_.

This command will invoke the ``django-admin.py`` script, which will set up a new Django project called ``tango_with_django_project`` for you. Typically, we append ``_project`` to the end of our Django project directories so we know exactly what they contain - but the naming convention is entirely up to you.

You'll now notice within your workspace is a directory set to the name of your new project, ``tango_with_django_project``. Within this newly created directory, you should see two items:

* another directory with the same name as your project, ``tango_with_django_project``; and
* a Python script called ``manage.py``.

For the purposes of this tutorial, we call this nested directory the *project configuration directory*. Within this directory, you will find four Python scripts. We will discuss this scripts in detail later on, but for now you should see:

* ``__init__.py``, a blank Python script whose presence indicates to the Python interpreter that the directory is a Python package;
* ``settings.py``, the place to store all of your Django project's settings;
* ``urls.py``, a Python script to store URL patterns for your project; and
* ``wsgi.py``, a Python script used to help run your development server and deploy your project to a production environment.

.. note:: The project configuration directory has been created with new Django projects since version 1.4. Having two directories with the same name may seem quite a bit odd, but the change was made to separate out project-related components from its individual applications.

In the project directory, you will see there is a file called ``manage.py``. We will be calling this script time and time again as we develop our project, as it provides you with a series of commands you can run to maintain your Django project. For example, ``manage.py`` allows you to run the built-in Django development server to test your work and run database commands. You'll be using this script a lot throughout the development cycle.

.. note:: See the Django documentation for more details about the `Admin and Manage scripts <https://docs.djangoproject.com/en/1.7/ref/django-admin/#django-admin-py-and-manage-py>`_.

You can try using the ``manage.py`` script now, by issuing the following command.

``$ python manage.py runserver``

Executing this command will instruct Django to initiate its lightweight development server. You should see the output in your terminal similar to the example shown below:

::
	
	$ python manage.py runserver

	System check identified no issues (0 silenced).

	You have unapplied migrations; your app may not work properly until they are applied.
	Run 'python manage.py migrate' to apply them.

	October 01, 2014 - 19:49:05
	Django version 1.7c2, using settings 'tango_with_django_project.settings'
	Starting development server at http://127.0.0.1:8000/
	Quit the server with CONTROL-C.
	
	
	
::

	$ python manage.py migrate
	
	Operations to perform:
	  Apply all migrations: admin, contenttypes, auth, sessions
	Running migrations:
	  Applying contenttypes.0001_initial... OK
	  Applying auth.0001_initial... OK
	  Applying admin.0001_initial... OK
	  Applying sessions.0001_initial... OK
	
	
#TODO(leifos): add description of migrate command: from django tutorial: The migrate command looks at the INSTALLED_APPS setting and creates any necessary database tables according to the database settings in your mysite/settings.py file and the database migrations shipped with the app (we’ll cover those later). You’ll see a message for each migration it applies. If you’re interested, run the command-line client for your database and type \dt (PostgreSQL), SHOW TABLES; (MySQL), or .schema (SQLite) to display the tables Django created.
	
	
	

Now open up your favourite web browser and enter the URL http://127.0.0.1:8000/ [#f1]_. You should see a webpage similar to the one shown in Figure :num:`fig-django-dev-server-firstrun`. 

.. _fig-django-dev-server-firstrun:

.. figure:: ../images/django-dev-server-firstrun.png
	:figclass: align-center
	
	A screenshot of the initial Django page you will see when running the development server for the first time.

You can stop the development server at anytime by pushing ``CTRL + C`` in your terminal window. If you wish to run the development server on a different port, or allow users from other machines to access it, you can do so by supplying optional arguments. Consider the following command:

``$ python manage.py runserver <your_machines_ip_address>:5555``

Executing this command will force the development server to respond to incoming requests on TCP port 5555. You will need to replace ``<your_machines_ip_address>`` with your computer's IP address. 

When setting ports, it is unlikely that you will be able to use TCP port 80 as this is traditionally reserved for HTTP traffic. Also, any port below 1024 is considered to be `privileged <http://www.w3.org/Daemon/User/Installation/PrivilegedPorts.html>`_ by your operating system.

While you won't be using the lightweight development server to deploy your application, sometimes it is nice to be able to demo your application on a computer of a colleague. Running the server with your machine's IP address will enable others to enter in ``http://<your_machines_ip_address>:<port>/`` and view your web application. Of course, this will depend on how your network is configured. There may be proxy servers or firewalls in the way which would need to be configured before this would work. Check with the administrator of the network you are using if you can't view the development server remotely.

.. note:: The ``django-admin.py`` and ``manage.py`` scripts provides a lot of useful, time-saving functionality for you. ``django-admin.py`` allows you to start new projects and apps, along with other commands. Within your project directory, ``manage.py`` allows you to perform administrative tasks within the scope of your project only. Simply execute the relevant script name without any arguments to see what you can do with each. The `official Django documentation provides a detailed list and explanation of each possible command <https://docs.djangoproject.com/en/1.7/ref/django-admin/>`_ you can supply for both scripts.

If you are using version control, now may be a good time to commit the changes you have made to your workspace. Refer to the :ref:`crash course on GIT <git-crash-course>` if you can't remember the commands and steps involved in doing this.

Creating a Django Application
-----------------------------
A Django project is a collection of *configurations* and *applications* that together make up a given web application or website. One of the intended outcomes of using this approach is to promote good software engineering practices. By developing a small series of applications, the idea is that you can theoretically drop an existing application into a different Django project and have it working with minimal effort. Why reinvent the wheel if it's already there? [#f2]_

A Django application exists to perform a particular task. You need to create specific applications that are responsible for providing your site with particular kinds of functionality. For example, we could imagine that a project might consist of several applications including a polling app, a registration app, and a specific content related app. In another project, we may wish to re-use the polling and registration apps and use them with to dispatch different content. There are many Django applications you can `download <https://code.djangoproject.com/wiki/DjangoResources#Djangoapplicationcomponents>`_ and use in your projects. Since we are getting started, we'll kick off by walking through how to create your own application.

To start, create a new application called *Rango*. From within your Django project directory (e.g. ``<workspace>/tango_with_django_project``), run the following command.

::
	
	$ python manage.py startapp rango

The ``startapp`` command creates a new directory within your project's root. Unsurprisingly, this directory is called ``rango`` - and contained within it are another five Python scripts:

- another ``__init__.py``, serving the exact same purpose as discussed previously;
- models.py, a place to store your application's data models - where you specify the entities and relationships between data;
- tests.py, where you can store a series of functions to test your application's code; and
- views.py, where you can store a series of functions that take a clients's requests and return responses.
- admin.py, where you can register your models so that you can benefit from some Django machinery which creates an admin interface for you (see #TODO(leifos):add link to admin chapter)


``views.py`` and ``models.py`` are the two files you will use for any given application, and form part of the main architectural design pattern employed by Django, i.e. the *Model-View-Template* pattern. You can check out `the official Django documentation <https://docs.djangoproject.com/en/1.7/intro/overview/>`_ to see how models, views and templates relate to each other in more detail.

Before you can get started with creating your own models and views, you must first tell your Django project about your new application's existence. To do this, you need to modify the ``settings.py`` file, contained within your project's configuration directory. Open the file and find the ``INSTALLED_APPS`` tuple. Add the ``rango`` application to the end of the tuple, which should then look like the following example.

.. code-block:: python

	INSTALLED_APPS = (
	    'django.contrib.admin',
	    'django.contrib.auth',
	    'django.contrib.contenttypes',
	    'django.contrib.sessions',
	    'django.contrib.messages',
	    'django.contrib.staticfiles',
	    'rango',
	)

Verify that Django picked up your new application by running the development server again. If you can start the server without errors, your application was picked up and you will be ready to proceed to the next step.

Creating a View
---------------
With our Rango application created, let's now create a simple view. For our first view, let's just send some simple text back to the client - we won't concern ourselves about using models or templates just yet.

In your favourite IDE, open the file ``views.py``, located within your newly created ``rango`` application directory. Remove the comment ``# Create your views here.`` so that you now have a blank file.

You can now add in the following code.

.. code-block:: python

	from django.http import HttpResponse
	
	def index(request):
	    return HttpResponse("Rango says hey there world!")

Breaking down the three lines of code, we observe the following points about creating this simple view.

* We first import the `HttpResponse <https://docs.djangoproject.com/en/1.7/ref/request-response/#django.http.HttpResponse>`_ object from the ``django.http`` module.
* Each view exists within the ``views.py`` file as a series of individual functions. In this instance, we only created one view - called ``index``.
* Each view takes in at least one argument - a `HttpRequest <https://docs.djangoproject.com/en/1.7/ref/request-response/#django.http.HttpRequest>`_ object, which also lives in the ``django.http`` module.  Convention dictates that this is named ``request``, but you can rename this to whatever you want if you so desire.
* Each view must return a HttpResponse object. A simple HttpResponse object takes a string parameter representing the content of the page we wish to send to the client requesting the view.

With the view created, you're only part of the way to allowing a user to access it. For a user to see your view, you must map a `Uniform Resources Locator (URL) <http://en.wikipedia.org/wiki/Uniform_resource_locator>`_ to the view.

Mapping URLs
------------
Within the ``rango`` application directory, we now need to create a new file called ``urls.py``. The contents of the file will allow you to map URLs for your application (e.g. ``http://www.tangowithdjango.com/rango/``) to specific views. Check out the simple ``urls.py`` file below.

.. code-block:: python

	from django.conf.urls import patterns, url
	from rango import views

	urlpatterns = patterns('',
		url(r'^$', views.index, name='index'))

This code imports the relevant Django machinery that we use to create URL mappings. Importing the ``views`` module from ``rango`` also provides us with access to our simple view implemented previously, allowing us to reference the view in the URL mapping we will create.

To create our mappings, we use a `tuple <http://en.wikipedia.org/wiki/Tuple>`_. For Django to pick your mappings up, this tuple *must* be called ``urlpatterns``. The ``urlpatterns`` tuple contains a series of calls to the ``django.conf.urls.url()`` function, with each call handling a unique mapping. In the code example above, we only use ``url()`` once, so we have therefore defined only one URL mapping. The first parameter we provide to the ``django.conf.urls.url()`` function is the regular expression ``^$``, which matches to an empty string. Any URL supplied by the user that matches this pattern means that the view ``views.index()`` would be invoked by Django. The view would be passed a ``HttpRequest`` object as a parameter, containing information about the user's request to the server. We also make use of the optional parameter to the ``url()`` function, ``name``, using the string ``'index'`` as the associated value.

.. note:: You might be thinking that matching a blank URL is pretty pointless - what use would it serve? When the URL pattern matching takes place, only a portion of the original URL string is considered. This is because our Django project will first process the original URL string (i.e. ``http://www.tangowithdjango.com/rango/``). Once this has been processed, it is removed, with the remained being passed for pattern matching. In this instance, there would be nothing left - so an empty string would match!

.. note:: The ``name`` parameter is optional to the ``django.conf.urls.url()`` function. This is provided by Django to allow you to distinguish one mapping from another. It is entirely plausible that two separate URL mappings expressions could end calling the same view. ``name`` allows you to differentiate between them - something which is useful for *reverse URL matching.* Check out `the Official Django documentation on this topic <https://docs.djangoproject.com/en/1.7/topics/http/urls/#naming-url-patterns>`_ for more information.

You may have seen that within your project configuration directory a ``urls.py`` file already exists. Why make another? Technically, you can put *all* the URLs for your project's applications within this file. However, this is considered bad practice as it increases coupling on your individual applications. A separate ``urls.py`` file for each application allows you to set URLs for individual applications. With minimal coupling, you can then join them up to your project's master ``urls.py`` file later.

This means we need to configure the ``urls.py`` of our project ``tango_with_django_project`` and connect up our main project with our Rango application.

How do we do this? It's quite simple. Open the project's ``urls.py`` file which is located inside your project configuration directory. As a relative path from your workspace directory, this would be the file ``<workspace>/tango_with_django_project/tango_with_django_project/urls.py``. Update the ``urlpatterns`` tuple as shown in the example below.

.. code-block:: python
	

	urlpatterns = patterns('',
	    # Examples:
	    # url(r'^$', 'tango_with_django_project_17.views.home', name='home'),
	    # url(r'^blog/', include('blog.urls')),

	    url(r'^admin/', include(admin.site.urls)),
	    url(r'^rango/', include('rango.urls')), # ADD THIS NEW TUPLE!
	)

The added mapping looks for url strings that match the patterns ``^rango/``. When a match is made the remainder of the url string is then passed onto and handled by ``rango.urls`` (which we have already configured). This is done with the help of the ``include()`` function from within ``django.conf.urls``. Think of this as a chain that processors the URL string - as illustrated in Figure :num:`fig-url-chain`. In this chain, the domain is stripped out and the remainder of the url string (``rango/``) is passed on to tango_with_django project, where it finds a match and strips away ``rango/`` leaving and empty string to be passed on to the application rango. Rango now tries to match the empty string, which it does, and this then dispatches the ``index()`` view that we created.

Restart the Django development server and visit ``http://127.0.0.1:8000/rango``. If all went well, you should see the text ``Rango says hello world!``. It should look just like the screenshot shown in Figure :num:`fig-rango-hello-world`.

.. _fig-url-chain:

.. figure:: ../images/url-chain.svg
	:figclass: align-center
	
	An illustration of a URL, showing how the different parts of the URL are the responsibility of different ``url.py`` files.

.. _fig-rango-hello-world:

.. figure:: ../images/rango-hello-world.png
	:figclass: align-center

	A screenshot of Google Chrome displaying our first Django-powered webpage. Hello, Rango!

Within each application, you will create a number of URL to view mappings. This initial mapping is quite simple. As we progress, we will create more sophisticated mappings that using allow the URLs to be parameterised.

It's important to have a good understanding of how URLs are handled in Django. If you are still bit confused or would like to know more check out the `official Django documentation on URLs <https://docs.djangoproject.com/en/1.7/topics/http/urls/>`_ for further details and further examples.

.. note:: The URL patterns use `regular expressions <http://en.wikipedia.org/wiki/Regular_expression>`_ to perform the matching. It is worthwhile familiarising yourself on how to use regular expressions in Python. The official Python documentation contains a `useful guide on regular expressions <http://docs.python.org/2/howto/regex.html>`_ , while regexcheatsheet.com provides a `neat summary of regular expressions <http://regexcheatsheet.com/>`_.

Basic Workflows
---------------
What you've just learnt in this chapter can be succinctly summarised into a list of actions. Here, we provide these lists for the two distinct tasks you have performed. You can use this section for a quick reference if you need to remind yourself about particular actions.

Creating a new Django Project
.............................
#. To create the project run, ``python django-admin.py startproject <name>``, where ``<name>`` is the name of the project you wish to create.

Creating a new Django application
.................................
#. To create a new application run, ``$ python manage.py startapp <appname>``, where ``<appname>`` is the name of the application you wish to create.
#. Tell your Django project about the new application by adding it to the ``INSTALLED_APPS`` tuple in your project's ``settings.py`` file.
#. In your project ``urls.py`` file, add a mapping to the application.
#. In your application's directory, create a ``urls.py`` file to direct incoming URL strings to views.
#. In your application's ``view.py``, create the required views ensuring that they return a ``HttpResponse`` object.

Exercises
---------
Congratulations! You have got Rango up and running. This is a significant landmark in working with Django. Creating views and mapping URLs to views is the first step towards developing more complex and usable web applications. Now try the following exercises to reinforce what you've learnt.

* Revise the procedure and make sure you follow how the URLs are mapped to views.
* Now create a new view called ``about`` which returns the following: ``Rango says here is the about page.``
* Now map the this view to ``/rango/about/``. For this step, you'll only need to edit the ``urls.py`` of the rango application.
* Revise the ``HttpResponse`` in the ``index`` view to include a link to the about page.
* In the ``HttpResponse`` in the ``about`` view include a link back to the main page.
* If you haven't done so already, it is a good point to go off an complete part one of the official `Django Tutorial <https://docs.djangoproject.com/en/1.7/intro/tutorial01/>`_. 

Hints
.....
If you're struggling to get the exercises done, the following hints will hopefully provide you with some inspiration on how to progress.

* Your ``index`` view should be updated to include a link to the ``about`` view. Keep it simple for now - something like ``Rango says: Hello world! <br/> <a href='/rango/about'>About</a>`` will suffice. We'll be going back later to improve the presentation of these pages.
* The regular expression to match ``about/`` is ``r'^about/'`` - this will be handy when thinking about your URL pattern.
* The HTML to link back to the index page is ``<a href="/rango/">Index</a>``. The link uses the same structure as the link to the ``about`` page shown above.

.. rubric:: Footnotes
.. [#f1] This assumes that you are using the IP address 127.0.0.1 and port 8000 when running your Django development web server. If you do not explicitly provide a port to run the development server on, Django defaults to port 8000 for you.

.. [#f2] There are many applications available out there that you can use in your project. Take a look at `PyPI <https://pypi.python.org/pypi?%3Aaction=search&term=django&submit=search>`_ and `Django Packages <https://www.djangopackages.com/>`_ to search for reusable apps which you can drop into your projects.
