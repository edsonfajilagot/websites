.. _cookie-label:

Cookies and Sessions
====================

In this chapter, we will be going through *sessions* and *cookies*, both of which go hand in hand, and are of paramount importance in modern day web applications. In the previous chapter, the Django framework used sessions and cookies to handle the login and logout functionality (all behind the scenes). Here we will explore how to explicitly use cookies for other purposes.

Cookies, Cookies Everywhere!
----------------------------
If you are already comfortable with the ideas and concepts behind cookies, then skip straight to Section :ref:`model-cookies-protocols-label`, if not read on.

Whenever a request to a website is made, the webserver returns the content of the requested page. In addition, one or more cookies may also be sent to the client, which are in turn stored in a persistent browser cache. When a user requests a new page from the same web server, any cookies that are matched to that server are sent with the request. The server can then interpret the cookies as part of the request's context and generate a response to suit.

The term *cookie* wasn't actually derived from the food that you eat, but from the term *magic cookie*, a packet of data a program receives and sends again unchanged. In 1994, MCI sent a request to *Netscape Communications* to implement a way of implementing persistence across HTTP requests. This was in response to their need to reliably store the contents of a user's virtual shopping basket for an e-commerce solution they were developing. Netscape programmer Lou Montulli took the concept of a magic cookie and applied it to web communications. You can find out more about `cookies and their history on Wikipedia <http://en.wikipedia.org/wiki/HTTP_cookie#History>`_. Of course, with such a great idea came a software patent - and you can read `US patent 5774670 <http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&s1=5774670.PN.&OS=PN/5774670&RS=PN/5774670>`_ that was submitted by Montulli himself.

As an example, you may login to a site with a particular username and password. When you have been authenticated, a cookie may be returned to your browser containing your username, indicating that you are now logged into the site. At every request, this information is passed back to the server where your login information is used to render the appropriate page - perhaps including your username in particular places on the page. Your session cannot last forever, however - cookies *have* to expire at some point in time - they cannot be of infinite length. A web application containing sensitive information may expire after only a few minutes of inactivity. A different web application with trivial information may expire half an hour after the last interaction - or even weeks into the future.

The passing of information in the form of cookies can open up potential security holes in your web application's design. This is why developers of web applications need to be extremely careful when using cookies - does the information you want to store as a cookie *really* need to be sent? In many cases, there are alternate - and more secure - solutions to the problem. Passing a user's credit card number on an e-commerce site as a cookie for example would be highly unwise. What if the user's computer is compromised? The cookie could be taken by a malicious program. From there, hackers would have his or her credit card number - all because your web application's design is fundamentally flawed. You'll however be glad to know that a majority of websites use cookies for application specific functionality. 

.. _fig-bbcnews-cookies:

.. figure:: ../images/bbcnews-cookies.png
	:figclass: align-center

	A screenshot of the BBC News website (hosted in the United Kingdom) with the cookie warning message presented at the top of the page.

.. note:: Note in 2011, the European Union (EU) introduced an EU-wide 'cookie law', where all hosted sites within the EU should present a cookie warning message when a user visits the site for the first time. Check out Figure :num:`fig-bbcnews-cookies`, demonstrating such a warning on the BBC News website. You can read about `the law here <http://www.ico.org.uk/for_organisations/privacy_and_electronic_communications/the_guide/cookies>`_. 


.. _model-cookies-protocols-label:

Sessions and the Stateless Protocol
-----------------------------------
All correspondence between web browsers (clients) and servers is achieved through the `HTTP protocol <http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol>`_. As we *very briefly* touched upon in Chapter :ref:`forms-label`, HTTP is a `stateless protocol <http://en.wikipedia.org/wiki/Stateless_protocol>`_. This therefore means that a client computer running a web browser must establish a new network connection (a TCP connection) to the server each time a resource is requested (HTTP ``GET``) or sent (HTTP ``POST``) [#stateless_http11]_.

Without a persistent connection between client and server, the software on both ends cannot simply rely on connections alone to *hold session state*. For example, the client would need to tell the server each time who is logged on to the web application on a particular computer. This is known as a form of *dialogue* between the client and server, and is the basis of a *session* - a `semi-permanent exchange of information <http://en.wikipedia.org/wiki/Session_(computer_science)>`_. Being a stateless protocol, HTTP makes holding session state pretty challenging (and frustrating) - but there are luckily several techniques we can use to circumnavigate this problem. 

The most commonly used way of holding state is through the use of a *session ID* stored as a cookie on a client's computer. A session ID can be considered as a token (a sequence of characters) to identify a unique session within a particular web application. Instead of storing all kinds of information as cookies on the client (such as usernames, names, passwords...), only the session ID is stored, which can then be mapped to a data structure on the web server. Within that data structure, you can store all of the information you require. This approach is a **much more secure** way to store information about users. This way, the information cannot be compromised by a insecure client or a connection which is being snooped.

If your browser supports cookies, pretty much all websites create a new session for you when you visit. You can see this for yourself now - check out Figure :num:`fig-session-id`. In Google Chrome's developer tools, you can view cookies which are sent by the web server you've accessed. In Figure :num:`fig-session-id`, you can observe the selected cookie ``sessionid``. The cookie contains a series of letters and numbers which Django uses to uniquely identify your session. From there, all your session details can be accessed - but only on the server side.

.. _fig-session-id:

.. figure:: ../images/session-id.png
	:figclass: align-center

	A screenshot of Google Chrome with the Developer Tools opened - check out the cookie ``sessionid``...

Session IDs don't have to be stored with cookies, either. Legacy PHP applications typically include them as a *querystring*, or part of the URL to a given resource. If you've ever come across a URL like ``http://www.site.com/index.php?sessid=omgPhPwtfIsThisIdDoingHere332i942394``, that's probably uniquely identifying you to the server. Interesting stuff!

.. note:: Have a closer look at Figure :num:`fig-session-id`. Do you notice the token ``csrftoken``? This cookie is to help prevent any cross-site forgery.

Setting up Sessions in Django
-----------------------------
Although this should already be setup and working correctly, it's nevertheless good practice to learn which Django modules provide which functionality. In the case of sessions, Django provides `middleware <https://docs.djangoproject.com/en/1.7/topics/http/middleware/>`_ that implements session functionality.

To check that everything is in order, open your Django project's ``settings.py`` file. Within the file, locate the ``MIDDLEWARE_CLASSES`` tuple. You should find the ``django.contrib.sessions.middleware.SessionMiddleware`` module listed as a string in the tuple - if you don't, add it to the tuple now. It is the ``SessionMiddleware`` middleware which enables the creation of unique ``sessionid`` cookies.

The ``SessionMiddleware`` is designed to work flexibly with different ways to store session information. There are many approaches that can be taken - you could store everything in a file, in a database, or even in a cache. The most straightforward approach is to use the ``django.contrib.sessions`` application to store session information in a Django model/database (specifically, the model ``django.contrib.sessions.models.Session``). To use this approach, you'll also need to make sure that ``django.contrib.sessions`` is in the ``INSTALLED_APPS`` tuple of your Django project's ``settings.py`` file. If you add the application now, you'll need to update your database with the migration commands.

.. note:: If you are looking for lightning fast performance, you may want to consider a cached approach for storing session information. You can check out the `official Django documentation for advice on cached sessions <https://docs.djangoproject.com/en/1.7/topics/http/sessions/#using-cached-sessions>`_.

A Cookie Tasting Session
------------------------
We can now test out whether your browser supports cookies. While all modern web browsers do support cookies it is  worthwhile checking your browser's settings regarding cookies. If you have your browser's security level set to a high level, certain cookies may get blocked. Look up your browser's documentation for more information, and enable cookies.

Testing Cookie Functionality
............................
To test out cookies, you can make use of some convenience methods provided by Django's ``request`` object. The three of particular interest to us are ``set_test_cookie()``, ``test_cookie_worked()`` and ``delete_test_cookie()``. In one view, you will need to set a cookie. In another, you'll need to test that the cookie exists. Two different views are required for testing cookies because you need to wait to see if the client has accepted the cookie from the server.

We'll use two pre-existing views for this simple exercise, ``index()`` and ``register()``. You'll need to make sure that you are logged out of Rango if you've implemented the user authentication functionality. Instead of displaying anything on the pages themselves, we'll be making use of the terminal output from the Django development server to verify whether cookies are working correctly. After we successfully determine that cookies are indeed working, we can remove the code we add to restore the two views to their previous state.

In Rango's ``views.py`` file, locate your ``index()`` view. Add the following line to the view. To ensure the line is executed, make sure you put it as the first line of the view, outside any conditional blocks.

.. code-block:: python
	
	request.session.set_test_cookie()

In the ``register()`` view, add the following three lines to the top of the function - again, to ensure that they are executed.

.. code-block:: python
	
	if request.session.test_cookie_worked():
	    print ">>>> TEST COOKIE WORKED!"
	    request.session.delete_test_cookie()

With these small changes saved, run the Django development server and navigate to Rango's homepage,  ``http://127.0.0.1:8000/rango/``. Once the page is loaded, navigate to the registration page. When the registration page is loaded, you should see ``>>>> TEST COOKIE WORKED!`` appear in your Django development server's console, like in Figure :num:`fig-test-cookie`. If you do, everything works as intended!

.. _fig-test-cookie:

.. figure:: ../images/test-cookie.png
	:figclass: align-center

	A screenshot of the Django development server's console output with the ``>>>> TEST COOKIE WORKED!`` message.

If the message isn't displayed, you'll want to check your browser's security settings. The settings may be preventing the browser from accepting the cookie.

.. note:: You can delete the code you added in this section - we only used it to demonstrate cookies in action.

Client Side Cookies: A Site Counter Example
-------------------------------------------
Now we know cookies work, let's implement a very simple site visit counter. To achieve this, we're going to be creating two cookies: one to track the number of times the user has visited the Rango website, and the other to track the last time he or she accessed the site. Keeping track of the date and time of the last access will allow us to only increment the site counter once per day, for example.

The sensible place to assume a user enters the Rango site is at the index page. Open ``rango/views.py`` and edit the ``index()`` view as follows:

.. code-block:: python
	
	def index(request):
	   
	    category_list = Category.objects.all()
	    page_list = Page.objects.order_by('-views')[:5]
    	    context_dict = {'categories': category_list, 'pages': page_list}

	    # Get the number of visits to the site.
	    # We use the COOKIES.get() function to obtain the visits cookie.
	    # If the cookie exists, the value returned is casted to an integer.
	    # If the cookie doesn't exist, we default to zero and cast that.
	    visits = int(request.COOKIES.get('visits', '1'))
	    
	    reset_last_visit_time = False
	    response = render(request, 'rango/index.html', context_dict)
	    # Does the cookie last_visit exist?
	    if 'last_visit' in request.COOKIES:
	        # Yes it does! Get the cookie's value.
	        last_visit = request.COOKIES['last_visit']
	        # Cast the value to a Python date/time object.
	        last_visit_time = datetime.strptime(last_visit[:-7], "%Y-%m-%d %H:%M:%S")
	
	        # If it's been more than a day since the last visit...
	        if (datetime.now() - last_visit_time).days > 0:
	            visits = visits + 1
	            # ...and flag that the cookie last visit needs to be updated
		    reset_last_visit_time = True
	    else:
	        # Cookie last_visit doesn't exist, so flag that it should be set.
	        reset_last_visit_time = True
	
		context_dict['visits'] = visits
		
	        #Obtain our Response object early so we can add cookie information.
		response = render(request, 'rango/index.html', context_dict)

	    if reset_last_visit_time:
		response.set_cookie('last_visit', datetime.now())
		response.set_cookie('visits', visits)
	
	    # Return response back to the user, updating any cookies that need changed.
	    return response
	    

For reading through the code, you will see that a majority of the code deals with checking the current date and time. For this, you'll need to include Python's ``datetime`` module by adding the following import statement at the top of the ``views.py`` file.

.. code-block:: python
	
	from datetime import datetime

Make sure you also import the ``datetime`` object within the ``datetime`` module.

In the added code we check to see if the cookie ``last_visit`` exists. If it does, we can take the value from the cookie using the syntax ``request.COOKIES['cookie_name']``, where ``request`` is the name of the ``request`` object, and ``'cookie_name'`` is the name of the cookie you wish to retrieve. **Note that all cookie values are returned as strings**; *do not assume that a cookie storing whole numbers will return an integer.* You have to manually cast this to the correct type yourself. If a cookie does not exist, you can create a cookie with the ``set_cookie()`` method of the ``response`` object you create. The method takes in two values, the name of the cookie you wish to create (as a string), and the value of the cookie. In this case, it doesn't matter what type you pass as the value - it will be automatically cast to a string.

.. _fig-cookie-visits:

.. figure:: ../images/cookie-visits.png
	:figclass: align-center

	A screenshot of Google Chrome with the Developer Tools open showing the cookies for Rango. Note the ``visits`` cookie - the user has visited a total of six times, with each visit at least one day apart.

Now if you visit the Rango homepage, and inspect the developer tools provided by your browser, you should be able to see the cookies ``visits`` and ``last_visit``. Figure :num:`fig-cookie-visits` demonstrates the cookies in action.

.. note:: You may notice that the ``visits`` cookie doesn't increment when you refresh your web browser. Why? The sample code we provide above only increments the counter *at least one whole day* after a user revisits the Rango homepage. This is an unacceptable time to wait when testing - so why not temporarily change the delay to a shorter time period? In the updated ``index`` view, find the following line.
	
	``if (datetime.now() - last_visit_time).days > 0:``
	
	We can easily change this line to compare the number of *seconds* between visits. In the example below, we check if the user visited at least five seconds prior.
	
	``if (datetime.now() - last_visit_time).seconds > 5:``
	
	This means you need only wait five seconds to see your ``visits`` cookie increment, rather than a whole day. When you're happy your code works, you can revert the comparison back to the original per-day timespan.
	
	Being able to find the difference between times using the ``-`` operator is one of the many awesome features that Python provides. When times are subtracted, a ``timedelta`` object is returned, which provides the ``days`` and ``seconds`` attributes we use in the code snippets above. You can check out the `official Python documentation <http://docs.python.org/2/library/datetime.html#timedelta-objects>`_ for more information on this type of object, and what other attributes it provides.
	
Instead of using the developer tools you can update the ``index.html`` and add, ``<p> visits: {{ visits }}</p>`` to show the number of visits.

Session Data
------------
In the previous example, we used client side cookies. However, a more secure way to save session information is to store any such data on the server side. We can then use the session ID cookie which is stored on the client side (but is effectively anonymous) as the key to unlock the data.

To use session based cookies you need to perform the following steps.

#. Make sure that ``MIDDLEWARE_CLASSES`` in ``settings.py`` contains ``django.contrib.sessions.middleware.SessionMiddleware``. 
#. Configure your session backend. Make sure that ``django.contrib.sessions`` is in your ``INSTALLED_APPS`` in ``settings.py``. If not, add it, and run the database migration command, ``python manage.py migrate``.
#. By default a database backend is assumed, but you might want to another setup (i.e. a cache). See the `official Django Documentation on Sessions for other backend configurations <https://docs.djangoproject.com/en/1.7/topics/http/sessions/>`_.

Now instead of storing the cookies directly in the request (and thus on the client's machine), you can access the server side cookies via the method call ``request.session.get()`` and store them with ``request.session[]``. Note that a session ID cookie is still used to remember the client's machine (so technically a browser side cookie exists), however all the data is stored serve side. Below we have updated the ``index()`` function with the session based cookies:


.. code-block:: python
	
	def index(request):
	    
	    category_list = Category.objects.order_by('-likes')[:5]
	    page_list = Page.objects.order_by('-views')[:5]

	    context_dict = {'categories': category_list, 'pages': page_list}

	    visits = request.session.get('visits')
	    if not visits:
		visits = 1
	    reset_last_visit_time = False

	    last_visit = request.session.get('last_visit')
	    if last_visit:
	        last_visit_time = datetime.strptime(last_visit[:-7], "%Y-%m-%d %H:%M:%S")
	        
	        if (datetime.now() - last_visit_time).seconds > 0:
	            # ...reassign the value of the cookie to +1 of what it was before...
	            visits = visits + 1
	            # ...and update the last visit cookie, too.
	            reset_last_visit_time = True
	    else:
	        # Cookie last_visit doesn't exist, so create it to the current date/time.
	        reset_last_visit_time = True

	    if reset_last_visit_time:
		request.session['last_visit'] = str(datetime.now())
		request.session['visits'] = visits
	    context_dict['visits'] = visits
		

	    response = render(request,'rango/index.html', context_dict)

	    return response
	


.. warning:: It's highly recommended that you delete any client-side cookies for Rango *before* you start using session-based data. You can do this in your browser's developer tools by deleting each cookie individually, or simply clear your browser's cache entirely - ensuring that cookies are deleted in the process.

.. note:: An added advantage of storing session data server-side is its ability to cast data from strings to the desired type. This only works however for `built-in types <http://docs.python.org/2/library/stdtypes.html>`_, such as ``int``, ``float``, ``long``, ``complex`` and ``boolean``. If you wish to store a dictionary or other complex type, don't expect this to work. In this scenario, you might want to consider `pickling your objects <https://wiki.python.org/moin/UsingPickle>`_.

Browser-Length and Persistent Sessions
--------------------------------------
When using cookies you can use Django's session framework to set cookies as either *browser-length sessions* or *persistent sessions*. As the names of the two types suggest:

* browser-length sessions expire when the user closes his or her browser; and
* persistent sessions can last over several browser instances - expiring at a time of your choice. This could be half an hour, or even as far as a month in the future.

By default, browser-length sessions are disabled. You can enable them by modifying your Django project's ``settings.py`` file. Add the variable ``SESSION_EXPIRE_AT_BROWSER_CLOSE``, setting it to ``True``.

Alternatively, persistent sessions are enabled by default, with ``SESSION_EXPIRE_AT_BROWSER_CLOSE`` either set to ``False``, or not being present in your project's ``settings.py`` file. Persistent sessions have an additional setting, ``SESSION_COOKIE_AGE``, which allows you to specify the age of which a cookie can live to. This value should be an integer, representing the number of seconds the cookie can live for. For example, specifying a value of ``1209600`` will mean your website's cookies expire after a two week period.

Check out the available settings you can use on the `official Django documentation on cookies <https://docs.djangoproject.com/en/1.7/ref/settings/#session-cookie-age>`_ for more details. You can also check out `Eli Bendersky's blog <http://eli.thegreenplace.net/2011/06/24/django-sessions-part-i-cookies/>`_ for an excellent tutorial on cookies and Django.


Clearing the Sessions Database
------------------------------
Session cookies accumulate. So if you are using the database backend you will have to periodically clear the database that stores the cookies. This can be done using ``python manage.py clearsessions``. The Django documentations suggests running this daily as a cron job. See https://docs.djangoproject.com/en/1.7/topics/http/sessions/#clearing-the-session-store


Basic Considerations and Workflow
---------------------------------
When using cookies within your Django application, there's a few things you should consider:

* First, consider what type of cookies your web application requires. Does the information you wish to store need to persist over a series of user browser sessions, or can it be safely disregarded upon the end of one session?
* Think carefully about the information you wish to store using cookies. Remember, storing information in cookies by their definition means that the information will be stored on client's computers, too. This is a potentially huge security risk: you simply don't know how compromised a user's computer will be. Consider server-side alternatives if potentially sensitive information is involved.
* As a follow-up to the previous bullet point, remember that users may set their browser's security settings to a high level which could potentially block your cookies. As your cookies could be blocked, your site may function incorrectly. You *must* cater for this scenario - *you have no control over the client browser's setup*.

If client-side cookies are the right approach for you then work through the following steps:

#. You must first perform a check to see if the cookie you want exists. This can be done by checking the ``request`` parameter. The ``request.COOKIES.has_key('<cookie_name>')`` function returns a boolean value indicating whether a cookie <cookie_name> exists on the client's computer or not. 
#. If the cookie exists, you can then retrieve its value - again via the ``request`` parameter - with ``request.COOKIES[]``. The ``COOKIES`` attribute is exposed as a dictionary, so pass the name of the cookie you wish to retrieve as a string between the square brackets. Remember, cookies are all returned as strings, regardless of what they contain. You must therefore be prepared to cast to the correct type.
#. If the cookie doesn't exist, or you wish to update the cookie, pass the value you wish to save to the response you generate. ``response.set_cookie('<cookie_name>', value)`` is the function you call, where two parameters are supplied: the name of the cookie, and the ``value`` you wish to set it to.

If you need more secure cookies, then use session based cookies:

#. Make sure that ``MIDDLEWARE_CLASSES`` in ``settings.py`` contains 'django.contrib.sessions.middleware.SessionMiddleware'. 
#. Configure your session backend ``SESSION_ENGINE``. See the `official Django Documentation on Sessions <https://docs.djangoproject.com/en/1.7/topics/http/sessions/>`_ for the various backend configurations.
#. Check to see if the cookie exists via ``requests.sessions.get()``
#. Update or set the cookie via the session dictionary, ``requests.session['<cookie_name>']``

Exercises
---------
Now you've read through this chapter and tried out the code, give these exercises a go.

- Check that your cookies are server side. Clear the browser's cache and cookies, then check to make sure you can't see the ``last_visit`` and ``visits`` variables in the browser. Note you will still see the ``sessionid`` cookie. Django uses this cookie to look up the session in the database where it stores all the server side cookies about that session.
- Update the *About* page view and template telling the visitors how many times they have visited the site.

Hint
....
To aid you in your quest to complete the above exercises, the following hint may help you.

You'll have to pass the value from the cookie to the template context for it to be rendered as part of the page, as shown in the example below.

.. code-block:: python
	
	# If the visits session varible exists, take it and use it.
	# If it doesn't, we haven't visited the site so set the count to zero.
	if request.session.get('visits'):
	    count = request.session.get('visits')
	else:
	    count = 0

	# remember to include the visit data
	return render(request, 'rango/about.html', {'visits': count})

.. rubric:: Footnotes

.. [#stateless_http11] The latest version of the HTTP standard HTTP 1.1 actually supports the ability for multiple requests to be sent in one TCP network connection. This provides huge improvements in performance, especially over high-latency network connections (such as via a traditional dial-up modem and satellite). This is referred to as *HTTP pipelining*, and you can read more about this technique on `Wikipedia <http://en.wikipedia.org/wiki/HTTP_pipelining>`_.
